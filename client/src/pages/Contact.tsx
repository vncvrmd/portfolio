import React, { useState } from 'react'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [response, setResponse] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
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
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-2xl font-semibold text-slate-100">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" value={formState.name} onChange={handleChange} placeholder="Your name" className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100" />
          <input name="email" value={formState.email} onChange={handleChange} placeholder="Your email" className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100" />
        </div>
        <textarea name="message" value={formState.message} onChange={handleChange} rows={5} placeholder="Message" className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100" />
        <button className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950">Send</button>
        {response && <p className="text-cyan-300">{response}</p>}
      </form>
    </section>
  )
}
