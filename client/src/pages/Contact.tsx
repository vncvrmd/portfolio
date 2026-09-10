import { useState } from 'react'
import { apiUrl } from '../api'
import Reveal from '../components/Reveal'

const contactMethods = [
  {
    label: 'Email me',
    value: 'vincevermudo@gmail.com',
    href: 'mailto:vincevermudo@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vtvermudo',
    href: 'https://www.linkedin.com/in/vtvermudo/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.5h3V20h-3V8.5Zm6 0h2.88v1.57h.04c.4-.76 1.38-1.57 2.85-1.57 3.05 0 3.61 2 3.61 4.6V20h-3v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.85V20h-3V8.5Z" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    value: 'github.com/vncvrmd',
    href: 'https://github.com/vncvrmd',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    )
  }
]

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [response, setResponse] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponse('')

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      })
      const data = await res.json()
      if (res.ok) {
        setIsError(false)
        setResponse(data.message)
        setFormState({ name: '', email: '', message: '' })
      } else {
        setIsError(true)
        setResponse(data.error || 'Error')
      }
    } catch {
      setIsError(true)
      setResponse('Unable to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <Reveal>
        <span className="section-label">Get in touch</span>
        <h2 className="font-heading text-3xl font-bold text-ink">Contact</h2>
        <p className="mt-3 max-w-md text-body">Have an opportunity or question? Reach out through any of these.</p>

        <div className="mt-8 space-y-4">
          {contactMethods.map(method => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-edge bg-panel/60 p-4 transition-colors duration-200 hover:border-accent/60"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent2">
                {method.icon}
              </span>
              <span>
                <span className="block text-xs text-muted">{method.label}</span>
                <span className="block text-sm font-medium text-ink">{method.value}</span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120} className="section">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="field-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="field-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="Your email"
                className="field-input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formState.message}
              onChange={handleChange}
              rows={5}
              placeholder="Message"
              className="field-input resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
          {response && (
            <p
              role="status"
              aria-live="polite"
              className={
                isError
                  ? 'flex items-center gap-2 rounded-xl border border-err/30 bg-err/10 px-4 py-2.5 text-sm font-medium text-err'
                  : 'status-toast'
              }
            >
              {!isError && <span aria-hidden="true">✓</span>}
              {response}
            </p>
          )}
        </form>
      </Reveal>
    </div>
  )
}
