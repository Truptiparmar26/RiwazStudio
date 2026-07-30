import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiInstagram, FiMail, FiMessageSquare, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-ink py-16 text-white z-20">
      {/* Radial ambient gold sweep */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,214,144,.15),transparent_40rem)] opacity-80" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-champagne/5 blur-[120px]" />

      <div className="container relative grid gap-12 md:grid-cols-[1.5fr_1fr_1.2fr] lg:gap-16">
        {/* Studio Identity */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne bg-champagne/15 font-display text-2xl font-extrabold text-champagne shadow-[0_0_25px_rgba(244,214,144,0.4)]">
              R
            </span>
            <span className="font-display text-3xl font-bold tracking-tight text-white">
              Riwaz Studio
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-8 text-white/70">
            A world-class retouching atelier crafting emotive color grading, high-end magazine restoration, and flawless visual storytelling for elite photographers, studios, and luxury brands worldwide.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-4 py-1.5 text-xs font-extrabold text-champagne backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
            <span>Currently Accepting Global Commissions</span>
          </div>
        </div>

        {/* Navigation Navigation */}
        <div>
          <h3 className="font-display text-lg font-bold text-champagne tracking-wider uppercase">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/75">
            {[
              ['Home Studio', '/'],
              ['Our Story', '/about'],
              ['Editing Suites & Pricing', '/services'],
              ['Transformation Gallery', '/gallery'],
              ['Interactive Before & After', '/before-after'],
              ['Journal & Insights', '/blog'],
              ['Client Reviews', '/testimonials'],
              ['Contact Atelier', '/contact'],
            ].map(([title, path]) => (
              <Link
                key={path}
                to={path}
                className="group flex items-center gap-2 transition duration-300 hover:text-champagne hover:translate-x-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-champagne/40 transition duration-300 group-hover:bg-champagne group-hover:scale-150" />
                <span>{title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="font-display text-lg font-bold text-champagne tracking-wider uppercase">
            VIP Atelier Club
          </h3>
          <p className="mt-2 text-sm text-white/65">
            Receive exclusive color grading LUT discounts & studio updates.
          </p>
          
          <form onSubmit={handleSubscribe} className="mt-5 flex overflow-hidden rounded-full border border-white/20 bg-white/5 p-1 transition duration-300 focus-within:border-champagne focus-within:shadow-[0_0_25px_rgba(244,214,144,0.3)]">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your VIP email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={subscribed}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider text-black transition duration-300 ${
                subscribed ? 'bg-green-400' : 'bg-champagne hover:bg-white hover:shadow-[0_0_20px_#f4d690]'
              }`}
            >
              {subscribed ? (
                <>
                  <FiCheck className="text-base" /> Joined!
                </>
              ) : (
                <>
                  <span>Join</span>
                  <FiSend />
                </>
              )}
            </button>
          </form>

          {/* Social Icons */}
          <div className="mt-8 flex items-center gap-3.5">
            <a
              href="https://www.instagram.com/your_instagram_username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500/20 hover:text-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
            >
              <FiInstagram />
            </a>

            <a
              href="https://wa.me/918780464627"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-500/20 hover:text-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              <FaWhatsapp />
            </a>

            <a
              href="mailto:riwazstudio@gmail.com"
              aria-label="Email Us"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            >
              <FiMail />
            </a>

            <a
              href="sms:+918780464627"
              aria-label="SMS Us"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:bg-champagne/20 hover:text-champagne hover:shadow-[0_0_25px_rgba(244,214,144,0.5)]"
            >
              <FiMessageSquare />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="container relative mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/50">
        <p>© 2026 Riwaz Studio. Crafted with precision for high-end luxury storytelling.</p>
        <div className="flex gap-6">
          <span className="hover:text-champagne transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-champagne transition cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

