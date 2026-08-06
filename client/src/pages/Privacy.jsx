import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 text-white">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-display text-4xl font-extrabold text-champagne sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-champagne hover:prose-a:text-white transition-colors">
            <p className="text-lg font-medium text-white/50">Last updated: August 2026</p>
            
            <div className="mt-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">1. Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, phone number, and any images or files you provide when you use our services or communicate with us.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">2. How We Use Your Information</h2>
                <p>Your information is used strictly to provide, maintain, and improve our services. This includes processing transactions, sending service-related communications, and delivering finalized artwork.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">3. Data Protection</h2>
                <p>We implement appropriate security measures to protect your personal information and uploaded files against unauthorized access, alteration, disclosure, or destruction.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">4. Sharing of Information</h2>
                <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">5. Client Privacy & Image Rights</h2>
                <p>Your raw files and final edits are kept confidential. We will not share your images on our portfolio or social media without your explicit consent.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">6. Contacting Us</h2>
                <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at <a href="mailto:riwazstudioofficial@gmail.com">riwazstudioofficial@gmail.com</a>.</p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
