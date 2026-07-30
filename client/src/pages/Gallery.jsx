import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiMaximize2, FiSearch, FiX } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import { categories, gallery } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const galleryItems = useStoredCollection('gallery', gallery);
  
  const filtered = useMemo(() => {
    const published = galleryItems.filter((item) => item.status !== 'draft');
    let items = category === 'All' ? published : published.filter((item) => item.category === category);
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter((item) => item.title?.toLowerCase().includes(query) || item.category?.toLowerCase().includes(query));
    }
    return items;
  }, [category, search, galleryItems]);

  return (
    <div className="min-h-screen pb-32 pt-36 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed top-1/4 left-10 h-96 w-96 rounded-full bg-champagne/10 blur-[130px] z-[-1]" />
      <div className="pointer-events-none fixed bottom-1/4 right-10 h-96 w-96 rounded-full bg-violetGlow/10 blur-[130px] z-[-1]" />

      <section className="section pt-0">
        <div className="container">
          <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
                <p className="eyebrow">Visual Archive & Portfolio</p>
              </div>
              <h1 className="headline mt-4 headline-3d-glow">Luxury edit archive.</h1>
            </div>
            
            <div className="glass flex max-w-md w-full items-center gap-3 rounded-full px-5 py-3.5 border border-white/15 transition-all duration-300 focus-within:border-champagne focus-within:shadow-[0_0_25px_rgba(244,214,144,0.25)]">
              <FiSearch className="text-champagne text-lg shrink-0" />
              <input
                placeholder="Search portfolio by style or mood..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-white/40 text-white"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/50 hover:text-white text-xs font-bold uppercase">
                  Clear
                </button>
              )}
            </div>
          </Reveal>

          {/* Interactive Category Pills with Framer Motion layout animation */}
          <div className="no-scrollbar mt-10 flex gap-2.5 overflow-x-auto pb-4">
            {categories.map((item) => {
              const isActive = category === item;
              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive ? 'text-ink scale-105 shadow-[0_0_20px_rgba(244,214,144,0.5)]' : 'border border-white/12 bg-white/5 text-white/70 hover:text-white hover:border-champagne/35'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-category-pill"
                      className="absolute inset-0 z-[-1] rounded-full bg-champagne"
                      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    />
                  )}
                  {item}
                </button>
              );
            })}
          </div>

          {/* Gallery Masonry 3D Grid */}
          <motion.div layout className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.button
                  key={item.id || item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 20 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                  type="button"
                  className="group relative mb-6 block w-full overflow-hidden rounded-[12px] luxury-border text-left gallery-3d premium-glow shimmer-border shadow-2xl"
                  onClick={() => setSelected(item)}
                >
                  <div className="relative overflow-hidden bg-charcoal">
                    <img
                      src={item.image || item.url}
                      alt={item.title}
                      loading="lazy"
                      className="image-protect h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 filter brightness-95 group-hover:brightness-105"
                      onContextMenu={(event) => event.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition duration-300 group-hover:opacity-90" />
                    
                    <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 transition duration-300 backdrop-blur-md group-hover:opacity-100 group-hover:scale-110">
                      <FiMaximize2 className="text-sm text-champagne" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <span className="inline-block rounded-full border border-champagne/40 bg-champagne/20 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[.18em] text-champagne backdrop-blur-md shadow-sm">
                      {item.category}
                    </span>
                    <h2 className="mt-2.5 font-display text-2xl font-bold text-white drop-shadow-md group-hover:text-champagne transition duration-300">
                      {item.title}
                    </h2>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-white/15 rounded-[16px]">
              <p className="font-display text-2xl text-white/80">No edits found for "{search || category}"</p>
              <button onClick={() => { setCategory('All'); setSearch(''); }} className="mt-4 rounded-full bg-champagne px-6 py-2 text-xs font-bold text-black uppercase">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-black/95 p-4 md:p-10 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[16px] border border-champagne/30 bg-ink p-2 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close lightbox"
                className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-champagne hover:text-champagne hover:scale-110"
                onClick={() => setSelected(null)}
              >
                <FiX className="text-xl" />
              </button>

              <img
                src={selected.image || selected.url}
                alt={selected.title}
                className="max-h-[78vh] w-auto max-w-full rounded-[12px] object-contain shadow-2xl mx-auto"
                onContextMenu={(event) => event.preventDefault()}
              />

              <div className="p-6 flex items-center justify-between bg-ink">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-champagne">{selected.category} Suite</span>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">{selected.title}</h3>
                </div>
                <a
                  href="/contact"
                  className="rounded-full bg-champagne px-6 py-2.5 text-xs font-black uppercase text-ink hover:scale-105 transition shadow-[0_0_20px_rgba(244,214,144,0.4)]"
                >
                  Inquire Similar Grade
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

