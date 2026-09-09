import React, { useState } from 'react'
import { apiUrl } from '../api'

const inputClass =
  'w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 transition-colors duration-200 focus:border-cyan-400'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [response, setResponse] = useState('')
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
        setResponse(data.message)
        setFormState({ name: '', email: '', message: '' })
      } else {
        setResponse(data.error || 'Error')
      }
    } catch {
      setResponse('Unable to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="font-heading text-2xl font-semibold text-slate-100">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
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
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
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
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
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
            className={`${inputClass} rounded-3xl`}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
        {response && (
          <p role="status" aria-live="polite" className="text-cyan-300">
            {response}
          </p>
        )}
      </form>
    </section>
  )
}
