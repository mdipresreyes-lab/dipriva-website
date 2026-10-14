# dipriva.com rebuild: handoff and next steps

Updated 2026-10-13, end of the completion session (tasks T1 to T8). Branch `redesign` in `mdipresreyes-lab/dipriva-website`, site code in `site/`.

**Bottom line.** The rebuild is complete and ready for QA. It builds 48 pages (home, services, lead pages, privacy, founder, company, West Michigan, schedule, client intake, unsubscribe, 12 downloads, 8 English and 8 Spanish blog posts) with 0 brand gate failures, a blog content gate that passes, and reciprocal English and Spanish hreflang. It does not deploy anywhere on its own. What it needs from Manuel is in section 5 (sign-offs, values, links) and the cutover in section 6.

**What needs Manuel first (details in section 5).**
1. Review dipriva-social pull request 13 (label `hold`): it changes what the content gate allows.
2. ~~Answer D8 and approve the Bookings privacy sentence~~ Done 2026-10-13. Markers removed.
3. Send the company facts the schema leaves out: legal name, address, phone, founding date, Facebook, Instagram and Google Business Profile URLs, and which LinkedIn company URL is canonical (M6).
4. Open the primary pages behind the blog sources that were blocked here and swap the links (M10).
5. Confirm the judgment calls and the Spanish terms in the posts (M11, M12).
6. Cloudflare token, QA lock and the cutover steps (M1, M2, section 6).

---

## 1. What the completion session did

| Task | State | Commit | Evidence |
|---|---|---|---|
| T1 dipriva-social audience figure | Done, pull request 13, label `hold` | `d78024b` on `claude/dipriva-rebuild-completion-zgul1c` | `npm run typecheck`, `npm test` (134 pass) and `npm run gate:all` (27 packages) pass. No unpublished package used "10 to 50", so the old entry was removed |
| T2 Bookings sentence | Done, REVIEW marker in QA builds only | `ea9300a` | Marker present in the QA build of `/privacy/` and `/es/privacidad/`, absent from the production build |
| T3 West Michigan page | Done | `45df05d` | `/industries/west-michigan/`, `/es/industrias/oeste-de-michigan/`, footer link, WebPage, FAQPage and BreadcrumbList |
| T4 Blog cleanup and gate | Done | `8a90597` | 8 posts relabeled and sourced, strict schema, `site/scripts/check-blog.mjs` in `npm run build` |
| T5 Spanish blog | Done | `2d1fa45` | `/es/blog/` and 8 Spanish posts, hreflang pairs, Spanish `llms.txt` section |
| T6 Entity layer | Done | `a763fc1` | `alternateName` on Organization and WebSite, `/about/` and `/es/nosotros/` |
| T7 Blog template | Done | `3df1730` | Takeaways, FAQ, Sources, `citation`, `dateModified`, 16 satori OG images, share links |
| T8 Publishing skill | Done | `23be25c` | `.claude/skills/publish-blog/SKILL.md`; two stale skills deleted |

**Checks run on the final build.**
- `cd site && npm run build`: brand gate 0 failures, lead form check passes, blog gate 0 failures and 0 warnings (8 English, 8 Spanish).
- Every page (48 pages, `/unsubscribe/` excepted) has exactly one H1, a canonical ending in a slash and JSON-LD that parses. Every English and Spanish pair points at each other. `/unsubscribe/` is a byte copy of the dipriva-growth page and keeps its own markup.
- Structural JSON-LD check (`npm run check:jsonld`): 265 nodes, 26 FAQPage, 42 BreadcrumbList, 16 BlogPosting, 0 problems. **Google's Rich Results Test was not run**: it is an interactive web tool that this environment cannot drive. To run it, open https://search.google.com/test/rich-results, choose the Code tab and paste the built HTML of one service page, one lead page and one post from `site/dist/`.
- Every source quote in the 16 posts (76 entries) was fetched again and found verbatim on its page.
- No em dash in any changed file in this repo or in dipriva-social (58 files and every commit message, checked with a script that compares the character U+2014; `grep -P` with `\x{2014}` errors in some locales and then proves nothing).
- Screenshots of every page at 390 and 1440 px in light and dark mode, and Lighthouse mobile on five pages: results below.

