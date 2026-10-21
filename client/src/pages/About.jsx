import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import PreloadedImage from '../components/PreloadedImage.jsx';
import { stats } from '../data/content.js';
import { useApiCollection } from '../utils/siteStore.js';
import defaultEditorImg from '../assets/editor-portrait.jpg';
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
  FiUserCheck,
  FiInstagram
} from 'react-icons/fi';

const timeline = ['Raw image audit', 'Color direction board', 'Detail retouching', 'Client proofing', 'Delivery exports'];

const defaultAbout = [
  {
    id: "about-editor",
    title: "Tejas Patel",
    name: "Tejas Patel",
    role: "Founder & Wedding Photo Editor",
    image: defaultEditorImg,
    bio: "I'm Tejas, the founder and photo editor behind Riwaz Studio. With a passion for photography, creativity, and visual storytelling, I focus on turning raw captures into refined and meaningful visuals. My work includes wedding photo editing, cinematic color grading, natural retouching, portrait enhancement, and creative social media designs.\n\nAt Riwaz Studio, every photograph is carefully crafted with attention to detail, balanced colors, and a natural premium finish. I believe great editing should enhance the beauty already present in an image while keeping its emotion, character, and story intact.",
    personalStatement: "I believe great editing is not about changing a photograph completely — it is about bringing out the beauty that is already there.",
    quote: "Every photograph has a story.\nMy job is to make that story unforgettable.",
    expertise: "Wedding Photo Editing, Color Correction & Grading, Skin Retouching, Background & Object Removal, Pre-Wedding & Portrait Editing, Instagram Post Design",
    ctaHeading: "Have a Photo That Deserves More?",
    ctaText: "Let’s transform your photographs into visuals you’ll love to share and remember.",
    status: "published",
  },
];

const defaultExpertiseCards = [
  {
    title: "Wedding Photo Editing",
    desc: "Complete wedding photo editing with natural skin retouching, beautiful color correction, cinematic tones, and consistent results across the entire wedding story.",
    icon: FiHeart,
    color: "from-amber-400 to-amber-600",
    glow: "rgba(245,158,11,0.2)"
  },
  {
    title: "Color Correction & Grading",
    desc: "Balanced colors, accurate skin tones, refined contrast, and cinematic grading designed to give every photograph a consistent and premium look.",
    icon: FiSliders,
    color: "from-blue-400 to-indigo-600",
    glow: "rgba(99,102,241,0.2)"
  },
  {
    title: "Skin Retouching",
    desc: "Natural skin retouching that removes distractions while preserving real skin texture, expressions, and the authentic character of every person.",
    icon: FiUserCheck,
    color: "from-purple-400 to-pink-600",
    glow: "rgba(168,85,247,0.2)"
  },
  {
    title: "Background & Object Removal",
    desc: "Clean and precise background removal, unwanted object cleanup, and distraction removal for a polished and professional final image.",
    icon: FiScissors,
    color: "from-emerald-400 to-teal-600",
    glow: "rgba(16,185,129,0.2)"
  },
  {
    title: "Pre-Wedding & Portrait Editing",
    desc: "Creative editing for pre-wedding, couple, portrait, and lifestyle photographs with refined tones, natural retouching, and a signature visual finish.",
    icon: FiCamera,
    color: "from-rose-400 to-red-600",
    glow: "rgba(244,63,94,0.2)"
  },
  {
    title: "Instagram Post Design",
    desc: "Premium social media designs created for photographers and brands, including wedding posts, carousel designs, promotional creatives, and Instagram-ready visuals.",
    icon: FiInstagram,
    color: "from-amber-300 to-yellow-500",
    glow: "rgba(252,211,77,0.25)"
  },
];

