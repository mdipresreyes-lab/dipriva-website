# dipriva.com rebuild (Astro)

The redesigned site, built as a static Astro project next to the current app. Nothing here
deploys yet: the live site still builds from the repo root on pushes to `main`.

## Run it

```bash
cd site
npm install
npm run build          # QA build: noindex, closed robots.txt, review banner
npm run preview        # serves dist/ at http://localhost:4321
PUBLIC_DEPLOY_ENV=production npm run build   # indexable production build
npm run check:copy     # brand gate: em dashes and banned terms in built pages
```

Node 22.12 or newer.

## What is in it

| Area | Where |
|---|---|
| Copy, English and Spanish (formal usted), approved figures only | `src/lib/copy.ts` |
| Organization, founder and website JSON-LD, URL helpers | `src/lib/site.ts` |
| Palette tokens, light and dark themes, motion primitives | `src/styles/global.css` |
| Homepage sections | `src/components/home/` |
| Hero flow field (canvas, starts after load, pauses offscreen) | `src/scripts/flowfield.ts` |
| Theme toggle, reveal, spotlight, count-up, Lea demo | `src/scripts/core.ts` |
| Blog loader for `../content/blog/*.md` (lenient frontmatter, published gate) | `src/content.config.ts` |
| Blog index and post template (TOC, BlogPosting and breadcrumb schema) | `src/pages/blog/` |
| robots.txt per environment | `src/pages/robots.txt.ts` |

## Rules this build keeps

- One URL form: every canonical, sitemap entry, hreflang and internal link ends in a slash.
- The Make.com pipeline keeps writing to `content/blog/` on `main`; the loader reads it as is.
- Lead magnet URLs (`/startup/`, `/strategy/`, `/ai-automation/`) and `/schedule/` stay where
  social posts link to them.
- No em dashes and no banned terms (`dipriva-social/config/brand-rules.json`).
- Lea always says it is an AI assistant.
