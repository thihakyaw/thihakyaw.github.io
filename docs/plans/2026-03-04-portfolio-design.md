# Portfolio Website Design — 2026-03-04

## Overview

A single-page portfolio website for Thiha Kyaw, deployed to `https://thihakyaw.github.io`.
Built with Vite + React + TypeScript + Tailwind CSS. Retro terminal aesthetic with dark/light mode.

## Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **Font:** JetBrains Mono (Google Fonts)
- **Deployment:** `gh-pages` npm package → `https://thihakyaw.github.io`
- **Icons:** SVG-first (Devicons), PNG fallback, resized for performance

## Project Structure

```
thihakyaw-portfolio/
├── src/
│   ├── components/
│   │   ├── Nav.tsx           # Sticky nav with section anchors + dark/light toggle
│   │   ├── Hero.tsx          # Name, role, contact links
│   │   ├── Summary.tsx       # Career summary paragraphs
│   │   ├── Skills.tsx        # Tech badge grid with SVG icons
│   │   ├── Employment.tsx    # Vertical timeline of jobs + projects
│   │   └── Education.tsx     # Education & awards cards
│   ├── data/
│   │   └── cv.json           # Single source of truth for all CV content
│   ├── App.tsx               # Assembles sections, manages dark/light state
│   ├── main.tsx
│   └── index.css             # Tailwind base + custom retro styles
├── scripts/
│   └── update-cv.js          # Reads cv/cv.pdf → updates src/data/cv.json via Claude API
├── cv/                       # LOCAL ONLY — in .gitignore
│   └── cv.pdf
├── public/
│   └── icons/                # SVG/PNG tech and social icons
├── .claude/
│   └── skills/
│       └── regenerate-portfolio.md   # Claude skill for portfolio content updates
├── docs/
│   └── plans/
│       └── 2026-03-04-portfolio-design.md
├── .gitignore                # includes cv/
└── vite.config.ts
```

## Sections

All content driven from `src/data/cv.json`. Sections rendered top-to-bottom:

1. **Hero** — Name, role, email + GitHub + LinkedIn (no phone number), retro terminal prompt style
2. **Summary** — Career overview paragraphs in a terminal-output styled block
3. **Skills** — Badge grid with SVG tech icons
4. **Employment History** — Vertical timeline; each entry shows company, role, dates, project list
5. **Education & Awards** — Simple bordered cards

## Visual Design

### Retro Terminal Aesthetic

- **Font:** JetBrains Mono throughout
- **Dark mode:** Background `#0d0d0d`, green `#39FF14` accents, amber `#fbbf24` headings
- **Light mode:** Cream `#f5f0e8`, near-black text, muted green accents
- **Section headers:** Styled as `> [SECTION_NAME]` terminal prompt syntax
- **Cards/sections:** Thin solid borders, slight pixel/terminal feel
- **Hover effects:** Color inversion or subtle glow
- **Smooth scroll:** `scroll-behavior: smooth` on `<html>`
- **Dark/light toggle:** Sticky nav button, icon-based (sun/terminal style)
- **Preference persistence:** `localStorage` for theme preference

### Icons

- Social links: GitHub SVG, LinkedIn SVG, Email SVG
- Tech stack: Devicons SVGs where available, PNG fallback
- All images resized/optimized for fast load

## cv.json Schema

```json
{
  "name": "Thiha Kyaw",
  "title": "Software Engineer / Backend Engineer",
  "location": "Bangkok, Thailand",
  "contact": {
    "email": "thihakyaw.dev@gmail.com",
    "github": "https://github.com/thihakyaw",
    "linkedin": "https://www.linkedin.com/in/thiha-kyaw"
  },
  "summary": ["paragraph 1", "paragraph 2", "paragraph 3"],
  "skills": ["Laravel", "PHP", "NodeJS", "JavaScript", "TypeScript", "MySQL", "PostgreSQL", "MongoDB", "REST API", "GraphQL", "Linux", "Git", "AWS", "Docker"],
  "employment": [
    {
      "company": "Sertis",
      "role": "Full-stack Engineer",
      "period": "Nov 2023 – Present",
      "location": "Bangkok",
      "url": "https://www.sertiscorp.com/",
      "projects": [
        { "name": "Renewable Energy Acceleration Platform", "description": "...", "url": null },
        { "name": "Sertis Careers Website", "description": "...", "url": "https://careers.sertiscorp.com" }
      ]
    }
  ],
  "education": [
    {
      "institution": "University Of Greenwich",
      "degree": "Business Information Technology",
      "period": "Dec 2016 – Dec 2017",
      "location": "Mandalay",
      "honor": "First Class Honors"
    }
  ],
  "awards": [
    {
      "title": "First Class Honors in Business Information Technology",
      "institution": "University Of Greenwich",
      "period": "Dec 2016 – Dec 2017"
    }
  ]
}
```

## Update Flow

1. Drop updated CV PDF into `cv/cv.pdf` (local only, gitignored)
2. Run `npm run update-cv` — Node script calls Claude API (Haiku) to parse PDF → writes `src/data/cv.json`
3. Review `cv.json` changes
4. Run `npm run build && npm run deploy` → pushes `dist/` to `gh-pages` branch

## Deployment

- `vite.config.ts`: `base: '/'` (user/org site)
- `package.json` scripts:
  - `build`: `vite build`
  - `deploy`: `vite build && gh-pages -d dist`
  - `update-cv`: `node scripts/update-cv.js`

## Claude Skill

File: `.claude/skills/regenerate-portfolio.md`

When invoked ("update my portfolio" / "regenerate portfolio content"), the skill:
1. Confirms `cv/cv.pdf` exists
2. Runs `npm run update-cv`
3. Shows a diff of `cv.json` changes for review
4. Optionally runs `npm run deploy`

## Constraints

- No phone number anywhere in the site or `cv.json`
- `cv/` directory in `.gitignore`
- Mobile responsive (Tailwind responsive utilities)
- Single page — no routing
- Smooth scroll between sections