**Where the session stopped on its own.**
- Pages that block automated fetching (Gartner, McKinsey, BLS, NFIB, BCG, SBA, ASQ) were not read directly and no workaround was tried. Figures from them are cited through a readable page that quotes them, or were removed. See M10.
- `web.archive.org` is blocked by the network policy and was not used.
- No secret was entered, printed or committed. No Cloudflare setting, Worker, `main` or production deploy was touched.

**Screenshots.** 192 captures (48 pages, 390 and 1440 px wide, light and dark) taken from the QA build with a headless browser. After one fix, none of them scrolls sideways. The set sits in the session's scratchpad and is not committed (about 230 MB). To regenerate it: `cd site && npm run build && npm run preview`, then open each page at both widths.

**Lighthouse, mobile** (Lighthouse 12.8 defaults: Moto G emulation, simulated slow 4G and 4x CPU slowdown, against the production build served locally; lab numbers, not field data).

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home (`/`) | 100 | 100 | 100 | 100 |
| Spanish home (`/es/`) | 100 | 100 | 100 | 100 |
| Service page (`/services/corporate-strategy/`) | 100 | 100 | 100 | 100 |
| Lead page (`/strategy/`) | 100 | 100 | 100 | 100 |
| Blog post (`/blog/where-should-a-20-person-firm-use-ai-first/`) | 100 | 100 | 100 | 100 |

**Fixed during the final pass.**
- Home scored 87 on performance: the hero canvas animation cost 470 ms of blocking time (with the canvas disabled the score was 100). On phones and touch screens the field is now drawn once in small slices and animates after the first touch or scroll; desktops keep the always-on animation. The fix is in `site/src/scripts/flowfield.ts`.
- The privacy page scrolled sideways by 16 px on phones because of a long URL used as link text. Prose links now wrap (`site/src/styles/global.css`).
- Blog source links use the final address of each cited page instead of redirecting forms such as `?p=284364`; all 76 quotes were checked again after the change.
- `npm run check:jsonld` is new: the structural JSON-LD check described above.

---

## 2. Decisions recorded (2026-10-13)

