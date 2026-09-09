/**
 * Build-time OG image generator.
 * Produces a 1200×630 PNG for each published blog post, saved to
 * client/public/og/[slug].png — referenced by generate-bot-html.mjs.
 *
 * Fonts are fetched once from Google Fonts at build time.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const BLOG_DIR  = path.join(ROOT, 'content', 'blog');
const OUT_DIR   = path.join(ROOT, 'client', 'public', 'og');

// ── Brand tokens ──────────────────────────────────────────────────────────────

const CREAM  = '#F5F5DC';
const NAVY   = '#2F4059';
const GOLD   = '#D4AF37';
const MUTED  = 'rgba(47,64,89,0.45)';

// ── Frontmatter parser (shared logic, duplicated to keep scripts self-contained) ──

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^['"]+|['"]+$/g, '');
    meta[key] = val;
  }
  return { meta };
}

// ── Font loader ───────────────────────────────────────────────────────────────

async function fetchFont(family, weight, text) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}&display=swap`;
  const css = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; og-image-generator/1.0)' },
  }).then(r => r.text());

  // Match any src: url(...) — Google may return extension-less query-string URLs
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not find font URL for ${family}:${weight}`);
  const fontData = await fetch(match[1]).then(r => r.arrayBuffer());
  return fontData;
}

// ── Card template ─────────────────────────────────────────────────────────────

function buildCard({ title, cluster, author, date, fonts }) {
  // Wrap long titles: satori handles text wrapping natively via flexbox.
  // We pass the JSX-compatible object tree directly.
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
        background: CREAM,
        padding: '72px 80px',
        fontFamily: '"Playfair Display", serif',
        boxSizing: 'border-box',
      },
      children: [
        // Top: cluster badge
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    border: `1.5px solid ${GOLD}`,
                    borderRadius: '100px',
                    padding: '6px 18px',
                    color: GOLD,
                    fontSize: '13px',
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  },
                  children: cluster || 'Dipriva Insights',
                },
              },
            ],
          },
        },

        // Middle: title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              paddingTop: '36px',
              paddingBottom: '36px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: NAVY,
                    fontSize: title.length > 60 ? '56px' : '64px',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    maxWidth: '900px',
                  },
                  children: title,
                },
              },
            ],
          },
        },

        // Bottom: author · date + wordmark
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            },
            children: [
              // Byline
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: MUTED,
                          fontSize: '18px',
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                        },
                        children: `${author || 'Dipriva'}  ·  ${date || ''}`,
                      },
                    },
                  ],
                },
              },
              // Dipriva wordmark
              {
                type: 'div',
                props: {
                  style: {
                    color: NAVY,
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    opacity: 0.7,
                  },
                  children: 'Dipriva',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

// ── Date formatter ────────────────────────────────────────────────────────────

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Main ──────────────────────────────────────────────────────────────────────

const mdFiles = fs
  .readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.md') && f !== '.md');

const posts = mdFiles
  .map(f => parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
  .filter(p => p.meta.published === 'true' && p.meta.slug);

if (posts.length === 0) {
  console.log('No published posts found — skipping OG image generation.');
  process.exit(0);
}

// Collect all text to subset fonts efficiently (one fetch covers all posts)
const allTitles   = posts.map(p => p.meta.title || '').join('');
const allClusters = posts.map(p => p.meta.cluster || '').join('');
const allAuthors  = posts.map(p => p.meta.author || '').join('');
const allDates    = posts.map(p => formatDate(p.meta.date) || '').join('');
const allText     = allTitles + allClusters + allAuthors + allDates + 'Dipriva Insights · ';

console.log('\nGenerating OG images...');
console.log('  Fetching fonts from Google Fonts...');

let playfairBold, interRegular, interSemiBold;
try {
  [playfairBold, interRegular, interSemiBold] = await Promise.all([
    fetchFont('Playfair Display', 700, allText),
    fetchFont('Inter', 400, allText),
    fetchFont('Inter', 600, allText),
  ]);
} catch (err) {
  console.error('  ✗ Font fetch failed:', err.message);
  console.error('  Skipping OG image generation (no network access?).');
  process.exit(0);
}

const fonts = [
  { name: 'Playfair Display', data: playfairBold,   weight: 700, style: 'normal' },
  { name: 'Inter',            data: interRegular,    weight: 400, style: 'normal' },
  { name: 'Inter',            data: interSemiBold,   weight: 600, style: 'normal' },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const { meta } of posts) {
  const card = buildCard({
    title:   meta.title   || '',
    cluster: meta.cluster || '',
    author:  meta.author  || '',
    date:    formatDate(meta.date),
    fonts,
  });

  const svg = await satori(card, {
    width:  1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png   = resvg.render().asPng();

  const outPath = path.join(OUT_DIR, `${meta.slug}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`  ✓ og/${meta.slug}.png`);
}

console.log(`\nDone — ${posts.length} OG image(s) generated.\n`);
