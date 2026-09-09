import { useState } from 'react'
import { apiUrl } from '../api'

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
    <section className="section max-w-2xl">
      <span className="section-label">Get in touch</span>
      <h2 className="font-heading text-3xl font-bold text-ink">Contact</h2>
      <p className="mt-2 text-sm text-body">Have an opportunity or question? Send a message below.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
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
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
        {response && (
          <p
            role="status"
            aria-live="polite"
            className={isError ? 'flex items-center gap-2 rounded-xl border border-err/30 bg-err/10 px-4 py-2.5 text-sm font-medium text-err' : 'status-toast'}
          >
            {!isError && <span aria-hidden="true">✓</span>}
            {response}
          </p>
        )}
      </form>
    </section>
  )
}
