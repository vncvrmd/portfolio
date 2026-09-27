import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, transform, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react'
import { apiUrl } from '../../api'
import { useSound } from '../../soundPreference'

const links = [
  { label: 'Email', value: 'vincevermudo@gmail.com', href: 'mailto:vincevermudo@gmail.com' },
  { label: 'LinkedIn', value: 'in/vtvermudo', href: 'https://www.linkedin.com/in/vtvermudo/' },
  { label: 'GitHub', value: 'vncvrmd', href: 'https://github.com/vncvrmd' }
]

// Last level, reached by balloon: contact details and a message form on the clouds.
export default function JourneyFinale({ ascent }: { ascent: MotionValue<number> }) {
  const opacity = useTransform(ascent, a => transform(a, [0.6, 0.9], [0, 1]))
  const y = useTransform(ascent, a => transform(a, [0.6, 0.9], [60, 0]))
  const [interactive, setInteractive] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [sending, setSending] = useState(false)
  const { play } = useSound()
  const sectionRef = useRef<HTMLElement>(null)

  // `inert` keeps the faded-out form out of the tab order (React 18 has no typed prop for it).
  useEffect(() => {
    if (sectionRef.current) sectionRef.current.inert = !interactive
  }, [interactive])

  // Only focusable/clickable once it has actually faded in.
  useMotionValueEvent(ascent, 'change', a => setInteractive(a > 0.75))

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ ok: true, text: data.message })
        setForm({ name: '', email: '', message: '' })
        play('levelUp')
      } else {
        setStatus({ ok: false, text: data.error || 'Something went wrong.' })
      }
    } catch {
      setStatus({ ok: false, text: 'Unable to send message. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  const field =
    'w-full rounded-md border-[3px] border-surface bg-white px-3 py-2 text-sm text-surface placeholder:text-surface/40 focus:outline-none focus:ring-2 focus:ring-accent'

  return (
    <motion.section
      ref={sectionRef}
      id="journey-contact"
      aria-label="Contact"
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-[9vh] mx-auto w-[min(760px,92vw)] ${interactive ? '' : 'pointer-events-none'}`}
    >
      <div
        data-lenis-prevent
        className="max-h-[70svh] overflow-y-auto rounded-2xl border-[3px] border-surface bg-[#fefce8] p-5 text-surface shadow-[8px_8px_0_#09090b] sm:p-7"
      >
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-strong">Final level · Contact</p>
        <h2 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl">Let’s build something.</h2>
        <p className="mt-2 text-sm text-surface/70">Have an opportunity or question? Reach out any way you like.</p>

        <div className="mt-5 grid gap-6 sm:grid-cols-[0.8fr_1.2fr]">
          <ul className="space-y-2">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex min-h-[44px] items-center justify-between gap-3 rounded-md border-[3px] border-surface bg-white px-3 py-2 shadow-[3px_3px_0_#09090b] transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <span className="font-mono text-[11px] font-bold uppercase">{l.label}</span>
                  <span className="truncate text-sm">{l.value}</span>
                </a>
              </li>
            ))}
          </ul>

          <form onSubmit={onSubmit} className="space-y-2.5" noValidate>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" value={form.name} onChange={onChange} className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Your email" value={form.email} onChange={onChange} className={field} />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea name="message" required rows={4} placeholder="Message" value={form.message} onChange={onChange} className={`${field} resize-none`} />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="min-h-[44px] w-full cursor-pointer rounded-md border-[3px] border-surface bg-accent px-4 py-2 font-heading font-bold text-white shadow-[3px_3px_0_#09090b] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Send message'}
            </button>
            {status && (
              <p role="status" className={`text-sm font-semibold ${status.ok ? 'text-green-700' : 'text-red-700'}`}>
                {status.ok ? '✓ ' : ''}
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  )
}
