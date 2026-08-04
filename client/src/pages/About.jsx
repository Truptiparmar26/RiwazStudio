import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import PreloadedImage from '../components/PreloadedImage.jsx';
import { stats } from '../data/content.js';
import { useApiCollection } from '../utils/siteStore.js';
import {
  FiSliders,
  FiEye,
  FiImage,
  FiScissors,
  FiHeart,
  FiStar,
  FiZap,
  FiCheckCircle,
  FiAward,
  FiCamera,
  FiShield,
  FiTarget,
  FiUserCheck
} from 'react-icons/fi';

const timeline = ['Raw image audit', 'Color direction board', 'Detail retouching', 'Client proofing', 'Delivery exports'];

const defaultAbout = [
  {
    id: "about-editor",
    title: "Riwaz Studio",
    name: "Riwaz Studio",
    role: "Creative Photo Editor",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Behind every beautifully edited photograph is a vision, attention to detail, and a passion for creativity. At Riwaz Studio, every image is carefully refined to preserve its natural emotion while enhancing its visual impact.\n\nFrom portrait retouching and color correction to creative photo manipulation and professional enhancements, the goal is simple — to make every photograph look its absolute best.",
    personalStatement: "I believe great editing is not about changing a photograph completely — it is about bringing out the beauty that is already there.",
    quote: "Every photograph has a story.\nMy job is to make that story unforgettable.",
    expertise: "Portrait Retouching, Color Correction, Photo Manipulation, Background Removal, Wedding & Event Editing, Creative Photo Enhancement",
    ctaHeading: "Have a Photo That Deserves More?",
    ctaText: "Let’s transform your photographs into visuals you’ll love to share and remember.",
    status: "published",
  },
];

const defaultExpertiseCards = [
  {
    title: "Portrait Retouching",
    desc: "Precision skin texture recovery and frequency separation without losing authentic human warmth.",
    icon: FiUserCheck,
    color: "from-amber-400 to-amber-600",
    glow: "rgba(245,158,11,0.2)"
  },
  {
    title: "Color Correction",
    desc: "Balancing white tone, exposure, and lighting consistency across complex multi-camera shoots.",
    icon: FiSliders,
    color: "from-blue-400 to-indigo-600",
    glow: "rgba(99,102,241,0.2)"
  },
  {
    title: "Photo Manipulation",
    desc: "Seamless compositing, object removal, and mood alterations with uncompromised realism.",
    icon: FiScissors,
    color: "from-purple-400 to-pink-600",
    glow: "rgba(168,85,247,0.2)"
  },
  {
    title: "Background Removal",
    desc: "Flawless isolating, mask edging, and background replacement tailored for high-end commercial use.",
    icon: FiImage,
    color: "from-emerald-400 to-teal-600",
    glow: "rgba(16,185,129,0.2)"
  },
  {
    title: "Wedding & Event Editing",
    desc: "Cinematic batch grading and emotional consistency across full wedding photo story sequences.",
    icon: FiHeart,
    color: "from-rose-400 to-red-600",
    glow: "rgba(244,63,94,0.2)"
  },
  {
    title: "Creative Enhancement",
    desc: "Artistic atmosphere boosts, Dodge & Burn sculpting, and bespoke look formulations for campaigns.",
    icon: FiZap,
    color: "from-amber-300 to-yellow-500",
    glow: "rgba(252,211,77,0.25)"
  },
];

const approachSteps = [
  {
    number: "01",
    title: "Understand",
    desc: "Understanding the story, mood, and purpose behind every photograph before making a single adjustment."
  },
  {
    number: "02",
    title: "Refine",
    desc: "Carefully enhancing micro-details, skin texture, color harmony, lighting contrast, and spatial composition."
  },
  {
    number: "03",
    title: "Perfect",
    desc: "Delivering a breath-taking, polished final image while rigorously keeping it natural and authentic."
  }
];

const whyPoints = [
  { label: "Attention to Detail", desc: "Every pixel, shadow grade, and highlight curve is inspected at 200% zoom.", icon: FiEye },
  { label: "Natural & Professional Results", desc: "We enhance reality rather than replacing it with synthetic filters.", icon: FiAward },
  { label: "Creative Vision", desc: "Deep artistic intuition developed through thousands of high-profile commissions.", icon: FiStar },
  { label: "High-Quality Editing", desc: "Non-destructive 16-bit workflows preserving maximum dynamic print range.", icon: FiShield },
  { label: "Client-Focused Approach", desc: "Collaborative revision loops until your personal artistic mood is reached.", icon: FiTarget },
  { label: "Consistent Results", desc: "Uniform color grading and visual identity across hundreds of event captures.", icon: FiCheckCircle },
];

