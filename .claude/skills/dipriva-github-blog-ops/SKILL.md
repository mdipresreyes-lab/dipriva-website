---
name: dipriva-github-blog-ops
description: Use when working with the dipriva-website GitHub repo in the context of the automated blog pipeline — reviewing what the automation has committed, fixing or hardening blog content, cleaning up test artifacts, or auditing repo/documentation drift the pipeline exposed.
---

# Dipriva Website — GitHub Operations Context (Blog Pipeline)

## What this covers

An external automation (Make.com — not in this repo, not something you can see or edit) generates blog posts, gets human email approval, and pushes commits **directly to `main`** in `mdipresreyes-lab/dipriva-website`. There is no staging branch, no PR, no review gate between "approved by email" and "live on main." You are being brought in either to build on top of what it produces (see the `dipriva-blog-frontend` skill) or to clean up / harden what it has already done. This skill is the factual record of that pipeline's footprint in this repo so you don't have to reverse-engineer it.

## Repo facts (verified)

- Repo: `mdipresreyes-lab/dipriva-website`
- Branch the automation writes to: `main` (confirmed — not a feature branch)
- Path convention: one file per post at `content/blog/<slug>.md`, filename = the post's `slug` frontmatter field
- Commit message convention used by the automation: `Add blog post: <article_title>`
- As of this writing, exactly one post exists: `content/blog/oracle-ai-capital-allocation-discipline-of-subtraction.md` (commit `f7f0fc1`). This was produced during live testing of the automation, not a manual publish.

## Frontmatter schema the automation produces

```yaml
---
title: "..."
date: "..."          # see known bug below
slug: "..."
description: "..."
cluster: "Corporate Strategy" | "Startup Operations" | "AI and Automation"
keyword: "..."
author: "Manuel Diprés"
published: true | false
---
```

## Known bug in what's already committed (verified, not suspected)

The one live post's `date` field is literally `date: "{{"2026-09-02"}}"` — a templating artifact from the automation's date-formatting step, not a plain date string. This is invalid as clean YAML/frontmatter content and will break naive frontmatter parsers. The fix belongs in the Make.com scenario (separate system), but two things follow for repo work:
1. If you're building anything that parses `content/blog/*.md` (see the `dipriva-blog-frontend` skill), parse dates defensively — don't assume clean ISO strings.
2. The existing committed file can be hand-corrected in place (change the `date` line to a plain `"2026-09-02"`) if asked to do so — this is a one-line content fix, not a structural change, but confirm with Manny before doing it since it touches a real commit on `main`.

## Idempotency gap in the write path (context, not yours to fix)

The automation's GitHub write step does a blind create/update `PUT` to the Contents API without first fetching the target file's current `sha`. GitHub's API requires the existing file's `sha` to overwrite it. Practically: **the automation can create a new slug once, but cannot ever successfully re-publish to an existing slug** — any retry, duplicate approval, or manual re-run against the same slug will fail with a 422 from GitHub, not silently overwrite. If you're ever asked to build tooling that writes to `content/blog/` on the automation's behalf, fetch-sha-then-PUT is the correct pattern. This is flagged here so a future "why did this fail" doesn't get mis-diagnosed as a repo/permissions issue — it's a known gap in the write logic upstream.

## Documentation drift found in this repo (verified — worth fixing opportunistically)

- `DEPLOYMENT.md` describes "Manus Hosting" with a live Express/tRPC/MySQL server. The repo's own commit history contains "Move deployment to GitHub Pages, remove Manus runtime," and the repo's current GitHub sidebar shows active deployments to `github-pages`. **`DEPLOYMENT.md` is stale and describes an architecture the repo no longer uses.** Source of truth is `.github/workflows/*.yml`, not this file.
- The repo's "About" description on GitHub still mentions "GHL API integration for lead capture," but commit history shows a later "GHL CRM Removal & MS Forms Migration" checkpoint. The description was never updated after that migration.
- Neither of these blocks the blog work, but both are cheap to fix if you're already in the repo and Manny wants the docs to stop lying to the next person (human or agent) who reads them.

## Standing rules (carry these over — they apply to any work you do in this repo)

- **Never touch `admin.dipriva.com` or the Lea chatbot Cloudflare Worker.** Fully out of scope, regardless of what task brought you into this repo.
- Match the existing brand/design system exactly — no redesigns as a side effect of a content or infra fix.
- Don't merge automated content commits' `main` history into a "cleaner" branch structure or rewrite history on `main` without explicit, separate sign-off — treat `main`'s existing commit history as fixed, append-only.
- If you add any new secret, token, or credential to this repo (env var, GitHub Actions secret, etc.), it must be entered by Manny directly — never accept a real secret value typed into a request to you and commit or paste it anywhere, including into your own commands or output.

## Useful checks when asked "did the pipeline do what it was supposed to"

- `git log --oneline -- content/blog/` — every post the automation has ever successfully published, in order
- Diff a specific post's frontmatter against the schema above to catch malformed fields before they reach the frontend
- Check `.github/workflows/*.yml` trigger `paths:` filters to confirm `content/blog/**` commits actually cause a redeploy
