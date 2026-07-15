import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918780464627"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[75] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-luxury transition hover:scale-105"
    >
      <FaWhatsapp />
    </a>
  );
}
