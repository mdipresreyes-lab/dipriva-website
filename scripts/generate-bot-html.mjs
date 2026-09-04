import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- Parse markdown frontmatter without external deps ---
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: '' };
  const block = match[1];
  const data = {};
  for (const line of block.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    // Strip surrounding quotes and extra double-quotes Manus inserts
    const val = line.slice(colon + 1).trim().replace(/^"+|"+$/g, '').trim();
    data[key] = val;
  }
  return { data, content: raw.slice(match[0].length).trim() };
}

// --- Read English strings from translations.ts via regex (no TS execution) ---
function extractTranslations() {
  const src = fs.readFileSync(
    path.join(root, 'client/src/i18n/translations.ts'),
    'utf-8'
  );

  function pick(key) {
    // Match: key: 'value' or key: "value" (single or double quoted)
    const re = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`);
    const m = src.match(re);
    return m ? m[1] : '';
  }

  return {
    headline:    pick('headline'),
    subheadline: pick('subheadline'),
    services: {
      title:       pick('title'),
      card1Title:  extractBlock(src, 'card1').title,
      card1Desc:   extractBlock(src, 'card1').description,
      card2Title:  extractBlock(src, 'card2').title,
      card2Desc:   extractBlock(src, 'card2').description,
      card3Title:  extractBlock(src, 'card3').title,
      card3Desc:   extractBlock(src, 'card3').description,
    },
    aboutTitle: 'About Dipriva',
    aboutDesc:  extractAbout(src),
  };
}

function extractBlock(src, cardKey) {
  // Find the card block and pull its title and description
  const re = new RegExp(`${cardKey}:\\s*\\{([^}]+)\\}`, 's');
  const m = src.match(re);
  if (!m) return { title: '', description: '' };
  const block = m[1];
  const title = (block.match(/title:\s*['"]([^'"]+)['"]/) || [])[1] || '';
  const description = (block.match(/description:\s*'([^']+)'/) ||
                       block.match(/description:\s*"([^"]+)"/) || [])[1] || '';
  return { title, description };
}

function extractAbout(src) {
  // The about description uses \n inside a single-quoted string
  const re = /about:\s*\{[^}]*description:\s*'([\s\S]*?)'\s*,?\s*\}/;
  const m = src.match(re);
  if (!m) return '';
  // Return just the first paragraph (before first \n\n)
  return m[1].split('\\n\\n')[0].replace(/\\n/g, ' ');
}

// --- Read blog posts ---
function readBlogPosts() {
  const dir = path.join(root, 'content/blog');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== '.md');
  return files
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data } = parseFrontmatter(raw);
      return data;
    })
    .filter(d => d.title && d.published === 'true')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

// --- Read JSON-LD block from client/index.html ---
function extractJsonLd() {
  const src = fs.readFileSync(path.join(root, 'client/index.html'), 'utf-8');
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const m = src.match(re);
  return m ? `<script type="application/ld+json">${m[1]}</script>` : '';
}

// --- Generate HTML ---
function generate() {
  const t = extractTranslations();
  const posts = readBlogPosts();
  const jsonLd = extractJsonLd();

  const serviceItems = [
    { title: t.services.card1Title, desc: t.services.card1Desc },
    { title: t.services.card2Title, desc: t.services.card2Desc },
    { title: t.services.card3Title, desc: t.services.card3Desc },
  ];

  const servicesHtml = serviceItems.map(s =>
    `    <section>
      <h2>${s.title}</h2>
      <p>${s.desc}</p>
    </section>`
  ).join('\n');

  const blogHtml = posts.length
    ? `<ul>\n${posts.map(p =>
        `      <li><strong>${p.date}</strong> — ${p.title}${p.description ? `: ${p.description}` : ''}</li>`
      ).join('\n')}\n    </ul>`
    : '<p>No posts yet.</p>';

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dipriva Consulting Group | Strategic Consulting for Operational Clarity</title>
  <meta name="description" content="Engineering operational clarity for growth-oriented businesses. Strategic consulting, startup operations, and AI-driven automation." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.dipriva.com/" />
  <link rel="alternate" hreflang="en" href="https://www.dipriva.com/" />
  <link rel="alternate" hreflang="es" href="https://www.dipriva.com/es" />
  <link rel="alternate" hreflang="x-default" href="https://www.dipriva.com/" />
  ${jsonLd}
</head>
<body>
  <header>
    <h1>${t.headline}</h1>
    <p>${t.subheadline}</p>
  </header>

  <main>
    <section aria-label="Services">
      <h2>${t.services.title}</h2>
${servicesHtml}
    </section>

    <section aria-label="About">
      <h2>${t.aboutTitle}</h2>
      <p>${t.aboutDesc}</p>
    </section>

    <section aria-label="Insights">
      <h2>Dipriva Insights</h2>
    ${blogHtml}
    </section>
  </main>
</body>
</html>
`;

  const outDir = path.join(root, 'dist/bot-html');
  fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf-8');
  console.log(`[generate-bot-html] ✅ Written: ${outFile}`);
  console.log(`[generate-bot-html]    h1: "${t.headline}"`);
  console.log(`[generate-bot-html]    Services: ${serviceItems.map(s => s.title).join(', ')}`);
  console.log(`[generate-bot-html]    Blog posts indexed: ${posts.length}`);
}

generate();
