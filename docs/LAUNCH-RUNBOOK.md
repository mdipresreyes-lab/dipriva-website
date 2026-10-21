# Launch runbook: switching www.dipriva.com to the new site

Written for Manuel, 2026-10-14. Plan for about 90 minutes without interruptions. You do the clicking in Cloudflare and GitHub. Claude opens the pull request, watches the results and helps you at each step. Send Claude a screenshot whenever something looks different from what is described here.

## How the switch works (read this first)

The new site is published as a Cloudflare Worker that answers for www.dipriva.com through a route. Your DNS record, which points to the old GitHub Pages site, does not change. That means:

- Nothing changes for visitors until you press the deploy button in step 5.
- If anything looks wrong, you delete one route and the old site answers again within seconds.
- Merging code on GitHub does not publish anything. Only the deploy button does.

Your safety net is the route. Keep the old GitHub Pages site untouched for 7 days.

## Before you start: go or no-go

Start only if all of these are true:

- You have 90 minutes free.
- No outreach email batch goes out in the next two hours, and it is not Friday around 18:00 UTC (the weekly social drafting).
- You have done step 1 below (the Cloudflare token permission).
- You tested qa.dipriva.com and it looks good. (Done.)
- Pull request 13 in dipriva-social is merged. (Done.)

## Step 1. Check the Cloudflare token permission (10 minutes)

Why: publishing to www.dipriva.com creates a "route" in Cloudflare. The token you put into GitHub already proved it can publish to qa.dipriva.com, but creating a route needs one more permission, "Workers Routes: Edit". If it is missing, the deploy button fails safely before it publishes anything, so this step saves you a failed attempt.

1. Go to dash.cloudflare.com and sign in.
2. Click your profile icon (top right), then **My Profile**.
3. In the left menu, click **API Tokens**.
4. Find the token you created for GitHub. Click the three dots at the right of its row, then **Edit**. (Do not click **Roll**. Rolling creates a new token value and would break the GitHub secret.)
5. Under **Permissions**, look for these two rows:
   - Account, Workers Scripts, Edit
   - Zone, Workers Routes, Edit
6. If the Zone row is missing, click **+ Add more**. In the first box choose **Zone**, in the second **Workers Routes**, in the third **Edit**.
7. Under **Zone Resources**, make sure it says Include, then either **All zones** or **Specific zone** with **dipriva.com**.
8. Click **Continue to summary**, then **Update token**.

The token value does not change when you update permissions, so nothing needs to change in GitHub.

How you will know it worked: in step 5, the deploy log shows a line "Token can read Workers Routes on dipriva.com: HTTP 200". If it shows 403, the permission is still missing. Come back to this step.

## Step 2. Find and photograph the three Cloudflare rules (10 minutes)

Why: three old rules would get in the way of the new site, and you want a record of them in case you ever need to bring them back.

1. In Cloudflare, click **dipriva.com**.
2. In the left menu, click **Rules**, then **Overview**. This lists every rule on the site.
3. Find these three:
   - A rule that sends requests from AI crawlers (it will mention GPTBot, ClaudeBot or PerplexityBot) to a path starting with `/bot/`. It is probably under Transform Rules, URL Rewrite.
   - A redirect from `/es` to `/`.
   - A redirect from `/about` to `/about/manuel-dipres`.
4. Take a screenshot of each one, showing its full settings.
5. Do not touch anything else. Leave alone the redirect from dipriva.com (without www) to www.dipriva.com, the "always use HTTPS" setting, and everything under DNS (your email records live there).

If you cannot find one of the three, or something else looks like it affects the website, send me the Overview screenshot before you go on.

## Step 3. Claude opens the pull request

Tell Claude "open the pull request". Claude opens a pull request that merges the `redesign` branch into `main`, and the automatic check ("build") runs on it. It takes about a minute. Wait for Claude to say it is green. A green check means the site builds and passes the brand rules.

## Step 4. Merge, then switch off the three rules (10 minutes)

1. Open the pull request link Claude sends you. Click **Merge pull request**, then **Confirm merge**. Nothing is published. The old GitHub Pages deploy is turned off, and the new deploy is manual.
2. Go back to **Rules, Overview** in Cloudflare. For each of the three rules, turn it **off** (use the toggle or the Disable option). Turn off, do not delete. If you ever need the old behavior back, you flip it on again.

## Step 5. Press the deploy button (10 minutes)

