'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'
import GalleryGrid from '@/components/GalleryGrid'
import Preloader from '@/components/Preloader'

type FormStatus = {
  message: string;
  type: 'success' | 'error' | 'idle';
}

export default function HomePage() {
  const [status, setStatus] = useState<FormStatus>({ message: '', type: 'idle' })
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for demo purposes
    // Replace this with real loading logic if needed
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const form = new FormData(e.currentTarget)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
        }),
      })

      if (!res.ok) throw new Error('Failed to send message')
      
      setStatus({ message: 'Message sent successfully!', type: 'success' })
      e.currentTarget.reset()
    } catch (error) {
      setStatus({ 
        message: 'Failed to send message. Please try again.', 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sectionVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96], // Adjusted easing curve to valid values
        staggerChildren: 0.1
      }
    }
  }

  // For elements inside sections that need staggered animations
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.section 
              className="relative h-[80vh] flex items-center justify-center"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src="/images/hero.jpg"
                alt="Photographer Hero"
                fill
                className="object-cover brightness-75"
                priority
                sizes="100vw"
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
                  <Link 
                    href="/portfolio" 
                    className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View My Work
                  </Link>
                </motion.div>
              </div>
            </motion.section>

            <motion.section 
              className="container mx-auto px-6 py-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl font-bold text-center mb-10"
              >
                Portfolio
              </motion.h2>
              <motion.div variants={itemVariants}>
                <GalleryGrid />
              </motion.div>
            </motion.section>

            <motion.section 
              className="bg-gray-100 dark:bg-black py-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  I am a professional photographer with a passion for capturing the beauty of the world through my lens.
                </p>
                <Link 
                  href="/about" 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:underline font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.section>
            
            <motion.section 
              className="container mx-auto px-6 py-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    placeholder="Name" 
                    className="border w-full p-3 rounded dark:bg-black dark:border-gray-700" 
                    required 
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    className="border w-full p-3 rounded dark:bg-black dark:border-gray-700" 
                    required 
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    placeholder="Message" 
                    className="border w-full p-3 rounded h-32 dark:bg-black dark:border-gray-700" 
                    required 
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
                {status.message && (
                  <p className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </motion.section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
