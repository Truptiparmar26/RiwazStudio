import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen bg-ink pt-32 pb-24 text-white">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-display text-4xl font-extrabold text-champagne sm:text-5xl">
            Terms & Conditions
          </h1>
          <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-champagne hover:prose-a:text-white transition-colors">
            <p className="text-lg font-medium text-white/50">Last updated: August 2026</p>
            
            <div className="mt-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">1. Introduction</h2>
                <p>Welcome to Riwaz Studio. These Terms & Conditions govern your use of our website and services. By accessing our services, you agree to these terms in full.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">2. Services Offered</h2>
                <p>Riwaz Studio provides professional photo retouching, color grading, and image enhancement services. The exact scope of work will be defined in individual client agreements or invoices.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">3. Payment & Pricing</h2>
                <p>All prices are subject to change without notice. Payment terms will be specified on invoices. Work will commence only upon receipt of an agreed deposit or full payment as stipulated.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">4. Copyright & Ownership</h2>
                <p>The client retains original copyright of all images provided. Upon final payment, the client receives the right to use the edited images. Riwaz Studio reserves the right to use the edited images for promotional purposes unless a non-disclosure agreement is signed.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">5. Revisions</h2>
                <p>We aim for complete satisfaction. A specific number of revisions will be included in your package. Additional revisions may incur extra charges.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">6. Liability</h2>
                <p>Riwaz Studio is not liable for any direct, indirect, or consequential loss arising from the use of our services. We take utmost care in data handling but clients should always maintain backups of their original files.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold font-display text-champagne/90 tracking-wide uppercase text-sm mb-4">7. Contact Information</h2>
                <p>For any questions regarding these Terms & Conditions, please contact us at <a href="mailto:riwazstudioofficial@gmail.com">riwazstudioofficial@gmail.com</a>.</p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
