---
name: publish-blog
description: Turn Manuel's blog draft (written outside the repo in the 7-section template) into a verified English post plus its Spanish translation, run the build and open a claude/blog-<slug> pull request. Use when Manuel pastes or points to a blog draft, types /publish-blog, or says "publish this post", "turn this draft into a blog post" or "post this on the blog".
---

# Publish a blog post

Manuel writes the draft outside the repo. This skill turns it into two Markdown files that pass the blog gate and the site build, then opens a pull request. It never pushes to `main` and never publishes by itself: Manuel merges.

The Make.com pipeline that used to commit posts stopped on 2026-09-04. Nothing else writes to `content/blog/`.

## Rules that never bend

- **No em dash (code point 2014), anywhere.** Not in the post, the frontmatter, the commit message or the PR text. Use a period, comma, colon or parentheses.
- **Never invent a figure, source, quote, date or name.** A figure is a percentage, a dollar amount or a multiple. Every outside figure needs a page where the exact sentence appears. If you cannot verify it, remove the figure or the sentence and say so in the PR.
- **Audience:** owners and executives of companies with 10 to 500 employees. Larger companies are welcome. Never write "10 to 50".
- **Firm figures allowed without a source:** 90-day execution roadmap, 10 to 500 employee companies, 20+ years of experience, 30-minute strategy session. Client results only as approved in `dipriva-social/config/proof-points.json` (insurance agency +$1,000 per-client premiums and 13% renewals, roofing company 20% lead-to-close, tax agency 9 percentage points re-purchase). Nothing else about clients.
- **Voice:** direct, declarative, no hedging, no filler, no emoji. Banned words live in `site/config/brand-rules.json` (leverage, synergy, holistic, empower, journey and others, English and Spanish). The build's brand gate fails on them.
- **Spanish:** professional business Spanish, formal "usted", written for Spanish search. Not a word for word translation.
- **"Diprivian"** never appears in a post, in structured data or in hidden text.
- **Never change an existing slug.** Slugs are permanent URLs.
- **Never push to `main`.** Branch `claude/blog-<slug>`, one pull request.
- **Never enter, print or commit a secret.** Stage files by explicit path, never `git add -A`.
- **Never weaken the gate** (`site/scripts/check-blog.mjs`) or add a new slug to `site/scripts/blog-baseline.json` to make a post pass. The baseline lists the posts that existed on 2026-10-13; a new post must carry its sources.

## Where things live

| What | Where |
|---|---|
| English posts | `content/blog/<slug>.md` |
| Spanish posts | `content/blog/es/<es-slug>.md` (`lang: es`, `translationOf: <English slug>`) |
| Schema (zod, fails the build on bad frontmatter) | `site/src/content.config.ts` |
| Gate (runs in `npm run build`) | `site/scripts/check-blog.mjs` |
| Post template (takeaways, FAQ, sources, share links, OG image) | `site/src/components/blog/BlogPost.astro` |
| Service pages | `/services/corporate-strategy/`, `/services/startup-operations/`, `/services/ai-automation/` and `/es/servicios/estrategia-corporativa/`, `/es/servicios/operaciones-de-startups/`, `/es/servicios/ia-y-automatizacion/` |
| Lead pages | `/strategy/` (Sales Follow-Up Kit), `/startup/` (90-Day Operating Roadmap), `/ai-automation/` (Where to Automate First) and `/es/kit-de-seguimiento-de-ventas/`, `/es/hoja-de-ruta-operativa/`, `/es/por-donde-automatizar-primero/` |

## The draft

Manuel's draft has 7 sections with these labels, as headings or as bare lines: THE SIGNAL, THE LENS, THE INTERWEAVE, THE DEEPER CONCEPT, THE DEEPER TIP, DIPRIVA ANGLE, DIPRIVA TIPS. It may carry Google redirect links and `[MANNY: ...]` notes to himself. If the draft is not in the conversation, ask for the file path or the pasted text. Do not guess.

## Steps

### 1. Read before writing

Read `docs/HANDOFF.md` (open decisions), `site/README.md`, `site/scripts/check-blog.mjs` and one finished post for format: `content/blog/agentic-workflow-governance-autonomous-enterprise-execution.md` and its Spanish translation in `content/blog/es/`.

### 2. Clean the draft

