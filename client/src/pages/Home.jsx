import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import HeroScene from '../components/HeroScene.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { blogs, gallery, heroTags, services, stats, testimonials } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

export default function Home() {
  const serviceItems = useStoredCollection('services', services).filter((item) => item.status !== 'draft');
  const galleryItems = useStoredCollection('gallery', gallery).filter((item) => item.status !== 'draft');
  const blogItems = useStoredCollection('blogs', blogs).filter((item) => item.status !== 'draft');
  const testimonialItems = useStoredCollection('testimonials', testimonials).filter((item) => item.status !== 'draft');

  return (
    <>
      <style>{`
        .section-3d { perspective: 1400px; transform-style: preserve-3d; }
        .depth-layer { transform-style: preserve-3d; }

        .glass-3d {
          transform: translateZ(0);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.3),
            0 2px 8px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.08);
          backface-visibility: hidden;
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .glass-3d:hover {
          transform: translateZ(25px) translateY(-6px);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.45),
            0 4px 16px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 50px rgba(199,168,80,0.06);
        }

        .stat-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .stat-3d:hover {
          transform: perspective(600px) translateZ(35px) rotateY(6deg) rotateX(-4deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(199,168,80,0.08);
        }

        .gallery-3d {
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .gallery-3d:hover {
          transform: perspective(800px) rotateY(-5deg) rotateX(4deg) scale(1.02) translateZ(15px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 50px rgba(199,168,80,0.08);
        }

        .hero-3d-wrapper { perspective: 1600px; transform-style: preserve-3d; }

        .hero-slider-3d {
          transform: rotateY(-6deg) rotateX(4deg) translateZ(40px);
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 1s cubic-bezier(0.23,1,0.32,1);
          box-shadow:
            -25px 25px 70px rgba(0,0,0,0.45),
            0 0 100px rgba(199,168,80,0.04);
        }
        .hero-slider-3d:hover {
          transform: rotateY(0deg) rotateX(0deg) translateZ(60px);
          box-shadow:
            0 35px 90px rgba(0,0,0,0.5),
            0 0 120px rgba(199,168,80,0.08);
        }

        .blog-3d {
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .blog-3d:hover {
          transform: translateY(-10px) translateZ(25px) rotateX(-2deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(199,168,80,0.05);
        }
        .blog-3d:hover img { transform: scale(1.1); }

        .btn-3d {
          transform: translateZ(0);
          box-shadow: 0 6px 20px rgba(199,168,80,0.3), 0 2px 6px rgba(0,0,0,0.25);
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .btn-3d:hover {
          transform: translateY(-3px) translateZ(15px);
          box-shadow: 0 12px 40px rgba(199,168,80,0.4), 0 6px 14px rgba(0,0,0,0.3);
        }

        .btn-outline-3d {
          transform: translateZ(0);
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .btn-outline-3d:hover {
          transform: translateY(-3px) translateZ(15px);
          box-shadow: 0 10px 30px rgba(199,168,80,0.15), 0 4px 12px rgba(0,0,0,0.25);
        }

        .tag-3d {
          transform: translateZ(0);
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .tag-3d:hover {
          transform: translateZ(18px) scale(1.1);
          border-color: rgba(199,168,80,0.45);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .premium-glow { position: relative; }
        .premium-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(199,168,80,0.35), transparent 45%, transparent 55%, rgba(199,168,80,0.18));
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
        }
        .premium-glow:hover::before { opacity: 1; }

        .shimmer-border { position: relative; overflow: hidden; }
        .shimmer-border::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(199,168,80,0.12), transparent 30%);
          animation: shimmer-rotate 10s linear infinite;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .shimmer-border:hover::after { opacity: 1; }
        @keyframes shimmer-rotate { 100% { transform: rotate(360deg); } }

        .floating {
          animation: float-3d 7s ease-in-out infinite;
        }
        @keyframes float-3d {
          0%, 100% { transform: rotateY(-6deg) rotateX(4deg) translateZ(40px) translateY(0); }
          50% { transform: rotateY(-4deg) rotateX(5deg) translateZ(50px) translateY(-12px); }
        }
        .floating:hover { animation-play-state: paused; }

        .testimonial-3d {
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .testimonial-3d:hover {
          transform: perspective(700px) rotateY(5deg) translateZ(25px) translateY(-6px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.35), 0 0 40px rgba(199,168,80,0.07);
        }

        .service-card-3d {
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .service-card-3d:hover {
          transform: perspective(900px) rotateX(-3deg) translateY(-8px) translateZ(20px);
        }

        @keyframes pulse-glow-3d {
          0%, 100% { box-shadow: -25px 25px 70px rgba(0,0,0,0.45), 0 0 40px rgba(199,168,80,0.04); }
          50% { box-shadow: -25px 25px 70px rgba(0,0,0,0.45), 0 0 70px rgba(199,168,80,0.1), 0 0 120px rgba(199,168,80,0.03); }
        }
        .pulse-glow { animation: pulse-glow-3d 5s ease-in-out infinite; }
        .pulse-glow:hover { animation: none; }

        .scroll-indicator {
          animation: scroll-float 2.5s ease-in-out infinite;
        }
        @keyframes scroll-float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        .headline-3d-glow {
          text-shadow: 0 0 80px rgba(199,168,80,0.08), 0 0 160px rgba(199,168,80,0.03);
        }
      `}</style>

      <section className="relative grid min-h-screen place-items-center overflow-hidden px-4 pt-28 hero-3d-wrapper">
        <HeroScene />
        <div className="container relative z-10 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] depth-layer">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>Riwaz Studio</motion.p>
            <motion.h1 className="headline mt-5 max-w-5xl headline-3d-glow" initial={{ opacity: 0, y: 30, rotateX: 15, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }} transition={{ delay: 0.12, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              Transforming Every Photo Into Art.
            </motion.h1>
            <motion.div className="mt-7 flex flex-wrap gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8 }}>
              {heroTags.map((tag, i) => (
                <motion.span key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs font-bold text-white/72 backdrop-blur tag-3d" initial={{ opacity: 0, scale: 0.7, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.34 + i * 0.07, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>{tag}</motion.span>
              ))}
            </motion.div>
            <motion.div className="mt-9 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8 }}>
              <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-4 font-extrabold text-black transition btn-3d">
                Explore Portfolio <FiArrowRight />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/7 px-6 py-4 font-extrabold text-white backdrop-blur transition btn-outline-3d">
                Contact Us <FiPlay />
              </Link>
            </motion.div>
          </div>
          <div className="glass mb-10 rounded-[8px] p-4 hero-slider-3d floating pulse-glow">
            <BeforeAfterSlider />
          </div>
        </div>
        <motion.a href="#story" className="scroll-indicator absolute bottom-7 left-1/2 grid place-items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-white/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}>
          <FiArrowDown className="animate-bounce text-xl text-champagne" /> Scroll
        </motion.a>
      </section>

      <section id="story" className="section section-3d">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Studio Story</p>
            <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">A retouching atelier built for detail, emotion, and polish.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="subhead">Riwaz Studio partners with photographers, studios, creators, and brands to turn raw captures into finished visual stories. Every image is handled with layered color, natural retouching, restoration discipline, and export precision.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} className="glass rounded-[8px] p-5 glass-3d stat-3d premium-glow shimmer-border" initial={{ opacity: 0, y: 35, rotateX: -12, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  <strong className="block font-display text-3xl text-champagne">{stat.value}</strong>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-[.14em] text-white/52">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white/[.025] section-3d">
        <div className="container">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-4 font-display text-5xl">Premium editing suites</h2>
            </div>
            <Link to="/services" className="font-bold text-champagne">View all services</Link>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.slice(0, 6).map((service, i) => (
              <motion.div key={service.id || service.title} className="service-card-3d" initial={{ opacity: 0, y: 50, rotateY: -10, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.09, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-3d">
        <div className="container">
          <Reveal>
            <p className="eyebrow">3D Gallery</p>
            <h2 className="mt-4 font-display text-5xl">Selected transformations</h2>
          </Reveal>
          <div className="mt-10 grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {galleryItems.slice(0, 8).map((item, index) => (
              <motion.div
                key={item.id || item.title}
                className={`group relative overflow-hidden rounded-[8px] luxury-border gallery-3d premium-glow shimmer-border ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}
                initial={{ opacity: 0, scale: 0.88, rotateX: 12, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.08, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 0.985 }}
              >
                <img src={item.image || item.url} alt={item.title} loading="lazy" className="image-protect h-full w-full object-cover transition duration-700 group-hover:scale-110" onContextMenu={(event) => event.preventDefault()} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-90" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] backdrop-blur">{item.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white/[.025] section-3d">
        <div className="container grid gap-6 lg:grid-cols-3">
          {testimonialItems.slice(0, 3).map((item, i) => (
            <motion.div key={item.id || item.name || item.title} className="glass rounded-[8px] p-6 glass-3d testimonial-3d premium-glow shimmer-border" initial={{ opacity: 0, y: 50, rotateY: i % 2 ? 10 : -10, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.13, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <div className="text-champagne">{'★'.repeat(item.rating)}</div>
              <p className="mt-5 text-lg leading-8 text-white/78">"{item.quote || item.review}"</p>
              <div className="mt-6">
                <strong>{item.name || item.title}</strong>
                <span className="block text-sm text-white/48">{item.role || item.profession}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section section-3d">
        <div className="container">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Journal</p>
              <h2 className="mt-4 font-display text-5xl">Editing insights</h2>
            </div>
            <Link to="/blog" className="font-bold text-champagne">Read blog</Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {blogItems.slice(0, 3).map((post, i) => (
              <motion.article key={post.id || post.title} className="glass overflow-hidden rounded-[8px] blog-3d glass-3d premium-glow shimmer-border" initial={{ opacity: 0, y: 60, rotateX: -10, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.12, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" className="h-56 w-full object-cover transition duration-700" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-[.18em] text-champagne">{post.category}</span>
                  <h3 className="mt-3 font-display text-2xl">{post.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
