// Blog content gate. Runs inside `npm run build`, before Astro. Exit code 1 on any failure.
//
// Reads content/blog/*.md (English) and content/blog/es/*.md (Spanish) and fails on:
//   - an H1 inside the body (the page title is the only H1)
//   - the generic template labels (THE SIGNAL and the rest, English and Spanish)
//   - a description outside 120 to 160 characters
//   - a keyword missing from the title or description, or from the first 100 words
//   - no link to a service page, or none to a lead page (in the post's own language)
//   - a figure (percentage, dollar amount, multiple) with no sources entry
//       warning on the posts listed in scripts/blog-baseline.json, failure on every other post
//   - a Spanish post whose translationOf does not name a real English post
//   - an em dash anywhere in the file
//
// Usage: node scripts/check-blog.mjs [--dir <content/blog path>] [--strict]
//   --strict turns warnings into failures. --dir lets tests point at fixtures.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, '..');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const blogDir = path.resolve(option('--dir') ?? path.join(siteRoot, '..', 'content', 'blog'));
const strict = flag('--strict');

const EM_DASH = String.fromCharCode(0x2014);
const GENERIC_LABELS = {
  en: ['THE SIGNAL', 'THE LENS', 'THE INTERWEAVE', 'THE DEEPER CONCEPT', 'THE DEEPER TIP', 'DIPRIVA ANGLE', 'DIPRIVA TIPS'],
  es: [
    'LA SEÑAL',
    'EL LENTE',
    'LA LENTE',
    'LA INTERCONEXIÓN',
    'EL CONCEPTO PROFUNDO',
    'EL CONSEJO PROFUNDO',
    'EL ENFOQUE DE DIPRIVA',
    'ENFOQUE DIPRIVA',
    'EL ÁNGULO DE DIPRIVA',
    'ÁNGULO DIPRIVA',
    'CONSEJOS DIPRIVA',
    'CONSEJOS DE DIPRIVA',
  ],
};

// Page paths come from the site's own data files so this gate cannot drift from the real URLs.
const servicesSrc = fs.readFileSync(path.join(siteRoot, 'src', 'lib', 'services.ts'), 'utf8');
const magnetsSrc = fs.readFileSync(path.join(siteRoot, 'src', 'lib', 'magnets.ts'), 'utf8');
const serviceSlugs = [...servicesSrc.matchAll(/^\s{6}slug: '([^']+)'/gm)].map((m) => m[1]); // en, es, en, es, en, es
const servicePaths = {
  en: serviceSlugs.filter((_, i) => i % 2 === 0).map((s) => `/services/${s}/`),
  es: serviceSlugs.filter((_, i) => i % 2 === 1).map((s) => `/es/servicios/${s}/`),
};
const leadPaths = { en: [], es: [] };
for (const m of magnetsSrc.matchAll(/^\s{6}path: '(\/[^']+)'/gm)) leadPaths[m[1].startsWith('/es/') ? 'es' : 'en'].push(m[1]);
if (servicePaths.en.length !== 3 || servicePaths.es.length !== 3 || leadPaths.en.length !== 3 || leadPaths.es.length !== 3) {
  console.error(`check-blog: could not read the service and lead page paths (found ${servicePaths.en.length}/${servicePaths.es.length} service, ${leadPaths.en.length}/${leadPaths.es.length} lead).`);
  process.exit(1);
}

const baselinePath = path.join(here, 'blog-baseline.json');
const baseline = new Set(fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')).legacySlugs : []);

// ---------- helpers ----------

function readPosts(dir, lang) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .sort()
    .map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, 'utf8');
      const rel = path.relative(path.join(blogDir, '..'), full).split(path.sep).join('/');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      const post = { file, rel, lang, raw, meta: null, body: '', problems: [] };
      if (!m) {
        post.problems.push({ level: 'fail', msg: 'missing frontmatter block' });
        return post;
      }
      try {
        const meta = parseYaml(m[1]);
        if (!meta || typeof meta !== 'object' || Array.isArray(meta)) throw new Error('frontmatter is not a mapping');
        post.meta = meta;
      } catch (e) {
        post.problems.push({ level: 'fail', msg: `malformed frontmatter: ${String(e.message).split('\n')[0]}` });
      }
      post.body = m[2];
      return post;
    });
}

