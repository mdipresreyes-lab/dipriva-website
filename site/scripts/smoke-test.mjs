// Smoke test for a deployed copy of the site (QA or production).
//
//   node scripts/smoke-test.mjs https://www.dipriva.com --production --redirects
//   node scripts/smoke-test.mjs http://127.0.0.1:4400
//
// Reads the built pages from dist/ so every page that ships is checked, then
// checks the URLs other systems depend on (social footers, downloads,
// unsubscribe, deleted post). Exit code 1 if anything fails.
//
//   --production   expect indexable pages (QA expects noindex everywhere)
//   --redirects    also check redirect behavior (needs the real host, not a plain static server)
//
// QA sits behind Cloudflare Access, so run it against production, or against a
// local static server of dist/ for the page checks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith('http')) ?? 'http://127.0.0.1:4400').replace(/\/$/, '');
const production = args.includes('--production');
const redirects = args.includes('--redirects');
const CANONICAL_HOST = 'https://www.dipriva.com';
const EM_DASH = String.fromCodePoint(0x2014);

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (!fs.existsSync(dist)) {
  console.error('dist/ not found. Run npm run build first.');
  process.exit(2);
}

// Pages that must stay out of search even in production.
const NOINDEX = new Set(['/client_form/', '/es/formulario-de-cliente/', '/unsubscribe/']);

let failures = 0;
let checks = 0;
const fail = (msg) => {
  failures++;
  console.log(`  FAIL ${msg}`);
};
const ok = () => {
  checks++;
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

const pagePaths = walk(dist)
  .map((f) => '/' + path.relative(dist, path.dirname(f)).split(path.sep).filter(Boolean).join('/'))
  .map((p) => (p === '/' ? '/' : p + '/'))
  .sort();

async function get(url, init = {}) {
  return fetch(url, { redirect: 'manual', ...init });
}

console.log(`Smoke test: ${base} (${production ? 'production' : 'QA'} mode, ${pagePaths.length} built pages)\n`);

// 1. Every built page.
for (const p of pagePaths) {
  const res = await get(base + p);
  if (res.status !== 200) {
    console.log(p);
    fail(`HTTP ${res.status}, expected 200`);
    continue;
  }
  ok();
  const html = await res.text();
  const problems = [];

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (p !== '/unsubscribe/' && canonical !== CANONICAL_HOST + p) problems.push(`canonical is ${canonical ?? 'missing'}`);

  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  const wantIndex = production && !NOINDEX.has(p);
  if (wantIndex && /noindex/.test(robots)) problems.push(`robots is "${robots}", expected indexable`);
  if (!wantIndex && !/noindex/.test(robots)) problems.push(`robots is "${robots}", expected noindex`);

  if (p !== '/unsubscribe/') {
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) problems.push(`${h1s} h1 elements, expected 1`);
  }
  if (html.includes(EM_DASH)) problems.push('contains an em dash');
  if (production && /REVIEW:/.test(html)) problems.push('contains a REVIEW marker');
  if (production && /Not the live site|Design prototype/.test(html)) problems.push('shows the QA banner');

  if (problems.length) {
    console.log(p);
    problems.forEach(fail);
  } else {
    ok();
  }
}

// 2. Files other systems depend on.
console.log('\nDownloads and text files');
const files = [
  'dipriva-90-day-operating-roadmap-en.pdf',
  'dipriva-90-day-operating-roadmap-en.docx',
  'dipriva-90-day-operating-roadmap-es.pdf',
  'dipriva-90-day-operating-roadmap-es.docx',
  'dipriva-sales-follow-up-kit-en.pdf',
  'dipriva-sales-follow-up-kit-es.pdf',
  'dipriva-sales-follow-up-tracker-en.xlsx',
  'dipriva-sales-follow-up-tracker-es.xlsx',
  'dipriva-where-to-automate-first-en.pdf',
  'dipriva-where-to-automate-first-en.xlsx',
  'dipriva-where-to-automate-first-es.pdf',
  'dipriva-where-to-automate-first-es.xlsx',
];
for (const f of files) {
  const res = await get(`${base}/downloads/${f}`);
  const type = res.headers.get('content-type') ?? '';
  if (res.status !== 200 || type.includes('text/html')) fail(`/downloads/${f}: HTTP ${res.status}, ${type}`);
  else ok();
}
for (const f of ['/llms.txt', '/robots.txt', '/sitemap-index.xml']) {
  const res = await get(base + f);
  if (res.status !== 200) fail(`${f}: HTTP ${res.status}`);
  else ok();
}
const robotsTxt = await (await get(base + '/robots.txt')).text();
if (production && /Disallow:\s*\/\s*$/m.test(robotsTxt.split('User-agent: Bytespider')[0])) fail('robots.txt blocks the whole site');
else if (!production && !/Disallow:\s*\/\s*$/m.test(robotsTxt)) fail('QA robots.txt should block everything');
else ok();
const sitemap = await (await get(base + '/sitemap-0.xml')).text();
for (const hidden of ['/client_form/', '/es/formulario-de-cliente/', '/unsubscribe/']) {
  if (sitemap.includes(hidden)) fail(`sitemap lists ${hidden}`);
  else ok();
}
if (sitemap.includes(EM_DASH)) fail('sitemap contains an em dash');

// 3. Redirects (real host only).
if (redirects) {
  console.log('\nRedirects');
  const expect = [
    ['/strategy?utm_source=linkedin', 301, '/strategy/?utm_source=linkedin'],
    ['/startup', 301, '/startup/'],
    ['/ai-automation', 301, '/ai-automation/'],
    ['/schedule', 301, '/schedule/'],
    ['/privacy', 301, '/privacy/'],
    ['/about/manuel-dipres', 301, '/about/manuel-dipres/'],
    ['/blog/architect-the-micro-multinational-scaling-global-enterprise-without-headcount-drag/', 301, '/blog/operational-capacity-architecture-decoupling-headcount-b2b-scale/'],
    ['/unsubscribe/?t=000000000000.00000000000000000000', 200, null],
    ['/es', 301, '/es/'],
    ['/sitemap.xml', 301, '/sitemap-index.xml'],
  ];
  for (const [from, status, to] of expect) {
    const res = await get(base + from);
    const loc = res.headers.get('location') ?? '';
    const locPath = loc.replace(/^https?:\/\/[^/]+/, '');
    if (res.status !== status) fail(`${from}: HTTP ${res.status}, expected ${status}`);
    else if (to && locPath !== to) fail(`${from}: redirects to ${locPath}, expected ${to}`);
    else ok();
  }
}

console.log(`\n${checks} checks passed, ${failures} failed.`);
process.exit(failures ? 1 : 0);