- **Google redirect URLs.** Links such as `https://www.google.com/url?q=<real url>&sa=D&source=...&usg=...` must become the real URL in the `q` parameter, decoded. Drop `sa`, `source`, `usg`, `ust` and `utm_*` parameters. A bare Google search URL is not a source: find the real page. Decode with:

  ```bash
  node -e "const u=new URL(process.argv[1]);console.log(u.searchParams.get('q')||u.href)" "<url>"
  ```

- **`[MANNY: ...]` placeholders.** Each one is a question or instruction from Manuel to himself. Never guess a missing fact, name, number or story. For each one: if the sentence stands without it, remove the placeholder; if the post needs the missing fact, stop and ask Manuel in plain words. List every placeholder you removed in the PR body, with the sentence it sat in.
- Remove any leftover drafting notes, comments and "TODO" lines. Fix straight quotes, double spaces and em dashes (replace with a period, comma or colon).

### 3. Rewrite the section labels into descriptive H2s

The seven labels are generic and the gate fails on them. Replace each with a `##` heading of 4 to 10 words in sentence case, written from what the section actually says:

| Label | What it usually holds | Heading pattern |
|---|---|---|
| THE SIGNAL | what changed in the market or the data | the change and why it matters |
| THE LENS | what it means for owners of 10 to 500 employee companies | who is exposed and where |
| THE INTERWEAVE | how Dipriva's service lines apply | the method or controls |
| THE DEEPER CONCEPT | the principle behind it | the principle, named |
| THE DEEPER TIP | one action for this week | the action, with the time it takes |
| DIPRIVA ANGLE | the contrarian view | the claim, stated plainly |
| DIPRIVA TIPS | the numbered actions | the count and the outcome |

Rules: no `# ` heading in the body (the page title is the only H1). Write a one or two sentence intro before the first `##` that contains the keyword phrase and says what the post covers. Add in-body links to at least one service page and one lead page (relative, ending in a slash), placed where they read naturally.

### 4. Fill the frontmatter

YAML, single quotes, 2-space list indent. Copy the format of the finished example.

| Field | Rule |
|---|---|
| `title` | The headline. Sentence case or title case as the draft has it. |
| `slug` | Lowercase words joined by hyphens, descriptive, 5 to 12 words. Must equal the file name without `.md`. Permanent. |
| `date` | Today, `'YYYY-MM-DD'`. `updated`: today. |
| `seoTitle` | 60 characters at most. Aim for 50 or fewer so " \| Dipriva" fits under 60. |
| `description` | 120 to 160 characters (the gate counts). Says who it is for. |
| `cluster` | One of `'Corporate Strategy'`, `'Startup Operations'`, `'AI and Automation'`. |
| `keyword` | A natural search phrase. It must appear word for word in the title or description AND in the first 100 words of the body. |
| `author` | `'Manuel Diprés'` |
| `published` | `true` (boolean) |
| `takeaways` | Exactly 3 sentences that make sense when quoted alone. Rendered right after the intro. |
| `faq` | 3 or 4 question and answer pairs drawn only from the post. Rendered with FAQPage schema. |
| `sources` | One entry per verified outside source (step 5): `url`, `publisher`, `title`, `published`, `retrieved`, `quote`, `figures`. |
| `illustrative` | Scenario numbers that you or the author made up (see step 5). |

The schema is strict: an unknown key, a bad date or a wrong type stops the build with the file name.

### 5. Verify every figure

For each percentage, dollar amount or multiple in the post (body, takeaways, FAQ):