const approachSteps = [
  {
    number: "01",
    title: "Understand",
    desc: "We first understand the photograph, style, mood, and your editing requirements before making any adjustments."
  },
  {
    number: "02",
    title: "Refine",
    desc: "We carefully refine colors, skin tones, details, lighting, and composition while keeping the image natural."
  },
  {
    number: "03",
    title: "Perfect",
    desc: "The final image is polished, consistent, and ready to be delivered, shared, or published."
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
  const editorName = editor.name && editor.name !== "Riwaz Studio" ? editor.name : "Tejas Patel";
  const rawBio = editor.bio && !editor.bio.includes("Behind every beautifully") 
    ? editor.bio 
    : defaultAbout[0].bio;
  const bioParagraphs = rawBio.split("\n").filter((p) => p.trim() !== "");

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
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              About Riwaz Studio
            </motion.p>
            <motion.h1 className="headline mt-4 max-w-5xl headline-3d-glow text-white font-extrabold" initial={{ opacity: 0, y: 30, rotateX: 12, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              Turning Your Photographs Into Timeless Visuals.
            </motion.h1>
            <motion.p className="mt-6 text-lg sm:text-xl leading-8 text-white/75 max-w-3xl font-light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9 }}>
              Riwaz Studio helps photographers turn their captures into polished, memorable visuals through professional editing, cinematic color grading, retouching, and creative design.
            </motion.p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
            {['Mission', 'Vision', 'Studio Story'].map((title, index) => (
              <Reveal key={title} delay={0.35 + index * 0.12} className="h-full">
                <motion.div
                  className="glass rounded-[12px] p-7 glass-3d premium-glow shimmer-border mission-card-3d h-full flex flex-col justify-between"
                  initial={{ opacity: 0, y: 50, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.35 + index * 0.12, duration: 0.9 }}
                >
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-champagne/70 block mb-1">Our Purpose</span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white min-h-[2.5rem] flex items-center">{title}</h2>
                    <p className="mt-4 leading-7 text-white/70 text-sm sm:text-base font-light flex-1">
                      {index === 0 && "To transform every photograph into a refined visual that feels natural, timeless, and beautifully finished — while preserving the emotion behind the moment."}
                      {index === 1 && "To become a trusted editing partner for photographers and creative professionals, known for premium quality, consistent results, and attention to every detail."}
                      {index === 2 && "Riwaz Studio was created with a passion for photography, creativity, and meaningful details. We believe great editing should enhance a photograph, not change its soul. Every image we work on is crafted with care, precision, and a distinctive visual style."}
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

              <div className="relative group p-2 sm:p-4">
                {/* Circular Portrait Frame with Crisp White Border */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/80 bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:border-white">
                  <PreloadedImage
                    src={editor.image && !editor.image.includes('photo-1534528741775-53994a69daeb') ? editor.image : defaultEditorImg}
                    alt={editor.name || "Founder & Wedding Photo Editor"}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                </div>

                {/* Pill Badge at Bottom-Right (With Green Indicator & 2-Line Title Matching 3rd Image) */}
                <motion.div 
                  className="absolute bottom-1 -right-3 sm:-right-7 md:-right-9 z-20 flex items-center gap-3 rounded-full border-2 border-white/80 bg-[#1c1c1f]/95 px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-champagne hover:scale-105"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]"></span>
                  </span>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] sm:text-xs font-bold text-white tracking-[0.08em] sm:tracking-[0.1em] uppercase leading-tight font-sans whitespace-nowrap">
                      FOUNDER &amp; WEDDING
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-white tracking-[0.08em] sm:tracking-[0.1em] uppercase leading-tight font-sans mt-0.5 whitespace-nowrap">
                      PHOTO EDITOR
                    </span>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* RIGHT SIDE: Bio & Personal Statement */}
            <Reveal delay={0.2} className="flex flex-col justify-center">
              <span className="inline-block rounded-full border border-champagne/30 bg-champagne/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-champagne mb-4 w-fit shadow-sm">
                Meet the Editor
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {editorName}
              </h2>

              <div className="mt-6 space-y-5 text-base sm:text-lg leading-8 text-white/75 font-light">
                {bioParagraphs.map((para, idx) => (
                  <p key={idx} className="leading-8">
                    {para}
                  </p>
                ))}
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
          <Reveal className="text-center max-w-4xl mx-auto">
            <p className="eyebrow">What I Do</p>
            <h2 className="headline mt-3 text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
              Creative Expertise
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed font-light">
              Professional photo editing crafted with precision, natural retouching, and a premium visual finish
              <span className="block mt-1 text-white/65">
                — helping photographers turn their captures into polished, client-ready images.
              </span>
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {defaultExpertiseCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={0.1 * i} className="h-full">
                  <motion.div
                    className="glass rounded-[14px] p-7 glass-3d premium-glow shimmer-border flex flex-col justify-between h-full group cursor-default"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="mb-6 flex items-center justify-between">
                        <div className={`grid h-14 w-14 place-items-center rounded-[12px] bg-gradient-to-br ${card.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`} style={{ boxShadow: `0 10px 25px ${card.glow}` }}>
                          <Icon className="text-2xl text-white drop-shadow-sm" />
                        </div>
                        <span className="text-xs font-bold text-white/30 group-hover:text-champagne transition-colors duration-300">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-champagne transition-colors duration-300 min-h-[3.8rem] flex items-start">
                        {card.title}
                      </h3>
                      <p className="mt-3.5 leading-7 text-white/68 text-sm sm:text-base font-light flex-1">
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
          <Reveal className="text-center max-w-4xl mx-auto">
            <p className="eyebrow">Workflow & Philosophy</p>
            <h2 className="headline mt-3 text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">
              My Approach to Editing
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed font-light">
              Every photograph is handled with care — from the first look to the final export, keeping the image natural,
              <span className="block mt-1 text-white/65">
                polished, and true to the photographer's vision.
              </span>
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative items-stretch">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-champagne/20 via-champagne/60 to-champagne/20 -z-0" />

            {approachSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.2} className="h-full">
                <motion.div
                  className="glass rounded-[14px] p-8 glass-3d premium-glow shimmer-border text-center flex flex-col items-center justify-start h-full relative z-10 bg-ink/90 min-h-[300px]"
                  whileHover={{ y: -6 }}
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-champagne to-amber-500 font-display text-2xl font-black text-black shadow-[0_0_30px_rgba(244,214,144,0.4)] mb-6 shrink-0">
                    {step.number}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 min-h-[2.5rem] flex items-center justify-center">
                    {step.title}
                  </h3>
                  <p className="leading-7 text-white/70 text-sm sm:text-base font-light flex-1 flex items-start justify-center">
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

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {whyPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <Reveal key={point.label} delay={idx * 0.08} className="h-full">
                  <motion.div 
                    className="glass rounded-[12px] p-6 glass-3d premium-glow shimmer-border flex items-start gap-4 group h-full"
                    whileHover={{ x: 6, borderColor: "rgba(244,214,144,0.4)" }}
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-champagne/15 text-champagne border border-champagne/30 group-hover:bg-champagne group-hover:text-ink transition-colors duration-300 shadow-sm">
                      <Icon className="text-xl" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <h3 className="font-bold text-lg text-white group-hover:text-champagne transition-colors min-h-[1.75rem]">
                        {point.label}
                      </h3>
                      <p className="mt-2 text-sm text-white/65 leading-6 font-light flex-1">
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