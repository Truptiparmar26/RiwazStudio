// import Reveal from '../components/Reveal.jsx';
// import { stats } from '../data/content.js';

// const timeline = ['Raw image audit', 'Color direction board', 'Detail retouching', 'Client proofing', 'Delivery exports'];

// export default function About() {
//   return (
//     <section className="section pt-36">
//       <div className="container">
//         <Reveal>
//           <p className="eyebrow">About</p>
//           <h1 className="headline mt-4 max-w-5xl">Luxury editing craft for modern visual storytellers.</h1>
//         </Reveal>
//         <div className="mt-14 grid gap-6 lg:grid-cols-3">
//           {['Mission', 'Vision', 'Studio Story'].map((title, index) => (
//             <Reveal key={title} delay={index * 0.06} className="glass rounded-[8px] p-7">
//               <h2 className="font-display text-3xl text-champagne">{title}</h2>
//               <p className="mt-4 leading-8 text-white/68">To give every photographer a dependable post-production partner that protects natural detail while making every frame feel cinematic, polished, and commercially ready.</p>
//             </Reveal>
//           ))}
//         </div>
//         <div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
//           <Reveal className="grid grid-cols-2 gap-3">
//             {stats.map((stat) => (
//               <div key={stat.label} className="glass rounded-[8px] p-6">
//                 <strong className="font-display text-4xl text-champagne">{stat.value}</strong>
//                 <span className="mt-2 block text-xs font-bold uppercase tracking-[.16em] text-white/50">{stat.label}</span>
//               </div>
//             ))}
//           </Reveal>
//           <Reveal className="glass rounded-[8px] p-7">
//             <h2 className="font-display text-4xl">Interactive timeline</h2>
//             <div className="mt-8 grid gap-4">
//               {timeline.map((item, index) => (
//                 <div key={item} className="flex items-center gap-4">
//                   <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne font-extrabold text-black">{index + 1}</span>
//                   <div className="h-px flex-1 bg-white/10" />
//                   <strong className="w-44 text-right">{item}</strong>
//                 </div>
//               ))}
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { stats } from '../data/content.js';

const timeline = ['Raw image audit', 'Color direction board', 'Detail retouching', 'Client proofing', 'Delivery exports'];

export default function About() {
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

        .headline-3d-glow {
          text-shadow: 0 0 80px rgba(199,168,80,0.08), 0 0 160px rgba(199,168,80,0.03);
        }

        .timeline-card-3d {
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .timeline-card-3d:hover {
          transform: perspective(800px) translateZ(20px) translateY(-4px) rotateX(-2deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 0 0 40px rgba(199,168,80,0.06);
        }

        .timeline-step-3d {
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.23,1,0.32,1);
        }
        .timeline-step-3d:hover {
          transform: translateZ(15px) scale(1.04);
        }
        .timeline-step-3d:hover .step-number {
          transform: scale(1.15) rotateY(10deg);
          box-shadow: 0 8px 25px rgba(199,168,80,0.35);
        }
        .timeline-step-3d:hover .step-line {
          background: linear-gradient(90deg, rgba(199,168,80,0.4), rgba(199,168,80,0.08));
        }
        .timeline-step-3d:hover .step-label {
          color: rgba(199,168,80,0.9);
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
          transform: perspective(700px) rotateY(5deg) translateZ(20px) translateY(-6px);
        }
        .mission-card-3d:nth-child(2):hover {
          transform: perspective(700px) translateZ(25px) translateY(-8px) rotateX(-3deg);
        }
        .mission-card-3d:nth-child(3):hover {
          transform: perspective(700px) rotateY(-5deg) translateZ(20px) translateY(-6px);
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

      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>About</motion.p>
            <motion.h1 className="headline mt-4 max-w-5xl headline-3d-glow" initial={{ opacity: 0, y: 30, rotateX: 12, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}>Luxury editing craft for modern visual storytellers.</motion.h1>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {['Mission', 'Vision', 'Studio Story'].map((title, index) => (
              <Reveal key={title} delay={0.4 + index * 0.15}>
                <motion.div
                  className="glass rounded-[8px] p-7 glass-3d premium-glow shimmer-border mission-card-3d"
                  initial={{ opacity: 0, y: 55, rotateY: index === 0 ? -12 : index === 2 ? 12 : 0, rotateX: index === 1 ? -10 : 0, scale: 0.93, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.4 + index * 0.15, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h2 className="font-display text-3xl text-champagne">{title}</h2>
                  <p className="mt-4 leading-8 text-white/68">To give every photographer a dependable post-production partner that protects natural detail while making every frame feel cinematic, polished, and commercially ready.</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal delay={0.9}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className={`glass rounded-[8px] p-6 glass-3d stat-3d premium-glow shimmer-border stat-float-${i + 1}`}
                    initial={{ opacity: 0, y: 50, rotateX: -14, scale: 0.92, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <strong className="font-display text-4xl text-champagne">{stat.value}</strong>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-[.16em] text-white/50">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={1.0}>
              <motion.div
                className="glass rounded-[8px] p-7 glass-3d timeline-card-3d premium-glow shimmer-border"
                initial={{ opacity: 0, y: 55, rotateX: 10, scale: 0.94, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 1.0, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="font-display text-4xl">Interactive timeline</h2>
                <div className="mt-8 grid gap-4">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-4 timeline-step-3d"
                      initial={{ opacity: 0, x: -40, rotateY: -10, filter: 'blur(4px)' }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: 1.2 + index * 0.14, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <span className="step-number grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne font-extrabold text-black">{index + 1}</span>
                      <div className="step-line h-px flex-1 bg-white/10" />
                      <strong className="step-label w-44 text-right">{item}</strong>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}