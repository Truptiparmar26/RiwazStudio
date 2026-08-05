import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Gallery', '/gallery'],
  ['Before & After', '/before-after'],
  ['Blog', '/blog'],
  ['Testimonials', '/testimonials'],
  ['Contact', '/contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Ultra-smooth physics-driven scroll tracking (avoids state re-render lag)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinks = (
    <>
      {links.map(([label, to]) => {
        const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
        return (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={`relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
              isActive ? 'text-champagne font-extrabold drop-shadow-[0_0_12px_rgba(244,214,144,0.7)]' : 'text-slate-300 hover:text-white hover:scale-105'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-nav-pill"
                className="absolute inset-0 -z-10 rounded-full border border-champagne/60 bg-gradient-to-r from-champagne/30 via-amber-500/20 to-champagne/25 shadow-[0_0_25px_rgba(244,214,144,0.45)] backdrop-blur-md"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            {label}
          </NavLink>
        );
      })}
    </>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 transition-all duration-500 ${
        open ? 'z-[100] pointer-events-auto' : 'z-[70]'
      } ${
        scrolled
          ? 'bg-[#05080e]/95 border-b border-white/15 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl pointer-events-auto'
          : open
            ? 'bg-[#05080e]/95 py-3 pointer-events-auto'
            : 'bg-transparent py-5 pointer-events-none'
      }`}
    >
      {/* Ultra-Smooth Spring-Animated Scroll Progress Bar at VERY TOP edge */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] w-full bg-transparent pointer-events-none z-[80]">
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#e5b85f] via-champagne to-[#fae5ac] shadow-[0_0_16px_rgba(244,214,144,0.95)]"
          style={{ scaleX }}
        />
      </div>

      <div className="container pointer-events-auto flex items-center justify-between gap-4">
        {/* Separated Independent Logo Block */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center gap-3.5 transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
        >
          <img src="/logo.png" alt="RS" className="h-11 w-11 rounded-full object-cover shadow-[0_0_20px_rgba(244,214,144,0.4)] transition duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(244,214,144,0.7)]" />
          <span>
            <span className="block font-display text-xl font-bold leading-none tracking-tight text-white transition group-hover:text-champagne">
              Riwaz Studio
            </span>
            <span className="mt-0.5 block text-[.66rem] font-bold uppercase tracking-[.26em] text-champagne/75">
              Editing Atelier
            </span>
          </span>
        </NavLink>
        
        {/* Separated Standalone Floating Pill Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/15 bg-[#0c111c]/95 px-3.5 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(244,214,144,0.12)] backdrop-blur-2xl transition-all duration-500 hover:border-champagne/35">
          {navLinks}
        </nav>

        {/* Mobile menu triggers */}
        <div className="flex items-center gap-2.5 lg:hidden pointer-events-auto">
          <motion.button
            type="button"
            aria-label="Open menu"
            title="Open menu"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-[#0c111c]/95 text-white shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:border-champagne hover:text-champagne"
          >
            <FiMenu className="text-xl" />
          </motion.button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[999] bg-[#05080e] p-6 lg:hidden flex flex-col justify-between pointer-events-auto w-screen h-screen overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Subtle ambient luxury lighting spheres */}
              <div className="pointer-events-none absolute top-1/4 right-0 -mr-20 h-72 w-72 rounded-full bg-champagne/10 blur-[100px]" />
              <div className="pointer-events-none absolute bottom-1/3 left-0 -ml-20 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />

              <div className="relative z-10 flex items-center justify-between shrink-0 pointer-events-auto">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img src="/logo.png" alt="RS" className="h-10 w-10 rounded-full object-cover shadow-[0_0_15px_rgba(244,214,144,0.45)]" />
                  <span className="font-display text-2xl font-extrabold text-white">
                    Riwaz <span className="text-champagne">Studio</span>
                  </span>
                </NavLink>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg transition hover:border-champagne hover:text-champagne active:scale-95 pointer-events-auto"
                  onClick={() => setOpen(false)}
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              
              <nav className="relative z-10 my-6 grid gap-2.5 overflow-y-auto py-2 pointer-events-auto">
                {links.map(([label, to]) => {
                  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={`relative rounded-xl px-5 py-3.5 text-base sm:text-lg font-bold transition-all duration-300 pointer-events-auto flex items-center justify-between ${
                        isActive
                          ? 'text-champagne font-extrabold border border-champagne/50 bg-gradient-to-r from-champagne/25 via-amber-500/15 to-champagne/20 shadow-[0_0_25px_rgba(244,214,144,0.35)] backdrop-blur-md'
                          : 'text-slate-200 hover:text-white hover:bg-white/5 active:bg-white/10 border border-transparent'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-champagne shadow-[0_0_8px_#f4d690] animate-pulse" />
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="relative z-10 mt-auto pt-4 text-center shrink-0 border-t border-white/10 pointer-events-auto">
                <div className="text-[0.7rem] uppercase font-semibold tracking-[0.25em] text-champagne/70 drop-shadow-sm">
                  Luxury Editing Atelier
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
