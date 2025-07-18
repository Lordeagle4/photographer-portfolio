'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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

  return (
    <header className="shadow-md sticky top-0 bg-white/90 dark:bg-black/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href="/" 
          className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          aria-label="Home"
        >
          JD Photography
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative hover:text-gray-700 dark:hover:text-gray-300 transition-colors
                ${pathname === link.href ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-black dark:bg-white"
                />
              )}
            </Link>
          ))}
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button 
          type="button"
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/90 dark:bg-black/80 backdrop-blur-sm border-t dark:border-gray-800"
          >
            <div className="container mx-auto p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                    ${pathname === link.href ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <DarkModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
