'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AboutPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Capturing Life's Beautiful Moments
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Hi, I'm John Doe, a professional photographer with over a decade of experience
              in turning fleeting moments into timeless memories.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/about.jpg"
              alt="John Doe - Professional Photographer"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My passion for photography began when I received my first camera at age 12.
              Since then, I've dedicated myself to mastering the art of visual storytelling,
              working across various photography styles and techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">10+</h3>
              <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">100+</h3>
              <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Specialties Section */}
      <section className="container mx-auto px-6 py-24">
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">My Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Portrait Photography', description: 'Capturing personalities and emotions in stunning detail.' },
              { title: 'Wedding Photography', description: 'Documenting your special day with elegance and style.' },
              { title: 'Event Photography', description: 'Preserving the energy and excitement of your events.' },
              { title: 'Travel Photography', description: 'Sharing the beauty of destinations worldwide.' }
            ].map((specialty) => (
              <motion.div
                key={specialty.title}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">{specialty.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{specialty.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}
