import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';

export default function PreloadedImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  style = {},
  onContextMenu,
  priority = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;
    setLoaded(false);
    setError(false);

    // Check if browser has already cached the image in memory
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    } else if (priority) {
      // Actively fetch in background if high priority
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden bg-[#101115] ${containerClassName}`} style={style}>
      {/* Shimmer Skeleton Preloader */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 luxury-shimmer">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-champagne/30 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(244,214,144,0.2)]">
            <span className="h-2.5 w-2.5 rounded-full bg-champagne animate-ping opacity-75" />
            <span className="absolute h-2 w-2 rounded-full bg-champagne shadow-[0_0_8px_rgba(244,214,144,0.8)]" />
          </div>
          <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-champagne/70 animate-pulse">
            Preloading
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-neutral-900/90 text-white/50 border border-white/10 rounded-lg">
          <FiImage className="text-2xl text-white/40" />
          <span className="text-xs font-medium text-white/60">Image Unavailable</span>
        </div>
      )}

      {/* Actual Rendered Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${!loaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        onContextMenu={onContextMenu}
        initial={false}
        animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        {...rest}
      />
    </div>
  );
}