/** Body text without fenced code. */
const stripFences = (md) => md.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');

const plainText = (md) =>
  stripFences(md)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_`>]/g, '');

const normalizeText = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9$%\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** A keyword phrase matches as whole words, allowing a plural s on the last word. */
const hasPhrase = (haystack, phrase) => {
  const h = ` ${normalizeText(haystack)} `;
  const p = normalizeText(phrase);
  return p.length > 0 && (h.includes(` ${p} `) || h.includes(` ${p}s `) || h.includes(` ${p}es `));
};

const firstWords = (md, n) => plainText(md).split(/\s+/).filter(Boolean).slice(0, n).join(' ');

function linkTargets(md) {
  const out = new Set();
  const add = (u) => {
    let url = u.trim().replace(/^<|>$/g, '');
    url = url.replace(/^https?:\/\/(?:www\.)?dipriva\.com/i, '');
    if (!url.startsWith('/')) return;
    url = url.split('#')[0].split('?')[0];
    if (!url.endsWith('/')) url += '/';
    out.add(url);
  };
  for (const m of md.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) add(m[1]);
  for (const m of md.matchAll(/<(https?:\/\/[^>\s]+)>/g)) add(m[1]);
  for (const m of md.matchAll(/href="([^"]+)"/g)) add(m[1]);
  return out;
}

const NUMBER_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
  thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100,
  // Spanish
  uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, quince: 15, veinte: 20,
  treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100,
};
const SPELLED_PERCENT = new RegExp(
  `\\b((?:${Object.keys(NUMBER_WORDS).join('|')})(?:[-\\s](?:one|two|three|four|five|six|seven|eight|nine|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve))?)\\s+(percent|por ciento)\\b`,
  'gi',
);
const wordNumber = (w) =>
  w
    .toLowerCase()
    .split(/[-\s]+/)
    .reduce((sum, part) => sum + (NUMBER_WORDS[part] ?? 0), 0);

/** A figure is a percentage, a dollar amount or a multiple. Years and plain counts are not figures. */
export function extractFigures(text) {
  const found = [];
  const push = (raw, norm) => found.push({ raw: raw.trim(), norm });
  const clean = (n) => n.replace(/,/g, '');
  for (const m of text.matchAll(/\$\s?(\d(?:[\d,]*\d)?(?:\.\d+)?)(?:\s?(thousand|million|billion|trillion|mil millones|millones|mill[óo]n|mil)\b|([kKmMbB])\b)?/gi)) {
    const word = (m[2] ?? '').toLowerCase();
    const scale = word ? (word === 'mil millones' || word === 'billion' ? 'b' : word === 'trillion' ? 't' : word === 'thousand' || word === 'mil' ? 'k' : 'm') : (m[3] ?? '').toLowerCase();
    push(m[0], `$${clean(m[1])}${scale}`);
  }
  for (const m of text.matchAll(/(\d(?:[\d,]*\d)?(?:\.\d+)?)\s?(%|percent(?:age points?)?\b|per cent\b|por ciento\b|puntos porcentuales\b)/gi)) {
    const unit = /points|puntos/i.test(m[2]) ? 'pts' : '%';
    push(m[0], `${clean(m[1])}${unit}`);
  }
  for (const m of text.matchAll(SPELLED_PERCENT)) {
    const n = wordNumber(m[1]);
    if (n > 0) push(m[0], `${n}%`);
  }
  for (const m of text.matchAll(/\b(\d+(?:\.\d+)?)\s?(?:x|times|veces)\b/gi)) push(m[0], `${m[1]}x`);
  return found;
}

const normalizeFigure = (s) => {
  const f = extractFigures(s);
  return f.length ? f.map((x) => x.norm) : [s.toLowerCase().replace(/[\s,]/g, '')];
};

// ---------- checks ----------

function checkPost(post, englishSlugs, englishPosts) {
  const { meta, body, lang } = post;
  const fail = (msg) => post.problems.push({ level: 'fail', msg });
  const warn = (msg) => post.problems.push({ level: 'warn', msg });
  if (!meta) return;

  if (post.raw.includes(EM_DASH)) fail('contains an em dash (U+2014)');

  const slug = String(meta.slug ?? '');
  const legacy = baseline.has(slug) || (lang === 'es' && baseline.has(String(meta.translationOf ?? '')));
  const figureLevel = legacy ? warn : fail;

  // H1 in the body (fenced code excluded), ATX or setext.
  const bodyNoCode = stripFences(body);
  if (/^#\s+\S/m.test(bodyNoCode) || /^[^\n]+\n=+\s*$/m.test(bodyNoCode)) fail('H1 in the body (the page title is the only H1)');

  // Generic template labels as headings or as bare lines.
  const labels = GENERIC_LABELS[lang];
  const found = new Set();
  for (const line of bodyNoCode.split(/\r?\n/)) {
    const t = line.replace(/^#{1,6}\s*/, '').replace(/[*_]/g, '').replace(/:\s*$/, '').trim().toUpperCase();
    if (labels.includes(t)) found.add(t);
  }
  if (found.size) fail(`generic template label(s): ${[...found].join(', ')}`);

  // Description length.
  const description = String(meta.description ?? '');
  if (description.length < 120 || description.length > 160) fail(`description is ${description.length} characters (needs 120 to 160)`);

  // Keyword in title or description, and in the first 100 words.
  const keyword = String(meta.keyword ?? '');
  if (!keyword) fail('no keyword');
  else {
    if (!hasPhrase(`${meta.title ?? ''} ${description}`, keyword)) fail(`keyword "${keyword}" is not in the title or the description`);
    if (!hasPhrase(firstWords(body, 100), keyword)) fail(`keyword "${keyword}" is not in the first 100 words`);
  }

  // Links to a service page and a lead page.
  const targets = linkTargets(body);
  if (!servicePaths[lang].some((p) => targets.has(p))) fail(`no link to a service page (${servicePaths[lang].join(', ')})`);
  if (!leadPaths[lang].some((p) => targets.has(p))) fail(`no link to a lead page (${leadPaths[lang].join(', ')})`);

  // Figures need a sources entry (or an illustrative marker).
  const sources = Array.isArray(meta.sources) ? meta.sources : [];
  const allowed = new Set();
  for (const s of sources) for (const f of s?.figures ?? []) normalizeFigure(String(f)).forEach((n) => allowed.add(n));
  for (const f of meta.illustrative ?? []) normalizeFigure(String(f)).forEach((n) => allowed.add(n));
  const scan = [
    String(meta.title ?? ''),
    description,
    body,
    ...(Array.isArray(meta.takeaways) ? meta.takeaways : []),
    ...(Array.isArray(meta.faq) ? meta.faq.flatMap((f) => [f?.q ?? '', f?.a ?? '']) : []),
  ].join('\n');
  const used = extractFigures(plainText(scan));
  const unlisted = [...new Map(used.filter((f) => !allowed.has(f.norm)).map((f) => [f.norm, f.raw])).values()];
  if (unlisted.length) figureLevel(`${unlisted.length} figure(s) with no sources entry: ${unlisted.join('; ')}`);
  const usedNorms = new Set(used.map((f) => f.norm));
  for (const s of sources) {
    for (const f of s?.figures ?? []) {
      if (!normalizeFigure(String(f)).some((n) => usedNorms.has(n)) && extractFigures(String(f)).length) figureLevel(`source "${s.publisher}" lists figure "${f}" that is not in the post`);
    }
    if (!s?.quote) figureLevel(`source "${s?.publisher ?? '?'}" has no quote (the exact sentence found on the page)`);
  }
  if (!legacy && used.length && !sources.length) fail('figures present but no sources');

  // Soft checks for GEO.
  if (!Array.isArray(meta.takeaways)) warn('no takeaways (3 sentences)');
  if (!Array.isArray(meta.faq) || !meta.faq.length) warn('no faq');
  if (!meta.updated) warn('no updated date');

  // Language and translation links.
  if ((meta.lang ?? 'en') !== lang) fail(`lang is "${meta.lang ?? 'en'}" but the file sits in the ${lang} folder`);
  if (slug && `${slug}.md` !== post.file) fail(`slug "${slug}" does not match the file name`);
  if (lang === 'es') {
    if (!meta.translationOf) fail('Spanish post without translationOf');
    else if (!englishSlugs.has(String(meta.translationOf))) fail(`translationOf "${meta.translationOf}" is not an English post`);
    else {
      const original = englishPosts.get(String(meta.translationOf))?.meta;
      if (original) {
        if (original.cluster !== meta.cluster) fail(`cluster "${meta.cluster}" differs from the English post ("${original.cluster}"); both languages use the same cluster key`);
        const urls = (list) => new Set((Array.isArray(list) ? list : []).map((x) => x?.url));
        const en = urls(original.sources);
        const es = urls(meta.sources);
        const missing = [...en].filter((u) => !es.has(u));
        const extra = [...es].filter((u) => !en.has(u));
        for (const esSource of Array.isArray(meta.sources) ? meta.sources : []) {
          const enSource = (Array.isArray(original.sources) ? original.sources : []).find((x) => x?.url === esSource?.url && x?.quote === esSource?.quote)
            ?? (Array.isArray(original.sources) ? original.sources : []).find((x) => x?.url === esSource?.url);
          if (!enSource) continue;
          const differs = ['publisher', 'title', 'published', 'retrieved', 'quote'].filter((k) => String(enSource[k]) !== String(esSource[k]));
          if (differs.length) fail(`source ${esSource.url} differs from the English post in: ${differs.join(', ')} (Spanish posts cite the same verified sources, quotes included)`);
        }
        if (missing.length) fail(`sources missing from the English post: ${missing.join(', ')}`);
        if (extra.length) fail(`sources not in the English post (use the same verified sources): ${extra.join(', ')}`);
        if (String(original.date) !== String(meta.date)) warn('date differs from the English post');
      }
    }
  } else if (meta.translationOf) fail('translationOf is for Spanish posts only');
}

// ---------- run ----------

const english = readPosts(blogDir, 'en');
const spanish = readPosts(path.join(blogDir, 'es'), 'es');
const englishSlugs = new Set(english.filter((p) => p.meta?.published !== false).map((p) => String(p.meta?.slug ?? '')));
const all = [...english, ...spanish];

// Duplicate slugs or two Spanish posts for one English post.
const seen = new Map();
for (const p of all) {
  const s = String(p.meta?.slug ?? '');
  if (seen.has(s)) p.problems.push({ level: 'fail', msg: `slug "${s}" is also used by ${seen.get(s)}` });
  else seen.set(s, p.rel);
}
const translated = new Map();
for (const p of spanish) {
  const t = String(p.meta?.translationOf ?? '');
  if (!t) continue;
  if (translated.has(t)) p.problems.push({ level: 'fail', msg: `translationOf "${t}" is also used by ${translated.get(t)}` });
  else translated.set(t, p.rel);
}

const englishPosts = new Map(english.filter((p) => p.meta).map((p) => [String(p.meta.slug ?? ''), p]));
for (const p of all) checkPost(p, englishSlugs, englishPosts);
for (const p of english) {
  const slug = String(p.meta?.slug ?? '');
  if (p.meta && p.meta.published !== false && !translated.has(slug)) p.problems.push({ level: 'warn', msg: 'no Spanish translation in content/blog/es/' });
}

let failures = 0;
let warnings = 0;
for (const p of all) {
  if (!p.problems.length) continue;
  console.log(p.rel);
  for (const pr of p.problems) {
    const level = strict && pr.level === 'warn' ? 'fail' : pr.level;
    if (level === 'fail') failures += 1;
    else warnings += 1;
    console.log(`  ${level === 'fail' ? 'FAIL' : 'warn'}  ${pr.msg}`);
  }
}
console.log(`Blog gate: ${english.length} English and ${spanish.length} Spanish post(s), ${failures} failure(s), ${warnings} warning(s).`);
process.exit(failures ? 1 : 0);
