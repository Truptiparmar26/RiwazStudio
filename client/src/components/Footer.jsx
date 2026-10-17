import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiInstagram, FiMail, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Before & After', path: '/before-after' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-ink py-16 text-white z-20">
      {/* Radial ambient gold sweep */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,214,144,.15),transparent_40rem)] opacity-80" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-champagne/5 blur-[120px]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1.3fr] gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          
          {/* Column 1: Studio Identity */}
          <div className="flex flex-col items-start">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Riwaz Studio
              </span>
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-champagne shadow-[0_0_12px_rgba(244,214,144,0.8)]" />
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 max-w-md">
              Professional photo editing for photographers and studios — from wedding editing and cinematic color grading to natural retouching and creative visual enhancement.
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-2 text-xs sm:text-sm font-semibold text-champagne backdrop-blur-md">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>Currently Accepting New Projects</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-champagne">
              NAVIGATION
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm sm:text-base font-medium text-white/85">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 transition duration-300 hover:text-champagne hover:translate-x-1.5"
                  >
                    <span className="text-champagne font-bold text-sm leading-none">•</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stay Updated & Contact Social Icons */}
          <div className="flex flex-col items-start">
            <h3 className="font-display text-base sm:text-lg font-bold tracking-wide text-champagne">
              Stay Updated
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
              Get occasional updates, editing tips, and studio news.
            </p>

            {/* Newsletter Subscription Box */}
            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex w-full max-w-md items-center rounded-full border border-champagne/40 bg-white/5 p-1 sm:p-1.5 transition duration-300 focus-within:border-champagne focus-within:shadow-[0_0_25px_rgba(244,214,144,0.3)]"
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="rounded-full bg-champagne px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_#f4d690] active:scale-95 shrink-0"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <FiCheck className="text-base" /> JOINED!
                  </span>
                ) : (
                  'JOIN'
                )}
              </button>
            </form>

            {/* 4 Circular Social / Contact Icons */}
            <div className="mt-8 flex items-center gap-3.5 sm:gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/riwazstudioofficial?stkn=bWRzdzFmZG1hczFy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500/20 hover:text-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
              >
                <FiInstagram />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918780464627"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-500/20 hover:text-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                <FaWhatsapp />
              </a>

              {/* Mail */}
              <a
                href="mailto:riwazstudioofficial@gmail.com"
                aria-label="Email"
                title="Email Us"
                className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                <FiMail />
              </a>

              {/* Chat */}
              <Link
                to="/contact"
                aria-label="Chat / Contact Us"
                title="Chat / Contact Us"
                className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:bg-champagne/20 hover:text-champagne hover:shadow-[0_0_25px_rgba(244,214,144,0.5)]"
              >
                <FiMessageSquare />
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/50">
          <p>© {new Date().getFullYear()} Riwaz Studio. Crafted with precision for high-end luxury storytelling.</p>
          <div className="flex gap-6 z-10 relative">
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition cursor-pointer">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
