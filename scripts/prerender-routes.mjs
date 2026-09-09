/**
 * Post-build route pre-render.
 * Runs after `vite build`, against the build output directory.
 *
 * Why this exists: GitHub Pages only returns HTTP 200 when a file exists at the
 * requested path. Client-side routes with no file fall through to 404.html —
 * which renders the SPA correctly for humans but responds with a 404 status, so
 * search crawlers refuse to index the page. Writing a real index.html at each
 * route path makes every route a genuine 200.
 *
 * Each emitted file is the built SPA shell with that route's title, description,
 * canonical, Open Graph tags, and JSON-LD substituted into the head, so crawlers
 * get correct metadata before any JavaScript runs. React still boots normally and
 * renders the styled page.
 *
 * Usage: node scripts/prerender-routes.mjs [outDir]   (default: dist/public)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { ROUTE_META, PASSTHROUGH_ROUTES } from './route-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR = path.resolve(ROOT, process.argv[2] ?? path.join('dist', 'public'));

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// ── Frontmatter (mirrors generate-bot-html.mjs) ───────────────────────────────

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
  return { meta, body: match[2] };
}

// ── Head rewriting ────────────────────────────────────────────────────────────

/**
 * Replace the value of a <meta> tag matched by attribute, or append the tag to
 * <head> when the shell does not already carry it.
 */
function setMeta(html, selectorAttr, selectorValue, content) {
  const pattern = new RegExp(
    `(<meta\\s+${selectorAttr}="${selectorValue}"\\s+content=")[^"]*(")`,
    'i'
  );
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeAttr(content)}$2`);
  }
  return html.replace(
    /<\/head>/i,
    `  <meta ${selectorAttr}="${selectorValue}" content="${escapeAttr(content)}" />\n  </head>`
  );
}

function applyMeta(shell, { title, description, canonical, jsonLd, ogImage }) {
  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:url', canonical);

  if (ogImage) {
    html = setMeta(html, 'property', 'og:image', ogImage);
    html = setMeta(html, 'property', 'og:image:url', ogImage);
    html = setMeta(html, 'name', 'twitter:image', ogImage);
    html = setMeta(html, 'name', 'twitter:image:src', ogImage);
  }

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en" href="${escapeAttr(canonical)}" />`
  );

  if (jsonLd) {
    // Replace the shell's organization graph with this route's entity so the
    // page ships exactly one JSON-LD block describing itself.
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
    );
  }

  return html;
}

function writeRoute(route, html) {
  const dir = path.join(OUT_DIR, route.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✓ ${path.posix.join(route, 'index.html')}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

const shellPath = path.join(OUT_DIR, 'index.html');
if (!fs.existsSync(shellPath)) {
  console.error(`\nprerender-routes: no build output at ${shellPath}`);
  console.error('Run `vite build` first.\n');
  process.exit(1);
}
const shell = fs.readFileSync(shellPath, 'utf8');

console.log('\nPre-rendering routes...');

for (const [route, meta] of Object.entries(ROUTE_META)) {
  writeRoute(route, applyMeta(shell, meta));
}

for (const route of PASSTHROUGH_ROUTES) {
  writeRoute(route, shell);
}

// Blog posts — metadata comes from each post's frontmatter.
let postCount = 0;
if (fs.existsSync(BLOG_DIR)) {
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && f !== '.md')
    .map((f) => parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
    .filter((p) => p.meta.published === 'true' && p.meta.slug);

  for (const { meta } of posts) {
    const canonical = `https://www.dipriva.com/blog/${meta.slug}`;
    writeRoute(
      `/blog/${meta.slug}`,
      applyMeta(shell, {
        title: `${meta.title} | Dipriva Insights`,
        description: meta.description,
        canonical,
        ogImage: `https://www.dipriva.com/og/${meta.slug}.png`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.title,
          description: meta.description,
          url: canonical,
          datePublished: meta.date,
          author: { '@type': 'Person', name: meta.author },
          publisher: {
            '@type': 'Organization',
            name: 'Dipriva Consulting Group',
            url: 'https://www.dipriva.com',
          },
          keywords: meta.keyword,
          articleSection: meta.cluster,
          inLanguage: 'en',
        },
      })
    );
    postCount++;
  }
}

const total = Object.keys(ROUTE_META).length + PASSTHROUGH_ROUTES.length + postCount;
console.log(`\nDone — ${total} route(s) pre-rendered into ${path.relative(ROOT, OUT_DIR)}\n`);
