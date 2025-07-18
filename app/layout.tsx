import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JD | Professional Photographer',
  description: 'Photography portfolio showcasing portraits, landscapes, and events.',
  openGraph: {
    title: 'John Doe Photography',
    description: 'Capturing unforgettable moments.',
    url: 'https://johndoephotography.com',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Hero Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JD Photography',
    description: 'Capturing unforgettable moments.',
    images: ['/images/hero.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  keywords: ['photography', 'portfolio', 'professional photographer', 'Aetos', 'landscape photography', 'portrait photography'],
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
<body className={`${inter.className} font-sans text-gray-900 dark:bg-black dark:text-gray-100 bg-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
