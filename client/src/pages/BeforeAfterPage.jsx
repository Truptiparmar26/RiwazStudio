import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheckCircle, FiInfo, FiLayers, FiSliders, FiStar, FiZap } from 'react-icons/fi';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import Reveal from '../components/Reveal.jsx';

const showcases = [
  {
    id: 'wedding',
    title: 'Wedding Royalty & Bridal Glow',
    subtitle: 'Warm luxury film tones with pristine skin recovery and atmosphere enrichment.',
    before: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=78&fm=webp',
    after: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=78&fm=webp&sat=30&vib=30&bri=5',
    beforeLabel: 'Raw Capture',
    afterLabel: 'Bridal Film Grade',
    highlights: ['Natural skin texture preservation', 'Warm champagne highlight recovery', 'Background distraction clean-up', 'Emotive film grain cadence']
  },
  {
    id: 'editorial',
    title: 'Editorial Vogue & Beauty Polish',
    subtitle: 'High-end commercial magazine retouching with surgical precision and depth.',
    before: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=78&fm=webp',
    after: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=78&fm=webp&contrast=20',
    beforeLabel: 'Unretouched Studio Raw',
    afterLabel: 'Magazine Editorial Cover',
    highlights: ['Frequency separation skin sculpting', 'Micro-dodge and burn contours', 'Eye and hair clarity enhancement', 'Flawless color reproduction']
  },
  {
    id: 'cinematic',
    title: 'Cinematic Color & Mood Grading',
    subtitle: 'Transforming neutral raw photography into cinematic visual masterpieces with deep shadow cadence.',
    before: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=78&fm=webp',
    after: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=78&fm=webp',
    beforeLabel: 'Flat Log Camera Curve',
    afterLabel: 'Cinema LUT Palette',
    highlights: ['Teal & Gold shadows separation', 'Atmospheric haze injection', 'Dynamic range compression', 'Selective subject luminescence']
  },
  {
    id: 'restoration',
    title: 'Antique Heritage Restoration',
    subtitle: 'Reviving historical family archives, healing paper damage, and introducing lifelike authentic coloration.',
    before: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=78&fm=webp',
    after: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=78&fm=webp',
    beforeLabel: 'Faded Damaged Archive',
    afterLabel: 'Restored & Digitized Master',
    highlights: ['Scratch & dust spot eradication', 'AI facial reconstruction polish', 'Historic tone authentic restoration', 'Museum-grade preservation export']
  },
  {
    id: 'commercial',
    title: 'Commercial Luxury Product Polish',
    subtitle: 'Flawless jewelry, watch, and advertising imagery engineered to drive high-converting ecommerce sales.',
    before: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=78&fm=webp',
    after: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=78&fm=webp',
    beforeLabel: 'Uncut Product Raw',
    afterLabel: 'High-Converting Campaign',
    highlights: ['Precision pen-tool isolation', 'Reflection and glare balancing', 'Diamond & metal sparkle brilliance', 'True-to-life color accuracy']
  }
];

export default function BeforeAfterPage() {
  const [activeTab, setActiveTab] = useState('wedding');
  const currentShowcase = showcases.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen pb-28 pt-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[140px] z-[-1]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-violetGlow/10 blur-[120px] z-[-1]" />

      <div className="container">
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
            <p className="eyebrow">Interactive Atelier Showroom</p>
          </div>
          <h1 className="headline mt-4 max-w-5xl headline-3d-glow">
            Drag through the magic of Riwaz craftsmanship.
          </h1>
          <p className="subhead mt-6 max-w-3xl">
            Experience our pin-for-pin transformation precision. Every edit at Riwaz Studio is sculpted with layered color craft, high-frequency natural skin retention, and museum-grade tonal balance.
          </p>
        </Reveal>

        {/* Interactive Category Tabs */}
        <Reveal delay={0.15} className="mt-12">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-4">
            {showcases.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 rounded-full px-6 py-3.5 text-sm font-extrabold transition-all duration-500 flex items-center gap-2.5 ${
                    isActive
                      ? 'text-ink shadow-[0_0_30px_rgba(244,214,144,0.6)] scale-105'
                      : 'border border-white/12 bg-white/5 text-white/70 hover:border-champagne/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-showcase-tab"
                      className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-champagne via-[#ffebaf] to-champagne"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                  <FiSliders className={isActive ? 'text-ink' : 'text-champagne'} />
                  <span>{tab.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Showcase Display Box */}
        <Reveal delay={0.25} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentShowcase.id}
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass rounded-[16px] p-6 lg:p-10 border border-champagne/25 shadow-2xl"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_360px] items-center">
                {/* Main Interactive Slider */}
                <div className="w-full">
                  <BeforeAfterSlider
                    before={currentShowcase.before}
                    after={currentShowcase.after}
                    beforeLabel={currentShowcase.beforeLabel}
                    afterLabel={currentShowcase.afterLabel}
                  />
                </div>

                {/* Technical Highlights Panel */}
                <div className="flex flex-col justify-between h-full bg-ink/60 rounded-[12px] p-7 border border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-champagne/15 border border-champagne/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-champagne">
                      <FiStar className="text-champagne" />
                      <span>Atelier Suite</span>
                    </div>
                    <h2 className="mt-4 font-display text-3xl font-extrabold text-white">
                      {currentShowcase.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {currentShowcase.subtitle}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-champagne/80 flex items-center gap-2 border-b border-white/10 pb-2">
                      <FiLayers />
                      <span>Retouching Architecture</span>
                    </h3>
                    <ul className="mt-4 grid gap-3">
                      {currentShowcase.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-xs font-semibold text-white/85">
                          <FiCheckCircle className="text-champagne text-sm shrink-0 mt-0.5" />
                          <span className="leading-5">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne py-3.5 px-6 font-black uppercase tracking-wider text-xs text-ink transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#f4d690]"
                    >
                      <FiZap className="text-base" />
                      <span>Commission This Style</span>
                    </a>
                    <p className="text-[11px] text-center text-white/50 flex items-center justify-center gap-1">
                      <FiInfo /> Turnaround: 24 to 48 hours with client review loop.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* Bottom Callout */}
        <Reveal delay={0.35} className="mt-20 text-center max-w-2xl mx-auto">
          <h3 className="font-display text-3xl font-bold text-white">
            Have an entire catalog or wedding album?
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">
            We build custom tailored LUT profiles and dedicated editing teams for studios producing high volumes.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-champagne hover:underline"
          >
            Inquire About Bulk Studio Retaining Arrangements →
          </a>
        </Reveal>
      </div>
    </div>
  );
}

