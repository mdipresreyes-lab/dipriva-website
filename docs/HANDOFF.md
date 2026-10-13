# dipriva.com rebuild: handoff and next steps

Status as of 2026-10-13. Branch `redesign`, folder `site/`. Written for Manuel and for Claude Sonnet 5.5 sessions (Claude Code or Claude in Chrome) that continue the work.

**Bottom line.** The Astro rebuild now covers every live URL that other systems depend on (lead pages, schedule, privacy, founder page, unsubscribe, downloads), passes the brand gate on 36 pages, and is ready to deploy to qa.dipriva.com as soon as two Cloudflare secrets exist. What remains: 7 decisions only Manuel can make, about 8 Sonnet build tasks, and a cutover checklist with 3 Cloudflare rules that must change the same day.

---

## 1. What is built and verified

| Area | State | Evidence |
|---|---|---|
| Home EN/ES, 3 service pages EN/ES, 2 service hubs | Built | Commits 84b9708 and earlier |
| Lead pages `/startup/`, `/strategy/`, `/ai-automation/` + ES (`/es/hoja-de-ruta-operativa/`, `/es/kit-de-seguimiento-de-ventas/`, `/es/por-donde-automatizar-primero/`) | Built | Payload captured in a browser test and accepted by the real Worker validator (`worker/leads/src/validate.ts`) |
| Form safety on QA | QA builds use the Turnstile test key and post nowhere (dry run) unless `PUBLIC_LEADS_ENDPOINT` points at a QA Worker | Browser test: no request sent, QA notice shown |
| `leadForm.json` drift check | Build fails if it differs from `dipriva-social/config/lead-form.json` or the live copy | `site/scripts/check-lead-form.mjs` |
| `/unsubscribe/` | Byte copy of `dipriva-growth/worker/optout/page/index.html` | `cmp` identical |
| 12 downloads | Copied unchanged to `site/public/downloads/` | |
| Privacy EN/ES, founder page EN/ES (no portrait), schedule EN/ES, client intake EN/ES (noindex) | Built | 74 of 74 privacy strings match live except 2 approval sentences (see decision D1) |
| GA4 `G-GBW7DQ6T7V` behind consent, same storage key, footer link to change the choice | Built, production build only | `site/src/components/Consent.astro` |
| Lea calls `dipriva-chat` Worker on production; QA shows a fixed notice | Built | `site/src/scripts/core.ts` |
| llms.txt generated from site data, robots per environment, sitemap with hreflang, noindex pages excluded | Built | `site/src/pages/llms.txt.ts` |
| QA hosting config | `site/wrangler.jsonc`, `_headers`/`_redirects` generated per environment, GitHub Action `site-qa-deploy.yml` | `wrangler deploy --dry-run` passed |
| QA leads database | Created with the Cloudflare connector: D1 `dipriva-leads-qa` (id `1c4d51c9-3ebb-4b55-ae44-beeb66372363`), schema applied, empty | Production `dipriva-leads` untouched |

Not built yet: `/industries/west-michigan/` (live page, see S2), blog SEO and GEO upgrade (S3 to S5), company About page (S6), per-post OG images (S4).

---

## 2. Decisions only Manuel can make

Answer these in one message to the next session. Each has a recommendation.

