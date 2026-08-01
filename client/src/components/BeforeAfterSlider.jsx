import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiSliders } from 'react-icons/fi';

export default function BeforeAfterSlider({
  before = 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=78&fm=webp',
  after = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=78&fm=webp',
  beforeLabel = 'Original Raw',
  afterLabel = 'Riwaz Studio Polish'
}) {
  const [value, setValue] = useState(52);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-[12px] border border-champagne/35 bg-charcoal shadow-[0_30px_90px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-champagne/70 hover:shadow-[0_40px_110px_rgba(0,0,0,0.85),0_0_60px_rgba(244,214,144,0.15)]"
      onContextMenu={(event) => event.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/10] w-full min-h-[220px] md:min-h-[360px] overflow-hidden select-none max-w-full">
        {/* After (Edited) Image (Full Background) */}
        <img
          src={after}
          alt="Edited result"
          loading="lazy"
          className="image-protect absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
        
        {/* Before (Original) Image with Clip-Path for 100% pixel-perfect 1:1 overlap */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          style={{ clipPath: `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)` }}
        >
          <img
            src={before}
            alt="Original raw image"
            loading="lazy"
            className="image-protect absolute inset-0 h-full w-full object-cover filter brightness-90 saturate-[0.85]"
          />
        </div>

        {/* Neon Gold Glowing Laser Line */}
        <div 
          className="absolute inset-y-0 z-10 pointer-events-none transition-[box-shadow,width] duration-300"
          style={{ left: `${value}%` }}
        >
          <div className={`h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne to-transparent shadow-[0_0_25px_#f4d690,0_0_50px_#f4d690] ${isHovered ? 'w-[3px]' : ''}`} />
          
          {/* Animated Luxury Interactive Handle */}
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-12 w-12 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-champagne bg-ink/85 text-champagne shadow-[0_0_35px_rgba(244,214,144,0.7)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
            animate={{
              boxShadow: [
                '0 0 25px rgba(244,214,144,0.5)',
                '0 0 50px rgba(244,214,144,0.9)',
                '0 0 25px rgba(244,214,144,0.5)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="flex items-center gap-1.5 font-extrabold text-sm">
              <FiArrowLeft className="animate-pulse" />
              <FiSliders className="text-xs opacity-80" />
              <FiArrowRight className="animate-pulse" />
            </div>
          </motion.div>

          {/* Top & Bottom Sparkle Caps */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-champagne shadow-[0_0_15px_#f4d690]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-3 w-3 rounded-full bg-champagne shadow-[0_0_15px_#f4d690]" />
        </div>

        {/* Floating Luxury Comparison Badges */}
        <span className="absolute left-3 top-3 md:left-5 md:top-5 z-20 max-w-[44%] truncate rounded-full border border-white/20 bg-black/65 px-2.5 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[.14em] md:tracking-[.22em] text-white/90 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:translate-x-1">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 md:right-5 md:top-5 z-20 max-w-[44%] truncate rounded-full border border-champagne bg-champagne/90 px-2.5 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[.14em] md:tracking-[.22em] text-ink shadow-[0_0_25px_rgba(244,214,144,0.5)] backdrop-blur-md transition-transform duration-300 group-hover:-translate-x-1">
          {afterLabel}
        </span>

        {/* Invisible high-precision slide input */}
        <input
          aria-label="Compare original and edited photo"
          type="range"
          min="2"
          max="98"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

