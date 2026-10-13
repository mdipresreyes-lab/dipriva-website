/**
 * Brand gate for the built site: fails on em dashes and banned terms in the
 * visible text of every generated page. Blog bodies come from the Make.com
 * pipeline, so their findings are reported as warnings until the pipeline
 * runs the same gate before committing.
 *
 * Banned terms are read from dipriva-social/config/brand-rules.json when that
 * repo sits next to this one, so both engines enforce the same list.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '..', 'dist');
const rulesPath = path.resolve(here, '..', '..', '..', 'dipriva-social', 'config', 'brand-rules.json');

const rules = fs.existsSync(rulesPath) ? JSON.parse(fs.readFileSync(rulesPath, 'utf8')) : { bannedTerms: [] };
const banned = rules.bannedTerms.map((t) => ({ label: t.label, re: new RegExp(`\\b${t.pattern}\\b`, 'i') }));
const EM_DASH = String.fromCodePoint(0x2014);

const pages = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
};
walk(dist);

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');

let errors = 0;
let warnings = 0;
for (const file of pages) {
  const rel = path.relative(dist, file);
  const html = fs.readFileSync(file, 'utf8');
  const isPost = rel.startsWith(`blog${path.sep}`) && rel !== path.join('blog', 'index.html');
  // On posts, only the pipeline-written article body is downgraded to warnings.
  const article = isPost ? (html.match(/<div class="prose-dipriva[^"]*">([\s\S]*?)<\/div>\s*<aside/) ?? [])[1] ?? '' : '';
  const chrome = visibleText(isPost ? html.replace(article, ' ') : html);
  const body = visibleText(article);

  const check = (text, level) => {
    const found = [];
    if (text.includes(EM_DASH)) found.push(`em dash x${text.split(EM_DASH).length - 1}`);
    for (const term of banned) if (term.re.test(text)) found.push(`banned term "${term.label}"`);
    if (found.length) {
      console.log(`${level === 'error' ? 'ERROR' : 'warn '}  ${rel}: ${found.join(', ')}`);
      if (level === 'error') errors += found.length;
      else warnings += found.length;
    }
  };
  check(chrome, 'error');
  if (body) check(body, 'warn');
}

console.log(`\n${pages.length} pages checked: ${errors} errors, ${warnings} pipeline warnings.`);
process.exit(errors ? 1 : 0);
