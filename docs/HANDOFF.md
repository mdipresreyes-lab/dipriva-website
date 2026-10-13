# dipriva.com rebuild: handoff and next steps

Updated 2026-10-13 with Manuel's decisions. Branch `redesign` in `mdipresreyes-lab/dipriva-website`, site code in `site/`.

**Bottom line.** The rebuild covers every live URL that other systems depend on, uses the 10 to 500 employee audience, leads the schedule page with the Bookings link, and builds clean (35 pages, 0 brand gate failures). The rest is one Claude Code session (prompt in section 1), your manual steps (section 5), and a same-day cutover (section 6).

---

## 1. Prompt for the next Claude Code session

Start a new Claude Code session on the web (claude.ai/code) with these repositories attached: **mdipresreyes-lab/dipriva-website** (primary), **mdipresreyes-lab/dipriva-social**, **mdipresreyes-lab/dipriva-growth** (read only). Use Sonnet 5.5 or Opus 5.5. Paste everything between the lines.

---

**Persona.** You are the senior engineer and SEO/GEO lead finishing the dipriva.com rebuild for Dipriva Consulting Group (owner: Manuel Diprés). You work carefully across three repositories and never break a live dependency.

**Context.**
- `mdipresreyes-lab/dipriva-website`: work on branch `redesign`. The new Astro 7 site is in `site/`. Blog posts are Markdown in `content/blog/`. The live site is still the React app in `client/`, deployed from `main` to GitHub Pages. Do not change `main` or `client/` except where a task says so.
- `mdipresreyes-lab/dipriva-social`: the social engine. Its `CLAUDE.md` rules apply to all three repos (no em dashes ever, banned terms in `config/brand-rules.json`, formal "usted" Spanish, approved figures only, official APIs only, stage files by explicit path, never edit an approved post package, never weaken verification).
- `mdipresreyes-lab/dipriva-growth`: outreach engine. Read only. The site's `/unsubscribe/` page is a byte copy of `worker/optout/page/index.html`, and the Bookings link comes from `config/outreach.yaml`.
- Read `docs/HANDOFF.md` in dipriva-website first. Sections 2 to 4 record Manuel's decisions, the ripple map and the task list. Section 7 is the SEO and GEO plan.
- Decisions already made by Manuel (do not reopen): audience is companies with 10 to 500 employees, and larger companies are welcome; the micro-multinational post is deleted (done); the other 8 posts stay; the schedule page shows manuel@dipriva.com and the Microsoft Bookings link (done); Microsoft Clarity and Google Ads stay in the privacy policy as "may use" (done); Spanish readers on `/es/` links get Spanish blog posts; Diprivian is named only in `llms.txt` (done), never on a visible page, in hidden HTML or in structured data.

**Task.** Complete tasks T1 to T8 in section 4 of `docs/HANDOFF.md`, in order. Commit after each task. Push to `redesign` (website) and to a `claude/` branch with a pull request (dipriva-social).

**Constraints.**
- Never type the em dash character (code point 2014) anywhere, including commits and comments.
- Website: stage files by explicit path, run `cd site && npm run build` before every push, and keep the brand gate at 0 failures.
- Never change these URLs: `/startup/`, `/strategy/`, `/ai-automation/`, `/schedule/`, `/privacy/`, `/about/manuel-dipres/`, `/unsubscribe/`, `/client_form/`, `/downloads/*`, existing `/blog/<slug>/`.
- Never send QA traffic to the production leads database or the Leads Teams channel. Never touch the Lea chat Worker or admin.dipriva.com.
- Never enter, print or commit a secret. If a step needs one, stop and list it for Manuel.
- Never invent a figure. Every outside figure in a blog post needs a source URL where the exact sentence appears, with publisher, title, publication date and retrieval date. If a figure cannot be sourced, remove the figure or the sentence and list it in the PR body.
- Spanish is professional business Spanish with formal "usted".
- Do not merge `redesign` into `main` and do not deploy production. Cutover is Manuel's call.

