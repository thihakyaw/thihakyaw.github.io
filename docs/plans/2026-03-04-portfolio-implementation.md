# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page retro-style portfolio website, deployed to GitHub Pages, with a CV-driven update flow.

**Architecture:** Vite + React + TypeScript + Tailwind CSS single-page app. All CV content lives in `src/data/cv.json`. A Node.js script (`scripts/update-cv.js`) reads a local PDF and uses the Claude API to regenerate `cv.json`. A Claude skill automates the update workflow. Deployed via `gh-pages`.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS v3, gh-pages, @anthropic-ai/sdk, pdf-parse, JetBrains Mono (Google Fonts), Devicons SVGs

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Create: `.gitignore`
- Create: `tailwind.config.js`, `postcss.config.js`

**Step 1: Scaffold with Vite**

```bash
cd /path/to/your-portfolio
npm create vite@latest . -- --template react-ts
```
Select "React" → "TypeScript" if prompted. Answer "yes" to overwrite if asked about existing files.

**Step 2: Install Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 3: Install runtime dependencies**

```bash
npm install
npm install gh-pages
npm install -D @types/node
```

**Step 4: Configure `tailwind.config.js`**

Replace the generated file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0d0d0d',
          text: '#d4d4d4',
          green: '#00ff41',
          amber: '#fbbf24',
          border: '#2a2a2a',
        },
        paper: {
          bg: '#f5f0e8',
          text: '#1a1a1a',
          green: '#2d7a2d',
          amber: '#92400e',
          border: '#c5bfb0',
        },
      },
    },
  },
  plugins: [],
}
```

**Step 5: Configure `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

**Step 6: Set up `src/index.css`**

Replace the generated file with:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  body {
    @apply bg-paper-bg text-paper-text transition-colors duration-300;
  }

  .dark body {
    @apply bg-terminal-bg text-terminal-text;
  }
}

@layer components {
  .section-heading {
    @apply text-paper-green dark:text-terminal-green font-bold text-lg mb-6 before:content-['>_'];
  }

  .retro-card {
    @apply border border-paper-border dark:border-terminal-border p-4 hover:border-paper-green dark:hover:border-terminal-green transition-colors duration-200;
  }

  .retro-link {
    @apply text-paper-green dark:text-terminal-green underline-offset-4 hover:underline;
  }
}
```

**Step 7: Update `.gitignore`**

Add these lines to the generated `.gitignore`:

```
# CV files — local only
cv/

# dist
dist/
```

**Step 8: Update `package.json` scripts**

Add to the `scripts` section:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "vite build && gh-pages -d dist",
    "update-cv": "node scripts/update-cv.js"
  }
}
```

**Step 9: Verify the scaffold builds**

```bash
npm run build
```
Expected: Build succeeds, `dist/` created with no errors.

**Step 10: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind portfolio"
```

---

## Task 2: Create cv.json with full CV content

**Files:**
- Create: `src/data/cv.json`

**Step 1: Create the data directory and cv.json**

Create `src/data/cv.json` with this exact content (populated from the CV PDF):

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "contact": {
    "email": "your@email.com",
    "github": "https://github.com/yourusername",
    "linkedin": "https://www.linkedin.com/in/yourusername"
  },
  "summary": [
    "Summary paragraph 1.",
    "Summary paragraph 2.",
    "Summary paragraph 3."
  ],
  "skills": [
    { "name": "Laravel", "icon": "laravel" },
    { "name": "PHP", "icon": "php" },
    { "name": "NodeJS", "icon": "nodejs" },
    { "name": "JavaScript", "icon": "javascript" },
    { "name": "TypeScript", "icon": "typescript" },
    { "name": "MySQL", "icon": "mysql" },
    { "name": "PostgreSQL", "icon": "postgresql" },
    { "name": "MongoDB", "icon": "mongodb" },
    { "name": "REST API", "icon": null },
    { "name": "GraphQL", "icon": "graphql" },
    { "name": "Linux", "icon": "linux" },
    { "name": "Git", "icon": "git" },
    { "name": "AWS", "icon": "aws" },
    { "name": "Docker", "icon": "docker" },
    { "name": "Digital Ocean", "icon": "digitalocean" }
  ],
  "employment": [
    {
      "company": "Company Name",
      "role": "Your Role",
      "period": "Mon YYYY – Present",
      "location": "City",
      "url": "https://company.com",
      "projects": [
        {
          "name": "Project Name",
          "description": "Project description.",
          "url": null
        }
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Name",
      "period": "Mon YYYY – Mon YYYY",
      "location": "City",
      "honor": "First Class Honors"
    }
  ],
  "awards": [
    {
      "title": "Award Title",
      "institution": "Institution Name",
      "period": "Mon YYYY – Mon YYYY",
      "location": "City"
    }
  ]
}
```

