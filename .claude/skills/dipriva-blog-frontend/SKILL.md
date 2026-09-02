---
name: dipriva-blog-frontend
description: Use when building or modifying the public blog section (/blog and /blog/:slug) of the Dipriva Consulting Group website. Covers the content data contract produced by the automated publishing pipeline and the brand/technical constraints the blog UI must respect.
---

# Dipriva Website — Blog Section Build

## Context: why this exists

A separate automation (Make.com, outside this repo) generates blog posts with Claude, gets human approval by email, and commits one Markdown file per post directly to `content/blog/` on the `main` branch of this repo. That automation is already working and already producing real commits. **What does not exist yet is the website code that reads those files and renders them.** Right now `dipriva.com/blog` and every post URL return a real 404 — there is no blog route registered at all.

Your job: build the blog listing page, the individual post page, and the plumbing that turns `content/blog/*.md` into rendered pages, using the existing site's stack and design system. Do not redesign the site. Do not touch anything outside what's needed for the blog.

## Verify before you build (do not assume — this repo's own docs are stale)

1. **Confirm the actual deployment target and build output.** The repo's `DEPLOYMENT.md` says "Manus Hosting" with "a running server," but a commit in the repo's own history ("Move deployment to GitHub Pages, remove Manus runtime") and the repo's GitHub sidebar ("Deployments: github-pages") both say the live site is now static-hosted on GitHub Pages. **Trust `.github/workflows/*.yml`, not `DEPLOYMENT.md`.** Read the actual workflow file to see what command builds the site and what gets published.
2. **Confirm whether this is a pure static SPA in production.** `package.json` shows Express, tRPC, Drizzle ORM, and MySQL2 as dependencies — a real backend. GitHub Pages cannot run any of that; it only serves static files. Determine whether the backend is (a) unused dead code in production, (b) hosted separately from the static frontend, or (c) something else. This matters because if content/blog parsing was ever meant to happen server-side (an API route), it can't work under a static GH Pages deploy — it has to happen at **build time** instead (static generation from the Markdown files, baked into the build output).
3. **Confirm the routing library and route table.** `package.json` lists Wouter (lightweight client-side router), not React Router or Next.js. Find the existing route definitions (likely in `client/`) and add `/blog` and `/blog/:slug` alongside them, using the same patterns already in use for existing routes (`/`, `/schedule`, `/client_form`, `/privacy`).
4. **Check for the GitHub Pages SPA deep-link gotcha.** GitHub Pages serves static files with no server-side rewrites. A client-side router alone means a direct browser hit (or refresh) on `/blog/some-slug` will 404 at the GH Pages level even after the route exists in your code, unless the repo already has the standard `404.html`-redirects-to-`index.html` SPA fallback trick in place. Check for this (look for a `404.html` in the build output / public folder, or a script that generates one) and add it if missing. This may be part of why `/blog` currently 404s even once you add the route — verify it explicitly, don't assume adding the route alone fixes deep links.
5. **Check whether the Actions workflow that deploys the site is path-filtered.** If the workflow only triggers on changes to certain paths, a future commit that only touches `content/blog/*.md` (which is exactly what the automation does) might not trigger a redeploy at all. Confirm `content/blog/**` is included in the trigger paths, or that there's no path filter.

## Data contract: what you're consuming

Every post is one file at `content/blog/<slug>.md`. Frontmatter schema (confirmed from the one real post committed so far):

```yaml
---
title: "Oracle Spent $55.7 Billion on AI and Then Cut Its Workforce"
date: "{{"2026-09-02"}}"
slug: "oracle-ai-capital-allocation-discipline-of-subtraction"
description: "Oracle's $55.7B AI buildout and layoffs reveal a capital trap founders must recognize before it reaches their own balance sheet."
cluster: "Corporate Strategy"
keyword: "strategic decision making for business owners"
author: "Manuel Diprés"
published: true
---
<markdown body>
```

