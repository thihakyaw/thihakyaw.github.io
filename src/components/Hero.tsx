import type { CvData } from '../types'

interface HeroProps {
  data: CvData
}

export default function Hero({ data }: HeroProps) {
  const { name, title, location, contact } = data

  return (
    <section id="hero" className="py-12 border-b border-paper-border dark:border-terminal-border">
      <div className="mb-2 text-xs text-paper-muted dark:text-terminal-muted">
        <span className="text-paper-green dark:text-terminal-green">thihakyaw@portfolio</span>
        <span>:</span>
        <span className="text-paper-amber dark:text-terminal-amber">~</span>
        <span>$</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-paper-text dark:text-terminal-text mb-1">
        {name}
      </h1>
      <p className="text-paper-amber dark:text-terminal-amber text-sm mb-1">{title}</p>
      <p className="text-xs text-paper-muted dark:text-terminal-muted mb-6">{location}</p>

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
