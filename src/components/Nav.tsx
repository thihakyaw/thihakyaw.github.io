import { useState } from 'react'

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
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-paper-bg dark:bg-terminal-bg border-b border-paper-border dark:border-terminal-border">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-paper-green dark:text-terminal-green font-bold text-sm">
          <span className="opacity-60">~/</span>thihakyaw
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

          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="sm:hidden text-xs border border-paper-border dark:border-terminal-border px-2 py-1 hover:border-paper-green dark:hover:border-terminal-green hover:text-paper-green dark:hover:text-terminal-green transition-colors"
          >
            {open ? '[×]' : '[≡]'}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-paper-border dark:border-terminal-border">
          <ul className="max-w-3xl mx-auto px-4 py-2 flex flex-col gap-1 text-xs">
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-paper-text dark:text-terminal-text hover:text-paper-green dark:hover:text-terminal-green transition-colors"
                >
                  {'>'} {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
