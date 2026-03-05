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
              <span className="text-xs text-paper-muted dark:text-terminal-muted">{edu.period}</span>
            </div>
            <div className="text-xs text-paper-muted dark:text-terminal-muted mt-0.5">{edu.location}</div>
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
            <div className="text-xs text-paper-muted dark:text-terminal-muted mt-0.5">
              {award.institution} · {award.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