1. **Find the page.** Use the citation in the draft if there is one. Use WebSearch to find the primary publisher's page. Prefer the report or release itself, then an official statistics page, then a reputable secondary page that names the primary source and states the figure.
2. **Read the page and find the exact sentence.** Fetch it with WebFetch, or with `curl -sSL -A "Mozilla/5.0" "<url>" -o page.html` and then grep the text for the figure. Copy the sentence verbatim into `quote`. A WebFetch summary can paraphrase, so confirm against the raw text. If the page uses an em dash inside the quote, end the quote before the dash.
3. **Match the claim to the page.** Same number, same year or month, same scope (respondents are not organizations; "financial challenges" are not "operational and financial"), same attribution (a Bain figure is not McKinsey's). If the page says something different, rewrite the sentence to what the page says.
4. **Blocked pages.** If a site returns 403, a "Just a moment" page or a captcha, do not try to get around it. Find a readable page that quotes the primary (set `publisher` to say so, for example `'Gartner (press release, reprinted by Channel Drive)'`) and tell Manuel in the PR to swap in the primary link after opening it in a browser. The Wayback Machine is blocked by the network policy; do not route around it.
5. **Cannot verify?** Remove the figure, or the sentence if the figure was all it carried. Never replace it with a different number you did not verify. Do not cite Wikipedia or a vendor blog as the only support.
6. **Name the date.** A survey figure says which survey, month or year in the sentence ("NFIB's June 2026 survey"). A forecast says who made it ("Gartner predicts").
7. **Write the sources entry.** `published` is the page's own date (meta tag, byline or dateline); if the page shows none, use the date in its URL path or the release date and say so in the PR. `retrieved` is today. `figures` lists each figure exactly as it appears in the post (for example `'40 percent'`, `'$1,000'`).
8. **Scenario numbers.** A made-up example ("a $60 million plant", "a $1,500 fee") may stay only if the text says plainly that it is an illustration, not client data and not a statistic. List those figures under `illustrative`.
9. **Copying.** Do not lift a source's sentences. Put the idea in Manuel's voice and name the source where the idea comes from.

Then re-check every quote independently: fetch each source URL again and confirm the `quote` string is on the page. If one is not, fix the entry before you continue.

### 6. Write the English post

Save to `content/blog/<slug>.md`. Keep Manuel's argument and voice. Improve clarity only. Do not add claims. Aim for 1,200 words or more of body text.

### 7. Write the Spanish translation

Save to `content/blog/es/<es-slug>.md`.

- Frontmatter: `lang: es`, `translationOf: '<English slug>'`, the same `date`, `updated`, `cluster` key (English), `author`. A Spanish `title`, `seoTitle`, `description` (120 to 160 characters), `keyword`, `takeaways` and `faq`, written for Spanish search. The Spanish `slug` is ASCII, hyphenated, built from the Spanish search phrase, and differs from the English slug.
- `sources`: the same URLs as the English post, with the same publisher, title, dates and quote (the cited pages are English, so quotes and titles stay English). The `figures` list uses each figure as it appears in the Spanish text. `illustrative` likewise.
- Same sections and facts. Formal "usted". US number style (`$50,000`, `33.9%`, `el 40%`). No new figure, no changed figure.
- Links point to the Spanish service and lead pages. Contact and schedule: `/es/agendar/`.

### 8. Gate and build

```bash
cd site
node scripts/check-blog.mjs      # 0 failures for both posts
npm ci && npm run build          # brand gate 0 failures, lead form check passes, all pages build
```

Check in `site/dist/`: the English and Spanish post pages exist, each has one H1, a canonical ending in a slash, reciprocal hreflang, JSON-LD that parses (BlogPosting with `citation` and `dateModified`, FAQPage, BreadcrumbList), a 1200 x 630 OG image at `dist/og/`, and the Key takeaways, FAQ and Sources sections. Search the changed files for the em dash: `grep -rnP "\x{2014}" content/blog site/src` must return nothing.

If the build fails, fix the cause. Never edit the gate, the schema or the baseline to get green.

### 9. Open the pull request

The pull request goes to the branch that currently builds the Astro site: `redesign` until Manuel cuts over to production, `main` afterward. If unsure, ask. Never push to `main`.

```bash
git checkout -b claude/blog-<slug>
git add content/blog/<slug>.md content/blog/es/<es-slug>.md      # explicit paths only
git commit -m "Add blog post: <title>"                            # add the session's Co-Authored-By line
git push -u origin claude/blog-<slug>
```

Open the pull request with these sections in the body:

1. **What this adds:** both URLs (`/blog/<slug>/` and `/es/blog/<es-slug>/`).
2. **Figures kept:** each figure, its source and the date of the page.
3. **Figures removed or reworded:** every figure you removed, could not verify or changed, and why.
4. **Placeholders removed:** every `[MANNY: ...]` note and the sentence it sat in.
5. **Sources to swap for the primary link:** pages that were blocked, with the primary URL to open in a browser.
6. **Open items for Manuel:** anything you needed and did not have.

End the body with the attribution line your session provides. Do not merge the pull request.

## Done when

- `node scripts/check-blog.mjs` reports 0 failures for both posts, `npm run build` passes, and the em dash search is empty.
- Every figure has a sources entry whose quote you found on the page, or an `illustrative` marker with a label in the text, or it is gone.
- The English post and the Spanish post are both in the pull request, and nothing was pushed to `main`.