**Step 2: Commit**

```bash
git add src/data/cv.json
git commit -m "feat: add cv.json with full CV content"
```

---

## Task 3: Fetch and add SVG icons to public/icons/

**Files:**
- Create: `public/icons/` directory with SVG files

**Step 1: Create icons directory**

```bash
mkdir -p public/icons
```

**Step 2: Download Devicons SVGs**

Download these SVGs from https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ — use the `original` or `plain` variants. Use curl or wget:

```bash
# Tech icons
for icon in laravel/laravel-original php/php-original nodejs/nodejs-original javascript/javascript-original typescript/typescript-original mysql/mysql-original postgresql/postgresql-original mongodb/mongodb-original graphql/graphql-plain linux/linux-original git/git-original amazonwebservices/amazonwebservices-plain-wordmark docker/docker-plain digitalocean/digitalocean-original; do
  name=$(echo $icon | cut -d'/' -f2)
  curl -L "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/$icon.svg" -o "public/icons/${name}.svg" 2>/dev/null
done
```

**Step 3: Download social icons**

For GitHub, use the official SVG. For LinkedIn and email, use simple SVGs:

```bash
# GitHub mark SVG
curl -L "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg" -o "public/icons/github.svg"
curl -L "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg" -o "public/icons/linkedin.svg"
```

Create `public/icons/email.svg` manually:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <polyline points="2,4 12,13 22,4"/>
</svg>
```

**Step 4: Verify icons exist**

```bash
ls public/icons/
```
Expected: ~17 SVG files

**Step 5: Commit**

```bash
git add public/icons/
git commit -m "feat: add SVG icons for tech stack and social links"
```

---

## Task 4: Build App.tsx with dark mode state

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Step 1: Update `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 2: Update `src/App.tsx`**

```tsx
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Skills from './components/Skills'
import Employment from './components/Employment'
import Education from './components/Education'
import cvData from './data/cv.json'

function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen bg-paper-bg dark:bg-terminal-bg text-paper-text dark:text-terminal-text font-mono transition-colors duration-300">
      <Nav dark={dark} onToggle={() => setDark(d => !d)} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Hero data={cvData} />
        <Summary data={cvData.summary} />
        <Skills data={cvData.skills} />
        <Employment data={cvData.employment} />
        <Education education={cvData.education} awards={cvData.awards} />
      </main>
      <footer className="text-center py-6 text-xs text-paper-border dark:text-terminal-border border-t border-paper-border dark:border-terminal-border">
        <span className="text-paper-green dark:text-terminal-green">{'>'}</span> {cvData.name} © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: Errors about missing component files — that's expected at this stage.

---

## Task 5: Build Nav component

**Files:**
- Create: `src/components/Nav.tsx`

**Step 1: Create `src/components/Nav.tsx`**

```tsx
interface NavProps {
  dark: boolean
  onToggle: () => void
}

const sections = [
  { id: 'summary', label: 'SUMMARY' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'employment', label: 'WORK' },
  { id: 'education', label: 'EDU' },
]

