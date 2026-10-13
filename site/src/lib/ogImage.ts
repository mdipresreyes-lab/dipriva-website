import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

/**
 * Open Graph image for a blog post: 1200 x 630, navy background, cream title in Playfair Display,
 * sand details in Inter. Built with satori (layout to SVG) and resvg (SVG to PNG) at build time.
 * Anything that goes wrong throws, so a broken image fails the build instead of shipping silently.
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const NAVY = '#2F4059';
const CREAM = '#F5F5DC';
const SAND = '#E8E4D9';

const fontFile = (pkg: string, file: string) => {
  const full = path.join(process.cwd(), 'node_modules', pkg, 'files', file);
  if (!fs.existsSync(full)) throw new Error(`OG image font missing: ${full}`);
  return fs.readFileSync(full);
};

let fonts: { name: string; data: Buffer; weight: 400 | 500 | 600 | 700; style: 'normal' }[] | undefined;
const loadFonts = () =>
  (fonts ??= [
    { name: 'Playfair Display', data: fontFile('@fontsource/playfair-display', 'playfair-display-latin-700-normal.woff'), weight: 700, style: 'normal' },
    { name: 'Inter', data: fontFile('@fontsource/inter', 'inter-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'Inter', data: fontFile('@fontsource/inter', 'inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
  ]);

/** Longer titles get a smaller size so they stay inside the card on at most four lines. */
const titleSize = (title: string) => (title.length <= 55 ? 72 : title.length <= 80 ? 62 : title.length <= 105 ? 54 : title.length <= 130 ? 48 : 42);

type Node = { type: string; props: { style?: Record<string, string | number>; children?: Node[] | string } };
const el = (type: string, style: Record<string, string | number>, children?: Node[] | string): Node => ({ type, props: { style, children } });

export interface OgInput {
  title: string;
  /** Topic label, already in the post's language. */
  label: string;
  /** Right-hand byline, for example "Insights" or "Análisis". */
  section: string;
}

export async function renderOgImage({ title, label, section }: OgInput): Promise<Buffer> {
  if (!title.trim()) throw new Error('OG image needs a title');
  const tree = el('div', { boxSizing: 'border-box', width: OG_WIDTH, height: OG_HEIGHT, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: NAVY, padding: '60px 72px', fontFamily: 'Inter' }, [
    el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
      el('div', { display: 'flex', alignItems: 'center' }, [
        el('div', { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 13, background: CREAM, color: NAVY, fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 34 }, 'D'),
        el('div', { display: 'flex', marginLeft: 16, color: CREAM, fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 34 }, 'Dipriva'),
      ]),
      el('div', { display: 'flex', color: SAND, fontWeight: 600, fontSize: 22, letterSpacing: 3, textTransform: 'uppercase' }, label),
    ]),
    el('div', { display: 'flex', color: CREAM, fontFamily: 'Playfair Display', fontWeight: 700, fontSize: titleSize(title), lineHeight: 1.14, letterSpacing: -0.5 }, title),
    el('div', { display: 'flex', flexDirection: 'column' }, [
      el('div', { display: 'flex', width: '100%', height: 2, background: SAND, opacity: 0.35 }),
      el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, fontSize: 24 }, [
        el('div', { display: 'flex', color: SAND, fontWeight: 500 }, `Dipriva Consulting Group  ·  ${section}`),
        el('div', { display: 'flex', color: CREAM, fontWeight: 600 }, 'dipriva.com'),
      ]),
    ]),
  ]);

  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: loadFonts() });
  const image = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render();
  if (image.width !== OG_WIDTH || image.height !== OG_HEIGHT) {
    throw new Error(`OG image is ${image.width} x ${image.height}, expected ${OG_WIDTH} x ${OG_HEIGHT}`);
  }
  const png = image.asPng();
  if (png.length < 5_000) throw new Error(`OG image for "${title}" is suspiciously small (${png.length} bytes)`);
  return png;
}
