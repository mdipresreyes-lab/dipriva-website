/**
 * Build-time prerender script.
 * Runs after `vite build` to generate static HTML for known AI/search crawlers.
 * Output: dist/bot-html/{index,blog/index,blog/[slug]/index,privacy/index}.html
 *
 * These files are served by the bot-UA middleware in server/_core/vite.ts.
 * Human visitors always receive the normal SPA — nothing here touches dist/public/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT     = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR  = path.join(ROOT, 'dist', 'bot-html');

// ── Frontmatter parser ────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    // Strip any number of surrounding quotes (handles the ""date"" style in the repo)
    const val = line.slice(colon + 1).trim().replace(/^['"]+|['"]+$/g, '');
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

// ── HTML shell ────────────────────────────────────────────────────────────────

function shell({ title, description, canonical, jsonLd, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="https://www.dipriva.com">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:site_name" content="Dipriva Consulting Group">
  <meta property="og:image" content="https://www.dipriva.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="https://www.dipriva.com/og-image.png">
  <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
</head>
<body>
${body}
</body>
</html>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ── Homepage ──────────────────────────────────────────────────────────────────

function generateHome() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: 'Dipriva Consulting Group',
        url: 'https://www.dipriva.com',
        description:
          'Engineering operational clarity for growth-oriented businesses. Strategic consulting, startup operations, and AI-driven automation.',
        founder: { '@type': 'Person', name: 'Manuel Diprés' },
        areaServed: { '@type': 'Place', name: 'West Michigan' },
        serviceType: ['Corporate Strategy', 'Startup Operations', 'AI and Automation'],
        sameAs: 'https://www.linkedin.com/company/dipriva',
        inLanguage: ['en', 'es'],
      },
      {
        '@type': 'WebSite',
        url: 'https://www.dipriva.com',
        name: 'Dipriva Consulting Group',
        inLanguage: ['en', 'es'],
      },
    ],
  };

  const body = `<header>
  <nav aria-label="Main navigation">
    <a href="/">Dipriva Consulting Group</a>
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
    <a href="/blog">Insights</a>
  </nav>
</header>
<main>
  <section id="hero" aria-labelledby="hero-headline">
    <h1 id="hero-headline">Engineering Operational Clarity</h1>
    <p>Precision-built for businesses that operate at the executive level.</p>
    <a href="/schedule">Schedule Strategy Session</a>
  </section>

  <section id="services" aria-labelledby="services-heading">
    <h2 id="services-heading">Strategic Services</h2>
    <p>Tailored consulting for operational excellence</p>
    <ul>
      <li>
        <h3>Corporate Strategy</h3>
        <p>Architect the decisions that determine organizational trajectory. We translate complex business challenges into disciplined strategy, structured execution plans, and measurable outcomes.</p>
      </li>
      <li>
        <h3>Startup Operations</h3>
        <p>Build scalable systems and processes from day one. We help early-stage teams establish operational clarity and the infrastructure to sustain it.</p>
      </li>
      <li>
        <h3>AI and Automation</h3>
        <p>Deploy AI and automation to eliminate operational drag. We identify high-friction workflows, architect the right systems, and implement solutions that reduce manual effort and accelerate execution.</p>
      </li>
    </ul>
  </section>

  <section id="about" aria-labelledby="about-heading">
    <h2 id="about-heading">About Dipriva</h2>
    <p>Dipriva Consulting Group engineers operational clarity for business owners and executives who are scaling faster than their infrastructure can support. We close the gap between strategic intent and operational reality.</p>
    <p>Our engagements span five disciplines: Corporate Strategy, Data Science, Treasury Management, Startup Operations, and Digital Infrastructure. We do not offer generalist consulting. We deliver structured execution across the systems that determine whether a business grows or stalls.</p>
    <p>Founded by Manuel Diprés, Dipriva is built on the principle that operational discipline is not a luxury. It is the precondition for growth. Every engagement produces measurable outputs: structured frameworks, implemented systems, and documented processes that hold.</p>
    <p>We serve growth-oriented businesses in West Michigan and beyond, with bilingual consulting in English and Spanish.</p>
  </section>

  <section id="cta" aria-labelledby="cta-heading">
    <h2 id="cta-heading">Ready to engineer operational clarity?</h2>
    <p>Tell us where the friction is. We will engineer the path forward.</p>
    <a href="/schedule">Schedule a Strategy Session</a>
  </section>
</main>
<footer>
  <p>&copy; 2026 Dipriva Consulting Group. All rights reserved.</p>
  <a href="/privacy">Privacy Policy</a>
</footer>`;

  ensureDir(OUT_DIR);
  fs.writeFileSync(
    path.join(OUT_DIR, 'index.html'),
    shell({
      title: 'Dipriva Consulting Group | Strategic Consulting for Operational Clarity',
      description:
        'Engineering operational clarity for growth-oriented businesses. Strategic consulting, startup operations, and AI-driven automation.',
      canonical: 'https://www.dipriva.com',
      jsonLd,
      body,
    })
  );
  console.log('  ✓ bot-html/index.html');
}

// ── Blog index ────────────────────────────────────────────────────────────────

function generateBlogIndex(posts) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Dipriva Insights',
    description:
      'Perspectives on the decisions that compound — for founders and operators building businesses that last.',
    url: 'https://www.dipriva.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Dipriva Consulting Group',
      url: 'https://www.dipriva.com',
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.meta.title,
      description: p.meta.description,
      url: `https://www.dipriva.com/blog/${p.meta.slug}`,
      author: { '@type': 'Person', name: p.meta.author },
      datePublished: p.meta.date,
      keywords: p.meta.keyword,
    })),
  };

  const articleList = posts
    .map(
      (p) => `  <article>
    <h2><a href="/blog/${p.meta.slug}">${p.meta.title}</a></h2>
    <p><time datetime="${p.meta.date}">${p.meta.date}</time> &middot; ${p.meta.cluster} &middot; By ${p.meta.author}</p>
    <p>${p.meta.description}</p>
    <a href="/blog/${p.meta.slug}">Read article &rarr;</a>
  </article>`
    )
    .join('\n');

  const body = `<header>
  <nav aria-label="Main navigation">
    <a href="/">Dipriva Consulting Group</a>
    <a href="/blog" aria-current="page">Insights</a>
  </nav>
</header>
<main>
  <section aria-labelledby="blog-headline">
    <h1 id="blog-headline">Dipriva Insights</h1>
    <p>Strategy. Capital. Growth.</p>
    <p>Perspectives on the decisions that compound — for founders and operators building businesses that last.</p>
  </section>
  <section aria-label="Articles">
${articleList}
  </section>
</main>
<footer>
  <a href="/">&#8592; Back to Home</a>
  <p>&copy; 2026 Dipriva Consulting Group. All rights reserved.</p>
</footer>`;

  ensureDir(path.join(OUT_DIR, 'blog'));
  fs.writeFileSync(
    path.join(OUT_DIR, 'blog', 'index.html'),
    shell({
      title: 'Dipriva Insights | Strategy. Capital. Growth.',
      description:
        'Perspectives on the decisions that compound — for founders and operators building businesses that last.',
      canonical: 'https://www.dipriva.com/blog',
      jsonLd,
      body,
    })
  );
  console.log('  ✓ bot-html/blog/index.html');
}

// ── Blog posts ────────────────────────────────────────────────────────────────

function generateBlogPost(post) {
  const { meta, body: mdBody } = post;
  const canonical = `https://www.dipriva.com/blog/${meta.slug}`;
  const htmlBody = String(marked.parse(mdBody));

  const jsonLd = {
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
  };

  const body = `<header>
  <nav aria-label="Main navigation">
    <a href="/">Dipriva Consulting Group</a>
    <a href="/blog">&#8592; Back to Insights</a>
  </nav>
</header>
<main>
  <article>
    <header>
      <p>${meta.cluster}</p>
      <h1>${meta.title}</h1>
      <p>${meta.description}</p>
      <p>By ${meta.author} &middot; <time datetime="${meta.date}">${meta.date}</time></p>
    </header>
    <div>
${htmlBody}
    </div>
  </article>
</main>
<footer>
  <a href="/blog">&#8592; Back to Insights</a>
  &nbsp;&middot;&nbsp;
  <a href="/">Home</a>
  <p>&copy; 2026 Dipriva Consulting Group. All rights reserved.</p>
</footer>`;

  ensureDir(path.join(OUT_DIR, 'blog', meta.slug));
  fs.writeFileSync(
    path.join(OUT_DIR, 'blog', meta.slug, 'index.html'),
    shell({
      title: `${meta.title} | Dipriva Insights`,
      description: meta.description,
      canonical,
      jsonLd,
      body,
    })
  );
  console.log(`  ✓ bot-html/blog/${meta.slug}/index.html`);
}

// ── Privacy ───────────────────────────────────────────────────────────────────

function generatePrivacy() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: 'https://www.dipriva.com/privacy',
    isPartOf: { '@type': 'WebSite', url: 'https://www.dipriva.com' },
  };

  const body = `<header>
  <nav aria-label="Main navigation">
    <a href="/">&#8592; Back to Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Privacy Policy</h1>
    <p><em>Last updated: August 2026</em></p>
    <p>Dipriva Consulting Group ("Dipriva", "we", "our") operates the website at dipriva.com. This Privacy Policy describes how we collect, use, and protect information about visitors to our site.</p>
    <h2>Information We Collect</h2>
    <p>We use Google Analytics and Microsoft Clarity to understand how visitors interact with our site. These tools collect anonymized usage data including page views, session duration, and device type. This data is used solely to improve site performance and user experience.</p>
    <h2>Cookies</h2>
    <p>Our site uses cookies for analytics purposes only. You may decline analytics cookies via the consent banner displayed on your first visit. Declining cookies does not affect your ability to use the site.</p>
    <h2>Contact</h2>
    <p>For privacy questions, contact us at <a href="mailto:manuel@dipriva.com">manuel@dipriva.com</a>.</p>
  </article>
</main>
<footer>
  <a href="/">&#8592; Back to Home</a>
  <p>&copy; 2026 Dipriva Consulting Group. All rights reserved.</p>
</footer>`;

  ensureDir(path.join(OUT_DIR, 'privacy'));
  fs.writeFileSync(
    path.join(OUT_DIR, 'privacy', 'index.html'),
    shell({
      title: 'Privacy Policy | Dipriva Consulting Group',
      description: 'How Dipriva Consulting Group collects and protects visitor information.',
      canonical: 'https://www.dipriva.com/privacy',
      jsonLd,
      body,
    })
  );
  console.log('  ✓ bot-html/privacy/index.html');
}

// ── Services: Startup Operations ─────────────────────────────────────────────

function generateStartupOperations() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Startup Operations Consulting | Dipriva Consulting Group</title>
  <meta name="description" content="Dipriva helps founders of 10-50 person professional services firms in West Michigan build the operational structure to step back from day-to-day execution. Bilingual delivery in English and Spanish.">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.dipriva.com/services/startup-operations#service",
    "name": "Startup Operations Consulting",
    "description": "Operational structure and 90-day roadmap for founders of 10-50 person professional services firms in West Michigan.",
    "provider": {
      "@id": "https://www.dipriva.com/#organization"
    },
    "areaServed": {
      "@type": "State",
      "name": "Michigan"
    },
    "availableLanguage": ["English", "Spanish"],
    "serviceType": "Business Operations Consulting"
  }
  </script>
</head>
<body>
  <h1>You Built the Business. Now Build the Operating System.</h1>
  <h2>Everything Runs Through You</h2>
  <p>Most founders of growing professional services firms
  reach the same wall. Revenue is up, the team is
  expanding, and yet every decision, every client issue,
  and every internal process still lands on your desk.
  Stepping back feels impossible because there is no
  structure underneath you to hold it. That is not a
  leadership problem. It is an operations problem.</p>
  <h2>What a Startup Operations Engagement Delivers</h2>
  <p>Dipriva works with founders of 10 to 50 person
  professional services companies in West Michigan to
  build the operational foundation their growth requires.
  Every engagement is delivered in English or Spanish
  and concludes with one primary deliverable: a 90-day
  operational roadmap your team can execute without
  you in the room.</p>
  <h2>Who This Is For</h2>
  <ul>
    <li>Professional services founders in West Michigan
    with 10 to 50 employees</li>
    <li>Companies where growth has outpaced internal
    structure and process</li>
    <li>Founders who need to delegate but have nothing
    documented to delegate to</li>
    <li>Leadership teams preparing for a key hire,
    a funding round, or an ownership transition</li>
  </ul>
  <h2>Ready to Step Back?</h2>
  <p>If your business depends entirely on you to
  function, that is the problem we solve. Start
  with a conversation.</p>
  <a href="/schedule">Schedule a Consultation</a>
</body>
</html>`;

  const outDir = path.join(OUT_DIR, 'services', 'startup-operations');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log('  ✓ bot-html/services/startup-operations/index.html');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const mdFiles = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.md') && f !== '.md');

const posts = mdFiles
  .map((f) => parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
  .filter((p) => p.meta.published === 'true' && p.meta.slug);

console.log('\nGenerating bot HTML...');
generateHome();
generateBlogIndex(posts);
posts.forEach(generateBlogPost);
generatePrivacy();
generateStartupOperations();
console.log(`\nDone — ${posts.length} blog post(s) + home + blog index + privacy + startup-operations\n`);
