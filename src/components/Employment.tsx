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
            {job.url ? (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-link font-bold text-sm"
                onClick={e => e.stopPropagation()}
              >
                {job.company}
              </a>
            ) : (
              <span className="text-paper-green dark:text-terminal-green font-bold text-sm">
                {job.company}
              </span>
            )}
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
