import Reveal from './Reveal'

export interface RecordItem {
  title: string
  detail: string
  url?: string
}

// Numbered list shared by the Certifications and Awards sections; items with a url get a "Verify" link.
export default function RecordList({ items }: { items: RecordItem[] }) {
  return (
    <div className="border-t border-edge">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={Math.min(index * 60, 240)}>
          <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-edge py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[4rem_1fr_auto] sm:px-2">
            <span className="font-mono text-sm text-faint transition-colors duration-300 group-hover:text-ink">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-heading text-lg font-medium text-ink sm:text-xl">{item.title}</h3>
              {item.detail && <p className="mt-1 text-sm text-muted">{item.detail}</p>}
            </div>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="col-start-2 mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-edge-strong px-4 py-1.5 text-xs font-medium text-body transition-colors duration-200 hover:border-ink/60 hover:text-ink sm:col-start-3 sm:mt-0"
              >
                Verify <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="hidden sm:block" />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
