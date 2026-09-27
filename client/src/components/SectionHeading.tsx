import Reveal from './Reveal'

interface SectionHeadingProps {
  index?: number
  label: string
  title: string
  size?: 'lg' | 'md'
  className?: string
}

export default function SectionHeading({ index, label, title, size = 'lg', className = '' }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <span className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {index !== undefined && <span className="text-ink">{String(index).padStart(2, '0')}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-edge-strong" />
        {label}
      </span>
      <h2
        className={`font-heading font-semibold tracking-tight text-ink ${
          size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'
        }`}
      >
        {title}
      </h2>
    </Reveal>
  )
}