| # | Decision | Recommendation | Why it matters |
|---|---|---|---|
| D1 | Privacy policy: approve the two rewritten sentences on social post approval (automated checks, independent AI review, 12-hour veto). Also: remove the Microsoft Clarity and Google Ads remarketing mentions, since neither runs today | Approve both and remove Clarity and Ads | Meta and LinkedIn app reviews read this page. A policy that describes controls you do not run is a misstatement risk |
| D2 | Audience size: site says 10 to 50 people; dipriva-growth targets 10 to 500 | Keep 10 to 50 on the site (it is an approved firm figure). Change growth's targeting or accept the mismatch | Inconsistent entity facts weaken both SEO and sales credibility |
| D3 | Off-audience blog posts: 7 of 9 miss the 10 to 50 person US service business reader (grocery, $25M+ manufacturers, enterprise) | Rewrite the 2 strongest for the target reader, keep 3 as they are, noindex 2 thin ones (under 600 words) | Topical focus is what ranks; off-audience posts also attract off-target leads |
| D4 | Contact email on /schedule fallback: `hello@dipriva.com` or `manuel@dipriva.com` | `manuel@dipriva.com` everywhere, if hello@ is not monitored | One contact point for NAP consistency |
| D5 | Schedule: keep Microsoft Forms only, or add the Microsoft Bookings 30-minute link that outreach emails already use | Add Bookings as the primary button, keep the form below | Removes one step between intent and a booked call |
| D6 | Blog in Spanish: translations of English posts, separate Spanish posts, or English only | English only for now; add Spanish versions of the 2 best posts after launch | Spanish posts are a low-competition opportunity, but each needs real editing |
| D7 | Disambiguation line: allow the site to say "Dipriva Consulting Group is not affiliated with Diprivian" in llms.txt and the About page | Yes, once you confirm there is no relationship | Helps AI engines and Google separate the two entities |

---

## 3. Work queue for Sonnet 5.5 (Claude Code on `redesign`)

Run these in order. Each block is a ready prompt. Every session must follow `CLAUDE.md` in dipriva-social and these site rules: no em dashes (code point 2014), banned terms in `site/config/brand-rules.json`, formal usted in Spanish, approved figures only, stage files by explicit path, commit to `redesign`, run `cd site && npm run build` before pushing.

### S1. Apply Manuel's decisions
- **Persona:** Senior web engineer on the dipriva.com Astro rebuild.
- **Context:** `docs/HANDOFF.md` section 2 lists decisions D1 to D7. Manuel's answers are in the message that starts this session.
- **Task:** Apply each answered decision in code and copy.
- **Constraints:** Change only what each answer requires. D1 lives in `site/src/lib/legal.ts` and `site/src/components/pages/PrivacyPage.astro` (remove the REVIEW markers once approved). D4 in `SchedulePage.astro`. D7 in `site/src/pages/llms.txt.ts`.
- **Format:** One commit per decision.
- **Steps:** Read section 2, apply, build, grep the built HTML for the changed strings.
- **Validation:** `npm run build` passes; brand gate 0 failures; each decision visible in `dist/`.

### S2. Port `/industries/west-michigan/` (EN) and `/es/industrias/oeste-de-michigan/` (ES)
- **Persona:** Bilingual conversion copywriter and Astro developer.
- **Context:** Live source `client/src/pages/IndustriesWestMichigan.tsx`, meta in `scripts/route-meta.mjs` lines 96 to 116. The URL is live and in the sitemap; it supports the Google Business Profile and local searches ("business consultant Grand Rapids", "consultor de negocios en Grand Rapids").
- **Task:** Create `site/src/lib/westMichigan.ts`, `site/src/components/pages/WestMichiganPage.astro` and both route files, matching `ServicePage.astro` structure: breadcrumb, H1, "In short" answer-first paragraph, problem, what Dipriva builds (links to the 3 service pages), who it is for, client results from `copy.ts`, the 3 free tools, a local-intent FAQ, final CTA. Add a footer link.
- **Constraints:** Do not present the 3 client results as West Michigan clients (the approved proof points carry no location). No invented address, phone or coordinates. Keep the English title "West Michigan Business Consulting | Dipriva Consulting Group".
- **Format:** WebPage + FAQPage + BreadcrumbList JSON-LD; `alternate` for both languages.
- **Steps:** Read the live page, write the data file, build the component, add routes, add footer link in `Footer.astro`, build, screenshot.
- **Validation:** One H1 per page, hreflang pair present, JSON-LD parses, brand gate passes.

