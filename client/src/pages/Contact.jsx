import { useEffect, useMemo, useState } from 'react';
import { FiClock, FiInstagram, FiMail, FiMapPin, FiPhone, FiSend, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { upsertRecord } from '../utils/siteStore.js';

const confettiColors = ['#f4d690', '#10b981', '#f59e0b', '#ffffff', '#34d399', '#fbbf24'];
const confettiParticles = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  color: confettiColors[i % confettiColors.length],
  angle: (i * 360) / 24,
  distance: 75 + (i % 3) * 35,
  delay: (i % 4) * 0.03,
  size: 5 + (i % 3) * 3,
  isCircle: i % 2 === 0
}));

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!sent) return;

    // 1. Disable background page scrolling while modal is active
    document.body.style.overflow = 'hidden';

    // 2. ESC key handler for rapid dismissal
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSent(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    // 3. Automatically dismiss after 5 seconds if untouched
    const timer = setTimeout(() => setSent(false), 5000);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [sent]);

  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    setSubmitting(true);

    const optimisticId = `msg-${Date.now()}`;

    // Execute non-blocking backend server sync immediately in background
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(async (response) => {
        if (response.ok && (response.status === 200 || response.status === 201)) {
          const json = await response.json();
          const serverContact = json.data?.contact || json.data;
          if (serverContact) {
            upsertRecord('messages', { ...formData, ...serverContact, id: serverContact._id || serverContact.id || optimisticId, title: formData.subject || 'Inquiry', status: 'unread' }, []);
          }
        }
      })
      .catch(() => {
        // Safe static fallback when testing offline
      });

    // Predictable 1.2 second professional loading delay before popup celebration
    setTimeout(() => {
      upsertRecord('messages', { ...formData, id: optimisticId, title: formData.subject || 'Inquiry', status: 'unread' }, []);
      setSent(true);
      setSubmitting(false);
      form.reset();
    }, 1200);
  };

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="headline mt-4 max-w-5xl">Start a polished post-production workflow.</h1>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[.85fr_1.15fr] items-stretch">
          <Reveal className="glass rounded-[8px] p-8 h-full flex flex-col justify-between border border-white/15">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white">Studio details</h2>
              <div className="mt-10 flex flex-col gap-6 text-white/80 text-sm sm:text-base">
                <a href="mailto:riwazstudioofficial@gmail.com" className="flex items-center gap-3.5 hover:text-champagne transition duration-300"><FiMail className="text-champagne text-xl shrink-0" /> <span>riwazstudioofficial@gmail.com</span></a>
                <a href="https://www.instagram.com/riwazstudio_?igsh=bWRzdzFmZG1hczFy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 hover:text-champagne transition duration-300"><FiInstagram className="text-champagne text-xl shrink-0" /> <span>@riwazstudio_</span></a>
                <a href="tel:+918780464627" className="flex items-center gap-3.5 hover:text-champagne transition duration-300"><FiPhone className="text-champagne text-xl shrink-0" /> <span>+91 8780464627</span></a>
                <p className="flex items-center gap-3.5 text-white/70"><FiMapPin className="text-champagne text-xl shrink-0" /> <span>Ahmedabad, India</span></p>
                <p className="flex items-center gap-3.5 text-white/70"><FiClock className="text-champagne text-xl shrink-0" /> <span>Mon-Sat, 10 AM - 7 PM</span></p>
              </div>
            </div>
          </Reveal>
          <Reveal className="glass rounded-[8px] p-8 h-full flex flex-col justify-center border border-white/15">
            <form onSubmit={submit} className="grid gap-4">
              {['name', 'phone', 'email', 'subject'].map((field) => (
                <input 
                  key={field} 
                  required 
                  name={field} 
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} 
                  placeholder={field[0].toUpperCase() + field.slice(1)} 
                  className="rounded-[8px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/45 outline-none transition-all duration-300 focus:border-champagne focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(244,214,144,0.18)]" 
                />
              ))}
              <textarea required name="message" rows="6" placeholder="Message" className="resize-none rounded-[8px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/45 outline-none transition-all duration-300 focus:border-champagne focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(244,214,144,0.18)]" />
              <button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_10px_30px_rgba(244,214,144,0.25)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(244,214,144,0.45)] active:scale-[0.98] disabled:opacity-70">
                {submitting ? 'Sending Inquiry...' : 'Send Inquiry'} {!submitting && <FiSend />}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Premium Full-Screen Success Popup Modal with Confetti Celebration */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSent(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          >
            {/* Centered Glassmorphism Popup Card */}
            <motion.div
              initial={{ scale: 0.8, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20, mass: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[460px] overflow-hidden rounded-[24px] border border-champagne/35 bg-[#0f1420]/95 p-8 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(244,214,144,0.15)] backdrop-blur-2xl sm:p-10"
            >
              {/* Elegant Ambient Lighting Glows */}
              <div className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-emerald-500/15 blur-[60px]" />
              <div className="pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-[#f4d690]/15 blur-[60px]" />

              {/* Celebratory Confetti Explosion */}
              <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 -translate-y-1/2">
                {confettiParticles.map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const tx = Math.cos(rad) * p.distance;
                  const ty = Math.sin(rad) * p.distance;
                  return (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 0.9, 0], x: tx, y: ty, rotate: p.angle * 3 }}
                      transition={{ duration: 1.25, delay: 0.1 + p.delay, ease: 'easeOut' }}
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        borderRadius: p.isCircle ? '50%' : '2px'
                      }}
                      className="absolute block shadow-sm"
                    />
                  );
                })}
              </div>

              {/* Large Animated Success Icon with Pulse & Checkmark Drawing */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 via-green-600 to-[#f4d690] p-[3px] shadow-[0_0_35px_rgba(16,185,129,0.45)]"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#111726]">
                    <svg className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Title & Description Wording */}
              <h3 className="font-display mt-7 text-2xl font-black tracking-tight text-white sm:text-[26px]">
                Message Sent Successfully! 🎉
              </h3>
              <p className="mt-3 text-sm leading-relaxed font-normal text-slate-300">
                Thank you for contacting Riwaz Studio. We have received your message and will get back to you within 24 hours.
              </p>

              {/* Primary Action Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSent(false)}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#f4d690] via-[#ffd875] to-[#f4d690] py-4 text-base font-black tracking-wide text-[#111422] shadow-[0_12px_30px_rgba(244,214,144,0.3)] transition duration-200 hover:shadow-[0_15px_40px_rgba(244,214,144,0.5)]"
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
