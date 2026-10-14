# Pre-cutover test checklist for qa.dipriva.com

Work through this before the live switch. Tick each box. Anything that fails goes back to Claude to fix; nothing here needs code from you.

Rule for go or no-go: sections 2, 3 and 8 must be fully clean. Any failure there means we do not cut over. Everything else can be fixed in a quick follow-up if it is cosmetic.

## 0. How QA behaves (so you do not mistake it for a bug)

- A dark banner at the top says it is not the live site. Production will not have it.
- Lead forms check your input and show the success screen, but send nothing. The success screen says "QA build: this request was checked but not sent."
- Lea answers every message with a fixed notice. The real Lea only runs on production.
- Google Analytics does not load on QA. The cookie banner still appears.
- Search engines are blocked on QA. That is expected.
- The schedule page embeds the real Microsoft Form and the real Bookings link. If you submit the form, it reaches you. Put "TEST" in every field and delete it afterward.
- The client intake page embeds the real client form. Do not submit it.

Use a private window, on both your laptop and your phone. Sign in through the Access login when asked.

## 1. First look

- [ ] Home page loads in English. Hero, buttons and menu look right.
- [ ] Scroll partway down the home page and switch to Spanish. You land in the same section. On a service, blog or other page, you land on its Spanish twin at about the same place on the page, and the same in reverse.
- [ ] Dark mode toggle works and the text stays readable.
- [ ] Footer shows the address on three lines (2435 Eastern Ave SE / Suite 202 / Grand Rapids, MI 49507), manuel@dipriva.com, LinkedIn, Instagram and Facebook with matching icons, and "Dipriva LLC" in the bottom line. There is no "West Michigan" line under the tagline.
- [ ] Click each footer social link. Each opens the correct Dipriva profile in a new tab, and the Dipriva site stays open.
- [ ] The "Analytics preferences" link in the footer reopens the cookie choice.

## 2. Lead pages (must be clean)

Do this for all three, in English and Spanish: /startup/, /strategy/ and /ai-automation/, and their Spanish pages /es/startup/, /es/estrategia/ and /es/ia-automatizacion/.

- [ ] The page title and the main headline match the free download it offers.
- [ ] Step 1 of the form: click Next with nothing selected. An error asks you to pick one.
- [ ] Pick one option, click Next. Step 2 appears.
- [ ] Submit with the name empty. An error appears.
- [ ] Fill in everything with TEST values and submit. The success screen appears with the download buttons.
- [ ] Every download button opens the right file. PDF opens, Word opens, Excel opens.
- [ ] Open the Excel files and type sample numbers. The scores and due dates calculate (these files are unchanged from the social repo, but confirm they still open cleanly).
- [ ] The "Spanish version" or "English version" links on the success screen open the other language's files.
- [ ] Add `?utm_source=linkedin` to the address and submit once. No error. (On production this value is stored with the lead.)
- [ ] The service link on the page ("See the service") goes to the matching service page.

## 3. Schedule page (must be clean)

- [ ] /schedule/ and /es/agendar/ both load.
- [ ] "Open the booking calendar" opens Microsoft Bookings in a new tab. It shows the 30-minute meeting type and real open times.
- [ ] The Microsoft Form loads below it. Submit one TEST entry, confirm it reaches you, then delete it.
- [ ] The fallback line shows manuel@dipriva.com and the link opens your mail app.
- [ ] The privacy link opens the privacy page.

## 4. Service pages

- [ ] /services/ and /es/servicios/ both load and show three services.
- [ ] Each of the three service pages loads in English and Spanish (six pages).
- [ ] On each: the "In short" box, the FAQ opens and closes, the free-tool button goes to the right lead page, and the final button goes to the schedule page.
- [ ] The Spanish pages use "usted" throughout and have no English left over.

## 5. Blog

- [ ] /blog/ lists 8 posts. /es/blog/ lists the Spanish versions.
- [ ] Open one English post. Check: one headline, the table of contents on the left (on a laptop), the key takeaways box, the FAQ, and a sources list with links that open.
- [ ] Use the language switch on that post. It lands on its Spanish twin, and the Spanish post links back.
- [ ] Share buttons (LinkedIn, Facebook, X, email, copy link) appear both under the headline and at the bottom of the post, and all work. The post shows its published date only, no "updated" date.
- [ ] The deleted micro-multinational post is not listed anywhere. (Its old address forwards on production only.)
- [ ] View the page source of one post and find `og:image`. It points to a file for that post.

## 6. Company, founder and local pages

- [ ] /about/ and /es/nosotros/ load and read well.
- [ ] /about/manuel-dipres/ and /es/nosotros/manuel-dipres/ load. No photo. The three client results are there.
- [ ] /industries/west-michigan/ and /es/industrias/oeste-de-michigan/ load.
- [ ] The three client results read exactly the same everywhere they appear.

