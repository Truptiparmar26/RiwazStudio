import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
              isActive ? 'text-champagne drop-shadow-[0_0_10px_rgba(244,214,144,0.5)]' : 'text-white/75 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-nav-pill"
                className="absolute inset-0 -z-10 rounded-full border border-champagne/45 bg-champagne/15 shadow-[0_0_20px_rgba(244,214,144,0.25)] backdrop-blur-md"
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
    <header className={`fixed left-0 right-0 top-0 z-[70] transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-5'}`}>
      <div
        className={`container flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled
            ? 'glass border-champagne/20 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <NavLink to="/" className="group flex items-center gap-3.5 transition duration-300 hover:scale-[1.02]">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-champagne/50 bg-gradient-to-br from-champagne/25 to-champagne/5 font-display text-xl font-extrabold text-champagne shadow-[0_0_20px_rgba(244,214,144,0.3)] transition duration-500 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(244,214,144,0.6)]">
            R
          </span>
          <span>
            <span className="block font-display text-xl font-bold leading-none tracking-tight text-white transition group-hover:text-champagne">
              Riwaz Studio
            </span>
            <span className="mt-0.5 block text-[.66rem] font-bold uppercase tracking-[.26em] text-champagne/75">
              Editing Atelier
            </span>
          </span>
        </NavLink>
        
        <nav className="hidden items-center gap-1.5 lg:flex">{navLinks}</nav>

        <div className="flex items-center gap-2.5 lg:hidden">
          <motion.button
            type="button"
            aria-label="Open menu"
            title="Open menu"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-champagne hover:text-champagne"
          >
            <FiMenu className="text-xl" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/95 p-6 backdrop-blur-2xl lg:hidden flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-champagne">Riwaz Studio</span>
              <button
                type="button"
                aria-label="Close menu"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-champagne hover:text-champagne"
                onClick={() => setOpen(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <nav className="my-auto grid gap-4 text-xl font-bold">{navLinks}</nav>
            <div className="text-center text-xs uppercase tracking-[0.2em] text-white/50">
              Luxury Editing Atelier
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