### S3. Blog content contract and gate
- **Persona:** Technical SEO engineer.
- **Context:** Findings from 2026-10-13: 7 of 9 posts use ALL CAPS template labels as H1s (one renders no headings at all), 0 of 9 have FAQ or outbound source links, 7 of 9 titles exceed 60 characters, 2 have malformed dates (`""2026-09-04""`), a stray `content/blog/.md` exists, dateModified never changes, and 5 of 7 recent posts were pushed to main with no check.
- **Task:** (1) Cleanup PR on `redesign`: delete `content/blog/.md`, fix the 2 dates, replace generic labels (THE SIGNAL, THE LENS, THE INTERWEAVE, THE DEEPER CONCEPT, THE DEEPER TIP, DIPRIVA ANGLE, DIPRIVA TIPS) with descriptive `##` headings written from each section's content. (2) Extend the frontmatter schema in `site/src/content.config.ts` with optional `seoTitle` (60 characters max), `updated`, `sources[]` (url, publisher, title, published, retrieved), `faq[]` (q, a), `image`, `imageAlt`; switch to a zod-validated parse that fails the build on malformed frontmatter. (3) Add `site/scripts/check-blog.mjs`: fail on body H1, generic labels, title or description out of range (description 120 to 160), missing keyword in title or description and first 100 words, no link to a service page and a lead page, a figure with no entry in `sources[]` (warn first, fail after the cleanup). Wire it into `npm run build`.
- **Constraints:** Keep every slug unchanged. Do not change any figure or claim in a post; where a figure has no source, list it in the PR body for Manuel.
- **Format:** Two PRs or two commits: content cleanup, then schema and gate.
- **Steps:** Clean content, build, add schema, add gate, run against all 9 posts, report the list of warnings.
- **Validation:** Build passes; the gate output lists every unsourced figure by file and line.

### S4. Blog template for SEO and GEO
- **Persona:** Front-end engineer focused on answer engines.
- **Context:** `site/src/pages/blog/[slug].astro` and `site/src/pages/blog/index.astro`.
- **Task:** Render (1) a "Key takeaways" box from a new optional `takeaways[]` field (3 bullets, each a self-contained sentence), placed after the intro; (2) a visible FAQ with FAQPage JSON-LD from `faq[]`; (3) a visible Sources list with outbound links and dates from `sources[]`, also emitted as `citation` in BlogPosting; (4) `dateModified` from `updated`; (5) per-post 1200 x 630 OG images generated at build time with satori in the navy, cream and sand palette (port `scripts/generate-og-images.mjs`, no gold `#D4AF37`, fail the build if generation fails); (6) title tag `seoTitle ?? title`, suffix " | Dipriva" only when the total stays under 60 characters; (7) Facebook and X share links next to LinkedIn and email; (8) normalize absolute no-slash internal links in posts to the slash form at render time.
- **Constraints:** No client-side framework. Keep the TOC and cluster CTA.
- **Format:** One commit per numbered item.
- **Validation:** Rich Results Test on a QA URL shows BlogPosting, FAQPage, BreadcrumbList with no errors; Lighthouse SEO 100 on 2 posts.

### S5. Blog publishing skill (replaces the 2 stale skills)
- **Persona:** Claude Code skill author.
- **Context:** Today a Gemini draft (7-section template) arrives outside the repo and a Claude Code session publishes it. Skills `.claude/skills/dipriva-blog-frontend` and `dipriva-github-blog-ops` describe a Make.com pipeline that stopped on 2026-09-04 and are about 70 percent wrong.
- **Task:** Create `.claude/skills/publish-blog/SKILL.md`: take the draft, strip Google redirect URLs and `[MANNY: ...]` placeholders, rewrite generic section labels into descriptive H2s, fit the frontmatter contract from S3, verify every figure by finding the exact sentence on the cited page (same rule as the social engine), add `sources[]`, `faq[]` and `takeaways[]`, run `npm run build`, and open a `claude/blog-<slug>` PR. Delete the 2 stale skills.
- **Constraints:** Never publish a figure without a verified source. Never push to main directly.
- **Validation:** Dry run on the most recent post produces a passing build and a PR body listing each verified source with its quote.

