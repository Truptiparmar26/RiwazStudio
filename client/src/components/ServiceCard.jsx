import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { serviceCopy } from '../data/content.js';

export default function ServiceCard({ service }) {
  const displayTitle = service.title;
  const content = serviceCopy[displayTitle] || service;

  const rawImage = content.image || service.image || service.bannerImage;
  const imageUrl = typeof rawImage === 'string' && rawImage.trim()
    ? rawImage
    : (rawImage?.url || content.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80');

  const description = content.description || service.description;
  const features = (content.features && content.features.length > 0) ? content.features : (service.features || []);
  const price = service.price || content.price || 'From $49';

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[12px] glass glass-3d premium-glow shimmer-border flex flex-col h-full transition-all duration-700 hover:border-champagne/60"
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {/* Top Media Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
        <img
          src={imageUrl}
          alt={displayTitle}
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=750&q=76&fm=webp"; }}
          className="image-protect h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 filter brightness-95 group-hover:brightness-105"
          onContextMenu={(event) => event.preventDefault()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        <span className="absolute right-4 top-4 rounded-full border border-champagne bg-champagne/95 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-ink shadow-[0_0_20px_rgba(244,214,144,0.5)] transition duration-300 group-hover:scale-105">
          {price}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display text-2xl font-bold text-white group-hover:text-champagne transition duration-300">
          {displayTitle}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/70 flex-1">
          {description}
        </p>

        {/* Feature Pills matching uploaded design */}
        <div className="mt-6 flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-[6px] border border-champagne/40 bg-champagne/[0.04] px-3 py-1 text-[0.78rem] font-medium text-[#f4d690] transition duration-300 group-hover:border-champagne group-hover:bg-champagne/15 group-hover:text-white"
            >
              <FiCheckCircle className="text-champagne text-xs shrink-0 opacity-80" />
              {feature}
            </span>
          ))}
        </div>

        {/* Action button */}
        <Link
          to="/contact"
          className="mt-7 inline-flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-champagne transition-all duration-500 hover:border-champagne hover:bg-champagne hover:text-ink hover:shadow-[0_0_25px_rgba(244,214,144,0.6)] group-hover:border-champagne/50"
        >
          <span>Request Bespoke Quote</span>
          <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

