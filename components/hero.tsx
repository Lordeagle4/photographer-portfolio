"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { easeInOut } from "framer-motion";

interface CapturedImage {
  id: number;
  src: string;
  index: number;
}

interface LensPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const CameraLensHero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [currentCaptureIndex, setCurrentCaptureIndex] = useState<number>(0);
  const [showSlideshow, setShowSlideshow] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);
  const [lensPosition, setLensPosition] = useState<LensPosition>({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  });
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);

  const portfolioImages: string[] = [
    "/images/hero.jpg",
    "/images/hero2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery6.jpg",
    "/images/gallery5.jpg",
  ];

  // Different lens positions for each shot
  const lensPositions: LensPosition[] = [
    { x: 0, y: 0, rotation: 0, scale: 1 },
    { x: -20, y: 10, rotation: -5, scale: 1.1 },
    { x: 15, y: -15, rotation: 3, scale: 0.95 },
    { x: -10, y: 20, rotation: -2, scale: 1.05 },
    { x: 25, y: -5, rotation: 4, scale: 0.9 },
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = async (): Promise<void> => {
      const imagePromises = portfolioImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        });
      });
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  // Start capture sequence after images are loaded
  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        startCaptureSequence();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  const startCaptureSequence = async (): Promise<void> => {
    setIsCapturing(true);
    
    // Capture each image with lens movement
    for (let i = 0; i < portfolioImages.length; i++) {
      setCurrentCaptureIndex(i);
      
      // Move lens to new position
      setLensPosition(lensPositions[i]);
      
      // Wait for lens movement
      await new Promise((resolve) => setTimeout(resolve, 150));
      
      // Trigger shutter flash
      setShutterFlash(true);
      
      // Add captured image to deck
      setCapturedImages((prev) => [
        ...prev,
        { id: Date.now() + i, src: portfolioImages[i], index: i },
      ]);
      
      // Reset flash
      setTimeout(() => setShutterFlash(false), 100);
      
      // Wait before next capture (except for last image)
      if (i < portfolioImages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    setIsCapturing(false);

    // Start slideshow after capture sequence
    setTimeout(() => {
      setShowSlideshow(true);
    }, 800);
  };

  // Slideshow interval
  useEffect(() => {
    if (showSlideshow && capturedImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % capturedImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showSlideshow, capturedImages.length]);

  // Animation variants
  const imageVariants: Variants = {
    hidden: { 
      x: 100, 
      opacity: 0, 
      rotateY: -30, 
      scale: 0.8,
      rotateX: 10,
    },
    visible: (i: number) => ({
      x: i * 8,
      y: -i * 6,
      opacity: 1,
      rotateY: i * 3,
      rotateX: 0,
      scale: 1 - i * 0.02,
      rotate: i * 1.5,
      zIndex: 10 - i,
      transition: { 
        delay: i * 0.1, 
        duration: 0.6, 
        ease: easeInOut,
      },
    }),
    stacked: (i: number) => ({
      x: i * 6,
      y: -i * 4,
      rotate: i * 2,
      scale: 1 - i * 0.03,
      zIndex: 10 - i,
      opacity: 1 - i * 0.1,
      transition: { 
        duration: 0.5, 
        ease: easeInOut, 
        delay: i * 0.05,
      },
    }),
  };

  const slideshowVariants: Variants = {
    enter: { 
      x: 400, 
      scale: 0.7, 
      opacity: 0, 
      rotateY: 60,
      rotateX: 20,
    },
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: easeInOut,
      },
    },
    exit: {
      x: -400,
      scale: 0.7,
      opacity: 0,
      rotateY: -60,
      rotateX: -20,
      transition: { 
        duration: 0.8, 
        ease: easeInOut,
      },
    },
  };

  const lensVariants: Variants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 },
    },
    capturing: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, 0],
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      </motion.div>

      {/* Shutter Flash Effect */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div
            className="absolute inset-0 bg-white z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Lens Focus Indicator */}
      {isCapturing && (
        <motion.div
          className="absolute z-30 w-32 h-32 border-2 border-white rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-64px',
            marginTop: '-64px',
          }}
          animate={{
            x: lensPosition.x,
            y: lensPosition.y,
            rotate: lensPosition.rotation,
            scale: lensPosition.scale,
          }}
          transition={{ duration: 0.3, ease: easeInOut }}
        >
          <div className="w-full h-full border border-white rounded-full animate-pulse" />
          <div className="absolute inset-2 border border-white rounded-full opacity-50" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-7xl px-8">
        {/* Text Section */}
        <motion.div
          className="flex-1 text-white max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block">LENS</span>
            <span className="block text-gray-400">CRAFT</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Every click captures a universe of stories waiting to be told
          </motion.p>
          
          {/* Capture Progress Indicator */}
          {isCapturing && (
            <motion.div
              className="flex items-center space-x-2 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">
                Capturing {currentCaptureIndex + 1} of {portfolioImages.length}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative w-96 h-64" style={{ perspective: "1200px" }}>
            {!showSlideshow ? (
              // Capture and Stack Phase
              <div className="relative w-full h-full">
                {capturedImages.map((image, i) => (
                  <motion.div
                    key={image.id}
                    className="absolute inset-0 bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200"
                    custom={i}
                    variants={imageVariants}
                    initial="hidden"
                    animate={capturedImages.length > 3 ? "stacked" : "visible"}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={image.src}
                      alt={`Captured ${i + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Polaroid-style bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200" />
                  </motion.div>
                ))}
              </div>
            ) : (
              // Slideshow Phase
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0 bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200"
                    variants={slideshowVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={capturedImages[currentImageIndex]?.src}
                      alt={`Slide ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Polaroid-style bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Slideshow indicators */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {capturedImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CameraLensHero;