1. In GitHub, open dipriva-website, then the **Actions** tab.
2. In the left list, click **Deploy production site**. (It appears there only after step 4's merge.)
3. Click **Run workflow** on the right. Leave the branch as `main`. In the box, type `deploy`. Click the green **Run workflow** button.
4. Click the new run to watch it. It takes about 3 minutes. These steps should all turn green:
   - Build (production mode)
   - Check Cloudflare credentials: four lines, each "HTTP 200"
   - Deploy to www.dipriva.com
   - Smoke test the live site: "checks passed, 0 failed"

If the credentials step shows 403 on the Workers Routes line, go back to step 1. Nothing was published. If the smoke test shows a failure after the deploy step, the site is live but something is off. Send Claude the failing lines, and use the rollback below if it is serious.

## Step 6. Look at the live site (10 minutes)

Open a private window and go to https://www.dipriva.com. Check:

- The home page loads, with no "not the live site" banner.
- Click the ES button. It lands in the same section in Spanish.
- Open /strategy and the Spanish /es/estrategia/.
- Open /schedule and click the booking button.
- Open one blog post and one Spanish post.
- View the footer: address on three lines, three social icons, Dipriva LLC.

## Step 7. Test the things only the live site can do (20 minutes)

1. Lead form. On /strategy, fill in the form with the business name "TEST" and your own email. Submit. You should see the download buttons. Within a minute, a card appears in the Teams channel "Leads". In dipriva-admin, click **Sync inbound leads** and the test lead appears. Delete the test lead from the CRM afterward.
2. Lea. Open the chat on the live site. Ask for help and, when she asks, give test details (business "TEST"). You should get an email at support@ and a new row in your Microsoft 365 list. Delete the test row.
3. Analytics. Open the site, click **Accept** on the cookie banner, then in Google Analytics open **Reports, Realtime**. You should see yourself. Open a private window, click **Reject**, and confirm that visit does not appear.
4. Sharing. Open https://www.linkedin.com/post-inspector/ and paste a blog post address. The title and image should look right. Do the same with https://developers.facebook.com/tools/debug/.
5. Social check. Tell Claude. Claude asks the post verifier to check one week-43 package so you know it can read the new lead pages.

## Step 8. Protect the main branch (M5, 10 minutes)

Why: this stops anyone, including a Claude session, from changing the live code without a green check. Do this only after step 4's merge, because the check named `build` has to have run on the merge pull request before GitHub lets you pick it.

1. In GitHub, open dipriva-website and click **Settings** (the tab at the far right).
2. In the left menu, click **Rules**, then **Rulesets**.
3. Click **New ruleset**, then **New branch ruleset**.
4. Fill in:
   - Ruleset Name: `Protect main`
   - Enforcement status: **Active**
   - Bypass list: leave empty
5. Under **Target branches**, click **Add target**, then **Include default branch**.
6. Under **Rules**, make sure these are ticked:
   - Restrict deletions
   - Block force pushes
   - Require a pull request before merging. Set **Required approvals** to `0`. (You are the only reviewer, and zero lets you merge your own pull requests once the check is green.)
   - Require status checks to pass. Click **Add checks**, type `build`, and pick the one from GitHub Actions. Leave "Require branches to be up to date" off.
7. Click **Create**.

What changes: nobody can push straight to `main` anymore. Changes go through a pull request, and the check must pass. Claude sessions already work this way. Deployment is unaffected. Do not add this rule to the dipriva-social repository: its automatic merges would stop.

If you do not see `build` in the search, tell Claude. It means the check name differs, and Claude will give you the exact name.

## Step 9. Search tools (only if you have energy left)

These do not affect the launch, and they are the first post-launch items:

1. Google Search Console: add dipriva.com as a Domain property. Google gives you a TXT value. In Cloudflare, open **DNS**, **Records**, **Add record**: Type TXT, Name `@`, Content the value from Google. Save, then click Verify in Search Console. Do not edit or delete any other DNS record.
2. In Search Console, open **Sitemaps** and add `sitemap-index.xml`.
3. Use **URL Inspection** and request indexing for the home page, the three services and the three lead pages.

## If something goes wrong: rollback (2 minutes)

Do this if the live site is broken or behaving badly:

1. In Cloudflare, open **Workers & Pages**, then the Worker **dipriva-site**.
2. Open **Settings**, then **Domains & Routes**.
3. Find the route `www.dipriva.com/*`. Click the three dots, then **Delete**.
4. Within seconds the old site answers again.
5. Turn the three rules back on if you want the old redirects (the screenshots from step 2 show how they were).
6. If you still see new pages after a minute, go to **Caching, Configuration, Purge Everything**.
7. Tell Claude what failed. Nothing else needs undoing: the data, leads, email and social posts are unaffected.

## What Claude does and what you do

You: token permission, photographing and switching off the rules, merging, pressing deploy, the live tests, the protection rule, Search Console.

Claude: opens the pull request, watches the checks, reads the deploy log with you, runs the final checks, and walks you through the protection rule and anything that looks different.

## Questions you might have

Will my social posts break? No. The pages they point to keep the same addresses.

Will my outreach emails break? No. The unsubscribe page is the same file as before.

What if I run out of time halfway? Stop after step 4 or after step 6. Until you press deploy, visitors see the old site. After you press deploy, the new site is live and the rest are checks.

Can I deploy again later? Yes. Run the same workflow again at any time. Each run publishes the current `main`.
