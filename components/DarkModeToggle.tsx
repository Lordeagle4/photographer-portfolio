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
      className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
      <>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        </svg>
        Light
      </>
      ) : (
      <>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        </svg>
        Dark
      </>
      )}
    </button>
  )
}
