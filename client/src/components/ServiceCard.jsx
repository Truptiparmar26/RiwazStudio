import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <motion.article
      className="group overflow-hidden rounded-[8px] glass"
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={service.image} alt={service.title} loading="lazy" className="image-protect h-full w-full object-cover transition duration-700 group-hover:scale-110" onContextMenu={(event) => event.preventDefault()} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-champagne px-3 py-1 text-xs font-extrabold text-black">{service.price}</span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/65">{service.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span key={feature} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/68">{feature}</span>
          ))}
        </div>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-champagne">
          Request Quote <FiArrowUpRight />
        </Link>
      </div>
    </motion.article>
  );
}
