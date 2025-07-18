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

const heroVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.3
    }
  }
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
              className="relative h-[90vh] flex items-center justify-center overflow-hidden"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10 }}
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Photographer Hero"
                  fill
                  className="object-cover brightness-[0.65] transform hover:scale-105 transition-transform duration-[2s]"
                  priority
                  sizes="100vw"
                  quality={90}
                />
              </motion.div>

              <div className="relative z-10 text-center text-white max-w-4xl px-4">
                <motion.div variants={textVariants} className="overflow-hidden">
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    Capturing Moments,
                    <br />
                    <span className="text-3xl md:text-5xl lg:text-6xl opacity-90">
                      Creating Stories
                    </span>
                  </motion.h1>
                </motion.div>

                <motion.p
                  variants={textVariants}
                  className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
                >
                  Professional photography that tells your unique story through the lens of creativity and passion.
                </motion.p>

                <motion.div
                  variants={textVariants}
                  className="space-x-4"
                >
                  <Link 
                    href="/portfolio" 
                    className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold 
                             hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1
                             hover:shadow-lg"
                  >
                    View My Work
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-block bg-transparent text-white px-8 py-4 rounded-full font-semibold 
                             border-2 border-white hover:bg-white/10 transition-all duration-300
                             transform hover:-translate-y-1"
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="cursor-pointer"
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
              </motion.div>
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