export default function About() {
  const { items } = useApiCollection('about', defaultAbout);
  const editor = items[0] || defaultAbout[0];

  const bioParagraphs = (editor.bio || defaultAbout[0].bio)
    .split("\n")
    .filter((p) => p.trim() !== "");

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
          transform: translateZ(20px) translateY(-5px);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.45),
            0 4px 16px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 50px rgba(199,168,80,0.08);
        }

        .stat-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .stat-3d:hover {
          transform: perspective(600px) translateZ(30px) rotateY(5deg) rotateX(-4deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(199,168,80,0.08);
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
          animation: shimmer-rotate 12s linear infinite;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .shimmer-border:hover::after { opacity: 1; }
        @keyframes shimmer-rotate { 100% { transform: rotate(360deg); } }

        .headline-3d-glow {
          text-shadow: 0 0 80px rgba(199,168,80,0.1), 0 0 160px rgba(199,168,80,0.04);
        }

        .timeline-card-3d {
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .timeline-card-3d:hover {
          transform: perspective(800px) translateZ(20px) translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(199,168,80,0.06);
        }

        .timeline-step-3d {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .timeline-step-3d:hover {
          transform: translateZ(15px) scale(1.03);
        }
        .timeline-step-3d:hover .step-number {
          transform: scale(1.15) rotateY(10deg);
          box-shadow: 0 8px 25px rgba(199,168,80,0.35);
        }
        .timeline-step-3d:hover .step-line {
          background: linear-gradient(90deg, rgba(199,168,80,0.4), rgba(199,168,80,0.08));
        }
        .timeline-step-3d:hover .step-label {
          color: rgba(199,168,80,0.95);
        }

        .step-number {
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
          transform-style: preserve-3d;
        }
        .step-line {
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .step-label {
          transition: color 0.4s ease;
        }

        .mission-card-3d {
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .mission-card-3d:nth-child(1):hover {
          transform: perspective(700px) rotateY(4deg) translateZ(20px) translateY(-6px);
        }
        .mission-card-3d:nth-child(2):hover {
          transform: perspective(700px) translateZ(25px) translateY(-8px);
        }
        .mission-card-3d:nth-child(3):hover {
          transform: perspective(700px) rotateY(-4deg) translateZ(20px) translateY(-6px);
        }

        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .stat-float-1 { animation: subtle-float 7s ease-in-out infinite; }
        .stat-float-2 { animation: subtle-float 7s ease-in-out 1.2s infinite; }
        .stat-float-3 { animation: subtle-float 7s ease-in-out 2.4s infinite; }
        .stat-float-4 { animation: subtle-float 7s ease-in-out 3.6s infinite; }

        .editor-portrait-glow {
          position: relative;
          z-index: 1;
        }
        .editor-portrait-glow::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(168,85,247,0.7), rgba(59,130,246,0.6), rgba(244,214,144,0.8), rgba(16,185,129,0.5));
          filter: blur(8px);
          opacity: 0.85;
          z-index: -1;
          transition: all 0.7s ease;
          animation: portrait-rotate 10s linear infinite;
        }
        .editor-portrait-glow:hover::before {
          filter: blur(14px);
          opacity: 1;
          transform: scale(1.02);
        }
        @keyframes portrait-rotate {
          0% { filter: hue-rotate(0deg) blur(10px); }
          50% { filter: hue-rotate(45deg) blur(12px); }
          100% { filter: hue-rotate(0deg) blur(10px); }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              About Riwaz Studio
            </motion.p>
            <motion.h1 className="headline mt-4 max-w-5xl headline-3d-glow text-white font-extrabold" initial={{ opacity: 0, y: 30, rotateX: 12, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              Turning Moments Into Timeless Visual Stories.
            </motion.h1>
            <motion.p className="mt-6 text-lg sm:text-xl leading-8 text-white/75 max-w-3xl font-light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}>
              Riwaz Studio is a creative photo editing studio focused on transforming ordinary photographs into polished, expressive, and visually captivating images.
            </motion.p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {['Mission', 'Vision', 'Studio Story'].map((title, index) => (
              <Reveal key={title} delay={0.35 + index * 0.12}>
                <motion.div
                  className="glass rounded-[12px] p-7 glass-3d premium-glow shimmer-border mission-card-3d h-full flex flex-col justify-between"
                  initial={{ opacity: 0, y: 50, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.35 + index * 0.12, duration: 0.9 }}
                >
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-champagne/70 block mb-1">Our Purpose</span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{title}</h2>
                    <p className="mt-4 leading-7 text-white/70 text-sm sm:text-base font-light">
                      {index === 0 && "To empower photographers with a dependable post-production partner that protects organic emotion while making every frame feel cinematic, polished, and commercially ready."}
                      {index === 1 && "To set the global standard for high-end digital retouching by blending traditional photography sensibility with state-of-the-art grading craft."}
                      {index === 2 && "Born out of an obsession with timeless visual storytelling, Riwaz Studio evolved into an editorial powerhouse trusted by elite image makers worldwide."}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-champagne/80 font-semibold uppercase tracking-wider">
                    <span>{index === 0 ? "Commitment" : index === 1 ? "Standard" : "Heritage"}</span>
                    <span>✦</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE EDITOR SECTION */}
      <section className="section py-24 bg-gradient-to-b from-transparent via-white/[.015] to-transparent relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] xl:gap-20">
            
            {/* LEFT SIDE: Portrait & Badge */}
            <Reveal className="flex flex-col items-center justify-center text-center">
              <motion.span 
                className="text-xs font-black uppercase tracking-[0.25em] text-champagne/80 mb-5 block"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                THE EDITOR
              </motion.span>

              <div className="relative group p-3 sm:p-4">
                <div className="editor-portrait-glow rounded-full p-1.5 bg-gradient-to-br from-purple-500/40 via-champagne/40 to-blue-500/40 shadow-2xl">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/15 bg-ink shadow-2xl">
                    <PreloadedImage
                      src={editor.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                      alt={editor.name || "The Editor"}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.05] brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Pill Status Badge (Inspired by User Screenshot) */}
                <motion.div 
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 rounded-full border border-white/20 bg-ink/95 px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-champagne/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide uppercase font-sans">
                    {editor.role || "Creative Photo Editor"}
                  </span>
                </motion.div>
              </div>
            </Reveal>

            {/* RIGHT SIDE: Bio & Personal Statement */}
            <Reveal delay={0.2} className="flex flex-col justify-center">
              <span className="inline-block rounded-full border border-champagne/30 bg-champagne/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-champagne mb-4 w-fit shadow-sm">
                Meet the Editor
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {editor.name || editor.title || "Riwaz Studio"}
              </h2>

              <div className="mt-6 space-y-5 text-base sm:text-lg leading-8 text-white/75 font-light">
                {bioParagraphs.length > 0 ? (
                  bioParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-8">
                      {para}
                    </p>
                  ))
                ) : (
                  <>
                    <p>
                      Behind every beautifully edited photograph is a vision, attention to detail, and a passion for creativity. At Riwaz Studio, every image is carefully refined to preserve its natural emotion while enhancing its visual impact.
                    </p>
                    <p>
                      From portrait retouching and color correction to creative photo manipulation and professional enhancements, the goal is simple — to make every photograph look its absolute best.
                    </p>
                  </>
                )}
              </div>

              {/* Personal Statement Callout Box */}
              <motion.div 
                className="mt-8 relative overflow-hidden rounded-[12px] border border-champagne/30 bg-gradient-to-r from-champagne/15 via-white/[0.03] to-transparent p-6 sm:p-7 shadow-xl backdrop-blur-md"
                whileHover={{ scale: 1.01, borderColor: "rgba(244,214,144,0.6)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-champagne via-amber-400 to-transparent" />
                <p className="font-display text-lg sm:text-xl italic text-champagne/95 leading-relaxed font-normal">
                  "{editor.personalStatement || "I believe great editing is not about changing a photograph completely — it is about bringing out the beauty that is already there."}"
                </p>
                <span className="block mt-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50 text-right">
                  — Artistic Credo
                </span>
              </motion.div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 3. WHAT I DO ("Creative Expertise") */}
      <section className="section py-20 relative">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">What I Do</p>
            <h2 className="headline mt-3 text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
              Creative Expertise
            </h2>
            <p className="mt-4 text-white/65 text-base sm:text-lg">
              Precision digital engineering designed to elevate commercial imagery, private wedding archives, and editorial portfolios.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {defaultExpertiseCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={0.1 * i}>
                  <motion.div
                    className="glass rounded-[14px] p-7 glass-3d premium-glow shimmer-border flex flex-col justify-between h-full group cursor-default"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <div className={`grid h-14 w-14 place-items-center rounded-[12px] bg-gradient-to-br ${card.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`} style={{ boxShadow: `0 10px 25px ${card.glow}` }}>
                          <Icon className="text-2xl text-white drop-shadow-sm" />
                        </div>
                        <span className="text-xs font-bold text-white/30 group-hover:text-champagne transition-colors duration-300">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-champagne transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="mt-3.5 leading-7 text-white/68 text-sm sm:text-base">
                        {card.desc}
                      </p>
                    </div>
                    <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 group-hover:text-white/80 transition-colors">
                      <span className="font-semibold tracking-wider">Professional Grade</span>
                      <FiStar className="text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MY APPROACH */}
      <section className="section py-20 bg-white/[0.015] border-y border-white/5 relative">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Workflow & Philosophy</p>
            <h2 className="headline mt-3 text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
              My Approach to Editing
            </h2>
            <p className="mt-4 text-white/65 text-base sm:text-lg">
              A structured, highly consultative process ensuring that every photograph retains its genuine spirit while gaining extraordinary aesthetic impact.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-champagne/20 via-champagne/60 to-champagne/20 -z-0" />

            {approachSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.2}>
                <motion.div
                  className="glass rounded-[14px] p-8 glass-3d premium-glow shimmer-border text-center flex flex-col items-center relative z-10 bg-ink/90"
                  whileHover={{ y: -6 }}
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-champagne to-amber-500 font-display text-2xl font-black text-black shadow-[0_0_30px_rgba(244,214,144,0.4)] mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="leading-7 text-white/70 text-sm sm:text-base font-light">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Existing Stats & Timeline Preservation */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 h-full">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className={`glass rounded-[12px] p-6 glass-3d stat-3d premium-glow shimmer-border stat-float-${i + 1} flex flex-col justify-center`}
                  >
                    <strong className="font-display text-4xl sm:text-5xl text-champagne font-black">{stat.value}</strong>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-[.16em] text-white/60">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <motion.div
                className="glass rounded-[14px] p-8 glass-3d timeline-card-3d premium-glow shimmer-border h-full flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-champagne/70">Production Stages</span>
                  <h3 className="font-display text-3xl font-bold text-white mt-1">Interactive Timeline</h3>
                </div>
                <div className="mt-8 grid gap-4">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-4 timeline-step-3d group cursor-default"
                    >
                      <span className="step-number grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne/90 font-extrabold text-black group-hover:bg-champagne group-hover:scale-110 transition-transform">
                        {index + 1}
                      </span>
                      <div className="step-line h-px flex-1 bg-white/15" />
                      <strong className="step-label w-48 text-right text-sm sm:text-base font-semibold text-white/85 group-hover:text-champagne transition-colors">
                        {item}
                      </strong>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. WHY RIWAZ STUDIO */}
      <section className="section py-20 relative">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">The Difference</p>
            <h2 className="headline mt-3 text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
              Why Riwaz Studio
            </h2>
            <p className="mt-4 text-white/65 text-base sm:text-lg">
              Uncompromising visual integrity combined with modern collaboration makes us the premiere destination for selective professionals.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <Reveal key={point.label} delay={idx * 0.08}>
                  <motion.div 
                    className="glass rounded-[12px] p-6 glass-3d premium-glow shimmer-border flex items-start gap-4 group"
                    whileHover={{ x: 6, borderColor: "rgba(244,214,144,0.4)" }}
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-champagne/15 text-champagne border border-champagne/30 group-hover:bg-champagne group-hover:text-ink transition-colors duration-300 shadow-sm">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-champagne transition-colors">
                        {point.label}
                      </h3>
                      <p className="mt-2 text-sm text-white/65 leading-6 font-light">
                        {point.desc}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PERSONAL QUOTE SECTION */}
      <section className="section py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-amber-600/10 to-blue-900/20 pointer-events-none" />
        <div className="absolute inset-0 bg-ink/70 pointer-events-none backdrop-blur-sm" />
        
        <div className="container relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <motion.div 
              className="glass rounded-[20px] p-10 sm:p-14 border border-champagne/40 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl sm:text-6xl text-champagne font-serif select-none opacity-80 block mb-4">“</span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                {(editor.quote || "Every photograph has a story.\nMy job is to make that story unforgettable.").split("\n").map((line, idx) => (
                  <span key={idx} className="block">
                    {idx === 1 ? <span className="text-champagne font-serif italic mt-2 block">{line}</span> : line}
                  </span>
                ))}
              </h2>
              <div className="mt-8 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-champagne/60" />
                <span className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                  {editor.name || "Riwaz Studio"}
                </span>
                <span className="h-px w-8 bg-champagne/60" />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="section pb-36 pt-12 relative">
        <div className="container">
          <Reveal>
            <div className="glass rounded-[20px] p-10 sm:p-16 text-center border border-white/15 shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-champagne/15 rounded-full blur-[100px] pointer-events-none" />
              
              <p className="eyebrow text-champagne">Next Steps</p>
              <h2 className="headline mt-3 text-3xl sm:text-5xl text-white font-black max-w-3xl mx-auto">
                {editor.ctaHeading || "Have a Photo That Deserves More?"}
              </h2>
              <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-light leading-8">
                {editor.ctaText || "Let’s transform your photographs into visuals you’ll love to share and remember."}
              </p>
              
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full bg-champagne px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-ink shadow-[0_0_30px_rgba(244,214,144,0.4)] transition hover:bg-white hover:text-black"
                >
                  Explore Services
                </motion.a>
                <motion.a
                  href="/gallery"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full border border-white/30 bg-white/5 px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-champagne hover:bg-white/10 hover:text-champagne"
                >
                  View Gallery
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}