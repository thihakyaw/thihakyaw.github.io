#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'
import pdfParse from 'pdf-parse'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CV_PATH = path.join(__dirname, '..', 'cv', 'cv.pdf')
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'cv.json')

const ICON_KEYS = [
  'laravel', 'php', 'nodejs', 'javascript', 'typescript',
  'mysql', 'postgresql', 'mongodb', 'graphql', 'linux',
  'git', 'aws', 'docker', 'digitalocean',
]

async function main() {
  if (!fs.existsSync(CV_PATH)) {
    console.error(`\nError: CV not found at cv/cv.pdf`)
    console.error('Drop your updated CV PDF at cv/cv.pdf and try again.\n')
    process.exit(1)
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('\nError: ANTHROPIC_API_KEY environment variable is not set.\n')
    process.exit(1)
  }

  console.log('Reading CV PDF...')
  const pdfBuffer = fs.readFileSync(CV_PATH)
  const pdfData = await pdfParse(pdfBuffer)
  const pdfText = pdfData.text

  if (!pdfText.trim()) {
    console.error('Error: Could not extract text from PDF. Is it a scanned image?')
    process.exit(1)
  }

  console.log(`Extracted ${pdfText.length} characters from PDF.`)
  console.log('Sending to Claude for structured extraction...')

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
        content: `Extract structured CV data from the CV text below and return ONLY valid JSON. Rules:
- Do NOT include phone numbers anywhere
- Keep all URLs as full URLs (https://...)
- For skill icons, use ONLY these keys where they match: ${ICON_KEYS.join(', ')}. Set icon to null if no match.
- Preserve all employment history with company URLs and project URLs where available
- Summary should be an array of paragraphs (strings)

CURRENT JSON (use as reference for structure/icon keys):
${currentJson}

CV TEXT:
${pdfText}

Return this exact JSON schema, no markdown fences, no explanation:
{
  "name": "string",
  "title": "string",
  "location": "string",
  "contact": {
    "email": "string",
    "github": "string",
    "linkedin": "string"
  },
  "summary": ["string"],
  "skills": [{ "name": "string", "icon": "string|null" }],
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
}`,
      },
    ],
  })

  const rawText = message.content[0].type === 'text' ? message.content[0].text.trim() : ''

  // Strip markdown code fences if Claude adds them anyway
  const jsonText = rawText.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim()

  let parsed
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    console.error('\nFailed to parse Claude response as JSON.')
    console.error('Raw response saved to scripts/last-response.txt for debugging.')
    fs.writeFileSync(path.join(__dirname, 'last-response.txt'), rawText)
    process.exit(1)
  }

  // Safety: strip phone if it snuck through
  if (parsed.contact?.phone) delete parsed.contact.phone

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(parsed, null, 2))
  console.log(`\ncv.json updated at src/data/cv.json`)
  console.log('\nNext steps:')
  console.log('  1. Review changes: git diff src/data/cv.json')
  console.log('  2. Deploy:         npm run deploy\n')
}

main().catch(err => {
  console.error('\nUnexpected error:', err.message)
  process.exit(1)
})
