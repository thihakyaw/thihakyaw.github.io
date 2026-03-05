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
  claude: '/icons/claude.svg',
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
