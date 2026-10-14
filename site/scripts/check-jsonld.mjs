// Structural check of the JSON-LD on every built page. Run after a build: npm run check:jsonld
// This is a local stand-in for the required-field rules of Google's Rich Results Test, not the tool itself:
// every block parses, FAQPage and BreadcrumbList and BlogPosting carry their required fields, FAQ text is
// visible on the page, and every @id reference resolves inside the page's own graph.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
const dist = process.argv[2] ?? 'dist';
const files = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = path.join(d, n); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dist);
const problems = []; const stats = { pages: 0, faq: 0, bc: 0, post: 0, nodes: 0 };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
for (const f of files) {
  const route = '/' + path.relative(dist, f).replace(/index\.html$/, '');
  if (route === '/unsubscribe/') continue;
  const html = readFileSync(f, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  stats.pages += 1;
  const add = (m) => problems.push(`${route}: ${m}`);
  if (!blocks.length) { add('no JSON-LD'); continue; }
  const body = text(html);
  for (const b of blocks) {
    let data; try { data = JSON.parse(b); } catch (e) { add('does not parse'); continue; }
    if (data['@context'] !== 'https://schema.org') add('missing @context https://schema.org');
    const nodes = data['@graph'] ?? [data]; stats.nodes += nodes.length;
    const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));
    const refs = []; (function scan(o, key) { if (o && typeof o === 'object') { if (Object.keys(o).length === 1 && o['@id'] && key !== '@graph') refs.push(o['@id']); for (const [k, v] of Object.entries(o)) scan(v, k); } })(nodes);
    for (const n of nodes) {
      if (!n['@type']) add('node without @type');
      if (n['@type'] === 'FAQPage') {
        stats.faq += 1;
        const q = n.mainEntity ?? [];
        if (!q.length) add('FAQPage with no questions');
        for (const item of q) {
          if (item['@type'] !== 'Question' || !item.name || !item.acceptedAnswer?.text) add(`FAQ question incomplete: ${item.name}`);
          else {
            if (!body.includes(item.name.replace(/\s+/g, ' ').trim())) add(`FAQ question not visible on page: ${item.name.slice(0, 50)}`);
            if (!body.includes(item.acceptedAnswer.text.replace(/\s+/g, ' ').trim().slice(0, 60))) add(`FAQ answer not visible on page: ${item.name.slice(0, 40)}`);
          }
        }
      }
      if (n['@type'] === 'BreadcrumbList') {
        stats.bc += 1;
        (n.itemListElement ?? []).forEach((it, i) => {
          if (it.position !== i + 1) add('breadcrumb position out of order');
          if (!it.name || !/^https:\/\/www\.dipriva\.com\//.test(it.item ?? '')) add(`breadcrumb item incomplete: ${it.name}`);
        });
        if (!(n.itemListElement ?? []).length) add('empty BreadcrumbList');
      }
      if (n['@type'] === 'BlogPosting') {
        stats.post += 1;
        for (const k of ['headline', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'description', 'mainEntityOfPage', 'inLanguage']) if (!n[k]) add(`BlogPosting missing ${k}`);
        if ((n.headline ?? '').length > 110) add(`BlogPosting headline is ${n.headline.length} characters (Google suggests 110 or fewer)`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(n.datePublished ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(n.dateModified ?? '')) add('BlogPosting dates are not ISO');
        if (n.dateModified < n.datePublished) add('dateModified before datePublished');
        for (const c of n.citation ?? []) if (!c.name || !/^https:\/\//.test(c.url ?? '') || !c.publisher?.name || !c.datePublished) add(`citation incomplete: ${c.name}`);
      }
    }
    // @id references must resolve inside the same graph, except entities defined by another page (service, tool).
    for (const r of refs) if (!ids.has(r) && !/#(service|tool)$/.test(r)) add(`@id reference not defined on this page: ${r}`);
  }
}
console.log(`${stats.pages} pages, ${stats.nodes} JSON-LD nodes, ${stats.faq} FAQPage, ${stats.bc} BreadcrumbList, ${stats.post} BlogPosting, ${problems.length} problem(s)`);
problems.forEach((p) => console.log(' - ' + p));
process.exitCode = problems.length ? 1 : 0;
