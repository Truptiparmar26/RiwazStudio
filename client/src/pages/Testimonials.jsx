import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { testimonials } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

export default function Testimonials() {
  const testimonialItems = useStoredCollection('testimonials', testimonials);

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
          <h1 className="headline mt-4">Trusted by image makers.</h1>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonialItems.filter((item) => item.status !== 'draft').map((item, index) => (
            <motion.article key={item.id || `${item.name}-${index}`} className="glass rounded-[8px] p-7" animate={{ y: index % 2 ? [0, -10, 0] : [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 + index, ease: 'easeInOut' }}>
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-champagne/15 font-display text-2xl text-champagne">{(item.name || item.title || 'C')[0]}</div>
              <div className="text-champagne">{'★'.repeat(Number(item.rating || 5))}</div>
              <p className="mt-5 leading-8 text-white/72">"{item.quote || item.review}"</p>
              <strong className="mt-6 block">{item.name || item.title}</strong>
              <span className="text-sm text-white/48">{item.role || item.profession}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
