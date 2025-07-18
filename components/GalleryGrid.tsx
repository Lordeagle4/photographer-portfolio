'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { motion } from 'framer-motion'

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/gallery1.jpg',
    alt: 'Gallery Image 1',
    width: 500,
    height: 500
  },
  {
    src: '/images/gallery2.jpg',
    alt: 'Gallery Image 2',
    width: 500,
    height: 500
  },
  {
    src: '/images/gallery3.jpg',
    alt: 'Gallery Image 3',
    width: 500,
    height: 500
  },
  {
    src: '/images/gallery4.jpg',
    alt: 'Gallery Image 4',
    width: 500,
    height: 500
  },
  {
    src: '/images/gallery5.jpg',
    alt: 'Gallery Image 5',
    width: 500,
    height: 500
  },
  {
    src: '/images/gallery6.jpg',
    alt: 'Gallery Image 6',
    width: 500,
    height: 500
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean[]>(new Array(galleryImages.length).fill(true))

  const handleImageLoad = (imageIndex: number) => {
    setIsLoading(prev => {
      const newState = [...prev]
      newState[imageIndex] = false
      return newState
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            variants={itemVariants}
            className="relative cursor-pointer overflow-hidden rounded-lg aspect-square"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            whileHover={{ scale: 1.02 }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${img.alt} in lightbox`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIndex(i)
                setOpen(true)
              }
            }}
          >
            {isLoading[i] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              onLoad={() => handleImageLoad(i)}
              priority={i < 6}
            />
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map(({ src, alt }) => ({ src, alt }))}
        plugins={[Thumbnails, Zoom]}
        carousel={{
          spacing: 0,
          padding: 0,
        }}
        render={{
          buttonPrev: index === 0 ? () => null : undefined,
          buttonNext: index === galleryImages.length - 1 ? () => null : undefined,
        }}
      />
    </motion.div>
  )
}