export default function Nav({ dark, onToggle }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-paper-bg dark:bg-terminal-bg border-b border-paper-border dark:border-terminal-border">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-paper-green dark:text-terminal-green font-bold text-sm">
          <span className="opacity-60">~/</span>username
        </span>

        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-4 text-xs">
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-paper-text dark:text-terminal-text hover:text-paper-green dark:hover:text-terminal-green transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={onToggle}
            aria-label="Toggle dark mode"
            className="text-xs border border-paper-border dark:border-terminal-border px-2 py-1 hover:border-paper-green dark:hover:border-terminal-green hover:text-paper-green dark:hover:text-terminal-green transition-colors"
          >
            {dark ? '[LIGHT]' : '[DARK]'}
          </button>
        </div>
      </div>
    </nav>
  )
}
```

---

## Task 6: Build Hero component

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Create `src/components/Hero.tsx`**

```tsx
import type { CvData } from '../types'

interface HeroProps {
  data: CvData
}

export default function Hero({ data }: HeroProps) {
  const { name, title, location, contact } = data

  return (
    <section id="hero" className="py-12 border-b border-paper-border dark:border-terminal-border">
      <div className="mb-2 text-xs text-paper-border dark:text-terminal-border">
        <span className="text-paper-green dark:text-terminal-green">username@portfolio</span>
        <span>:</span>
        <span className="text-paper-amber dark:text-terminal-amber">~</span>
        <span>$</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-paper-text dark:text-terminal-text mb-1">
        {name}
      </h1>
      <p className="text-paper-amber dark:text-terminal-amber text-sm mb-1">{title}</p>
      <p className="text-xs text-paper-border dark:text-terminal-border mb-6">{location}</p>

      <div className="flex flex-wrap gap-4 text-xs">
        <a
          href={`mailto:${contact.email}`}
          className="retro-link flex items-center gap-1.5"
        >
          <img src="/icons/email.svg" alt="" className="w-4 h-4 dark:invert opacity-70" />
          {contact.email}
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-link flex items-center gap-1.5"
        >
          <img src="/icons/github.svg" alt="" className="w-4 h-4 dark:invert opacity-70" />
          github
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-link flex items-center gap-1.5"
        >
          <img src="/icons/linkedin.svg" alt="" className="w-4 h-4 dark:invert opacity-70" />
          linkedin
        </a>
      </div>
    </section>
  )
}
```

**Step 2: Create `src/types.ts`**

Since multiple components use shared types, define them here:

```ts
export interface Contact {
  email: string
  github: string
  linkedin: string
}

export interface Skill {
  name: string
  icon: string | null
}

export interface Project {
  name: string
  description: string
  url: string | null
}

