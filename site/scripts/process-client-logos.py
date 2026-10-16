"""Turn the four client source logos into transparent stencils for CSS masks.

Usage: python3 scripts/process-client-logos.py public/clients <preview_dir>  (from site/, needs Pillow)
Reads <slug>-original.png, writes <slug>.png and before/after previews.
"""
import io
import os
import sys

from PIL import Image, ImageDraw

SRC, PREV = sys.argv[1], sys.argv[2]
os.makedirs(PREV, exist_ok=True)
PAD = 4
MAX_BYTES = 40 * 1024


def ramp(v, lo, hi):
    """0 at or below lo, 1 at or above hi, linear between."""
    if v <= lo:
        return 0.0
    if v >= hi:
        return 1.0
    return (v - lo) / (hi - lo)


def key_out(im, bg, coverage):
    """Alpha from coverage(pixel), times the existing alpha. Colors are
    un-blended from bg at the edges so the stencil keeps clean shapes."""
    im = im.convert('RGBA')
    out = Image.new('RGBA', im.size)
    src, dst = im.load(), out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a0 = src[x, y]
            k = coverage((r, g, b))
            a = k * a0 / 255
            if a <= 0:
                dst[x, y] = (0, 0, 0, 0)
                continue
            if k < 1:
                r, g, b = (max(0, min(255, round((c - (1 - k) * bc) / k))) for c, bc in zip((r, g, b), bg))
            dst[x, y] = (r, g, b, round(a * 255))
    return out


def trim(im):
    alpha = im.getchannel('A').point(lambda v: 255 if v > 8 else 0)
    box = alpha.getbbox()
    im = im.crop(box)
    padded = Image.new('RGBA', (im.width + 2 * PAD, im.height + 2 * PAD), (0, 0, 0, 0))
    padded.paste(im, (PAD, PAD))
    return padded


def encode(im):
    """Smallest PNG that fits the budget. The site only reads the alpha channel
    (CSS mask), so an alpha-only file (black, LA mode) competes with full RGBA
    and a 256-color palette. Downscale only if all three are over budget."""
    cur = im
    while True:
        black = Image.merge('LA', (Image.new('L', cur.size, 0), cur.getchannel('A')))
        options = []
        for variant in (cur, cur.quantize(256, method=Image.Quantize.FASTOCTREE), black):
            buf = io.BytesIO()
            variant.save(buf, 'PNG', optimize=True)
            options.append(buf.getvalue())
        best = min(options, key=len)
        if len(best) <= MAX_BYTES:
            return best, cur.size
        cur = cur.resize((round(cur.width * 0.85), round(cur.height * 0.85)), Image.Resampling.LANCZOS)


def whiteness_cov(lo_min, full_at):
    """Coverage from distance to white: 255 - min channel. Pixels whose every
    channel is above lo_min are fully transparent."""
    return lambda p: ramp(255 - min(p), 255 - lo_min, full_at)


report = []

# Mercatus Media: already transparent.
im = Image.open(f'{SRC}/mercatus-media-original.png').convert('RGBA')
report.append(('mercatus-media', im.size, trim(im), None))

# Pro Roofing & Siding: white and near-white (all channels > 240) to transparent.
im = Image.open(f'{SRC}/pro-roofing-siding-original.png')
report.append(('pro-roofing-siding', im.size, trim(key_out(im, (255, 255, 255), whiteness_cov(240, 140))), None))

# Tiva Properties: off-white interior (all channels > 235) to transparent.
im = Image.open(f'{SRC}/tiva-properties-original.png')
report.append(('tiva-properties', im.size, trim(key_out(im, (253, 254, 252), whiteness_cov(235, 130))), None))

