import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

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

export default function Navbar({ light, setLight }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = (
    <>
      {links.map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'text-champagne' : 'text-white/72 hover:text-white'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className={`fixed left-0 right-0 top-0 z-[70] transition ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className={`container flex items-center justify-between rounded-full px-4 py-3 ${scrolled ? 'glass' : 'bg-transparent'}`}>
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-champagne/40 bg-champagne/10 font-display text-xl text-champagne">R</span>
          <span>
            <span className="block font-display text-xl font-bold leading-none">Riwaz Studio</span>
            <span className="block text-[.65rem] font-bold uppercase tracking-[.24em] text-white/45">Editing Atelier</span>
          </span>
        </NavLink>
        <nav className="hidden items-center gap-1 lg:flex">{navLinks}</nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => setLight(!light)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-champagne/40 hover:text-champagne"
          >
            {light ? <FiMoon /> : <FiSun />}
          </button>
          <button
            type="button"
            aria-label="Open menu"
            title="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <FiMenu />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/95 p-5 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">Riwaz Studio</span>
              <button type="button" aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/10" onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>
            <nav className="mt-10 grid gap-3 text-lg">{navLinks}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
