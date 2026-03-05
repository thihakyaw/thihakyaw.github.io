# thihakyaw-portfolio

Personal portfolio site — Vite + React + TypeScript + Tailwind CSS. Retro terminal aesthetic, deployed to GitHub Pages.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
# → http://localhost:5173
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
# Builds and pushes to gh-pages branch → https://thihakyaw.github.io
```

## Updating CV Content

CV data lives in `src/data/cv.json`. To update it from a PDF:

1. Place your CV at `cv/cv.pdf` (gitignored, never committed)
2. Set your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Run:
   ```bash
   npm run update-cv
   ```
4. Review the diff: `git diff src/data/cv.json`
5. Deploy: `npm run deploy`

## Project Structure

```
src/
  components/     # Nav, Hero, Summary, Skills, Employment, Education
  data/cv.json    # Single source of truth for all CV content
  types.ts        # Shared TypeScript interfaces
  App.tsx         # Dark/light mode state
scripts/
  update-cv.js    # Parses cv.pdf via Claude API → updates cv.json
cv/               # Gitignored — place cv.pdf here
```

## First Deploy

```bash
git remote add origin https://github.com/thihakyaw/thihakyaw.github.io.git
npm run deploy
```