## 7. Privacy policy

- [ ] Read /privacy/ and /es/privacidad/ top to bottom.
- [ ] The identity note under the intro shows Dipriva LLC and the address.
- [ ] The "Chat Assistant (Lea)" section is there in both languages.
- [ ] The social publishing section shows the approved wording about automated checks and the 12-hour window.
- [ ] The Microsoft Bookings sentence is there.
- [ ] The Clarity and Google Ads paragraphs say "may use".
- [ ] No "REVIEW" text anywhere on the page.

## 8. Pages other systems depend on (must be clean)

- [ ] /unsubscribe/ with no token shows the error message in English and Spanish ("That did not work. / No funcionó."). That is correct: the page only shows the real unsubscribe button when the address carries a valid token. The page is byte-for-byte the same as the live one.
- [ ] To see the button state, open https://qa.dipriva.com/unsubscribe/?t=000000000000.00000000000000000000 (a made-up token in the right format). You see the "unsubscribe" question and a button. Do not click the button.
- [ ] /client_form/ and /es/formulario-de-cliente/ load and show the intake form. View source: the page says `noindex`.
- [ ] /downloads/dipriva-sales-follow-up-kit-en.pdf opens directly.
- [ ] /llms.txt opens and reads correctly. /robots.txt on QA blocks everything.
- [ ] Footers on social posts print "dipriva.com/strategy", "dipriva.com/startup" and "dipriva.com/ai-automation". Confirm those three pages exist (checked in section 2).

## 9. Phone and keyboard

On an iPhone and on a laptop narrowed to a phone width:

- [ ] No page scrolls sideways.
- [ ] The menu button opens the menu and links close it.
- [ ] The Lea button opens a chat, you can type, close it again.
- [ ] The floating "Schedule a Strategy Session" bar appears on most pages and does not cover the form on lead pages.
- [ ] Tap targets are easy to hit. Forms are easy to fill in.
- [ ] On a laptop, press Tab repeatedly from the top of any page. You can reach every link and button, the focus outline is visible, and the "skip to content" link appears first.

## 10. Speed and technical checks (optional but recommended)

- [ ] Chrome, open DevTools, Lighthouse, mobile. Home, one service page, one lead page and one blog post each score 95 or higher in all four categories.
- [ ] Automated check, run by Claude or any session: `cd site && npm run build`, then `node scripts/smoke-test.mjs <address>`. It checks every built page (status, canonical, search tag, one headline, no em dash) and the dependent files.

## 11. What can only be tested after launch

These need the real production setup, so they run on cutover day (see HANDOFF.md section 6):

- [ ] Run `node scripts/smoke-test.mjs https://www.dipriva.com --production --redirects`. Zero failures.
- [ ] Submit one real lead on /strategy/. A Teams card appears in Leads, and "Sync inbound leads" in dipriva-admin picks it up.
- [ ] The Turnstile check appears and passes on the real site.
- [ ] Open Lea. A real reply comes back. Ask to speak to the team and give test details: the email to manuel@ arrives and the Microsoft 365 list gets a row.
- [ ] Accept cookies, then confirm in Google Analytics Realtime that your visit appears. Reject and confirm it does not.
- [ ] Paste one blog post address into the LinkedIn Post Inspector and Facebook Sharing Debugger. The image and title look right.
- [ ] Ask the post verifier to check one week-43 post package. It can fetch the lead pages.
- [ ] Check the old addresses forward: the deleted blog post, `/strategy` without the slash, and `/about`.

## 12. Decisions and prerequisites before go

- [ ] Pull request 13 in dipriva-social (the audience figure, labelled `hold`) is reviewed and either merged or consciously left.
- [ ] You have chosen a quiet time for cutover (early weekday morning is a good default) and nothing is scheduled to post or send in that hour.
- [ ] If any downtime is possible, `unsubscribe.enabled` is set to false in dipriva-growth first.
- [ ] You know the rollback: re-add the www CNAME to GitHub Pages. GitHub Pages stays deployable for 7 days.
- [ ] M5 (protect `main`) is scheduled for after the merge. Send Claude a screenshot of that Settings page.

## Paste-ready prompt for Claude in Chrome (sections 1, 4, 5, 6 and 7)

> Open https://qa.dipriva.com/ in a new tab (I am already signed in). For each page listed below, report in plain text: whether it loaded, the one headline, anything that looks broken (overlap, missing text, English left on a Spanish page, a broken link), and the page's address. Do not submit any form and do not click anything that sends data. Pages: /, /es/, /services/, /es/servicios/, the three service pages in English and Spanish, /blog/, /es/blog/, one blog post and its Spanish twin, /about/, /es/nosotros/, /about/manuel-dipres/, /industries/west-michigan/, /privacy/, /es/privacidad/. Finish with a short list of every problem found, most serious first.
