import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import { categories, gallery } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const galleryItems = useStoredCollection('gallery', gallery);
  const filtered = useMemo(() => {
    const published = galleryItems.filter((item) => item.status !== 'draft');
    return category === 'All' ? published : published.filter((item) => item.category === category);
  }, [category, galleryItems]);

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Gallery</p>
            <h1 className="headline mt-4">Luxury edit archive.</h1>
          </div>
          <div className="glass flex max-w-md items-center gap-3 rounded-full px-4 py-3">
            <FiSearch className="text-champagne" />
            <input placeholder="AI search by mood, color, style" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </Reveal>
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? 'bg-champagne text-black' : 'border border-white/10 bg-white/5 text-white/70'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <motion.button
              key={item.id || item.title}
              type="button"
              className="group mb-5 block w-full overflow-hidden rounded-[8px] luxury-border text-left"
              onClick={() => setSelected(item)}
              whileHover={{ y: -5, rotate: index % 2 ? 1 : -1 }}
            >
              <img src={item.image || item.url} alt={item.title} loading="lazy" className="image-protect h-auto w-full object-cover transition duration-700 group-hover:scale-105" onContextMenu={(event) => event.preventDefault()} />
              <div className="glass rounded-none border-x-0 border-b-0 p-4">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-champagne">{item.category}</span>
                <h2 className="mt-1 font-display text-2xl">{item.title}</h2>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close lightbox" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10" onClick={() => setSelected(null)}>
              <FiX />
            </button>
            <motion.img src={selected.image || selected.url} alt={selected.title} className="max-h-[86vh] w-auto max-w-full rounded-[8px] object-contain shadow-luxury" initial={{ scale: 0.92 }} animate={{ scale: 1 }} onContextMenu={(event) => event.preventDefault()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
