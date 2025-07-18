'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      }),
    })
    setStatus(res.ok ? 'Message sent!' : 'Error sending message.')
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="name" placeholder="Name" className="border w-full p-3 rounded" required />
        <input name="email" type="email" placeholder="Email" className="border w-full p-3 rounded" required />
        <textarea name="message" placeholder="Message" className="border w-full p-3 rounded h-32" required />
        <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Send</button>
        <p>{status}</p>
      </form>
    </section>
  )
}
