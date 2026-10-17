// import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
// import Reveal from '../components/Reveal.jsx';
// import ServiceCard from '../components/ServiceCard.jsx';
// import { services } from '../data/content.js';

// export default function Services() {
//   return (
//     <section className="section pt-36">
//       <div className="container">
//         <Reveal>
//           <p className="eyebrow">Services</p>
//           <h1 className="headline mt-4 max-w-5xl">Retouching, grading, restoration, and delivery systems.</h1>
//         </Reveal>
//         <Reveal className="mt-10">
//           <BeforeAfterSlider />
//         </Reveal>
//         <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {services.map((service) => <ServiceCard key={service.title} service={service} />)}
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiSliders } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services, serviceCopy, serviceCanonicalOrder } from '../data/content.js';
import { useApiCollection } from '../utils/siteStore.js';

const serviceCategories = [
  'All',
  'Weddings & Couples',
  'Portraits & Retouch',
  'Commercial & Real Estate',
  'Color & Drone',
  'Restoration & AI'
];

export default function Services() {
  const { items: serviceItems, loading, error, refetch } = useApiCollection('services', services, { onlyActive: true });
  const [activeCategory, setActiveCategory] = useState('All');

  const sortedServices = useMemo(() => {
    return [...serviceItems]
      .filter((s) => (s.title || '').trim().toLowerCase() !== 'baby shoot editing')
      .sort((a, b) => {
        const titleA = (a.title || a.name || '').trim().toLowerCase();
        const titleB = (b.title || b.name || '').trim().toLowerCase();
        const ordA = serviceCanonicalOrder[titleA] ?? Number(a.order ?? 999);
        const ordB = serviceCanonicalOrder[titleB] ?? Number(b.order ?? 999);
        return ordA - ordB;
      });
  }, [serviceItems]);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return sortedServices;
    return sortedServices.filter((service) => {
      const copy = serviceCopy[service.title] || service;
      const cat = service.category || copy.category;
      return cat === activeCategory;
    });
  }, [sortedServices, activeCategory]);

  return (
    <>
      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h1 className="headline mt-4 max-w-5xl headline-3d-glow">
              Professional photo editing for every visual story.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Explore our full suite of 16 signature editing, retouching, and AI restoration solutions — handcrafted with editorial precision and cinematic color science.
            </p>
          </Reveal>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} 
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
            viewport={{ once: true, margin: '-50px' }} 
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass rounded-[8px] p-4 hero-slider-3d floating pulse-glow">
              <BeforeAfterSlider />
            </div>
          </motion.div>

          {/* Category Filter Tabs & Count */}
          <div className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-champagne/80">
                <FiSliders className="text-sm" /> Filter:
              </span>
              {serviceCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-champagne text-ink shadow-[0_0_20px_rgba(244,214,144,0.45)] scale-105'
                        : 'border border-white/12 bg-white/5 text-white/70 hover:border-champagne/40 hover:text-champagne'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-white/50">
              Showing <span className="text-champagne font-extrabold">{filteredServices.length}</span> of {serviceItems.length} Suites
            </div>
          </div>

          {loading && serviceItems.length === 0 && (
            <div className="mt-20 flex flex-col items-center justify-center py-16 text-white/60">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-champagne border-t-transparent" />
              <p className="mt-4 text-sm font-bold uppercase tracking-widest text-champagne">Loading services...</p>
            </div>
          )}

          {error && serviceItems.length === 0 && (
            <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-red-500/30 rounded-[16px] bg-red-500/5">
              <p className="font-display text-2xl text-white/80">Unable to load services from server.</p>
              <p className="mt-2 text-sm text-white/50">{error}</p>
              <button onClick={refetch} className="mt-6 rounded-full bg-champagne px-6 py-2 text-xs font-bold text-black uppercase">
                Retry Loading
              </button>
            </div>
          )}

          {!loading && serviceItems.length === 0 && !error && (
            <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-white/15 rounded-[16px]">
              <p className="font-display text-2xl text-white/80">No active services currently available.</p>
            </div>
          )}

          {/* Services 3-Column Grid matching uploaded screenshots */}
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div 
                  key={service.id || service.title} 
                  layout
                  className="service-card-3d"
                  initial={{ opacity: 0, y: 35, scale: 0.96 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ delay: (index % 6) * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Custom Quote & Bespoke Workflows Banner */}
          <motion.div
            className="mt-20 overflow-hidden rounded-[16px] glass glass-3d luxury-border p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <span className="eyebrow">Custom Workflows</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-white">
                Have a specialized or high-volume project?
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
                From multi-camera wedding raw deliveries to full commercial product clipping, drone cinematography grading, and custom editorial looks — we design tailored post-production workflows for studios and creators worldwide.
              </p>
            </div>
            <Link
              to="/contact"
              className="relative z-10 shrink-0 inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,214,144,0.6)] hover:scale-105"
            >
              <span>Request Bespoke Quote</span>
              <FiArrowRight className="text-lg" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
