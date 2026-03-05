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
      <footer className="text-center py-6 text-xs text-paper-muted dark:text-terminal-muted border-t border-paper-border dark:border-terminal-border">
        <span className="text-paper-green dark:text-terminal-green">{'>'}</span> {cvData.name} © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App
