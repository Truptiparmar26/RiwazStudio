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
import { motion } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

export default function Services() {
  const serviceItems = useStoredCollection('services', services);

  return (
    <>
      <style>{`
        .section-3d { perspective: 1400px; transform-style: preserve-3d; }
        .depth-layer { transform-style: preserve-3d; }

        .headline-3d-glow {
          text-shadow: 0 0 80px rgba(199,168,80,0.08), 0 0 160px rgba(199,168,80,0.03);
        }

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

        .floating {
          animation: float-3d 7s ease-in-out infinite;
        }
        @keyframes float-3d {
          0%, 100% { transform: rotateY(-6deg) rotateX(4deg) translateZ(40px) translateY(0); }
          50% { transform: rotateY(-4deg) rotateX(5deg) translateZ(50px) translateY(-12px); }
        }
        .floating:hover { animation-play-state: paused; }

        @keyframes pulse-glow-3d {
          0%, 100% { box-shadow: -25px 25px 70px rgba(0,0,0,0.45), 0 0 40px rgba(199,168,80,0.04); }
          50% { box-shadow: -25px 25px 70px rgba(0,0,0,0.45), 0 0 70px rgba(199,168,80,0.1), 0 0 120px rgba(199,168,80,0.03); }
        }
        .pulse-glow { animation: pulse-glow-3d 5s ease-in-out infinite; }
        .pulse-glow:hover { animation: none; }

        .service-card-3d {
          transition: all 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .service-card-3d:hover {
          transform: perspective(900px) rotateX(-3deg) translateY(-8px) translateZ(20px);
        }
      `}</style>

      <section className="section pt-36 section-3d">
        <div className="container depth-layer">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h1 className="headline mt-4 max-w-5xl headline-3d-glow">Retouching, grading, restoration, and delivery systems.</h1>
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

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.filter((service) => service.status !== 'draft').map((service, index) => (
              <motion.div 
                key={service.id || service.title} 
                className="service-card-3d"
                initial={{ opacity: 0, y: 50, rotateY: -10, scale: 0.96 }} 
                whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }} 
                viewport={{ once: true, margin: '-40px' }} 
                transition={{ delay: index * 0.09, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
