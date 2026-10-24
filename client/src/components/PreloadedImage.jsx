import { useEffect, useMemo, useRef, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { getResponsiveImageProps } from '../utils/imageOptimizer.js';

export default function PreloadedImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  style = {},
  onContextMenu,
  priority = false,
  widths,
  sizes,
  quality,
  defaultWidth,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const rawSrc = typeof src === 'object' && src !== null ? (src.url || src.src || '') : src;

  const imageProps = useMemo(() => {
    return getResponsiveImageProps(rawSrc, {
      widths,
      sizes,
      quality,
      priority,
      defaultWidth
    });
  }, [rawSrc, widths, sizes, quality, priority, defaultWidth]);

  useEffect(() => {
    if (!rawSrc) return;
    setError(false);

    // Direct DOM check for cached images
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
      return;
    }

    const handleLoad = () => setLoaded(true);
    const handleError = () => {
      setError(true);
      setLoaded(true);
    };

    if (el) {
      el.addEventListener('load', handleLoad);
      el.addEventListener('error', handleError);
    }

    // Safety timeout: ensure image becomes visible even if browser load event is delayed/missed
    const timer = setTimeout(() => {
      setLoaded(true);
    }, priority ? 600 : 1200);

    return () => {
      clearTimeout(timer);
      if (el) {
        el.removeEventListener('load', handleLoad);
        el.removeEventListener('error', handleError);
      }
    };
  }, [rawSrc, imageProps.src, priority]);

  return (
    <div className={`relative overflow-hidden bg-[#121316] ${containerClassName}`} style={style}>
      {/* Subtle luxury skeleton background shimmer (non-blocking) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 luxury-shimmer ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-neutral-900/95 text-white/50 border border-white/10 rounded-lg">
          <FiImage className="text-2xl text-white/40" />
          <span className="text-xs font-medium text-white/60">Portfolio Image</span>
        </div>
      )}

      {/* High performance native image with responsive srcset and smooth GPU opacity fade */}
      <img
        ref={imgRef}
        src={imageProps.src}
        srcSet={imageProps.srcSet}
        sizes={imageProps.sizes}
        loading={imageProps.loading}
        fetchPriority={imageProps.fetchPriority}
        decoding={imageProps.decoding}
        alt={alt}
        className={`${className} transition-opacity duration-300 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        onContextMenu={onContextMenu}
        {...rest}
      />
    </div>
  );
}
