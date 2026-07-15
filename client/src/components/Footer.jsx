// import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

// import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,214,144,.12),transparent_34rem)]" />
      <div className="container relative grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Riwaz Studio</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/62">Premium photo editing, retouching, restoration, color grading, and album design for photographers, studios, and brands.</p>
        </div>
        <div>
          <h3 className="font-bold text-champagne">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/66">
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/before-after">Before & After</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-champagne">Newsletter</h3>
          <form className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/5">
            <input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
            <button className="bg-champagne px-5 text-sm font-extrabold text-black">Join</button>
          </form>
          {/* <div className="mt-5 flex gap-3 text-xl text-white/70">
            <FiInstagram />
            <FiLinkedin />
            <FiMail />
          </div> */}
          {/* <div className="mt-5 flex gap-4 text-xl"> */}
<div className="mt-6 flex items-center gap-4">

  <a
    href="https://www.instagram.com/your_instagram_username"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition-all duration-300 hover:scale-110 hover:border-pink-500 hover:text-pink-500"
  >
    <FiInstagram />
  </a>

  <a
    href="https://wa.me/918780464627"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition-all duration-300 hover:scale-110 hover:border-green-500 hover:text-green-500"
  >
    <FaWhatsapp />
  </a>

  <a
    href="mailto:riwazstudio@gmail.com"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:text-blue-500"
  >
    <FiMail />
  </a>

  <a
    href="sms:+918780464627"
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition-all duration-300 hover:scale-110 hover:border-yellow-400 hover:text-yellow-400"
  >
    <FiMessageSquare />
  </a>

</div>
        </div>
      </div>
      <p className="container relative mt-10 text-xs text-white/42">Copyright 2026 Riwaz Studio. All rights reserved.</p>
    </footer>
  );
}