### S6. Company About page and entity layer (branded search)
- **Persona:** Entity SEO specialist.
- **Context:** Goal: own "Dipriva", "Dipriva Consulting", "Dipriva Consulting Group". "Diprivian" currently outranks the brand. Organization data lives in `coreGraph()` in `site/src/lib/site.ts`.
- **Task:** (1) Add `alternateName: ['Dipriva', 'Dipriva Consulting']`, `legalName` (ask Manuel for the exact registered name, for example "Dipriva LLC"), `address` (the business address Manuel confirms for the Google Business Profile: the outreach signature uses 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507), `sameAs` (LinkedIn company, Facebook Page, Instagram, Google Business Profile URL), `foundingDate` only if Manuel confirms it. (2) Add `alternateName` to the WebSite node so Google can show "Dipriva" as the site name. (3) Build `/about/` and `/es/nosotros/` as the company page (who, what, for whom, where, languages, founder link, the disambiguation line from D7), then change the `/about/` redirect in `site/scripts/write-edge-files.mjs`. (4) Make the footer LinkedIn link and `sameAs` use the same company URL.
- **Validation:** Schema validator passes; the name, address and email on the site match the Google Business Profile exactly.

### S7. Visual QA pass on qa.dipriva.com
- **Task:** Screenshot every page at 390 px and 1440 px, light and dark; run Lighthouse mobile on home, one service page, one lead page, one post; fix anything under 95. Check every URL in the parity list below returns 200 or one 301.

### S8. QA leads Worker (only after Manuel completes M5)
- **Task:** In dipriva-social, add a `qa` environment to `worker/leads/wrangler.jsonc` bound to D1 `dipriva-leads-qa` with `ALLOWED_ORIGINS: https://qa.dipriva.com`, no Teams webhook (or a test channel), and the Turnstile test secret. Then set `PUBLIC_LEADS_ENDPOINT` for the QA build in `site-qa-deploy.yml`.
- **Constraints:** Never point QA at the production D1 or the Leads Teams channel. Production `ALLOWED_ORIGINS` stays unchanged.

---

## 4. Tasks for Sonnet 5.5 in Chrome (Claude in Chrome acting in Manuel's browser)

Manuel signs in; Claude in Chrome does the clicking. Each prompt is self-contained.

**C1. Google Search Console.** "Open search.google.com/search-console. If a Domain property for dipriva.com does not exist, add it and show me the TXT record to verify (I will approve the DNS change in Cloudflare). Then: submit https://www.dipriva.com/sitemap-index.xml (after cutover), open Performance, filter queries containing 'dipriva', and export the last 3 months to a sheet. Do not change any other setting."

**C2. Bing Webmaster Tools.** "Open bing.com/webmasters, import dipriva.com from Google Search Console, submit the sitemap, and turn on IndexNow if offered. Bing's index feeds ChatGPT search and Copilot answers."

**C3. Google Business Profile.** "Open business.google.com for Dipriva Consulting Group. Report exactly: business name, category, address or service area, phone, website URL, hours, description. Then, only after I confirm: set the website to https://www.dipriva.com/, set the primary category to 'Business management consultant', add service areas (Grand Rapids, West Michigan, United States as allowed), add the 3 services with the one-sentence summaries from https://www.dipriva.com/services/, and paste the description I approve."

**C4. Cloudflare dashboard audit (read only).** "Open dash.cloudflare.com, zone dipriva.com. List every Redirect Rule, Transform Rule, Page Rule, and the Security > Bots settings, including any 'Block AI bots' or AI Crawl Control setting. Do not change anything. Paste the list."

**C5. LinkedIn company page.** "Open the Dipriva Consulting Group LinkedIn page admin view. Report the public URL (vanity and numeric), tagline and website field. Set website to https://www.dipriva.com/ if different, after I confirm."

---

## 5. Manual steps only Manuel can do

Secrets and approvals must be entered by you. Never paste a secret into a chat.