# ProCommand: crop to the first band of bright content (icon, wordmark, TM),
# then key out the navy and the faint chevron pattern.
im = Image.open(f'{SRC}/procommand-original.png').convert('RGB')
NAVY = (11, 27, 51)
dist = lambda p: sum((a - b) ** 2 for a, b in zip(p, NAVY)) ** 0.5
px = im.load()
rows = [any(dist(px[x, y]) > 60 for x in range(im.width)) for y in range(im.height)]
bands, start = [], None
for y, on in enumerate(rows + [False]):
    if on and start is None:
        start = y
    elif not on and start is not None:
        bands.append((start, y - 1))
        start = None
top, bottom = bands[0]
cols = [x for x in range(im.width) if any(dist(px[x, y]) > 60 for y in range(top, bottom + 1))]
# Widen by 3px for anti-aliased fringe, stopping well short of the next band.
box = (cols[0] - 3, top - 3, cols[-1] + 4, bottom + 4)
assert box[3] < bands[1][0], 'crop box reaches the tagline'
print('procommand bands (y):', bands)
print('procommand crop box (left, top, right, bottom):', box)
crop = im.crop(box)
# Pattern pixels sit at most ~18 from navy; ramp starts above that.
stencil = key_out(crop, NAVY, lambda p: ramp(dist(p), 40, 150))
report.append(('procommand', im.size, trim(stencil), box))


def checker(size, dark):
    bg = Image.new('RGBA', size, (18, 26, 37, 255) if dark else (245, 245, 220, 255))
    return bg


def checkerboard(size, cell=8):
    board = Image.new('RGBA', size, (255, 255, 255, 255))
    d = ImageDraw.Draw(board)
    for y in range(0, size[1], cell):
        for x in range(0, size[0], cell):
            if (x // cell + y // cell) % 2:
                d.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(205, 205, 205, 255))
    return board


def stencil_fill(im, color):
    solid = Image.new('RGBA', im.size, color + (255,))
    solid.putalpha(im.getchannel('A'))
    return solid


for slug, src_size, out, box in report:
    data, size = encode(out)
    with open(f'{SRC}/{slug}.png', 'wb') as fh:
        fh.write(data)
    final_mode = Image.open(io.BytesIO(data)).mode
    final = Image.open(io.BytesIO(data)).convert('RGBA')
    # Preview: original | processed on light | on dark | stencil as the site renders it.
    orig = Image.open(f'{SRC}/{slug}-original.png').convert('RGBA')
    h = 160
    sc = lambda i: i.resize((max(1, round(i.width * h / i.height)), h), Image.Resampling.LANCZOS)
    tiles = [
        ('before', Image.alpha_composite(Image.new('RGBA', orig.size, (200, 200, 200, 255)), orig)),
        ('after: alpha on checkerboard', Image.alpha_composite(checkerboard(final.size), stencil_fill(final, (0, 0, 0)))),
        ('after: as rendered, light (--muted #4e5d74 on #f5f5dc)', Image.alpha_composite(checker(final.size, False), stencil_fill(final, (78, 93, 116)))),
        ('after: as rendered, dark (--muted #a7b0be on #121a25)', Image.alpha_composite(checker(final.size, True), stencil_fill(final, (167, 176, 190)))),
    ]
    tiles = [(label, sc(t)) for label, t in tiles]
    W = max(t.width for _, t in tiles) + 20
    sheet = Image.new('RGB', (W, sum(t.height + 34 for _, t in tiles) + 10), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    y = 10
    for label, t in tiles:
        draw.text((10, y), label, fill=(0, 0, 0))
        sheet.paste(t, (10, y + 16), t)
        y += t.height + 34
    sheet.save(f'{PREV}/{slug}-preview.png')
    alpha = final.getchannel('A')
    hist = alpha.histogram()
    opaque = sum(hist[250:]) / max(1, sum(hist[1:]))
    print(f'{slug}: mode {final_mode}, source {src_size[0]}x{src_size[1]} -> {size[0]}x{size[1]}, {len(data) / 1024:.1f} KB, '
          f'corner alpha {final.getpixel((0, 0))[3]}, share of visible pixels opaque {opaque:.0%}, crop {box}')
