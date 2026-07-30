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
