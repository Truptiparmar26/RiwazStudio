/**
 * Riwaz Studio Image Optimization & Responsive Delivery Utility
 * 
 * Provides dynamic WebP conversion, dimension scaling, responsive srcset generation,
 * and adaptive quality control for both local assets and CDN/Unsplash URLs.
 */

export function getOptimizedImageUrl(url, width = 800, quality = 75) {
  if (!url || typeof url !== 'string') return url || '';

  const trimmed = url.trim();

  // 1. Optimize local editor portrait references
  if (trimmed.includes('editor-portrait')) {
    if (width <= 240) return '/editor-portrait-200w.webp';
    if (width <= 500) return '/editor-portrait-400w.webp';
    return '/editor-portrait.webp';
  }

  // 2. Optimize local logo references
  if (trimmed.includes('logo.png')) {
    return '/logo.webp';
  }

  // 3. Optimize Unsplash / Imgix CDN URLs
  if (trimmed.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(trimmed);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fm', 'webp');
      urlObj.searchParams.set('q', String(quality));
      if (!urlObj.searchParams.has('fit')) {
        urlObj.searchParams.set('fit', 'crop');
      }
      if (width) {
        urlObj.searchParams.set('w', String(width));
      }
      return urlObj.toString();
    } catch {
      // If URL parsing fails, fall back to string manipulation
      let clean = trimmed.replace(/&w=\d+/, '').replace(/\?w=\d+&?/, '?');
      const sep = clean.includes('?') ? '&' : '?';
      return `${clean}${sep}w=${width}&q=${quality}&auto=format&fm=webp`;
    }
  }

  // Return unmanipulated external URL if not an optimizable CDN
  return trimmed;
}

export function getResponsiveSrcSet(url, widths = [400, 600, 800, 1200], quality = 75) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Local editor portrait responsive srcset
  if (trimmed.includes('editor-portrait')) {
    return '/editor-portrait-200w.webp 200w, /editor-portrait-400w.webp 400w, /editor-portrait.webp 681w';
  }

  // Local logo is 156x156 fixed asset
  if (trimmed.includes('logo')) {
    return '/logo.webp 156w';
  }

  // Unsplash / Imgix responsive srcset
  if (trimmed.includes('images.unsplash.com')) {
    return widths
      .map((w) => `${getOptimizedImageUrl(trimmed, w, quality)} ${w}w`)
      .join(', ');
  }

  return '';
}

export function getResponsiveImageProps(url, {
  widths = [400, 600, 800, 1200],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 75,
  priority = false,
  defaultWidth = 800
} = {}) {
  const src = getOptimizedImageUrl(url, defaultWidth, quality);
  const srcSet = getResponsiveSrcSet(url, widths, quality);

  return {
    src,
    ...(srcSet ? { srcSet, sizes } : {}),
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    decoding: 'async'
  };
}