**Format.** For each task: one commit (or one PR in dipriva-social) with a clear message. At the end, reply to Manuel with a short table: task, status, evidence (build output, URLs, screenshots), and anything that needs him.

**Steps.**
1. Read `docs/HANDOFF.md`, `site/README.md`, dipriva-social `CLAUDE.md`.
2. Run `cd site && npm ci && npm run build` to confirm a clean start.
3. Do T1 to T8. After each, build, check the output in `site/dist/`, commit, push.
4. Update `docs/HANDOFF.md`: mark finished tasks, add anything new Manuel must decide.

**Validation.**
- `npm run build` passes with 0 brand gate failures and the lead form drift check passing.
- Every page has exactly one H1, a canonical ending in a slash, and an hreflang pair where a translation exists.
- JSON-LD parses on every page. The Rich Results Test shows no errors on one service page, one lead page and one blog post.
- No em dash in any changed file: `grep -rP "\x{2014}"` returns nothing.
- dipriva-social: `npm run typecheck && npm test` pass.

---

## 2. Decisions recorded (2026-10-13)

| # | Decision | Status |
|---|---|---|
| D1 | Audience: companies with **10 to 500 employees**; larger companies welcome | Site done. dipriva-social and outside profiles: T1, M6 |
| D2 | Blog posts that miss the audience: re-checked against 10 to 500. Deleted: *Architect the Micro-Multinational* (written for solo founders). Kept: *Refine Before You Automate* (growing startups; matches the AI tool's message) and the West Michigan manufacturer, grocer and enterprise posts (companies of that size fall inside 10 to 500) | Deletion done on `redesign` with a 301 to the closest post. Rewrite and sourcing: T4 |
| D3 | Privacy policy: keep Microsoft Clarity and Google Ads for future use, worded "may use" | Done in English and Spanish |
| D4 | Schedule page fallback email: manuel@dipriva.com | Done |
| D5 | Add the Microsoft Bookings 30-minute link to the schedule page | Done, as the main option above the form |
| D6 | Spanish blog posts for readers on `/es/` | T5 |
| D7 | Name Diprivian only where AI tools read it and visitors do not | Done: one line in `llms.txt` (not linked from any page). Not in hidden HTML or structured data, see below |
| D8 | Privacy sentences on automated social approval (12-hour veto window) | **Still needs Manuel's yes or no.** Shown with a REVIEW marker on QA only |

**Does keeping Clarity and Google Ads in the policy hurt?** The risk is low, but it is not zero:
- Saying you use a tracker you do not run does not harm visitors, and regulators focus on promises a company breaks. The bigger risk is the opposite case, running a tool the policy does not mention.
- Meta and LinkedIn app reviewers read the policy for accuracy. An extra tool is rarely a problem.
- Applied: both paragraphs now say "may use" (Manuel's decision).
- When you do turn them on, three things must change together: the consent banner must name the tool (`site/src/components/Consent.astro`), the tool must load only after Accept, and Google Ads needs Consent Mode settings in GA4. Without those, the policy and the banner disagree.

**Where Diprivian appears, and why only there.** One sentence in `/llms.txt`, a plain-text file written for AI tools and not linked from any page. It is deliberately not in hidden page text or in structured data: Google's spam policies treat text hidden from visitors as a violation, and its structured data rules require marked-up content to be visible on the page. Either could cost rankings or rich results. The entity layer (T6) and a matching Google Business Profile carry the rest of the disambiguation.

---

## 3. Ripple map: what each change touches

| Change | Touches | Action |
|---|---|---|
| 10 to 500 audience | Site copy, Service schema, llms.txt, founder page, tool FAQs | Done (48 edits) |
| | `dipriva-social/config/brand-rules.json` `firmFigures` still says "10 to 50 person companies", so the gate rejects "500" in a post | T1 |
| | Lead form team-size buckets (1 to 9, 10 to 50, 51 to 500, 500+) | No change. They are answer choices, not a claim, and the Worker validates those exact values |
| | dipriva-growth targeting | Already 10 to 500. No change |
| | Lea's answers (dipriva-chat Worker system prompt may say 10 to 50) | Manuel checks; the Worker is off limits to sessions (M7) |
| | Google Business Profile, LinkedIn About, Facebook and Instagram bios, Claude account skills such as dipriva-brand | Manuel updates (M6) |
| | Downloads (PDF, Word, Excel) | Checked: they do not state the audience size. No change |
| Deleted micro-multinational post | `redesign`: file, OG image, sitemap and llms.txt (generated) | Done. 301 to `/blog/operational-capacity-architecture-decoupling-headcount-b2b-scale/` in `site/scripts/write-edge-files.mjs` |
| | Live site on `main` still serves it, and GitHub Pages cannot redirect | Leave it until cutover; the new host's redirect takes over. Do not delete it on `main` early (it would 404) |
| | LinkedIn Featured or past shares that link to it | Manuel checks the LinkedIn Featured section (M6). The 301 covers old links |
| Bookings link | `/schedule/` | Done |
| | Privacy policy: Bookings collects name, email and phone through Microsoft 365 | T2 drafts one sentence for Manuel's approval |
| | Bookings page settings: it must be public, show a 30-minute meeting type, and send confirmations from manuel@ | Manuel checks once (M6) |
| manuel@ as contact | Schedule page, footer, Lea fallback, schema `contactPoint` | Done. hello@ appears nowhere on the new site |
| Spanish blog | Blog index and post routes, header "Análisis" link, hreflang, sitemap, llms.txt, publishing skill, content gate | T5 |
| Clarity and Ads kept | Consent banner and policy must change together on the day they are enabled | Noted in section 2 |

---

## 4. Task list for the session (T1 to T8)

**T1. dipriva-social: audience figure (PR on a `claude/` branch)**
- In `config/brand-rules.json`, add `{"fact": "10 to 500 employee companies", "figures": ["10", "500"]}`.
- Keep the old "10 to 50" entry until a search of `content/packages` shows no unpublished package uses it (today none does), then remove it.
- Do not touch `lead-form.json`.
- Update any skill or doc in dipriva-social that states the audience.
- Run `npm run typecheck && npm test`. Open the PR with label `hold` so Manuel reviews it; it changes what the gate allows.

**T2. Privacy policy follow-ups (website)**
- Add one sentence on Microsoft Bookings (what it collects, that Microsoft processes it under its own privacy terms), in English and Spanish, with a QA-only REVIEW marker.
- The Clarity and Ads paragraphs already say "may use" (D3). Leave them.
- Do not remove the REVIEW markers on the automated approval sentences until Manuel answers D8.

**T3. Port `/industries/west-michigan/` and `/es/industrias/oeste-de-michigan/`**
- Source: `client/src/pages/IndustriesWestMichigan.tsx` and `scripts/route-meta.mjs` lines 96 to 116. Keep the English URL and title.
- Match `site/src/components/services/ServicePage.astro`. Include:
  - an "In short" answer-first paragraph
  - the problem
  - the 3 service pages
  - who it is for (10 to 500 employees)
  - the 3 client results from `copy.ts` (never framed as West Michigan clients; the approved proof points carry no location)
  - the 3 free tools
  - a local-intent FAQ
  - a CTA to `/schedule/`
- Schema: WebPage, FAQPage and BreadcrumbList. No invented address, phone or coordinates.
- Add a footer link.

**T4. Blog cleanup and content gate**
- Content:
  - Delete the stray `content/blog/.md`.
  - Fix the malformed date in `refine-before-you-automate...md` (`""2026-09-03""` becomes `'2026-09-03'`).
  - Replace the generic ALL CAPS template labels (THE SIGNAL, THE LENS, THE INTERWEAVE, THE DEEPER CONCEPT, THE DEEPER TIP, DIPRIVA ANGLE, DIPRIVA TIPS) with descriptive `##` headings written from each section's content.
  - Expand *Refine Before You Automate* past 1,200 words for companies with 10 to 500 employees, and source or remove each figure ("Over 80% of ... AI initiatives fail" and the "6% of organizations" claim have no source).
  - Keep every slug.
- Schema: in `site/src/content.config.ts`, add optional `seoTitle` (60 characters max), `updated`, `takeaways[]`, `faq[]` and `sources[]` (url, publisher, title, published, retrieved). Also add `lang` (en or es) and `translationOf`. Then switch to zod validation that fails the build on bad frontmatter.
- Gate: add `site/scripts/check-blog.mjs` and run it in `npm run build`. It must fail on:
  - an H1 in the body
  - the generic labels
  - a description outside 120 to 160 characters
  - a keyword missing from the title or description and from the first 100 words
  - no link to a service page and to a lead page
  - a figure with no `sources[]` entry (warn on existing posts, fail on new ones)
- Open a list in the commit body of every figure you removed or could not source.

**T5. Spanish blog**
- Routes:
  - `/es/blog/` index and `/es/blog/<slug-es>/` posts, from Markdown files in `content/blog/es/` with `lang: es` and `translationOf: <english slug>`.
  - Reciprocal hreflang on each pair.
  - The Spanish header "Análisis" link and footer point to `/es/blog/`.
  - The English language switch on a post goes to its translation when one exists, otherwise to `/es/blog/`.
- Content: translate the 8 English posts into professional Spanish with formal usted. Use Spanish slugs, titles and descriptions written for Spanish search (not word-for-word), the same sources, and a Spanish FAQ.
- Gate: the same checks as T4, plus a check that every `translationOf` points to a real English post.
- Update `site/src/pages/llms.txt.ts` with a Spanish insights section.

**T6. Entity layer for branded search ("Dipriva", "Dipriva Consulting", "Dipriva Consulting Group")**
- In `coreGraph()` in `site/src/lib/site.ts`:
  - Add `alternateName: ['Dipriva', 'Dipriva Consulting']`.
  - Add `legalName`, `address`, `sameAs` (LinkedIn company, Facebook Page, Instagram @dipriva_consulting_group, Google Business Profile) and `foundingDate`, only with values Manuel confirms (M6). Use placeholders in a clearly marked TODO list in the PR body, not in the code.
  - Add `alternateName` to the WebSite node.
- Build `/about/` and `/es/nosotros/` as the company page: who, what, for whom (10 to 500 employees), where, languages, founder link. Then change the `/about/` 302 in `site/scripts/write-edge-files.mjs` to serve the page.
- Use one LinkedIn company URL everywhere.
- Do not add Diprivian anywhere except the existing line in `llms.txt`.

**T7. Blog template for SEO and GEO**
- In `site/src/pages/blog/[slug].astro`, render:
  - Key takeaways after the intro
  - a visible FAQ with FAQPage schema
  - a visible Sources list with outbound links and dates, also emitted as `citation`
  - `dateModified` from `updated`
- Generate per-post 1200 x 630 OG images at build time with satori, in navy `#2F4059`, cream `#F5F5DC` and sand `#E8E4D9`; fail the build if generation fails.
- Title tag: `seoTitle ?? title`, plus " | Dipriva" only if the total stays under 60 characters.
- Add Facebook and X share links.
- Rewrite absolute no-slash internal links to the slash form.

**T8. Blog publishing skill**
- Create `.claude/skills/publish-blog/SKILL.md` in dipriva-website. It must:
  - take Manuel's draft (today written outside the repo in a 7-section template)
  - strip Google redirect URLs and `[MANNY: ...]` placeholders, rewrite labels into descriptive H2s, and fill the T4 frontmatter
  - verify every figure by finding the exact sentence on the cited page
  - write the English post and its Spanish translation (T5)
  - run `npm run build` and open a `claude/blog-<slug>` PR, never pushing to `main`
- Delete the stale skills `.claude/skills/dipriva-blog-frontend` and `.claude/skills/dipriva-github-blog-ops`. They describe a Make.com pipeline that stopped on 2026-09-04.

After T8: screenshot every page at 390 px and 1440 px in light and dark, and run Lighthouse mobile on home, one service page, one lead page and one post. Fix anything under 95.

---

## 5. Manual steps for Manuel (do these when you are ready)

Secrets and approvals are yours to enter. Never paste a secret into a chat.

**M1. Cloudflare token for QA deploys**
1. Go to dash.cloudflare.com, then My Profile, API Tokens, Create Token, and pick the template "Edit Cloudflare Workers".
2. Account Resources: your account. Zone Resources: dipriva.com. Create, then copy the token.
3. In GitHub, open dipriva-website, then Settings, Secrets and variables, Actions, New repository secret. Add `CLOUDFLARE_API_TOKEN` with the token.
4. Add a second secret, `CLOUDFLARE_ACCOUNT_ID`. You find the ID in the right sidebar of the dipriva.com overview in Cloudflare.
5. In GitHub, open Actions, then "Deploy QA site", then Run workflow on `redesign`. This creates qa.dipriva.com.

**M2. Lock qa.dipriva.com**
In Cloudflare, open Zero Trust, then Access, Applications, Add, Self-hosted. Set the domain to `qa.dipriva.com` and add an Allow policy for your email.

**M3. Answer D8.** Approve or edit the two privacy sentences on automated social approval, and the Bookings sentence from T2.

**M4. Make.com.** Delete the old blog scenario. Then revoke its GitHub access under GitHub Settings, Applications.

**M5. Protect `main`.** In GitHub, open Settings, Branches, and add a rule for `main` that requires status checks to pass before merging.

**M6. Facts and profiles to match the site**
- Confirm, for T6:
  - your legal name
  - the public address (or service area only)
  - phone, if any
  - founding date
  - your Google Business Profile URL
- Update the audience to 10 to 500 employees in:
  - Google Business Profile
  - LinkedIn About
  - Facebook and Instagram bios
  - your Claude skills that mention the audience
- Check the LinkedIn Featured section for the deleted micro-multinational post.
- Open your Bookings page in a private window and confirm it is public, offers the 30-minute meeting type, and sends confirmations from manuel@.

**M7. Lea.** In the Cloudflare dashboard, check whether the dipriva-chat Worker's instructions say "10 to 50". If they do, change them to 10 to 500 yourself; sessions are not allowed to touch that Worker.

**M8. QA leads Worker (optional).** A QA leads database `dipriva-leads-qa` already exists and is empty (id `1c4d51c9-3ebb-4b55-ae44-beeb66372363`). To test real submissions on QA, ask a session to add a `qa` environment to `dipriva-social/worker/leads/wrangler.jsonc` bound to that database, with `ALLOWED_ORIGINS` set to `https://qa.dipriva.com` and no Teams webhook. Then set the Turnstile secret yourself with `npx wrangler secret put TURNSTILE_SECRET --env qa`, using Cloudflare's public test secret `1x0000000000000000000000000000000AA`.

---

## 6. Cutover checklist (production switch, same day)

Do this only after QA passes. Order matters.

1. Freeze blog pushes to `main` for the day. If any downtime is possible, set `unsubscribe.enabled: false` in dipriva-growth first.
2. Merge `redesign` into `main` through a PR. Replace `deploy-pages.yml` with a production deploy: `PUBLIC_DEPLOY_ENV=production npm run build`, then `wrangler deploy --env production`.
3. In Cloudflare DNS, remove the `www` CNAME to GitHub Pages. The production deploy attaches `www.dipriva.com` to the Worker.
4. **Delete the Transform Rule that sends GPTBot, ClaudeBot and PerplexityBot to `/bot/*`.** If it stays, AI crawlers never see the new pages.
5. **Delete the redirect rule from `/es` to `/`.** The Spanish home now lives at `/es/`.
6. **Delete the redirect rule from `/about` to `/about/manuel-dipres`.** The site's own `_redirects` handles it now. Keep the rule that sends apex `dipriva.com` to `www`, and keep HTTPS forced.
7. Confirm Security, Bots does not block AI crawlers.
8. Smoke test. Each URL must return 200, or one 301 to the slash form with the query string kept:
   - `/strategy?utm_source=linkedin`, `/startup`, `/ai-automation`
   - `/schedule`, `/privacy`, `/about/manuel-dipres`
   - `/unsubscribe/?t=000000000000.00000000000000000000`
   - `/downloads/dipriva-sales-follow-up-kit-en.pdf`
   - all 8 blog posts, plus the deleted post's URL (expect a 301)
   - `/llms.txt`, `/robots.txt`, `/sitemap-index.xml`
9. Submit one real lead on `/strategy/`. Confirm the Teams Leads card arrives and "Sync inbound leads" picks it up in dipriva-admin.
10. In Search Console, submit the new sitemap and request indexing for home, the 3 service pages and the 3 lead pages.
11. Keep GitHub Pages deployable for 7 days. To roll back, re-add the CNAME.

---

## 7. SEO and GEO plan

**Goal.**
- Own "Dipriva", "Dipriva Consulting" and "Dipriva Consulting Group".
- Rank for the three service lines for companies with 10 to 500 employees, in English and Spanish.
- Be cited correctly by Google AI Overviews, ChatGPT, Perplexity and Claude.

**Verified (2026-10-13 audit of the repos and the live site).**
- Live canonicals point to URLs that 301.
- The live sitemap lists 4 of 9 posts.
- AI crawlers are sent to a stale `/bot/` copy of the site.
- Googlebot gets an empty React shell.
- Social posts carry no links, so people type the URL or search "Dipriva".

The rebuild fixes the first four. The fifth makes branded search part of the social funnel.

**Inference (confirm with Search Console data).**
- "Diprivian" likely outranks you because your entity signals are thin: an empty page shell, no `alternateName`, and two different LinkedIn URLs.
- The fix is T6, plus a Google Business Profile and social profiles that match the site word for word.

**Already in the build.**
- Answer-first summaries on the service, tool and founder pages.
- FAQ schema on the tool pages.
- Full static HTML for every crawler.
- llms.txt.
- AI crawlers allowed in production.

**Still to build.**
- T5 (Spanish blog), T6 (entity layer), T7 (takeaways, FAQ and sources on posts).
- Bing Webmaster Tools, whose index feeds ChatGPT search and Copilot.
- 2 to 4 posts a month answering real questions from owners of companies with 10 to 500 employees, each in English and Spanish, with verified and dated sources.

**Monthly measures.**

| Metric | Source | Target 90 days after cutover |
|---|---|---|
| Rank for the three brand queries | Search Console | Position 1 |
| Indexed pages | Search Console | Every sitemap URL |
| Spanish impressions | Search Console, filtered to `/es/` | Growing month over month |
| AI answer to "What is Dipriva Consulting Group?" | ChatGPT, Perplexity, Claude, Google | Correct, and cites dipriva.com |
| Leads by `source` | dipriva-admin | Tracked per platform |

Mechanics documentation, from Google Search Central and llmstxt.org (check current wording before relying on it):
- Site names: https://developers.google.com/search/docs/appearance/site-names
- Organization data: https://developers.google.com/search/docs/appearance/structured-data/organization
- AI features: https://developers.google.com/search/docs/appearance/ai-features
- llms.txt: https://llmstxt.org (no major AI provider has confirmed reading it, so treat it as low cost and unproven)

---

## 8. Parity list (URLs other systems depend on)

| URL | Depends on it | State |
|---|---|---|
| `/strategy`, `/startup`, `/ai-automation` | Social footers, post-verifier, downloads | Built |
| `/schedule` | Downloads print it, every CTA | Built, Bookings added |
| `/about/manuel-dipres` | `proof-points.json` source URL | Built |
| `/privacy` | LinkedIn and Meta app review | Built (D8 pending) |
| `/unsubscribe/?t=` | dipriva-growth emails | Built, byte copy |
| `/client_form` | Client onboarding | Built, noindex |
| `/downloads/*` (12) | Lead form success state | Built |
| `/blog/<slug>` (8, plus 1 redirect) | LinkedIn Featured, past shares | Built |
| `/industries/west-michigan` | Sitemap, local search | T3 |
| `/services/*` (3) | Blog links, home | Built |
