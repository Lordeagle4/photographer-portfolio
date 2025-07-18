'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      when: "afterChildren"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const menuItemVariants: Variants = {
  closed: { 
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  },
  open: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

// Navbar animation variants with 4-second delay
const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 6,
    }
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Initialize navbar visibility after component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (open) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(prev => !prev)
  }

  return (
    <motion.header 
      className="shadow-md sticky top-0 bg-white/90 dark:bg-black/80 backdrop-blur-sm z-50"
      variants={navbarVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href="/" 
          className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
          aria-label="Home"
        >
          <span>LENS</span><span className='text-red-400'>CRAFT</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4,
                delay: 6.3 + (index * 0.1), // Stagger after main navbar animation
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <Link
                href={link.href}
                className={`relative hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300
                  ${pathname === link.href ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-black dark:bg-white"
                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4,
              delay: 6.6,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <DarkModeToggle />
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          type="button"
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
          onClick={toggleMenu}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4,
            delay: 6.6,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          <motion.span 
            className="sr-only"
            initial={false}
          >
            {open ? 'Close menu' : 'Open menu'}
          </motion.span>
          <motion.div
            initial={false}
            animate={open ? "open" : "closed"}
            className="relative w-6 h-6"
          >
            {open ? (
              <>
                <motion.span
                  className="block w-6 h-0.5 bg-black dark:bg-white absolute top-1/2 left-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-black dark:bg-white absolute top-1/2 left-0"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -45 }}
                  transition={{ duration: 0.2 }}
                />
              </>
            ) : (
              <>
                <motion.span
                  className="block w-6 h-0.5 bg-black dark:bg-white absolute"
                  style={{ top: "30%" }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-black dark:bg-white absolute"
                  style={{ bottom: "30%" }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </>
            )}
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white/90 dark:bg-black/80 backdrop-blur-sm border-t dark:border-gray-800"
          >
            <motion.div className="container mx-auto p-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  variants={menuItemVariants}
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className={`block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300
                      ${pathname === link.href ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <div className="p-2">
                  <DarkModeToggle />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}