**M1. Create the Cloudflare API token for QA deploys**
1. dash.cloudflare.com > My Profile > API Tokens > Create Token > template "Edit Cloudflare Workers".
2. Account Resources: your account. Zone Resources: Specific zone, dipriva.com.
3. Create, copy the token once.
4. GitHub > mdipresreyes-lab/dipriva-website > Settings > Secrets and variables > Actions > New repository secret: `CLOUDFLARE_API_TOKEN`, paste.
5. Add a second secret `CLOUDFLARE_ACCOUNT_ID` (Cloudflare dashboard, right sidebar of any zone overview).
6. GitHub > Actions > "Deploy QA site" > Run workflow on `redesign`. qa.dipriva.com is created as a custom domain on the first run.

**M2. Protect qa.dipriva.com (free)**
1. Cloudflare dashboard > Zero Trust > Access > Applications > Add > Self-hosted.
2. Domain `qa.dipriva.com`, policy "Allow", include emails: manuel@dipriva.com (and anyone reviewing).
3. Save. Visitors now sign in with a one-time email code.

**M3. Turnstile hostnames for QA (only if you want real spam checks on QA)**
Cloudflare > Turnstile > the dipriva.com widget > Hostnames > add `qa.dipriva.com`. Optional: QA uses the always-pass test key by default.

**M4. Decide D1 to D7** (section 2) and send the answers to the next session.