**Known bug you must defend against:** the `date` field as currently produced is malformed — it's literally the string `{{"2026-09-02"}}`, not a plain date. This is a bug in the upstream Make.com automation (being fixed there separately) but it means:
- Your frontmatter parser must not hard-crash on a malformed `date` value. Parse leniently: if `date` doesn't match `YYYY-MM-DD` after stripping stray `{`, `}`, and `"` characters, fall back to the file's git commit date (or just omit the date from display) rather than failing the whole build.
- Once the upstream fix ships, new posts will have a clean `date: "2026-09-02"`. Your parser should handle both the clean and the currently-broken form without needing a code change later — write it to tolerate the malformed case, not to expect it.

Fields and expected types:
- `title` (string, required) — page `<title>` and H1
- `date` (string, ISO `YYYY-MM-DD` when clean — see bug note above)
- `slug` (string, required) — must match the filename; use as the route param and canonical URL
- `description` (string, required) — meta description and card summary
- `cluster` (enum: `Corporate Strategy` | `Startup Operations` | `AI and Automation`) — use as a tag/badge on the card and post page; safe to treat unknown future values as a generic tag rather than erroring
- `keyword` (string) — the target SEO keyword; not necessarily meant for display, but fine to use in meta keywords if the site does that elsewhere
- `author` (string) — byline
- `published` (boolean) — **posts with `published: false` (or missing) must be excluded from the listing page, the sitemap, and should 404 (or redirect) if hit directly.** This is the only draft gate the pipeline has; do not skip it.

Discover posts by globbing `content/blog/*.md` at build time — never hardcode a list of slugs. New posts arrive via git commits from the automation with no code change on your end; the build must pick them up automatically.

## Pages to build

**`/blog` — listing page**
- Card per published post: title, description, formatted date (with the fallback behavior above), cluster badge
- Sort newest first
- Match the existing site's dark-mode luxury B2B aesthetic exactly — reuse existing typography scale, spacing, color tokens, and card/section components already in the codebase rather than inventing new ones. If the site doesn't have a card component yet, base it on the visual style of existing sections.
- Reuse the site's existing header/nav and footer — don't build a separate shell for the blog.

**`/blog/:slug` — post page**
- Render the Markdown body to HTML (add a Markdown renderer — check `package.json` first in case something's already available before adding a new dependency; if adding one, prefer a small well-maintained option and sanitize output)
- H1 from `title`, byline from `author` + formatted `date`, cluster badge
- Set `<title>` and meta description from `title`/`description`; add Open Graph tags (`og:title`, `og:description`, `og:type=article`) since these posts are meant to be shared on LinkedIn (the same pipeline also generates a LinkedIn post for each article)
- 404 (using the site's existing 404 handling) for unknown or unpublished slugs
- "Back to blog" link

**Sitemap / robots**
- If the site already generates a sitemap, include published post URLs in it
- If it doesn't, this is optional for v1 — don't build a sitemap system from scratch just for this

## Non-negotiables (carried over from the automation project — do not violate)

- Never touch `admin.dipriva.com` or the Lea chatbot Cloudflare Worker. Out of scope entirely.
- Match the existing brand/design system exactly. No new fonts, colors, or component patterns.
- Don't introduce a CMS, headless or otherwise. The Markdown-files-in-git approach is intentional — it's what the Make.com automation writes to.

## Validation before calling this done

1. `pnpm build` succeeds with zero new type errors.
2. Local preview: `/blog` lists the real committed post; `/blog/oracle-ai-capital-allocation-discipline-of-subtraction` renders correctly despite the malformed `date` field (should not crash, should look reasonable).
3. Deep-link test: hit `/blog/<slug>` directly (not by clicking through from `/blog`) in the built/previewed output, and hard-refresh on it, to catch the GitHub Pages SPA fallback issue described above.
4. Add one throwaway test post locally with `published: false` and confirm it does not appear on `/blog` and 404s if visited directly. Remove the test file before committing.
5. Confirm a production deploy actually happens after merging (check the Actions run), and that `content/blog/**` changes are included in whatever triggers that workflow.
