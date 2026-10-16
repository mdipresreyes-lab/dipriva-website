---
name: add-client-logo
description: Add, update or remove a client logo in the "Companies we are proud to work with" block under the homepage hero (/ and /es/). Processes the source file into a single-color stencil, adds the client to site/src/lib/clients.ts, tunes the size, runs the gates, screenshots both languages and themes, and opens a pull request. Use when Manuel says "add a client logo", "add <company> to the logos", "new client logo", "remove <company> from the logos", or sends a logo file and a website for a client.
---

# Add a client logo

The homepage shows a static grid of client logos right under the hero, on `/` and `/es/`. Each logo is a single-color shape (a CSS mask filled with the site's muted text color, darker on hover and focus) that links to the client's website in a new tab. This skill adds one client end to end and opens a pull request. It never merges and never deploys unless Manuel asks in the conversation.

## Rules that never bend

- **Consent first.** Only add a client whose consent to show their logo Manuel has approved and filed. If the request does not say so, ask before doing anything else.
- **Never show brand colors.** No filters, tiles, borders or colored versions. The file is only used for its shape.
- **Brand names are never translated.** The name appears in the accessible label in both languages exactly as the client writes it.
- **https only, no UTM or tracking parameters** in the client URL. The gate fails otherwise.
- **No em dash (code point 2014)** anywhere: code, copy, commit message, PR text. No banned terms from `site/config/brand-rules.json`.
- **No pairing with results.** The logo block never sits next to, or names, a result card. The approved results are anonymous.
- **Do not touch** `client/` (the React rollback copy), section numbering, JSON-LD, sitemap, hreflang or the marquee.
- **Never merge or deploy on your own.** Merging is Manuel's (auto mode blocks merging an unreviewed PR anyway). Deploy only when he asks; see step 10.
- Stage files by explicit path. Never commit `.claude/launch.json` or a secret.

## Where things live

| What | Where |
|---|---|
| Client list (slug, name, url, logo, sizeScale, active) | `site/src/lib/clients.ts` |
| Logo block (markup, mask styles, click event) | `site/src/components/home/ClientLogos.astro`, rendered in `HomePage.astro` right after `Hero` |
| Heading and new-tab text, English and Spanish | `clients` key in `site/src/lib/copy.ts` |
| Logo files | `site/public/clients/<slug>-original.png` (source, kept) and `<slug>.png` (stencil) |
| Logo processing (recipes, analyze, build, previews) | `site/scripts/process-client-logos.py` |
| Gate: https URL, no UTM, logo file exists, positive sizeScale, unique slug | `site/scripts/check-clients.mjs`, first step of `npm run build` |
| Screenshots and browser checks | `.claude/skills/add-client-logo/check-logos.cjs` |
| Preview images for PRs (not deployed) | `site/docs/client-logos/` |

Sizing: each logo box is 41.4px tall and at most 184px wide, both times `sizeScale`, and never wider than its grid column. The grid is 2 columns on phones and 4 from the `lg` breakpoint.

## What Manuel needs to give you

1. The company name, exactly as written by the company.
2. The website (https).
3. The logo file (PNG preferred; the largest, cleanest version available). If he only has an SVG, a JPG or a social share card, it still works; see step 3.
4. Confirmation that consent is filed.

If any of these is missing, ask in plain words. Do not guess a URL or pull a logo from the client's site without his say so.

## Steps

### 1. Branch

```bash
git fetch origin && git switch -c feature/client-logo-<slug> origin/main
```

The slug is the company name in lowercase kebab case (`acme-builders`). Slugs are used in the file names and the GA4 event, so do not change one after it ships.

### 2. Save the source

Copy the file to `site/public/clients/<slug>-original.png`. Convert a JPG or SVG to PNG first (Pillow for JPG; for SVG, render it at about 800px wide with a tool that is already installed, or ask Manuel for a PNG). Check Pillow: `python3 -c "import PIL"`, and if it fails, `python3 -m pip install --user Pillow`.

### 3. Pick a recipe

From `site/`:

```bash
python3 scripts/process-client-logos.py analyze <slug>
```

It prints the mode, alpha counts, top colors, the border color (usually the background) and the row bands of content. Choose a recipe and add it to `RECIPES` in the script:

| What the source looks like | Recipe |
|---|---|
| Transparent background, logo only | `{'kind': 'transparent'}` |
| White or near-white background | `{'kind': 'light-bg', 'bg': (255, 255, 255), 'min': 240, 'full': 140}` |
| Off-white fill inside a shape (for example a ring) that should become a hole | `light-bg` with `bg` set to that fill color and `min` just below its darkest channel (Tiva uses 235) |
| Colored or dark background | `{'kind': 'color-bg', 'bg': 'auto', 'lo': 40, 'hi': 150}`; raise `lo` above any faint background pattern |
| Social share card with a tagline or URL under the logo | `color-bg` plus `'crop': 'first-band', 'band': 60`; it keeps only the first band of rows and prints the crop box. Use an explicit `(left, top, right, bottom)` box if the logo itself spans two bands |

Never upscale a small source. The script trims to the shapes, adds 4px padding, and picks the smallest PNG under 40 KB (it only downscales if all formats are over the budget).

### 4. Build the stencil and look at it

```bash
python3 scripts/process-client-logos.py build <slug> --previews <scratchpad>/previews
```

Open `<slug>-preview.png` and look at it yourself. Fix the recipe and rebuild if any of these is true:

- the stencil is a solid box, disc or rectangle instead of the logo shape (the background was not keyed out);
- a tagline, URL, slogan or background pattern is still there;
- part of the logo is missing or has holes it should not have (the threshold is too aggressive);
- edges look jagged or have a halo.

Running `build` with no slug rebuilds every logo; the existing ones come out byte-identical, so `git status` should show only the new files.

### 5. Add the client

Append an entry to `clients` in `site/src/lib/clients.ts` (array order is display order):

```ts
{
  slug: 'acme-builders',
  name: 'Acme Builders',
  url: 'https://acmebuilders.com',
  logo: '/clients/acme-builders.png',
  sizeScale: 1,
  active: true,
},
```

Start `sizeScale` at 1. Current values for reference: Tiva Properties 1.1 (square mark), Pro Roofing & Siding 1.1, ProCommand 0.95 (very wide wordmark), Mercatus Media 1.0. Keep the syntax plain TypeScript (no enums, no imports): the gate imports the file with Node's type stripping.

To **remove** a client, set `active: false` (the logo stays in the repo and can come back) or delete the entry and both files. To **replace** a logo, overwrite `<slug>-original.png` and rebuild.

### 6. Check the grid

Four logos fill one row at `lg`. With 5 to 7 logos the last row is partly empty; that is fine, but look at it. At 8 the grid is two full rows. If Manuel wants a single row for 5 or 6 logos, change `lg:grid-cols-4` in `ClientLogos.astro` and re-check 1280px screenshots.

### 7. Build and gates

From `site/`:

```bash
npm run build
npm run build:production
npm run check:jsonld
```

Expected: "Client logo check passed (N active)", brand gate 0 failures, lead form and blog gates pass, JSON-LD 0 problems. If `node_modules` is missing, run `npm ci` first.

### 8. Screenshots, size tuning and checks

Serve the production build: `preview_start` with the `site-preview` entry in `.claude/launch.json` (it runs `npm --prefix site run preview` on port 4321), or `npm run preview` in `site/`.

Find the cached Playwright and run the checks (system Chrome, no download):

```bash
PW=$(dirname "$(ls -d ~/.npm/_npx/*/node_modules/playwright | head -1)")
node .claude/skills/add-client-logo/check-logos.cjs "$PW" http://localhost:4321 <scratchpad>/shots
```

If no cached Playwright exists, ask Manuel before downloading one. The script writes `en|es-375|1280-light|dark.png`, forced-colors and focus captures, and prints a report. Confirm:

- every combination has no console errors;
- each link has the exact `href`, `target="_blank"` and `rel="noopener"` (no `noreferrer`);
- Tab reaches every logo in order with a 2px outline;
- accessible names read "<name> (opens in a new tab)" and "<name> (se abre en una pestaña nueva)";
- forced colors fill every logo with a system color;
- the `client_logo_click` payload is `{client: <slug>, lang}`.

Look at the 1280 and 375 screenshots in both themes. Tune `sizeScale` until all logos read as the same visual weight (not the same width): a dense square mark needs less, a thin wide wordmark needs more. Rebuild and re-shoot after each change. On 375px, make sure no logo touches the column edge.

Lighthouse (cached under `~/.npm/_npx`, or ask before downloading): run it on `/` and `/es/` of this build and of `origin/main` (build main in a temporary `git worktree` with `site/node_modules` symlinked, serve on another port). Accessibility must stay at 100 with no failed audits, CLS must stay 0, and LCP should be within about 100 ms of main. Remove the worktree afterward.

### 9. Commit and open the PR

Copy the logo preview and the screenshots to `site/docs/client-logos/`, then commit by explicit path:

```bash
git add site/src/lib/clients.ts site/scripts/process-client-logos.py \
  site/public/clients/<slug>-original.png site/public/clients/<slug>.png site/docs/client-logos/
git commit
git push -u origin feature/client-logo-<slug>
```

Open the PR against `main` with `gh pr create`. The repo is public, so embed images with raw URLs pinned to the commit: `https://raw.githubusercontent.com/mdipresreyes-lab/dipriva-website/<sha>/site/docs/client-logos/<file>.png`. The PR body has: summary, a processing table (slug, source size, output size, KB, crop box, sizeScale), the before and after preview, the screenshots of `/` and `/es/` at 375 and 1280 in light and dark, the gate and Lighthouse results, and anything not verified. End it with the Claude Code attribution line.

### 10. Merge and deploy (only when Manuel asks)

Manuel merges on GitHub. When he asks for the deploy:

1. Confirm the PR is merged: `gh pr view <n> --json state,mergeCommit`.
2. List what else on `main` has not shipped since the last deploy, and tell him if it is more than this change:

   ```bash
   SHA=$(gh run list --workflow site-production-deploy.yml --status success --limit 1 --json headSha --jq '.[0].headSha')
   git log --oneline "$SHA"..origin/main
   ```

3. Run the workflow: `gh workflow run site-production-deploy.yml --ref main -f confirm=deploy`, then `gh run watch <id> --exit-status`. It builds, checks the Cloudflare credentials, deploys, runs the smoke test (expect 0 failed) and pings IndexNow. Never run `wrangler` directly.
4. Verify live: `curl` the logo files under `https://www.dipriva.com/clients/` (200) and run `check-logos.cjs` against `https://www.dipriva.com`.
5. Tell Manuel what only he can check: the `client_logo_click` event in GA4 DebugView after accepting cookies, and the hover color with a real mouse.

Rollback, if ever needed: delete the route `www.dipriva.com/*` on the Worker `dipriva-site` in Cloudflare (Workers & Pages, dipriva-site, Settings, Domains and Routes), or revert the merge and redeploy.
