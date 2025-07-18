'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { easeInOut } from 'framer-motion';
import { Camera, Play, Download, Share2, Heart, Star, ArrowRight, ChevronDown } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [currentCaptureIndex, setCurrentCaptureIndex] = useState<number>(0);
  const [showSlideshow, setShowSlideshow] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showWelcomeNote, setShowWelcomeNote] = useState<boolean>(false);
  const [welcomeText, setWelcomeText] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(false);
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate preloader completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);

  const portfolioImages: string[] = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
  ];

  const welcomeMessages = [
    '   Welcome to a world where every moment becomes art...',
    'Ready to capture the extraordinary in the ordinary?',
    "Let's create something magical together.",
    'Your story begins with a single click.',
  ];

  const lensPositions: LensPosition[] = [
    { x: 0, y: 0, rotation: 0, scale: 1 },
    { x: -20, y: 10, rotation: -5, scale: 1.1 },
    { x: 15, y: -15, rotation: 3, scale: 0.95 },
    { x: -10, y: 20, rotation: -2, scale: 1.05 },
    { x: 25, y: -5, rotation: 4, scale: 0.9 },
  ];

  const typeWriter = (text: string, callback?: () => void) => {
    let i = 0;
    setWelcomeText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setWelcomeText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (callback) {
          setTimeout(callback, 1500);
        }
      }
    }, 50);
  };

  useEffect(() => {
    if (preloaderDone) {
      setShowWelcomeNote(true);
      typeWriter(welcomeMessages[0], () => {
        setShowWelcomeNote(false);
        setWelcomeText('');
        preloadImagesAndStart();
      });
    }
  }, [preloaderDone]);

  const preloadImagesAndStart = async (): Promise<void> => {
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

    setTimeout(() => {
      startCaptureSequence();
    }, 500);
  };

  const startCaptureSequence = async (): Promise<void> => {
    setIsCapturing(true);

    for (let i = 0; i < portfolioImages.length; i++) {
      setCurrentCaptureIndex(i);
      setLensPosition(lensPositions[i]);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setShutterFlash(true);
      setCapturedImages((prev) => [
        ...prev,
        { id: Date.now() + i, src: portfolioImages[i], index: i },
      ]);
      setTimeout(() => setShutterFlash(false), 150);
      if (i < portfolioImages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    }

    setIsCapturing(false);
    setTimeout(() => {
      setShowSlideshow(true);
      setShowContent(true);
    }, 800);
  };

  useEffect(() => {
    if (showSlideshow && capturedImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % capturedImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showSlideshow, capturedImages.length]);

  const imageVariants: Variants = {
    hidden: {
      x: 100,
      y: 100,
      opacity: 0,
      rotateY: -30,
      scale: 0.3,
      rotateX: 10,
    },
    visible: (i: number) => ({
      x: i * 4,
      y: -i * 3,
      opacity: 1,
      rotateY: i * 2,
      rotateX: 0,
      scale: 0.3 - i * 0.01,
      rotate: i * 1,
      zIndex: 10 - i,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: easeInOut,
      },
    }),
  };

  const slideshowVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 0.95,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: easeInOut,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      scale: 0.95,
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
      transition: {
        duration: 1.2,
        ease: easeInOut,
      },
    }),
  };

  const [lensPosition, setLensPosition] = useState<LensPosition>({
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  });

  const themeColors = {
    bg: isDark ? 'bg-black' : 'bg-white',
    text: isDark ? 'text-white' : 'text-black',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    accent: isDark ? 'text-red-400' : 'text-red-600',
    border: isDark ? 'border-gray-800' : 'border-gray-200',
    bgGradient: isDark ? 'from-gray-900 via-black to-gray-800' : 'from-gray-50 via-white to-gray-100',
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${themeColors.bg} transition-colors duration-700`}>
      {/* Enhanced Background with slideshow */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        {/* Base gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.bgGradient}`} />
        
        {/* Enhanced Slideshow Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {showSlideshow && capturedImages.length > 0 && (
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${capturedImages[currentImageIndex]?.src})`,
                  filter: 'brightness(1.1) contrast(1.1)',
                }}
                custom={1}
                variants={slideshowVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Overlay with reduced opacity for better visibility */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-white/50'} transition-colors duration-700`} />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
      </motion.div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-[linear-gradient(${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}_1px,transparent_1px),linear-gradient(90deg,${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]`} />
      </div>

      {/* Slideshow Progress Indicator */}
      <AnimatePresence>
        {showSlideshow && (
          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {capturedImages.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 w-2'
                }`}
                layout
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shutter Flash Effect */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div
            className={`absolute inset-0 ${isDark ? 'bg-white' : 'bg-black'} z-40`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Welcome Note */}
      <AnimatePresence>
        {showWelcomeNote && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`text-center px-8 py-12 rounded-2xl backdrop-blur-md ${isDark ? 'bg-black/70' : 'bg-white/70'} border ${themeColors.border} shadow-2xl`}>
              <motion.p
                className={`text-2xl md:text-3xl font-light ${themeColors.text} min-h-[1.5em]`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {welcomeText}
              </motion.p>
              <motion.div
                className={`mt-4 w-1 h-6 mx-auto ${themeColors.text} animate-pulse`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lens Focus Indicator */}
      {isCapturing && (
        <motion.div
          className="absolute z-30 w-20 h-20 md:w-32 md:h-32 border-2 border-red-500 rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-40px',
            marginTop: '-40px',
          }}
          animate={{
            x: lensPosition.x,
            y: lensPosition.y,
            rotate: lensPosition.rotation,
            scale: lensPosition.scale,
          }}
          transition={{ duration: 0.3, ease: easeInOut }}
        >
          <div className="w-full h-full border border-red-400 rounded-full animate-pulse" />
          <div className="absolute inset-1 md:inset-2 border border-red-300 rounded-full opacity-50" />
          <div className="absolute inset-3 md:inset-4 border border-red-200 rounded-full opacity-25" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 md:px-12 py-12">
        {/* Text Section */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className={`${themeColors.text} w-full max-w-7xl text-center lg:text-left mb-8 lg:mb-0 backdrop-blur-md ${isDark ? 'bg-black/30' : 'bg-white/30'} p-8 rounded-2xl border ${themeColors.border} shadow-2xl`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className={`inline-block ${themeColors.text} drop-shadow-lg`}>
                  LENS
                </span>
                <span className={`inline-block ${themeColors.accent} drop-shadow-lg`}>CRAFT</span>
              </motion.h1>
              <motion.p
                className={`text-lg text-center md:text-xl lg:text-2xl mb-8 ${themeColors.textSecondary} leading-relaxed drop-shadow-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Transform fleeting moments into timeless masterpieces
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.button
                  className={`group relative px-8 py-4 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Start Capturing</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className={`absolute inset-0 ${isDark ? 'bg-red-500' : 'bg-red-600'} translate-x-full group-hover:translate-x-0 transition-transform duration-300`} />
                  <div className="absolute inset-0 flex items-center justify-center space-x-2 translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                    <Play className="w-5 h-5" />
                    <span>Let's Go!</span>
                  </div>
                </motion.button>
                
                <motion.button
                  className={`group px-8 py-4 border-2 ${themeColors.border} ${themeColors.text} rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    <span>View Gallery</span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex justify-center lg:justify-start space-x-8 mt-8 pt-8 border-t border-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${themeColors.accent}`}>500+</div>
                  <div className={`text-sm ${themeColors.textMuted}`}>Photos Captured</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${themeColors.accent}`}>4.9</div>
                  <div className={`text-sm ${themeColors.textMuted} flex items-center justify-center`}>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${themeColors.accent}`}>100+</div>
                  <div className={`text-sm ${themeColors.textMuted}`}>Happy Clients</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Stack Section */}
        <motion.div
          className="flex-1 flex justify-center items-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative w-full max-w-md lg:max-w-lg h-64 md:h-80 lg:h-96">
            {/* Stacked images container */}
            <div 
              className="absolute bottom-0 right-0 w-32 h-20 md:w-48 md:h-32 lg:w-64 lg:h-40" 
              style={{ perspective: "1200px" }}
            >
              {!showSlideshow && (
                <div className="relative w-full h-full">
                  {capturedImages.map((image, i) => (
                    <motion.div
                      key={image.id}
                      className={`absolute inset-0 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-xl overflow-hidden border ${themeColors.border}`}
                      custom={i}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img
                        src={image.src}
                        alt={`Captured ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Polaroid-style bottom border */}
                      <div className={`absolute bottom-0 left-0 right-0 h-2 md:h-3 ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${themeColors.border}`} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Capture Progress */}
        <AnimatePresence>
          {isCapturing && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">
                Capturing masterpiece {currentCaptureIndex + 1} of {portfolioImages.length}
              </span>
              <div className="flex space-x-1">
                {portfolioImages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= currentCaptureIndex ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle */}
      <motion.button
        className={`absolute top-8 right-8 z-30 p-3 rounded-full backdrop-blur-sm ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'} border ${themeColors.border} transition-all duration-300 hover:scale-110`}
        onClick={toggleTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>

      {/* Scroll Down Arrow */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <motion.div
              className={`text-sm ${themeColors.textMuted} mb-2 font-medium`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.div>
            <motion.div
              className={`p-2 rounded-full ${themeColors.text} cursor-pointer`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        className={`absolute top-20 right-20 w-2 h-2 ${isDark ? 'bg-white' : 'bg-black'} rounded-full opacity-20`}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className={`absolute bottom-32 left-16 w-1 h-1 ${themeColors.textMuted} rounded-full opacity-30`}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  );
};

export default CameraLensHero;