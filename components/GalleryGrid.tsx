'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { motion } from 'framer-motion'

const images = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg',
]

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {images.map((img, i) => (
    <motion.div
      key={i}
      className="cursor-pointer overflow-hidden rounded-lg"
      onClick={() => {
        setIndex(i)
        setOpen(true)
      }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      <Image
        src={img}
        alt={`Gallery Image ${i + 1}`}
        width={500}
        height={500}
        className="object-cover w-full h-64 hover:scale-110 transition-transform duration-300"
      />
    </motion.div>
  ))}
</div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Thumbnails]}
      />
    </div>
  )
}
