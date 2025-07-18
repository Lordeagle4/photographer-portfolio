'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

// Move motion components outside of the component
const MotionLink = motion(Link)
const MotionA = motion.a

const socialLinks = [
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About Column */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">John Doe Photography</h3>
            <p className="text-gray-400 leading-relaxed">
              Capturing life's precious moments through the lens of creativity and passion.
              Available for weddings, events, and portrait sessions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {['Portfolio', 'About', 'Services', 'Contact'].map((item) => (
                <MotionLink 
                  key={item} 
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 w-fit"
                  whileHover={{ x: 4 }}
                >
                  {item}
                </MotionLink>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <MotionA
                href="mailto:contact@johndoe.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 w-fit"
                whileHover={{ x: 4 }}
              >
                <FaEnvelope /> <span>contact@johndoe.com</span>
              </MotionA>
              <MotionA
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 w-fit"
                whileHover={{ x: 4 }}
              >
                <FaPhone /> <span>+123 456 7890</span>
              </MotionA>
              <motion.div
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 4 }}
              >
                <FaMapMarkerAlt /> <span>New York, NY 10001</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <motion.div 
          className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} John Doe Photography. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <MotionA
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ y: -4 }}
                aria-label={label}
              >
                <Icon size={24} />
              </MotionA>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
