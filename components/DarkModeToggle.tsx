'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="border px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
    </button>
  )
}
