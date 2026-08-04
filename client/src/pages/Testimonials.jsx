import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { testimonials } from '../data/content.js';
import { useApiCollection } from '../utils/siteStore.js';

export default function Testimonials() {
  const { items: testimonialItems, loading, error, refetch } = useApiCollection('testimonials', testimonials, { onlyActive: true });

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
          <h1 className="headline mt-4">Trusted by image makers.</h1>
        </Reveal>

        {loading && testimonialItems.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center py-16 text-white/60">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-champagne border-t-transparent" />
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-champagne">Loading reviews...</p>
          </div>
        )}

        {error && testimonialItems.length === 0 && (
          <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-red-500/30 rounded-[16px] bg-red-500/5">
            <p className="font-display text-2xl text-white/80">Unable to load reviews from server.</p>
            <p className="mt-2 text-sm text-white/50">{error}</p>
            <button onClick={refetch} className="mt-6 rounded-full bg-champagne px-6 py-2 text-xs font-bold text-black uppercase">
              Retry Loading
            </button>
          </div>
        )}

        {!loading && testimonialItems.length === 0 && !error && (
          <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-white/15 rounded-[16px]">
            <p className="font-display text-2xl text-white/80">No testimonials published yet.</p>
          </div>
        )}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonialItems.map((item, index) => {
            const avatar = item.profileImage || item.image;
            const name = item.clientName || item.name || item.title || 'Client';
            const designation = item.designation || item.role || item.profession || 'Verified Partner';
            const comment = item.message || item.quote || item.review || 'Exceptional craftsmanship and delivery.';
            return (
              <motion.article key={item.id || `${name}-${index}`} className="glass rounded-[8px] p-7 flex flex-col justify-between" animate={{ y: index % 2 ? [0, -10, 0] : [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 + index, ease: 'easeInOut' }}>
                <div>
                  {avatar ? (
                    <img src={avatar} alt={name} className="mb-6 h-16 w-16 rounded-full object-cover border-2 border-champagne/30 shadow-md" />
                  ) : (
                    <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-champagne/15 font-display text-2xl text-champagne">{name[0]}</div>
                  )}
                  <div className="text-champagne">{'★'.repeat(Number(item.rating || 5))}</div>
                  <p className="mt-5 leading-8 text-white/72">"{comment}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <strong className="block text-white font-bold">{name}</strong>
                  <span className="text-sm text-white/48">{designation}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
