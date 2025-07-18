'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'
import GalleryGrid from '@/components/GalleryGrid'
import Preloader from '@/components/Preloader'
import CameraLensHero from '@/components/hero'

type FormStatus = {
  message: string;
  type: 'success' | 'error' | 'idle';
}


const textVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

const aboutVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1
    }
  }
}

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const inputVariants: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
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
           <CameraLensHero />
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
              className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 py-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="container mx-auto px-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                  variants={aboutVariants}
                >
                  <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                  >
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold"
                      variants={itemVariants}
                    >
                      About Me
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                      variants={itemVariants}
                    >
                      With over a decade of experience capturing life's precious moments, 
                      I bring a unique perspective to every shot. My passion for photography 
                      started when I first held a camera at age 12, and it has grown into 
                      a lifelong journey of creative expression.
                    </motion.p>
                    <motion.div 
                      className="flex flex-wrap gap-4"
                      variants={itemVariants}
                    >
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-bold text-xl mb-2">100+</h3>
                        <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-bold text-xl mb-2">10+</h3>
                        <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-bold text-xl mb-2">500+</h3>
                        <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link 
                        href="/about" 
                        className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-semibold 
                                 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1
                                 hover:shadow-lg"
                      >
                        Learn More About Me
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="relative h-[600px] rounded-2xl overflow-hidden"
                    variants={itemVariants}
                  >
                    <Image
                      src="/images/about.jpg"
                      alt="Photographer at work"
                      fill
                      className="object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
            
            <motion.section 
              className="container mx-auto px-6 py-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="max-w-4xl mx-auto text-center mb-12" variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you as soon as possible.
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6 max-w-lg mx-auto backdrop-blur-sm bg-white/50 dark:bg-black/50 p-8 rounded-2xl shadow-lg"
                variants={formVariants}
              >
                <motion.div variants={inputVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                             disabled:opacity-50 disabled:cursor-not-allowed" 
                    required 
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                             disabled:opacity-50 disabled:cursor-not-allowed" 
                    required 
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    placeholder="Tell me about your project..." 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                             disabled:opacity-50 disabled:cursor-not-allowed resize-none" 
                    required 
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <button 
                    type="submit" 
                    className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg
                             font-semibold transition-all duration-300 transform hover:-translate-y-1
                             hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                             disabled:transform-none disabled:hover:shadow-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </motion.div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      status.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </motion.form>
            </motion.section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