**M5. Approve the QA leads Worker plan (S8)** before Sonnet deploys it, because it runs in your Cloudflare account. Then in `dipriva-social/worker/leads`: `npx wrangler secret put TURNSTILE_SECRET --env qa` and enter the test secret `1x0000000000000000000000000000000AA` (Cloudflare's public test secret).

**M6. Confirm business facts for the entity layer (S6):** legal name, the address to show publicly (or service-area only), phone if any, founding date, Google Business Profile URL.

**M7. Make.com:** in Make.com delete the old blog scenario and in GitHub > Settings > Applications revoke its access, so nothing else can write to `main`.

**M8. Protect `main`:** GitHub > Settings > Branches > Add rule for `main`: require status checks (Site CI) before merging. This stops unchecked blog pushes.

---

## 6. Cutover checklist (production switch, same day)

Do this only after QA passes S7. Order matters.

1. Freeze: no blog pushes to main for the day. In dipriva-growth set `unsubscribe.enabled: false` if any downtime is possible.
2. Merge `redesign` into `main` through a PR. Replace `deploy-pages.yml` with a production deploy: `PUBLIC_DEPLOY_ENV=production npm run build` then `wrangler deploy --env production`.
3. In Cloudflare DNS, remove the `www` CNAME to GitHub Pages; the production deploy attaches `www.dipriva.com` as a Worker custom domain.
4. **Delete the Transform Rule that rewrites GPTBot, ClaudeBot and PerplexityBot to `/bot/*`.** If it stays, AI crawlers get redirects instead of the real pages.
5. **Delete the redirect rule `/es` to `/`.** The Spanish home now lives at `/es/`.
6. **Delete the redirect rule `/about` to `/about/manuel-dipres`** (the site's `_redirects` now handles it). Keep apex `dipriva.com` to `www` and keep HTTPS forced.
7. Confirm Security > Bots does not block AI crawlers (C4 output).
8. Smoke test, all must return 200 or one 301 to the slash form, query string kept: `/strategy?utm_source=linkedin`, `/startup`, `/ai-automation`, `/schedule`, `/privacy`, `/about/manuel-dipres`, `/unsubscribe/?t=000000000000.00000000000000000000`, `/downloads/dipriva-sales-follow-up-kit-en.pdf`, all 9 `/blog/<slug>`, `/llms.txt`, `/robots.txt`, `/sitemap-index.xml`.
9. Submit one real lead on `/strategy/` in production; confirm the Teams Leads card and the row in dipriva-admin "Sync inbound leads".
10. Ask the social `post-verifier` to re-check one week-43 package so it fetches the new lead pages.
11. Search Console: submit the new sitemap, request indexing for home, the 3 service pages, the 3 lead pages.
12. Keep GitHub Pages deployable for 7 days as rollback (re-add the CNAME to roll back).

---

## 7. SEO and GEO plan

**Goal:** own the queries "Dipriva", "Dipriva Consulting", "Dipriva Consulting Group", then rank for the 3 service lines for companies with 10 to 50 people, and be cited by Google AI Overviews, ChatGPT, Perplexity and Claude.

**Verified facts (from the 2026-10-13 audit of this repo and the live site):**
- Live canonicals point to URLs that 301 (no trailing slash). Fixed in the rebuild.
- The live sitemap lists 4 of 9 posts and omits /privacy. Fixed: generated at build.
- AI crawlers currently get a separate `/bot/` mirror with stale copy ("five disciplines"); Googlebot gets an empty React shell. Fixed: every page is full static HTML for every crawler.
- Social posts never carry links; people type "dipriva.com/strategy" or search "Dipriva". Branded search is part of the social funnel.

**Inference (not yet measured; confirm with C1 data):**
- "Diprivian" likely wins because Google sees it as an established entity and dipriva.com has thin entity signals (empty SPA shell, no Organization `alternateName`, inconsistent LinkedIn URLs). The entity layer (S6), a matching Google Business Profile (C3), and consistent name, address and website across LinkedIn, Facebook, Instagram and GBP are the levers.

**GEO levers already in the build:** answer-first "In short" summaries on every service, tool and founder page; FAQ sections with FAQPage schema on tool pages; full static HTML; llms.txt; AI crawlers allowed in production robots.txt.

**GEO levers still to build:** key takeaways, sources and FAQ on posts (S4); Bing indexing, which feeds ChatGPT search and Copilot (C2); the disambiguation line (D7); 2 to 4 posts a month aimed at real questions from the target reader, each with verified, dated sources.

**What to measure monthly (Search Console + manual checks):**
| Metric | Baseline | Target at 90 days after cutover |
|---|---|---|
| Rank for "dipriva" / "dipriva consulting" / "dipriva consulting group" | Pull from C1 | Position 1 for all three |
| Branded impressions | Pull from C1 | Up month over month |
| Indexed pages | Pull from C1 | All sitemap URLs indexed |
| AI answer check: ask ChatGPT, Perplexity, Claude and Google "What is Dipriva Consulting Group?" | Record answers | Correct description, cites dipriva.com |
| Lead form submissions with `source` set | dipriva-admin | Tracked per social platform |

Sources for the mechanics named here (Google Search Central and llmstxt.org documentation; verify current wording before relying on it): site names and `alternateName` https://developers.google.com/search/docs/appearance/site-names ; Organization structured data https://developers.google.com/search/docs/appearance/structured-data/organization ; AI features and your website https://developers.google.com/search/docs/appearance/ai-features ; llms.txt proposal https://llmstxt.org . No major AI provider has confirmed that it reads llms.txt, so treat it as low cost and unproven.

---

## 8. Parity list (URLs other systems depend on)

| URL | Depends on it | State in rebuild |
|---|---|---|
| `/strategy`, `/startup`, `/ai-automation` | Social footers, post-verifier, downloads | Built |
| `/schedule` | Downloads print it, every CTA | Built |
| `/about/manuel-dipres` | `proof-points.json` source URL | Built |
| `/privacy` | LinkedIn and Meta app review | Built (D1 pending) |
| `/unsubscribe/?t=` | dipriva-growth emails (CAN-SPAM) | Built, byte copy |
| `/client_form` | Client onboarding emails | Built, noindex |
| `/downloads/*` (12) | Lead form success state | Built |
| `/blog/<slug>` (9) | LinkedIn Featured, past shares | Built |
| `/industries/west-michigan` | Sitemap, local search | Not built (S2) |
| `/services/*` (3) | Blog links, home | Built |
