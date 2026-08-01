import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { gallery, services } from '../data/content.js';

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloading is active
    document.body.style.overflow = 'hidden';

    // Silently preload high-resolution image assets in background
    const urlsToPreload = [
      ...gallery.slice(0, 8).map((item) => item.image || item.url),
      ...services.slice(0, 4).map((s) => s.image)
    ].filter(Boolean);

    urlsToPreload.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // Display the luxury studio artwork for ~2.2s, then cinematically dissolve to reveal the site
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = '';
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.06,
            filter: 'blur(12px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#060608] p-6 text-center select-none"
        >
          {/* Subtle Ambient Golden Atmosphere */}
          <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-champagne/10 blur-[150px] animate-pulse" />

          {/* Master Brand Artwork Container */}
          <div className="relative flex flex-col items-center justify-center z-10 max-w-lg w-full">
            
            {/* Top Emblem with breathing luxury glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative mb-6 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [0.98, 1.03, 0.98],
                  filter: [
                    'drop-shadow(0 0 15px rgba(244, 214, 144, 0.3))',
                    'drop-shadow(0 0 40px rgba(244, 214, 144, 0.75))',
                    'drop-shadow(0 0 15px rgba(244, 214, 144, 0.3))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center justify-center rounded-full border border-champagne/35 p-1.5 bg-[#090a0e] shadow-[0_0_50px_rgba(0,0,0,0.9)]"
              >
                {/* Delicate rotating circular golden ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-champagne/40 pointer-events-none"
                />
                <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden flex items-center justify-center bg-black">
                  <img 
                    src={logo || "/logo.png"} 
                    alt="Riwaz Studio Emblem" 
                    className="w-full h-full object-cover rounded-full select-none scale-105 transform transition duration-500" 
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Studio Name: RIWAZ STUDIO. */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="font-display text-3xl sm:text-[2.6rem] font-bold tracking-[0.22em] text-[#f6e0b3] drop-shadow-[0_2px_15px_rgba(244,214,144,0.4)] ml-3"
            >
              RIWAZ STUDIO.
            </motion.h1>

            {/* Ornamental Golden Divider Line with Center Dot */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
              className="my-4 flex items-center justify-center gap-3.5 w-64 sm:w-80 opacity-90"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-champagne/60 to-[#f4d690]" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4d690] shadow-[0_0_10px_rgba(244,214,144,1)] animate-ping" />
              <span className="absolute h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4d690] shadow-[0_0_8px_rgba(244,214,144,0.9)]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-champagne/60 to-[#f4d690]" />
            </motion.div>

            {/* Tagline: WEDDING EDITS . MEMORIES FOREVER */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              className="text-[0.62rem] sm:text-[0.75rem] font-medium tracking-[0.34em] text-[#e3c78a]/90 uppercase ml-2 drop-shadow-sm"
            >
              WEDDING EDITS <span className="mx-1 text-[#f4d690]">.</span> MEMORIES FOREVER
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
