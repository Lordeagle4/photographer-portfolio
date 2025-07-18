'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { motion, Variants } from 'framer-motion'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  show: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  hover: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
}

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean[]>(new Array(galleryImages.length).fill(true))

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
          >
            {isLoading[i] && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            )}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onLoad={() => {
                const newLoadingState = [...isLoading]
                newLoadingState[i] = false
                setIsLoading(newLoadingState)
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i < 6}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                View Image
              </span>
            </div>
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
          spacing: 20,
          padding: 20,
        }}
        animation={{ fade: 400 }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .9)' } }}
      />
    </div>
  )
}
