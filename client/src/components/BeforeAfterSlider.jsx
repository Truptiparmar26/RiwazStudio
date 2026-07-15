import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function BeforeAfterSlider({
  before = 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1000&q=80',
  after = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=90'
}) {
  const [value, setValue] = useState(54);

  return (
    <div className="relative overflow-hidden rounded-[8px] luxury-border bg-black shadow-luxury" onContextMenu={(event) => event.preventDefault()}>
      <div className="relative aspect-[16/10] min-h-[320px]">
        <img src={after} alt="Edited result" loading="lazy" className="image-protect h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
          <img src={before} alt="Original image" loading="lazy" className="image-protect h-full w-[100vw] max-w-none object-cover grayscale" />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
          <div className="h-full w-px bg-champagne shadow-[0_0_28px_rgba(244,214,144,.85)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-champagne/50 bg-ink/70 text-champagne backdrop-blur"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <span className="flex gap-1"><FiArrowLeft /><FiArrowRight /></span>
          </motion.div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-white backdrop-blur">Original</span>
        <span className="absolute right-4 top-4 rounded-full bg-champagne/90 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-black">Edited</span>
        <input
          aria-label="Compare original and edited photo"
          type="range"
          min="5"
          max="95"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