export interface Employment {
  company: string
  role: string
  period: string
  location: string
  url: string | null
  projects: Project[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  location: string
  honor: string | null
}

export interface Award {
  title: string
  institution: string
  period: string
  location: string
}

export interface CvData {
  name: string
  title: string
  location: string
  contact: Contact
  summary: string[]
  skills: Skill[]
  employment: Employment[]
  education: Education[]
  awards: Award[]
}
```

---

## Task 7: Build Summary component

**Files:**
- Create: `src/components/Summary.tsx`

**Step 1: Create `src/components/Summary.tsx`**

```tsx
interface SummaryProps {
  data: string[]
}

export default function Summary({ data }: SummaryProps) {
  return (
    <section id="summary" className="py-10 border-b border-paper-border dark:border-terminal-border">
      <h2 className="section-heading">[SUMMARY]</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        {data.map((para, i) => (
          <p key={i} className="text-paper-text dark:text-terminal-text opacity-90">
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}
```

---

## Task 8: Build Skills component

**Files:**
- Create: `src/components/Skills.tsx`

**Step 1: Create `src/components/Skills.tsx`**

```tsx
import type { Skill } from '../types'

interface SkillsProps {
  data: Skill[]
}

const ICON_MAP: Record<string, string> = {
  laravel: '/icons/laravel-original.svg',
  php: '/icons/php-original.svg',
  nodejs: '/icons/nodejs-original.svg',
  javascript: '/icons/javascript-original.svg',
  typescript: '/icons/typescript-original.svg',
  mysql: '/icons/mysql-original.svg',
  postgresql: '/icons/postgresql-original.svg',
  mongodb: '/icons/mongodb-original.svg',
  graphql: '/icons/graphql-plain.svg',
  linux: '/icons/linux-original.svg',
  git: '/icons/git-original.svg',
  aws: '/icons/amazonwebservices-plain-wordmark.svg',
  docker: '/icons/docker-plain.svg',
  digitalocean: '/icons/digitalocean-original.svg',
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-10 border-b border-paper-border dark:border-terminal-border">
      <h2 className="section-heading">[SKILLS]</h2>
      <div className="flex flex-wrap gap-2">
        {data.map(skill => (
          <div
            key={skill.name}
            className="retro-card flex items-center gap-2 text-xs px-3 py-2 text-paper-text dark:text-terminal-text"
          >
            {skill.icon && ICON_MAP[skill.icon] ? (
              <img
                src={ICON_MAP[skill.icon]}
                alt={skill.name}
                className="w-4 h-4 object-contain"
                loading="lazy"
              />
            ) : null}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## Task 9: Build Employment component

**Files:**
- Create: `src/components/Employment.tsx`

**Step 1: Create `src/components/Employment.tsx`**

```tsx
import { useState } from 'react'
import type { Employment as EmploymentType } from '../types'

interface EmploymentProps {
  data: EmploymentType[]
}

function JobCard({ job }: { job: EmploymentType }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="retro-card mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <span className="text-paper-green dark:text-terminal-green font-bold text-sm">
              {job.company}
            </span>
            <span className="text-paper-text dark:text-terminal-text text-sm"> / {job.role}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-paper-border dark:text-terminal-border">
            <span>{job.period}</span>
            <span className="text-paper-green dark:text-terminal-green">{open ? '[-]' : '[+]'}</span>
          </div>
        </div>
        <div className="text-xs text-paper-border dark:text-terminal-border mt-0.5">{job.location}</div>
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-paper-border dark:border-terminal-border pt-4">
          {job.projects.map(project => (
            <div key={project.name}>
              <div className="text-xs font-bold text-paper-amber dark:text-terminal-amber mb-1">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-link"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </div>
              <p className="text-xs text-paper-text dark:text-terminal-text opacity-80 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Employment({ data }: EmploymentProps) {
  return (
    <section id="employment" className="py-10 border-b border-paper-border dark:border-terminal-border">
      <h2 className="section-heading">[WORK EXPERIENCE]</h2>
      <div>
        {data.map(job => (
          <JobCard key={job.company + job.period} job={job} />
        ))}
      </div>
    </section>
  )
}
```

---

## Task 10: Build Education component

**Files:**
- Create: `src/components/Education.tsx`

**Step 1: Create `src/components/Education.tsx`**

```tsx
import type { Education as EducationType, Award } from '../types'

interface EducationProps {
  education: EducationType[]
  awards: Award[]
}

export default function Education({ education, awards }: EducationProps) {
  return (
    <section id="education" className="py-10">
      <h2 className="section-heading">[EDUCATION]</h2>
      <div className="space-y-4 mb-10">
        {education.map(edu => (
          <div key={edu.institution + edu.degree} className="retro-card text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <span className="font-bold text-paper-green dark:text-terminal-green">{edu.institution}</span>
                <span className="text-paper-text dark:text-terminal-text"> / {edu.degree}</span>
              </div>
              <span className="text-xs text-paper-border dark:text-terminal-border">{edu.period}</span>
            </div>
            <div className="text-xs text-paper-border dark:text-terminal-border mt-0.5">{edu.location}</div>
            {edu.honor && (
              <div className="text-xs text-paper-amber dark:text-terminal-amber mt-1">{edu.honor}</div>
            )}
          </div>
        ))}
      </div>

      <h2 className="section-heading">[AWARDS]</h2>
      <div className="space-y-3">
        {awards.map(award => (
          <div key={award.title} className="retro-card text-sm">
            <div className="font-bold text-paper-amber dark:text-terminal-amber">{award.title}</div>
            <div className="text-xs text-paper-border dark:text-terminal-border mt-0.5">
              {award.institution} · {award.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## Task 11: Wire up types, verify build

**Files:**
- Modify: `src/App.tsx` (add type import)
- Modify: `src/components/Hero.tsx` (add type import)

**Step 1: Update type imports**

In `src/App.tsx`, the `cvData` import from JSON may need `resolveJsonModule: true` in tsconfig. Update `tsconfig.json` to include:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

**Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```
Expected: No errors.

**Step 3: Run dev server and verify visually**

```bash
npm run dev
```
Open `http://localhost:5173` in browser. Check:
- [ ] Dark mode toggle works
- [ ] All sections render
- [ ] Smooth scroll works when clicking nav links
- [ ] Mobile view looks correct (resize browser)

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement all portfolio components with retro style"
```

---

## Task 12: Create update-cv.js script

**Files:**
- Create: `scripts/update-cv.js`

**Step 1: Install script dependencies**

```bash
npm install -D @anthropic-ai/sdk pdf-parse
```

**Step 2: Create `scripts/update-cv.js`**

```js
#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'
import pdfParse from 'pdf-parse'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CV_PATH = path.join(__dirname, '..', 'cv', 'cv.pdf')
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'cv.json')

async function main() {
  if (!fs.existsSync(CV_PATH)) {
    console.error(`Error: CV not found at ${CV_PATH}`)
    console.error('Drop your CV PDF at cv/cv.pdf and try again.')
    process.exit(1)
  }

  console.log('Reading CV PDF...')
  const pdfBuffer = fs.readFileSync(CV_PATH)
  const pdfData = await pdfParse(pdfBuffer)
  const pdfText = pdfData.text

  console.log('Extracting structured data with Claude...')
  const client = new Anthropic()

  const currentJson = fs.existsSync(OUTPUT_PATH)
    ? fs.readFileSync(OUTPUT_PATH, 'utf8')
    : '{}'

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Extract structured CV data from this CV text and return ONLY valid JSON matching the schema below. Do NOT include phone numbers.

CURRENT JSON (for reference):
${currentJson}

CV TEXT:
${pdfText}

REQUIRED JSON SCHEMA:
{
  "name": "string",
  "title": "string",
  "location": "string",
  "contact": {
    "email": "string",
    "github": "string (full URL)",
    "linkedin": "string (full URL)"
  },
  "summary": ["paragraph string", ...],
  "skills": [{ "name": "string", "icon": "string|null" }, ...],
  "employment": [{
    "company": "string",
    "role": "string",
    "period": "string",
    "location": "string",
    "url": "string|null",
    "projects": [{
      "name": "string",
      "description": "string",
      "url": "string|null"
    }]
  }],
  "education": [{
    "institution": "string",
    "degree": "string",
    "period": "string",
    "location": "string",
    "honor": "string|null"
  }],
  "awards": [{
    "title": "string",
    "institution": "string",
    "period": "string",
    "location": "string"
  }]
}

For skills icons, use these keys where applicable: laravel, php, nodejs, javascript, typescript, mysql, postgresql, mongodb, graphql, linux, git, aws, docker, digitalocean. Set icon to null if no match.

Return ONLY the JSON, no markdown, no explanation.`
      }
    ]
  })

  const jsonText = message.content[0].type === 'text' ? message.content[0].text : ''

  let parsed
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    console.error('Failed to parse Claude response as JSON:')
    console.error(jsonText)
    process.exit(1)
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(parsed, null, 2))
  console.log(`cv.json updated at ${OUTPUT_PATH}`)
  console.log('Review the changes, then run: npm run deploy')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
```

**Step 3: Update `package.json` to use ES modules for scripts**

Add `"type": "module"` to `package.json`, or add a `scripts/package.json` with `{ "type": "module" }` if the root package is CommonJS.

If using the root approach, verify Vite still builds fine:
```bash
npm run build
```

**Step 4: Commit**

```bash
git add scripts/update-cv.js
git commit -m "feat: add update-cv script using Claude API to parse PDF"
```

---

## Task 13: Create Claude skill for portfolio regeneration

**Files:**
- Create: `.claude/skills/regenerate-portfolio.md`

**Step 1: Create `.claude/skills/` directory**

```bash
mkdir -p .claude/skills
```

**Step 2: Create `.claude/skills/regenerate-portfolio.md`**

````markdown
---
name: regenerate-portfolio
description: >
  Use when updating portfolio content after a CV change.
  Triggered by: "update my portfolio", "regenerate portfolio", "new CV".
---

# Regenerate Portfolio Content

## Overview

This skill updates the portfolio website content from a new CV PDF.

## Prerequisites

- `cv/cv.pdf` must exist (local only, gitignored)
- `ANTHROPIC_API_KEY` environment variable must be set

## Steps

### Step 1: Verify CV file exists

```bash
ls cv/cv.pdf
```

If not found, ask the user to drop their updated CV at `cv/cv.pdf`.

### Step 2: Run update script

```bash
npm run update-cv
```

This calls Claude API (Haiku model) to parse the PDF and rewrite `src/data/cv.json`.

### Step 3: Show diff for review

```bash
git diff src/data/cv.json
```

Ask the user: "Does this look correct? Any changes needed before deploying?"

### Step 4: Deploy (only after user confirms)

```bash
npm run deploy
```

This builds the site and pushes to the `gh-pages` branch.
Live at: https://yourusername.github.io

## Notes

- Phone numbers are automatically excluded by the extraction prompt
- The `cv/` directory is gitignored — the PDF never gets committed
- Skill icons in `cv.json` use fixed keys: laravel, php, nodejs, javascript, typescript, mysql, postgresql, mongodb, graphql, linux, git, aws, docker, digitalocean
````

**Step 3: Commit**

```bash
git add .claude/skills/regenerate-portfolio.md
git commit -m "feat: add Claude skill for portfolio regeneration"
```

---

## Task 14: Set up GitHub Pages deployment

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

**Step 1: Ensure `gh-pages` is installed**

```bash
npm list gh-pages
```
If missing: `npm install -D gh-pages`

**Step 2: Verify `package.json` deploy script**

The `deploy` script should be: `"deploy": "vite build && gh-pages -d dist"`

Also add `homepage` field to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io"
}
```

**Step 3: Set `vite.config.ts` base**

For a user/org GitHub Pages site (`yourusername.github.io`), base should be `/`:
```ts
export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

**Step 4: Initialize GitHub remote**

```bash
git remote add origin https://github.com/yourusername/yourusername.github.io.git
```
(Create the repo on GitHub first if it doesn't exist — must be named `yourusername.github.io` for user site)

**Step 5: First deploy**

```bash
npm run deploy
```
Expected: Site builds, `gh-pages` branch pushed to GitHub, live at `https://yourusername.github.io`.

**Step 6: Final commit of any remaining changes**

```bash
git add -A
git commit -m "feat: configure GitHub Pages deployment"
git push -u origin main
```

---

## Task 15: Save project info to Claude memory

**Files:**
- Create: `~/.claude/projects/<your-project-path>/memory/MEMORY.md`

**Step 1: Write memory file**

```markdown
# Portfolio Project Memory

## Project
- Portfolio — deployed to https://yourusername.github.io
- Stack: Vite + React + TypeScript + Tailwind CSS
- Font: JetBrains Mono
- Style: Retro terminal aesthetic, dark/light mode

## Key Files
- `src/data/cv.json` — all CV content (single source of truth)
- `scripts/update-cv.js` — parses new PDF via Claude API → updates cv.json
- `.claude/skills/regenerate-portfolio.md` — skill for updating portfolio
- `cv/cv.pdf` — LOCAL ONLY, gitignored, never committed

## Update Flow
1. Drop new PDF at `cv/cv.pdf`
2. `npm run update-cv` (requires ANTHROPIC_API_KEY)
3. Review `git diff src/data/cv.json`
4. `npm run deploy`

## Deployment
- GitHub Pages user site: https://yourusername.github.io
- Deploy: `npm run deploy` → vite build → gh-pages -d dist
- Repo: https://github.com/yourusername/yourusername.github.io

## Constraints
- NO phone number anywhere
- `cv/` directory is gitignored
```

---

## Summary of Scripts

| Command | Action |
|---|---|
| `npm run dev` | Local dev server at localhost:5173 |
| `npm run build` | TypeScript compile + Vite build |
| `npm run update-cv` | Parse `cv/cv.pdf` → update `src/data/cv.json` |
| `npm run deploy` | Build + push to gh-pages |