| # | Decision | Status |
|---|---|---|
| D1 | Audience: companies with **10 to 500 employees**; larger companies welcome | Site done. dipriva-social: pull request 13 (hold), see M9. Outside profiles: M6 |
| D2 | Blog posts that miss the audience: re-checked against 10 to 500. Deleted: *Architect the Micro-Multinational* (written for solo founders). Kept: *Refine Before You Automate* (growing startups; matches the AI tool's message) and the West Michigan manufacturer, grocer and enterprise posts (companies of that size fall inside 10 to 500) | Deletion done on `redesign` with a 301 to the closest post. Rewrite and sourcing: done in T4 |
| D3 | Privacy policy: keep Microsoft Clarity and Google Ads for future use, worded "may use" | Done in English and Spanish |
| D4 | Schedule page fallback email: manuel@dipriva.com | Done |
| D5 | Add the Microsoft Bookings 30-minute link to the schedule page | Done, as the main option above the form |
| D6 | Spanish blog posts for readers on `/es/` | Done (T5): 8 Spanish posts, `/es/blog/` |
| D7 | Name Diprivian only in low-visibility places that AI tools and search engines read | Done: one line in `llms.txt` and an identity note on `/privacy/` and `/es/privacidad/`. Not in hidden HTML or structured data, see below |
| D8 | Privacy sentences on automated social approval (12-hour veto window) and the Bookings sentence | **Approved by Manuel 2026-10-13.** REVIEW markers removed |

**Does keeping Clarity and Google Ads in the policy hurt?** The risk is low, but it is not zero:
- Saying you use a tracker you do not run does not harm visitors, and regulators focus on promises a company breaks. The bigger risk is the opposite case, running a tool the policy does not mention.
- Meta and LinkedIn app reviewers read the policy for accuracy. An extra tool is rarely a problem.
- Applied: both paragraphs now say "may use" (Manuel's decision).
- When you do turn them on, three things must change together: the consent banner must name the tool (`site/src/components/Consent.astro`), the tool must load only after Accept, and Google Ads needs Consent Mode settings in GA4. Without those, the policy and the banner disagree.

**Where Diprivian appears, and why only there.** (1) One sentence in `/llms.txt`, a plain-text file for AI tools that no page links to. (2) An identity note under the privacy policy intro, in English and Spanish: it says which firm the policy covers, that Dipriva has no affiliation with Diprivian or any similarly named company, and that information shared with Dipriva is never shared with them. On a privacy page that statement has a real purpose (who handles your data), so it reads as normal policy text, and few visitors read that page. Because it is visible text, search engines and AI crawlers can use it without risk. It is deliberately not in hidden page text or structured data: Google's spam policies treat text hidden from visitors as a violation, and its structured data rules require marked-up content to be visible.

---

## 3. Ripple map: what each change touches

| Change | Touches | Action |
|---|---|---|
| 10 to 500 audience | Site copy, Service schema, llms.txt, founder page, tool FAQs | Done (48 edits) |
| | `dipriva-social/config/brand-rules.json` `firmFigures` still says "10 to 50 person companies", so the gate rejects "500" in a post | Fixed in pull request 13 (hold); takes effect when Manuel merges it |
| | Lead form team-size buckets (1 to 9, 10 to 50, 51 to 500, 500+) | No change. They are answer choices, not a claim, and the Worker validates those exact values |
| | dipriva-growth targeting | Already 10 to 500. No change |
| | Lea's answers (dipriva-chat Worker system prompt may say 10 to 50) | Manuel checks; the Worker is off limits to sessions (M7) |
| | Google Business Profile, LinkedIn About, Facebook and Instagram bios, Claude account skills such as dipriva-brand | Manuel updates (M6) |
| | Downloads (PDF, Word, Excel) | Checked: they do not state the audience size. No change |
| Deleted micro-multinational post | `redesign`: file, OG image, sitemap and llms.txt (generated) | Done. 301 to `/blog/operational-capacity-architecture-decoupling-headcount-b2b-scale/` in `site/scripts/write-edge-files.mjs` |
| | Live site on `main` still serves it, and GitHub Pages cannot redirect | Leave it until cutover; the new host's redirect takes over. Do not delete it on `main` early (it would 404) |
| | LinkedIn Featured or past shares that link to it | Manuel checks the LinkedIn Featured section (M6). The 301 covers old links |
| Bookings link | `/schedule/` | Done |
| | Privacy policy: Bookings collects name, email and phone through Microsoft 365 | Drafted (T2) with a REVIEW marker on QA builds; waits for Manuel (M3) |
| | Bookings page settings: it must be public, show a 30-minute meeting type, and send confirmations from manuel@ | Manuel checks once (M6) |
| manuel@ as contact | Schedule page, footer, Lea fallback, schema `contactPoint` | Done. hello@ appears nowhere on the new site |
| Spanish blog | Blog index and post routes, header "Análisis" link, hreflang, sitemap, llms.txt, publishing skill, content gate | Done (T5, T7, T8) |
| Clarity and Ads kept | Consent banner and policy must change together on the day they are enabled | Noted in section 2 |

---

## 4. Task list T1 to T8: done, with the deviations

**T1. dipriva-social audience figure.** Done. `firmFigures` now carries `10 to 500 employee companies` and no longer carries the 10 to 50 entry. `config/lead-form.json` untouched. No skill or doc in dipriva-social states the audience size, so nothing else changed. `CLAUDE.md` there still says "58 tests"; the suite has 134.

**T2. Privacy follow-up.** Done. One Bookings paragraph in "Information We Collect", English and Spanish, with a REVIEW marker. New optional `review` field on a paragraph in `site/src/lib/legal.ts`. Nothing else in the policy changed.

**T3. West Michigan page.** Done at the exact URL and title. Deviations: the footer link is added in `copy.ts`, which Footer.astro renders; the live page's Service schema with Grand Rapids is not carried over because the new site states no city; WebPage carries `contentLocation` as a Place with a name only. The three client results appear with a line saying they are not tied to a location.

**T4. Blog cleanup and gate.** Done. Deviations: (1) the schema has two extra optional fields, `illustrative` (scenario numbers the author made up) and, inside `sources`, `quote` and `figures`, so the gate can match each figure to a source; (2) `site/scripts/blog-baseline.json` lists the 8 posts that existed on 2026-10-13, whose unsourced figures only warn (none remain), while any other post fails; (3) `yaml` is now an explicit dependency. The blog gate also checks the Spanish posts. See `site/scripts/check-blog.mjs` for every rule.

**T5. Spanish blog.** Done. Spanish posts share the English `cluster` key and cite the same sources, quotes included; the gate enforces it. The two AI governance posts use different Spanish keywords so they do not compete. The sitemap lists each page but does not repeat the hreflang pairs; the pairs are in each page's `<head>`, which Google reads.

**T6. Entity layer.** Done. Confirmed by Manuel 2026-10-13 and live in `coreGraph()` and the footer: `legalName` Dipriva LLC (also shown in the footer and the privacy identity note), address 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507 (exactly as on the Google Business Profile), `foundingDate` 2019 (structured data only), and `sameAs` for LinkedIn, Instagram, Facebook and the Google Business Profile Maps link. No telephone: Manuel has no public number, which is fine because `contactPoint` carries the email. Both `_redirects` lines for `/about` were removed, so `/about` and `/about/` cannot show different pages. Manuel is handling this (2026-10-13). Michigan records show Dipriva LLC only, and the brand "Dipriva Consulting Group" is not registered. A Michigan LLC that operates under another name files a Certificate of Assumed Name (form CSCL/CD 541) with LARA Corporations Division. Verify the form and fee on michigan.gov before filing. Contracts built by the MSA, NDA and SOW skills should then name "Dipriva LLC d/b/a Dipriva Consulting Group".

**T7. Blog template.** Done. Deviation: Astro 7 renders Markdown with a new processor that no longer runs rehype plugins without an extra package, so the trailing slash rule for internal links runs on the rendered HTML in the content loader (`site/src/lib/internalLinks.mjs`). The OG endpoint throws on failure and fails the build (tested by removing a font file).

**T8. Publishing skill.** Done. The base branch for blog pull requests is `redesign` until cutover and `main` afterward.

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

**M3. Answer D8.** Done 2026-10-13. Approved as written; markers removed.

**M4. Make.com.** Done 2026-10-13: scenarios deleted, no Make or Integromat OAuth app or installed app on GitHub, and the token "Dipriva Blog Engine - Make.com" deleted.

**M5. Protect `main` (dipriva-website only, after the cutover merge).** Do this after `redesign` is merged into `main`, because the check does not exist on `main` before that. In GitHub, open dipriva-website, then Settings, Branches, Add branch ruleset (or classic rule) for `main`, tick "Require status checks to pass before merging", and select the check named `build` (workflow "Site build and brand gate"). Leave "Require branches to be up to date" off. Do not add this rule to dipriva-social: its auto-verified pull requests auto-merge, and a required review would stop them.

**M6. Facts and profiles to match the site**
- Confirm, for T6:
  - your legal name
  - the public address (or service area only)
  - phone, if any
  - founding date
  - your Google Business Profile URL
- **T6 values.** Applied 2026-10-13 for legal name, address, founding date and the Google Business Profile link (see T6). Still waiting on a phone number (or none) and the Facebook and Instagram URLs; a session adds them in one commit and nothing is guessed.

  | Field | What Manuel confirms | Where it will show |
  |---|---|---|
  | `legalName` | Exact legal name of the company | Organization schema |
  | `address` | Public street address, or "service area only" | Organization schema |
  | `telephone` | A public number, or none | Organization schema |
  | `foundingDate` | Year or full date | Organization schema |
  | `sameAs` | Facebook Page URL, Instagram profile (@dipriva_consulting_group) URL and Google Business Profile URL, added next to the LinkedIn URL | Organization schema |
  | LinkedIn company URL | One URL. The new site uses `https://www.linkedin.com/company/112996520` (footer, company page, `sameAs`). The old live footer uses `https://www.linkedin.com/company/dipriva-consulting-group`. Pick one and the constant `LINKEDIN_COMPANY` changes in one place | Footer, company page, schema |

- Update the audience to 10 to 500 employees in:
  - Google Business Profile
  - LinkedIn About
  - Facebook and Instagram bios
  - your Claude skills that mention the audience
- Check the LinkedIn Featured section for the deleted micro-multinational post.
- Open your Bookings page in a private window and confirm it is public, offers the 30-minute meeting type, and sends confirmations from manuel@.

**M7. Lea.** Read 2026-10-13 with Manuel's permission (read only, nothing changed). Lea's instructions never state a company size, so the 10 to 500 change needs no edit. Three things to decide and edit yourself in the Cloudflare dashboard (Workers & Pages, dipriva-chat, the `SYSTEM_PROMPT` in `src/systemPrompt.ts`): (1) Lea promises a follow-up "within 24 business hours" while the lead form and schedule page say 2 business days. Manuel decided on 2026-10-13 to leave Lea as is. (2) Lea asks visitors for name, phone and email and calls a `submit_lead` tool. Done 2026-10-13: a "Chat Assistant (Lea)" section, approved by Manuel, is now in the privacy policy in English and Spanish (it covers the AI provider, the email through Resend, the Microsoft 365 list and the one-hour IP count). (3) Lea's address line uses a comma ("2435 Eastern Ave SE, Suite 202"); the site uses "2435 Eastern Ave SE Suite 202" exactly as on the Business Profile. Sessions still must not edit this Worker.

**M8. QA leads Worker (optional).** A QA leads database `dipriva-leads-qa` already exists and is empty (id `1c4d51c9-3ebb-4b55-ae44-beeb66372363`). To test real submissions on QA, ask a session to add a `qa` environment to `dipriva-social/worker/leads/wrangler.jsonc` bound to that database, with `ALLOWED_ORIGINS` set to `https://qa.dipriva.com` and no Teams webhook. Then set the Turnstile secret yourself with `npx wrangler secret put TURNSTILE_SECRET --env qa`, using Cloudflare's public test secret `1x0000000000000000000000000000000AA`.

**M9. Review dipriva-social pull request 13.** https://github.com/mdipresreyes-lab/dipriva-social/pull/13 (label `hold`). One line in `config/brand-rules.json`: the gate now allows "10" and "500" as the audience figure and no longer allows "50" on its own. Merge it when you agree.

**M10. Swap blog sources for the primary pages.** The pages below blocked automated reading, so each post cites a readable page that quotes the primary source. Open the primary in a browser, confirm the sentence, and send the URL (a session updates both languages in one commit, since the gate requires the same sources in English and Spanish).

| Cited today | Primary to open |
|---|---|
| IT-Online and Outsourcing-Today (Gartner, 2024-10-21 and 2025-06-25 releases) | gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025 and .../2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 |
| Channel Drive (Gartner, 2026-05-26 release on AI agent governance) | gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure |
| River Cities' Reader (NFIB June 2026 Small Business Economic Trends) | nfib.com, Small Business Economic Trends, June 2026 |
| Haver Analytics (BLS Employment Cost Index, June 2026) | bls.gov/news.release/archives/eci_07312026.htm |
| The Shelby Report and Talk Business & Politics (McKinsey State of Grocery North America 2026) | mckinsey.com/industries/retail/our-insights/the-state-of-grocery-north-america |
| MACNY (McKinsey State of Organizations) | mckinsey.com, The state of organizations |
| Reliable (ASQE 2025 Cost of Quality report; ASQ rule of thumb) | asq.org/quality-resources/cost-of-quality and the ASQE report |
| SalesforceDevops.net (RAND report) | rand.org/pubs/research_reports/RRA2680-1.html |
| Silicon Canals and ICTbusiness (McKinsey State of AI 2025 and 2026) | mckinsey.com, The state of AI |

Dates inferred because the cited page shows none: the Chamber of Commerce summary page uses the 2024-06-26 press release date, the FMI page uses the date in its URL (2026-07-07), and the MIT NANDA report uses the PDF's file date (2025-07-14). Confirm or give the real dates.

**M11. Blog judgment calls to confirm.**
- NFIB's price figures are the June 2026 readings (net 38 and net 32 percent). The July 2026 report is lower (net 31 and 28). Update the post if you want the latest month.
- Three posts keep West Michigan examples and city names (agentic governance, operational capacity, quality). The audience is national; say if you want a national version.
- Removed claims you may have wanted: every BCG claim in the supermarket post, the SBA adoption figure in the 20-person post, the McKinsey 41 to 182 percent and 1.4 million figures in the quality post. The commit body of `8a90597` lists every removed or reworded figure.
- The refine post now cites RAND with its own hedge ("by some estimates") and McKinsey as a share of survey respondents.

**M12. Spanish terms to confirm.** "Auditoría de Límites de Autonomía", "Prueba de Supuestos", "Prueba de Aumento en Propuestas Nuevas", "Detenerse es válido", "Unidad Operativa Estándar (UOE)", "lastre organizacional", "Trampa de la Variedad", "Disciplina de la Resta". "FMI" is written "FMI (Food Industry Association)".

**M13. Rich Results Test.** Run it once on one service page, one lead page and one post (section 1 has the steps) and tell a session if it reports anything.

---

## 6. Cutover checklist (production switch, same day)

The step-by-step version written for Manuel, with explanations and the protection rule, is `docs/LAUNCH-RUNBOOK.md`. Use it on the day. This section is the short form.

Do this only after the QA test list passes (docs/CUTOVER-TEST-CHECKLIST.md). The plan is built so nothing changes until you press one button, and undoing it takes one click.

How it works: the production site is a Cloudflare Worker attached to www.dipriva.com by a route. The existing DNS record to GitHub Pages stays in place, so there is no DNS change and no gap. Rollback is deleting the route.

Before the day:
1. In dipriva-social, review pull request 13 (audience figure, labelled `hold`). Merge it or leave it, but decide.
2. Confirm the Cloudflare API token can edit Workers Routes on the dipriva.com zone (the QA deploy already proved it can see the zone; a route needs Workers Routes: Edit).
3. Pick a quiet time. Avoid Friday around 18:00 UTC, when the weekly social drafter runs, and avoid any hour when an outreach email batch goes out.

On the day, in this order:
1. Freeze: no blog pushes to `main`. If any downtime is possible, set `unsubscribe.enabled: false` in dipriva-growth first.
2. Merge `redesign` into `main` through a pull request. The merge does not publish anything: the old GitHub Pages deploy is now manual-only and the new production deploy is manual-only.
3. In Cloudflare, delete these three rules (they would otherwise intercept the new site):
   - the Transform Rule that rewrites GPTBot, ClaudeBot and PerplexityBot to `/bot/*`
   - the redirect from `/es` to `/`
   - the redirect from `/about` to `/about/manuel-dipres`
   Keep the rule that sends apex `dipriva.com` to `www`, and keep HTTPS forced. Also confirm Security, Bots does not block AI crawlers.
4. In GitHub, open Actions, pick "Deploy production site", click Run workflow on `main`, type `deploy`. It builds in production mode, checks the Cloudflare credentials, publishes, waits 30 seconds, and runs the smoke test against the live site. Expect zero failures.
5. Open https://www.dipriva.com in a private window and click through home, a lead page, schedule and a blog post.
6. Submit one real lead on `/strategy/` marked TEST. A Teams card appears in Leads and "Sync inbound leads" in dipriva-admin picks it up. Delete the test lead afterward.
7. Open Lea on the live site and ask to speak to the team with test details. The email to manuel@ arrives and the Microsoft 365 list gets a row.
8. Accept cookies and confirm your visit in Google Analytics Realtime. Reject and confirm it does not appear.
9. Ask the social post verifier to check one week-43 package so it fetches the new lead pages.
10. Set up M5 (protect `main`) with Claude, click by click.
11. Search Console: submit `https://www.dipriva.com/sitemap-index.xml` and request indexing for home, the three service pages and the three lead pages.

Rollback, any time in the first 7 days: in Cloudflare, open Workers & Pages, `dipriva-site`, Settings, Domains and Routes, and delete the route `www.dipriva.com/*`. The old site answers again within seconds. Then tell Claude what failed.

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
- Answer-first summaries on the service, tool, founder, company and West Michigan pages.
- FAQ schema on the tool, company, West Michigan and post pages.
- A company page (`/about/`, `/es/nosotros/`) and `alternateName` ("Dipriva", "Dipriva Consulting") on the Organization and WebSite nodes.
- Spanish blog (8 posts), reciprocal hreflang, key takeaways, FAQ, dated sources and `citation` on every post, per-post OG images.
- Full static HTML for every crawler, `llms.txt` with a Spanish section, AI crawlers allowed in production.

**Still to do.**
- The entity values only Manuel can confirm (M6): legal name, address, phone, founding date, Facebook, Instagram and Google Business Profile in `sameAs`. Then match those profiles word for word to the site.
- Bing Webmaster Tools, whose index feeds ChatGPT search and Copilot.
- At cutover: Search Console sitemap and indexing requests (section 6).
- 2 to 4 posts a month answering real questions from owners of companies with 10 to 500 employees, each in English and Spanish, with verified and dated sources. The `publish-blog` skill does this and opens the pull request.

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
| `/privacy` | LinkedIn and Meta app review | Built (D8 approved) |
| `/unsubscribe/?t=` | dipriva-growth emails | Built, byte copy |
| `/client_form` | Client onboarding | Built, noindex |
| `/downloads/*` (12) | Lead form success state | Built |
| `/blog/<slug>` (8, plus 1 redirect) | LinkedIn Featured, past shares | Built |
| `/industries/west-michigan` | Sitemap, local search | Built (T3), plus `/es/industrias/oeste-de-michigan/` |
| `/services/*` (3) | Blog links, home | Built |
| `/about`, `/es/nosotros` | Company entity, footer, header | Built (T6); the old Cloudflare redirect to the founder page must go (section 6, step 6) |
| `/es/blog/*` (8) | Spanish readers, hreflang pairs | Built (T5) |
| `/og/<slug>.png`, `/og/es/<slug>.png` (16) | Social previews | Generated at build (T7) |

## QA review fixes (2026-10-14)

Manuel tested qa.dipriva.com and asked for these changes. All are done on `redesign`:
- The language switch keeps the visitor's place. On the home page it lands in the same section; on other pages it lands in the same section and the same distance into it; posts fall back to the same relative position.
- Footer: the address shows on three lines (street, Suite 202, city), Instagram and Facebook have icons matching LinkedIn, the West Michigan line is removed, and all three social links open in a new tab.
- Spanish lead page addresses now mirror the English endings: `/es/estrategia/`, `/es/startup/` and `/es/ia-automatizacion/` (they replace the long download-title addresses; they were never live, so no redirects are needed). If Manuel prefers a different Spanish word for "startup" (for example "emprendimiento"), it is one folder rename plus the paths in `site/src/lib/magnets.ts` and `site/src/lib/services.ts`.
- Blog posts: share buttons now appear under the headline as well as at the bottom, and the visible "Updated" date is gone. The `updated` field still feeds `dateModified` in the page's structured data only.
- `/unsubscribe/` with no token shows the error message. That is correct and identical to the live page. Use `?t=000000000000.00000000000000000000` to see the button state.
- `llms.txt` now carries an explicit `Content-Type: text/plain; charset=utf-8` rule in `_headers`. The file's Spanish text was already correct UTF-8, and Cloudflare served it as UTF-8 in a local test. If accents still look wrong, note which browser or tool shows it.

## Post-launch check list: items to look at later

- **(Closed 2026-10-14: nothing found in Google, Bing or Search Console. See the search check section.) admin.dipriva.com is answering crawlers.** Cloudflare's AI Crawl Control (2026-10-13, last 7 days) lists `admin.dipriva.com/sitemap.xml` as the most crawled path, with 60 successful requests. That means the private CRM's address returns a successful response to crawlers, so its login page or app shell may be publicly visible and could be indexed by Google. Nothing was changed: the CRM is off limits to sessions, and Manuel decides. What to look at: open the address in a private window and see what it shows; search Google for `site:admin.dipriva.com`; if anything is indexed, ask for it to be kept out of search (a `noindex` response header or Cloudflare Access in front of it). Do this after the launch, before spending effort on branded search, because it could show up for searches on "Dipriva".

## Search Console and Bing check (2026-10-14, after launch)

Read-only audit by Claude in Chrome. Findings and what was done:

- **The collision is with Diprivan, not "Diprivian".** Google and Bing rewrite "dipriva" and "diprivian" to "diprivan", the propofol brand, and page 1 is all drug content. Google already ranks dipriva.com first for "dipriva consulting" and "dipriva consulting group"; Bing has it in the top three. The bare word "dipriva" cannot realistically be owned, so success is measured on the two brand-plus-descriptor queries. `llms.txt` and the privacy identity note were corrected (done 2026-10-14): `llms.txt` names Diprivan; the privacy note says "any company or product of a similar name".
- **admin.dipriva.com does not appear** in Google, Bing, Search Console pages, performance or crawl hosts. The earlier crawler finding is closed. (Keep an eye on it: it was reported by Cloudflare as answering crawlers.)
- **Sitemaps:** Google and Bing only know the old `/sitemap.xml`. Manuel submits `sitemap-index.xml` in both (Search Console, Sitemaps; Bing, Sitemaps).
- **Request indexing** in Search Console for the home page, the three service pages and the three lead pages.
- **Do not click "Validate fix"** on the Soft 404 group in Search Console for about two weeks, until Google has re-read the new pages.
- **Old pages Bing still lists:** `/approach` and `/inquire`. They return 404 on purpose (Manuel does not want them). Remove them from Bing with Block URLs; Google does not list them.
- **IndexNow** is set up: a public key file at the site root, `site/scripts/indexnow.mjs`, and a step at the end of "Deploy production site" that sends every indexable page to Bing and the other IndexNow engines. Google does not use IndexNow.
- **Address and phone mismatch (Manuel):** the Hispanic Chamber of West Michigan listing shows 3645 Maplehurst Drive SE, Grand Rapids, MI 49512 and the phone (616) 896-5888, and Bing's AI answer repeats that phone. The site uses 2435 Eastern Ave SE Suite 202 and shows no phone. Update the chamber listing.
- **Business Profile:** still shows "Get verified". Manuel is completing it (Google asks for a live video of the building).
- **Soft 404 and redirect groups in Search Console** (old `/es`, `/about`, `/home-716983` and so on) are legacy and should clear as Google re-crawls.

### Baseline table for the 30-day and 90-day checks

Launch was 2026-10-13. The launch column holds only what was observed and written down on 2026-10-13 and 2026-10-14. A blank cell means it was not recorded at launch: fill it in at the first check and treat that check as the baseline for that row. Calendar reminders: Fri 2026-10-16 (sitemap count), Wed 2026-10-28 (Validate fix decision), Thu 2026-11-12 (30 days), Mon 2027-01-11 (90 days).

| Measure | Launch (2026-10-13 and 14) | 30 days (2026-11-12) | 90 days (2027-01-11) |
|---|---|---|---|
| Google, "dipriva consulting" | dipriva.com ranks 1 | | |
| Google, "dipriva consulting group" | dipriva.com ranks 1 | | |
| Bing, "dipriva consulting" and "dipriva consulting group" | dipriva.com in the top 3 | | |
| Google and Bing, bare "dipriva" | Rewritten to "diprivan" (propofol); page 1 is all drug content. Not a target | | |
| Google sitemap-index.xml | Submitted 2026-10-13; first "Couldn't fetch", then Success, 0 pages discovered. Old sitemap.xml: Success, 44 pages | Expect 44 | |
| Bing sitemap-index.xml | Success, 1 URL discovered (child sitemap) | | |
| Google index status | Home indexed. Indexing requested for the three lead pages, /about/, /about/manuel-dipres/, /es/ and the three service pages plus /services/ (except /services/ai-automation/, already indexed). Spanish service pages still to request | Indexed count: | Indexed count: |
| Search Console Soft 404 and Page with redirect groups | Present (legacy URLs). Validate fix not clicked | Count: | Count and Validate fix result: |
| Search Console performance (28 days) | Not recorded | Clicks, impressions, top 5 queries: | Clicks, impressions, top 10 queries: |
| Bing AI answer (Copilot) | Repeats the wrong phone (616) 896-5888 from the chamber listing | | |
| ChatGPT, Gemini, Perplexity answers to "What is Dipriva Consulting Group?" | Not recorded | | |
| Chamber listing (hccwm.chambermaster.com) | 3645 Maplehurst Drive SE, Grand Rapids, MI 49512, phone (616) 896-5888. Correct address is 2435 Eastern Ave SE Suite 202, MI 49507 | Fixed? | Fixed? |
| Google Business Profile | "Get verified". Live video of the building pending | Verified? Address matches? | |
| Leads from search | Not recorded | | Count and source: |

Success at 90 days: both brand-plus-descriptor queries rank 1 to 3 on Google and Bing, AI answers state 10 to 500 employees and the Eastern Ave address and cite dipriva.com, and no current page is in the Soft 404 group.

