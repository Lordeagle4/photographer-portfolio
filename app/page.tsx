'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import GalleryGrid from '@/components/GalleryGrid'

export default function HomePage() {
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
    <>
      <section className="relative h-[80vh] flex items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="Photographer Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative text-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Capturing Moments, Creating Stories
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/portfolio" className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200">
              View My Work
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">Portfolio</h1>
        <GalleryGrid />
      </section>
      <section className="bg-gray-100 dark:bg-black py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg mb-6">
            I am a professional photographer with a passion for capturing the beauty of the world through my lens.
          </p>
          <Link href="/about" className="text-gray-500 hover:underline font-semibold ">
            Learn More
          </Link>
        </div>
      </section>
      
      <section className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="name" placeholder="Name" className="border w-full p-3 rounded" required />
        <input name="email" type="email" placeholder="Email" className="border w-full p-3 rounded" required />
        <textarea name="message" placeholder="Message" className="border w-full p-3 rounded h-32" required />
        <button type="submit" className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded hover:bg-gray-800">Send</button>
        <p>{status}</p>
      </form>
    </section>
    </>
  )
}
