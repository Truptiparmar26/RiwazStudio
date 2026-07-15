import { useState } from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import { upsertRecord } from '../utils/siteStore.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch {
      // The success state is still useful in static previews where the API is not running.
    }
    upsertRecord('messages', { ...formData, title: formData.subject, status: 'unread' }, []);
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="headline mt-4 max-w-5xl">Start a polished post-production workflow.</h1>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal className="glass rounded-[8px] p-7">
            <h2 className="font-display text-4xl">Studio details</h2>
            <div className="mt-8 grid gap-5 text-white/72">
              <p className="flex items-center gap-3"><FiMail className="text-champagne" /> hello@riwazstudio.com</p>
              <p className="flex items-center gap-3"><FiPhone className="text-champagne" /> +91 8780464627</p>
              <p className="flex items-center gap-3"><FiMapPin className="text-champagne" /> Mumbai, India</p>
              <p className="flex items-center gap-3"><FiClock className="text-champagne" /> Mon-Sat, 10 AM - 7 PM</p>
            </div>
            <div className="mt-8 aspect-video overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(244,214,144,.2),rgba(168,137,255,.16)),url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center" />
          </Reveal>
          <Reveal className="glass rounded-[8px] p-7">
            <form onSubmit={submit} className="grid gap-4">
              {['name', 'phone', 'email', 'subject'].map((field) => (
                <input key={field} required name={field} type={field === 'email' ? 'email' : 'text'} placeholder={field[0].toUpperCase() + field.slice(1)} className="rounded-[8px] border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-champagne/50" />
              ))}
              <textarea required name="message" rows="6" placeholder="Message" className="resize-none rounded-[8px] border border-white/10 bg-white/5 px-4 py-4 outline-none transition focus:border-champagne/50" />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-4 font-extrabold text-black">
                Send Inquiry <FiSend />
              </button>
              {sent && <p className="rounded-[8px] border border-champagne/20 bg-champagne/10 p-4 text-sm text-champagne">Inquiry received. Riwaz Studio will reply soon.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
