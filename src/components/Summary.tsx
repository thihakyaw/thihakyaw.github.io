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
