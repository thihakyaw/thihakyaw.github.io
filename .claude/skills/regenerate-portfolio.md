---
name: regenerate-portfolio
description: >
  Use when updating portfolio content after a CV change.
  Trigger phrases: "update my portfolio", "regenerate portfolio", "new CV", "I updated my CV".
---

# Regenerate Portfolio Content

## Overview

Updates `src/data/cv.json` from a new CV PDF, then optionally deploys to GitHub Pages.

## Prerequisites

- `cv/cv.pdf` must exist (local only — gitignored, never committed)
- `ANTHROPIC_API_KEY` environment variable must be set

## Steps

### Step 1: Verify cv/cv.pdf exists

```bash
ls cv/cv.pdf
```

If not found: tell the user to drop their updated CV PDF at `cv/cv.pdf` and try again.

### Step 2: Run the update script

```bash
npm run update-cv
```

This calls the Claude API (Haiku model) to extract structured data from the PDF
and overwrites `src/data/cv.json`. No phone number will be included.

### Step 3: Show the diff

```bash
git diff src/data/cv.json
```

Present the diff to the user and ask: "Does this look correct? Any changes needed before deploying?"

Wait for confirmation before proceeding.

### Step 4: Deploy (only after user confirms)

```bash
npm run deploy
```

This runs `vite build && gh-pages -d dist` and pushes the built site to the
`gh-pages` branch on GitHub.

Live at: **https://thihakyaw.github.io**

## Notes

- `cv/` is gitignored — the PDF is never committed to the repo
- Phone numbers are stripped by the extraction prompt (and as a safety fallback in the script)
- Skill icon keys in `cv.json`: `laravel`, `php`, `nodejs`, `javascript`, `typescript`, `mysql`, `postgresql`, `mongodb`, `graphql`, `linux`, `git`, `aws`, `docker`, `digitalocean` — set `icon` to `null` for anything else
- If the script fails with a JSON parse error, check `scripts/last-response.txt` for the raw Claude response
