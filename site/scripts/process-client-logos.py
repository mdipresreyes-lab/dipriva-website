"""Turn client source logos into single-color stencils for the homepage logo block.

The site draws each logo as a CSS mask, so only the alpha channel matters: the
output must have a transparent background, fully opaque logo shapes and soft
edges, trimmed to the shapes with 4px padding, at most 40 KB.

Needs Python 3 and Pillow (python3 -m pip install --user Pillow). Run from site/:

  python3 scripts/process-client-logos.py analyze <slug>
      Prints the source's mode, size, alpha and top colors, the border color
      (the likely background) and the row bands of content, to pick a recipe.

  python3 scripts/process-client-logos.py build [<slug> ...] --previews <dir>
      Builds public/clients/<slug>.png from public/clients/<slug>-original.png
      using RECIPES below (all slugs when none are given) and writes
      <dir>/<slug>-preview.png: before, alpha on a checkerboard, and the stencil
      as the site renders it in light and dark.

To add a client, save its file as public/clients/<slug>-original.png, add a
recipe, build, and look at the preview. See .claude/skills/add-client-logo/SKILL.md.
"""
import argparse
import collections
import io
import os
from pathlib import Path

from PIL import Image, ImageDraw

CLIENTS = Path(__file__).resolve().parent.parent / 'public' / 'clients'
PAD = 4
MAX_BYTES = 40 * 1024

# One recipe per slug. Kinds:
#   transparent  Source already has a transparent background: trim and encode.
#   light-bg     Key out a white or near-white background. Pixels whose every
#                channel is above `min` become transparent; coverage ramps up to
#                full at a distance `full` from white (255 minus the darkest channel).
#   color-bg     Key out a colored background `bg` (or "auto": the most common
#                border color). Coverage ramps from distance `lo` to `hi` (RGB
#                distance from bg), so faint patterns below `lo` disappear.
#                crop "first-band" keeps only the first band of rows whose pixels
#                are farther than `band` from bg (for social cards with a tagline
#                or URL under the logo); a (left, top, right, bottom) tuple crops
#                to that box instead.
RECIPES = {
    'mercatus-media': {'kind': 'transparent'},
    'pro-roofing-siding': {'kind': 'light-bg', 'bg': (255, 255, 255), 'min': 240, 'full': 140},
    'tiva-properties': {'kind': 'light-bg', 'bg': (253, 254, 252), 'min': 235, 'full': 130},
    # Transparent source with solid white rays inside the emblem: cut the white
    # out; `full` is low so the light-blue rays (darkest channel 166) stay opaque.
    'ismael-abreu-farmers-insurance': {'kind': 'light-bg', 'bg': (255, 255, 255), 'min': 240, 'full': 60},
    'procommand': {'kind': 'color-bg', 'bg': (11, 27, 51), 'lo': 40, 'hi': 150, 'crop': 'first-band', 'band': 60},
}


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
    if box is None:
        raise SystemExit('nothing opaque left after keying: the recipe removed the whole logo')
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


def border_color(im):
    """Most common color on the outer 2px ring: usually the background."""
    im = im.convert('RGB')
    px, w, h = im.load(), im.width, im.height
    ring = [px[x, y] for x in range(w) for y in (0, 1, h - 2, h - 1)]
    ring += [px[x, y] for y in range(h) for x in (0, 1, w - 2, w - 1)]
    return collections.Counter(ring).most_common(1)[0][0]


def row_bands(im, bg, threshold):
    """Runs of rows that hold at least one pixel farther than threshold from bg."""
    im = im.convert('RGB')
    px = im.load()
    dist = lambda p: sum((a - b) ** 2 for a, b in zip(p, bg)) ** 0.5
    rows = [any(dist(px[x, y]) > threshold for x in range(im.width)) for y in range(im.height)]
    bands, start = [], None
    for y, on in enumerate(rows + [False]):
        if on and start is None:
            start = y
        elif not on and start is not None:
            bands.append((start, y - 1))
            start = None
    return bands, dist


def first_band_box(im, bg, threshold):
    bands, dist = row_bands(im, bg, threshold)
    top, bottom = bands[0]
    px = im.convert('RGB').load()
    cols = [x for x in range(im.width) if any(dist(px[x, y]) > threshold for y in range(top, bottom + 1))]
    # Widen by 3px for the anti-aliased fringe, stopping short of the next band.
    box = (max(0, cols[0] - 3), max(0, top - 3), min(im.width, cols[-1] + 4), min(im.height, bottom + 4))
    if len(bands) > 1 and box[3] >= bands[1][0]:
        raise SystemExit('crop box reaches the second band; lower "band" or give an explicit box')
    print(f'  row bands (y): {bands}')
    return box


