import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import Reveal from '../components/Reveal.jsx';

const showcases = [
  {
    id: 'wedding',
    label: 'Wedding Editing',
    title: 'Wedding Editing',
    description: 'Natural skin retouching, refined color grading, balanced highlights, and enhanced details while preserving the original mood of the photograph.',
    before: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Raw Capture',
    afterLabel: 'Refined Visual',
    details: [
      'Natural skin texture preservation',
      'Balanced exposure & highlights',
      'Refined color grading',
      'Clean, polished final finish'
    ]
  },
  {
    id: 'portrait',
    label: 'Portrait Retouching',
    title: 'Portrait Retouching',
    description: 'High-end beauty retouching, refined complexion, subtle contouring, and razor-sharp facial details while retaining natural skin pores.',
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Raw Capture',
    afterLabel: 'Refined Visual',
    details: [
      'High-frequency separation skin retouch',
      'Micro dodge & burn facial sculpting',
      'Iris, teeth, & hair clarity enhancement',
      'Pore-preserving luxury finish'
    ]
  },
  {
    id: 'cinematic',
    label: 'Cinematic Color',
    title: 'Cinematic Color',
    description: 'Atmospheric film color grading, rich shadow depth, highlight roll-off, and evocative mood designed to make every scene look cinematic.',
    before: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Raw Capture',
    afterLabel: 'Refined Visual',
    details: [
      'Cinematic teal & warm gold palette',
      'Dynamic range & contrast roll-off',
      'Subject isolation & luminance balance',
      'Analog film tone & subtle grain cadence'
    ]
  },
  {
    id: 'restoration',
    label: 'Photo Restoration',
    title: 'Photo Restoration',
    description: 'Advanced digital restoration healing scratches, dust, water damage, and color degradation while resurrecting precious memories with clarity.',
    before: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Raw Capture',
    afterLabel: 'Refined Visual',
    details: [
      'Scratch, fold, & blemish eradication',
      'AI facial reconstruction & sharpening',
      'Vintage tone colorization & recovery',
      'Museum-grade high-resolution export'
    ]
  }
];

import { useApiCollection } from '../utils/siteStore.js';

export default function BeforeAfterPage() {
  const { items: showcaseItems } = useApiCollection('beforeAfter', showcases);
  const items = showcaseItems && showcaseItems.length > 0 ? showcaseItems : showcases;
  const [activeTab, setActiveTab] = useState('wedding');
  const currentShowcase = items.find((item) => String(item.id) === String(activeTab)) || items[0] || showcases[0];

  return (
    <>
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[140px] z-[-1]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-violetGlow/10 blur-[120px] z-[-1]" />

      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
              <p className="eyebrow text-champagne text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
                BEFORE & AFTER
              </p>
            </div>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white headline-3d-glow leading-[1.12] max-w-4xl">
              From Raw Captures <br className="hidden sm:inline" />
              To Refined Visuals.
            </h1>
            <p className="subhead mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-white/75">
              Explore real before-and-after transformations by Riwaz Studio. From natural retouching and clean color correction to cinematic grading and detailed enhancements, every image is refined with care while keeping its original character intact.
            </p>
          </Reveal>

          {/* Interactive Category Tabs */}
          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              {items.map((tab) => {
                const isActive = String(activeTab) === String(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative shrink-0 rounded-full px-4 py-2 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border ${
                      isActive
                        ? 'border-champagne bg-champagne text-ink shadow-[0_0_25px_rgba(244,214,144,0.5)] font-extrabold scale-[1.02]'
                        : 'border-champagne/60 bg-black/40 text-white hover:border-champagne hover:text-champagne hover:bg-champagne/10 shadow-sm'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-showcase-tab"
                        className="absolute inset-0 z-[-1] rounded-full bg-champagne"
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Showcase Display Area */}
          <Reveal delay={0.25} className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentShowcase.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid gap-8 lg:grid-cols-[1fr_1fr] items-stretch"
              >
                {/* Left: Interactive Slider */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-full luxury-border rounded-[12px] overflow-hidden shadow-2xl">
                    <BeforeAfterSlider
                      before={currentShowcase.before}
                      after={currentShowcase.after}
                      beforeLabel={currentShowcase.beforeLabel}
                      afterLabel={currentShowcase.afterLabel}
                      priority={true}
                      aspectClassName="aspect-[3/4] sm:aspect-[4/5] min-h-[280px] sm:min-h-[420px] md:min-h-[500px]"
                    />
                  </div>
                </div>

                {/* Right: Technical Details Panel matching screenshot */}
                <div className="rounded-[12px] border border-white/20 bg-black/40 p-5 sm:p-9 flex flex-col justify-between shadow-2xl backdrop-blur-md">
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                      {currentShowcase.title}
                    </h2>
                    <p className="mt-3.5 text-sm sm:text-base text-white/75 leading-relaxed">
                      {currentShowcase.description}
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                        EDITING DETAILS
                      </h3>
                      <div className="mt-3 h-[1px] w-full bg-white/15" />
                      <ul className="mt-5 space-y-3.5">
                        {currentShowcase.details.map((point) => (
                          <li key={point} className="flex items-center gap-3 text-sm sm:text-[15px] font-medium text-white/90">
                            <span className="text-champagne font-bold text-base shrink-0">☑</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 pt-6">
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-champagne py-4 px-8 font-extrabold uppercase tracking-wider text-xs sm:text-sm text-ink transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(244,214,144,0.6)]"
                    >
                      <span>REQUEST THIS EDIT</span>
                      <FiArrowRight className="text-base" />
                    </Link>
                    <p className="mt-3 text-center text-xs font-bold uppercase tracking-widest text-white/50">
                      DELIVERY ( 24 to 48 hours )
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* Bottom Catalog Consultation CTA */}
          <Reveal delay={0.35} className="mt-20 text-center max-w-2xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Have an entire catalog or wedding album?
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              We build custom tailored LUT profiles and dedicated editing teams for studios producing high volumes.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-champagne hover:underline"
            >
              Inquire About Bulk Studio Retaining Arrangements →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
