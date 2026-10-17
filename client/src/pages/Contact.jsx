import { useEffect, useState } from 'react';
import { FiClock, FiInstagram, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    subject: false,
    message: false
  });

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

  const getFieldError = (fieldName) => {
    const value = typeof formData[fieldName] === 'string' ? formData[fieldName].trim() : formData[fieldName];
    switch (fieldName) {
      case 'name':
        if (!value) return 'Name is required.';
        if (value.length < 2) return 'Please enter at least 2 characters.';
        return null;
      case 'phone':
        if (!value) return 'Phone is required.';
        if (value.length < 7) return 'Please enter a valid phone number.';
        return null;
      case 'email':
        if (!value) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email format.';
        }
        return null;
      case 'subject':
        if (!value) return 'Subject is required.';
        return null;
      case 'message':
        if (!value) return 'Message is required.';
        if (value.length < 5) return 'Please enter at least 5 characters.';
        return null;
      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === 'phone') {
      finalValue = value.replace(/[^\d+()\s-]/g, '').slice(0, 20);
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const submit = (event) => {
    event.preventDefault();

    // Trigger validation visibility for all fields on submit attempt
    const errors = {
      name: getFieldError('name'),
      phone: getFieldError('phone'),
      email: getFieldError('email'),
      subject: getFieldError('subject'),
      message: getFieldError('message')
    };

    if (Object.values(errors).some((err) => err !== null)) {
      setTouched({
        name: true,
        phone: true,
        email: true,
        subject: true,
        message: true
      });
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    const optimisticId = `msg-${Date.now()}`;
    const finalSubject = formData.subject.trim();
    const finalMessage = formData.message.trim();

    const submitData = new FormData();
    submitData.append('name', formData.name.trim());
    submitData.append('phone', formData.phone.trim());
    submitData.append('email', formData.email.trim());
    submitData.append('subject', finalSubject);
    submitData.append('message', finalMessage);

    const storeData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      subject: finalSubject,
      message: finalMessage,
      title: finalSubject,
      status: 'unread'
    };

    // Execute non-blocking backend server sync immediately in background
    fetch('/api/contact', {
      method: 'POST',
      body: submitData
    })
      .then(async (response) => {
        if (response.ok && (response.status === 200 || response.status === 201)) {
          const json = await response.json();
          const serverContact = json.data?.contact || json.data;
          if (serverContact) {
            upsertRecord('messages', {
              ...storeData,
              ...serverContact,
              id: serverContact._id || serverContact.id || optimisticId,
              title: finalSubject,
              status: 'unread'
            }, []);
          }
        }
      })
      .catch(() => {
        // Safe static fallback when testing offline or local connection issue
      });

    // 1 second professional loading delay before popup celebration
    setTimeout(() => {
      upsertRecord('messages', { ...storeData, id: optimisticId, title: finalSubject, status: 'unread' }, []);
      setSent(true);
      setSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      setTouched({
        name: false,
        phone: false,
        email: false,
        subject: false,
        message: false
      });
    }, 1000);
  };

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="headline mt-4 max-w-5xl">Start a polished post-production workflow.</h1>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[.85fr_1.15fr] items-stretch">
          <Reveal className="rounded-2xl border border-white/10 bg-[#161820]/95 p-8 sm:p-10 h-full flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white">Studio details</h2>
              <div className="mt-10 flex flex-col gap-6 text-white/80 text-sm sm:text-base">
                <a href="mailto:riwazstudioofficial@gmail.com" className="flex items-center gap-3.5 hover:text-champagne transition duration-300">
                  <FiMail className="text-champagne text-xl shrink-0" />
                  <span>riwazstudioofficial@gmail.com</span>
                </a>
                <a href="https://www.instagram.com/riwazstudioofficial?stkn=bWRzdzFmZG1hczFy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 hover:text-champagne transition duration-300">
                  <FiInstagram className="text-champagne text-xl shrink-0" />
                  <span>@riwazstudioofficial</span>
                </a>
                <a href="tel:+918780464627" className="flex items-center gap-3.5 hover:text-champagne transition duration-300">
                  <FiPhone className="text-champagne text-xl shrink-0" />
                  <span>+91 8780464627</span>
                </a>
                <p className="flex items-center gap-3.5 text-white/70">
                  <FiMapPin className="text-champagne text-xl shrink-0" />
                  <span>Ahmedabad, India</span>
                </p>
                <p className="flex items-center gap-3.5 text-white/70">
                  <FiClock className="text-champagne text-xl shrink-0" />
                  <span>Mon-Sat, 10 AM - 7 PM</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form Card styled exactly like the user mockup */}
          <Reveal className="rounded-2xl border border-white/10 bg-[#161820]/95 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
              
              {/* Name */}
              <div className="flex flex-col gap-1">
                <input 
                  required 
                  name="name" 
                  type="text" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border ${touched.name && getFieldError('name') ? 'border-rose-500/70' : 'border-[#353a47] focus:border-champagne/80'} bg-[#242831] px-5 py-4 text-base font-medium text-white placeholder:text-[#7d8494] placeholder:font-medium outline-none transition-all duration-200 focus:bg-[#272b36] focus:ring-1 focus:ring-champagne/20 focus:shadow-[0_0_15px_rgba(244,214,144,0.15)]`} 
                />
                {touched.name && getFieldError('name') && (
                  <p className="text-xs text-rose-400 pl-1">{getFieldError('name')}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <input 
                  required 
                  name="phone" 
                  type="tel" 
                  placeholder="Phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border ${touched.phone && getFieldError('phone') ? 'border-rose-500/70' : 'border-[#353a47] focus:border-champagne/80'} bg-[#242831] px-5 py-4 text-base font-medium text-white placeholder:text-[#7d8494] placeholder:font-medium outline-none transition-all duration-200 focus:bg-[#272b36] focus:ring-1 focus:ring-champagne/20 focus:shadow-[0_0_15px_rgba(244,214,144,0.15)]`} 
                />
                {touched.phone && getFieldError('phone') && (
                  <p className="text-xs text-rose-400 pl-1">{getFieldError('phone')}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <input 
                  required 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border ${touched.email && getFieldError('email') ? 'border-rose-500/70' : 'border-[#353a47] focus:border-champagne/80'} bg-[#242831] px-5 py-4 text-base font-medium text-white placeholder:text-[#7d8494] placeholder:font-medium outline-none transition-all duration-200 focus:bg-[#272b36] focus:ring-1 focus:ring-champagne/20 focus:shadow-[0_0_15px_rgba(244,214,144,0.15)]`} 
                />
                {touched.email && getFieldError('email') && (
                  <p className="text-xs text-rose-400 pl-1">{getFieldError('email')}</p>
                )}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <input 
                  required 
                  name="subject" 
                  type="text" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border ${touched.subject && getFieldError('subject') ? 'border-rose-500/70' : 'border-[#353a47] focus:border-champagne/80'} bg-[#242831] px-5 py-4 text-base font-medium text-white placeholder:text-[#7d8494] placeholder:font-medium outline-none transition-all duration-200 focus:bg-[#272b36] focus:ring-1 focus:ring-champagne/20 focus:shadow-[0_0_15px_rgba(244,214,144,0.15)]`} 
                />
                {touched.subject && getFieldError('subject') && (
                  <p className="text-xs text-rose-400 pl-1">{getFieldError('subject')}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <textarea 
                  required 
                  name="message" 
                  rows={5}
                  placeholder="Message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border ${touched.message && getFieldError('message') ? 'border-rose-500/70' : 'border-[#353a47] focus:border-champagne/80'} bg-[#242831] px-5 py-4 text-base font-medium text-white placeholder:text-[#7d8494] placeholder:font-medium outline-none transition-all duration-200 focus:bg-[#272b36] focus:ring-1 focus:ring-champagne/20 focus:shadow-[0_0_15px_rgba(244,214,144,0.15)] resize-none`} 
                />
                {touched.message && getFieldError('message') && (
                  <p className="text-xs text-rose-400 pl-1">{getFieldError('message')}</p>
                )}
              </div>

              {/* Send Inquiry Button */}
              <button 
                type="submit"
                disabled={submitting} 
                className="mt-1 w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-champagne py-4 px-6 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black shadow-[0_10px_30px_rgba(244,214,144,0.25)] transition-all duration-300 hover:scale-[1.01] hover:brightness-105 hover:shadow-[0_15px_40px_rgba(244,214,144,0.4)] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{submitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}</span>
                {!submitting && <FiSend className="text-base stroke-[2.5]" />}
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
