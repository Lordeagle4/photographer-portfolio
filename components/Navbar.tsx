'use client'

import Link from 'next/link'
import { useState } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
  <header className="shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">JD Photography</Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <DarkModeToggle />
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
      </nav>
      {open && (
        <div className="md:hidden dark:bg-gray-50 flex flex-col gap-4 p-4">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <DarkModeToggle />
          <button className="mt-4 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>X Close</button>
        </div>
      )}
    </header>
  )
}
