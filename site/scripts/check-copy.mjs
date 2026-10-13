/**
 * Brand gate. Fails (exit 1) on:
 *   1. any em dash (code point 2014) in a source file: site/src, site/public text
 *      files, site/scripts and content/blog, with file and line;
 *   2. any em dash or banned term in the visible text of a built page in dist/.
 * There is no warning tier: a post with an em dash does not ship.
 *
 * Banned terms come from config/brand-rules.json, a copy of
 * dipriva-social/config/brand-rules.json. When the social repo sits next to
 * this one, drift between the two lists is reported.
 *
 * Usage: node scripts/check-copy.mjs            (sources and dist)
 *        node scripts/check-copy.mjs --sources  (sources only, before a build)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const repo = path.resolve(site, '..');
const dist = path.join(site, 'dist');
const sourcesOnly = process.argv.includes('--sources');

const EM_DASH = String.fromCodePoint(0x2014);
const rules = JSON.parse(fs.readFileSync(path.join(site, 'config', 'brand-rules.json'), 'utf8'));
const banned = rules.bannedTerms.map((t) => ({ label: t.label, re: new RegExp(`\\b${t.pattern}\\b`, 'i') }));

const socialRules = path.resolve(repo, '..', 'dipriva-social', 'config', 'brand-rules.json');
if (fs.existsSync(socialRules)) {
  const theirs = JSON.parse(fs.readFileSync(socialRules, 'utf8')).bannedTerms.map((t) => t.pattern).sort().join('|');
  const ours = rules.bannedTerms.map((t) => t.pattern).sort().join('|');
  if (theirs !== ours) console.log('note: config/brand-rules.json differs from dipriva-social; copy the bannedTerms across.');
}

const TEXT = /\.(astro|ts|tsx|js|mjs|json|md|mdx|css|html|txt|xml|svg)$/i;
const walk = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.astro') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};

const failures = [];

// 1. Sources: every em dash, anywhere, with its location.
const sources = [
  ...walk(path.join(site, 'src')),
  ...walk(path.join(site, 'public')),
  ...walk(path.join(site, 'scripts')),
  ...walk(path.join(site, 'config')),
  ...walk(path.join(repo, 'content', 'blog')),
].filter((f) => TEXT.test(f));
for (const file of sources) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes(EM_DASH)) failures.push(`${path.relative(repo, file)}:${i + 1}: em dash`);
  });
}

// 2. Built pages: em dashes and banned terms in what a visitor reads.
let pages = [];
if (!sourcesOnly) {
  if (!fs.existsSync(dist)) {
    console.error('dist/ not found. Run the build first, or pass --sources.');
    process.exit(1);
  }
  pages = walk(dist).filter((f) => f.endsWith('.html'));
  const visible = (html) =>
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&#x2014;|&#8212;|&mdash;/gi, EM_DASH)
      .replace(/&[a-z#0-9]+;/gi, ' ');
  for (const file of pages) {
    const text = visible(fs.readFileSync(file, 'utf8'));
    const rel = path.relative(dist, file);
    if (text.includes(EM_DASH)) failures.push(`dist/${rel}: em dash x${text.split(EM_DASH).length - 1}`);
    for (const term of banned) if (term.re.test(text)) failures.push(`dist/${rel}: banned term "${term.label}"`);
  }
}

for (const f of failures) console.log(`FAIL  ${f}`);
console.log(
  `\nBrand gate: ${sources.length} source files${sourcesOnly ? '' : ` and ${pages.length} pages`} checked, ${failures.length} failure(s).`,
);
process.exit(failures.length ? 1 : 0);