def process(slug, recipe):
    src = Image.open(CLIENTS / f'{slug}-original.png')
    kind = recipe['kind']
    box = None
    if kind == 'transparent':
        out = src.convert('RGBA')
    elif kind == 'light-bg':
        bg = recipe['bg'] if recipe.get('bg', 'auto') != 'auto' else border_color(src)
        lo, full = 255 - recipe['min'], recipe['full']
        out = key_out(src, bg, lambda p: ramp(255 - min(p), lo, full))
    elif kind == 'color-bg':
        rgb = src.convert('RGB')
        bg = recipe['bg'] if recipe.get('bg', 'auto') != 'auto' else border_color(rgb)
        crop = recipe.get('crop')
        if crop == 'first-band':
            box = first_band_box(rgb, bg, recipe.get('band', 60))
        elif crop:
            box = tuple(crop)
        if box:
            print(f'  crop box (left, top, right, bottom): {box}')
            rgb = rgb.crop(box)
        dist = lambda p: sum((a - b) ** 2 for a, b in zip(p, bg)) ** 0.5
        out = key_out(rgb, bg, lambda p: ramp(dist(p), recipe['lo'], recipe['hi']))
    else:
        raise SystemExit(f'{slug}: unknown recipe kind {kind!r}')
    return src, trim(out), box


def checker(size, dark):
    return Image.new('RGBA', size, (18, 26, 37, 255) if dark else (245, 245, 220, 255))


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


def preview(slug, final, prev_dir):
    orig = Image.open(CLIENTS / f'{slug}-original.png').convert('RGBA')
    h = 160
    sc = lambda i: i.resize((max(1, round(i.width * h / i.height)), h), Image.Resampling.LANCZOS)
    tiles = [
        ('before', Image.alpha_composite(Image.new('RGBA', orig.size, (200, 200, 200, 255)), orig)),
        ('after: alpha on checkerboard', Image.alpha_composite(checkerboard(final.size), stencil_fill(final, (0, 0, 0)))),
        ('after: as rendered, light (--muted #4e5d74 on #f5f5dc)', Image.alpha_composite(checker(final.size, False), stencil_fill(final, (78, 93, 116)))),
        ('after: as rendered, dark (--muted #a7b0be on #121a25)', Image.alpha_composite(checker(final.size, True), stencil_fill(final, (167, 176, 190)))),
    ]
    tiles = [(label, sc(t)) for label, t in tiles]
    width = max(t.width for _, t in tiles) + 20
    sheet = Image.new('RGB', (width, sum(t.height + 34 for _, t in tiles) + 10), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    y = 10
    for label, t in tiles:
        draw.text((10, y), label, fill=(0, 0, 0))
        sheet.paste(t, (10, y + 16), t)
        y += t.height + 34
    path = Path(prev_dir) / f'{slug}-preview.png'
    sheet.save(path)
    return path


def build(slugs, prev_dir):
    os.makedirs(prev_dir, exist_ok=True)
    for slug in slugs or RECIPES:
        if slug not in RECIPES:
            raise SystemExit(f'{slug}: add a recipe to RECIPES first')
        print(f'{slug}:')
        src, out, box = process(slug, RECIPES[slug])
        data, size = encode(out)
        (CLIENTS / f'{slug}.png').write_bytes(data)
        final = Image.open(io.BytesIO(data))
        mode = final.mode
        final = final.convert('RGBA')
        hist = final.getchannel('A').histogram()
        opaque = sum(hist[250:]) / max(1, sum(hist[1:]))
        path = preview(slug, final, prev_dir)
        print(f'  source {src.width}x{src.height} -> {size[0]}x{size[1]} ({mode}), {len(data) / 1024:.1f} KB, '
              f'corner alpha {final.getpixel((0, 0))[3]}, visible pixels fully opaque {opaque:.0%}')
        print(f'  preview: {path}')


def analyze(slug):
    im = Image.open(CLIENTS / f'{slug}-original.png')
    print(f'{slug}: mode {im.mode}, size {im.width}x{im.height}')
    rgba = im.convert('RGBA')
    alpha = collections.Counter(rgba.getchannel('A').getdata())
    print(f'  alpha: {alpha[0]} transparent, {alpha[255]} opaque, {sum(alpha.values()) - alpha[0] - alpha[255]} partial')
    colors = collections.Counter(p[:3] for p in rgba.getdata() if p[3] > 200)
    print(f'  top opaque colors: {colors.most_common(6)}')
    bg = border_color(im)
    print(f'  border color (likely background): {bg}')
    bands, _ = row_bands(im, bg, 60)
    print(f'  row bands farther than 60 from the border color: {bands}')


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='cmd', required=True)
    a = sub.add_parser('analyze')
    a.add_argument('slug')
    b = sub.add_parser('build')
    b.add_argument('slugs', nargs='*')
    b.add_argument('--previews', required=True, help='folder for the before and after previews')
    args = parser.parse_args()
    if args.cmd == 'analyze':
        analyze(args.slug)
    else:
        build(args.slugs, args.previews)


if __name__ == '__main__':
    main()
