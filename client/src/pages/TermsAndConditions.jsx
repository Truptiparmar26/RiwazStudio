import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail, FiInstagram, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const sections = [
  { id: 'about', title: 'About Riwaz Studio' },
  { id: 'usage', title: 'Website Usage' },
  { id: 'services', title: 'Services' },
  { id: 'requirements', title: 'Project Requirements' },
  { id: 'content', title: 'Client-Provided Content' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'portfolio', title: 'Portfolio & Promotional Usage' },
  { id: 'revisions', title: 'Revisions' },
  { id: 'delivery', title: 'Delivery Time' },
  { id: 'payments', title: 'Payments' },
  { id: 'cancellation', title: 'Cancellation' },
  { id: 'accuracy', title: 'Website Content Accuracy' },
  { id: 'links', title: 'Third-Party Links' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'privacy', title: 'Privacy' },
  { id: 'changes', title: 'Changes to These Terms' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'contact', title: 'Contact Us' }
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    document.title = 'Terms & Conditions | Riwaz Studio';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Read the Terms & Conditions for using the Riwaz Studio website and creative editing services.';
    document.head.appendChild(meta);
    
    // Smooth scrolling observer for active section in sidebar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -75% 0px' }); // Trigger when section is near top

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      document.title = 'Riwaz Studio';
      document.head.removeChild(meta);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Accounts for sticky header
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05080e] text-white font-sans selection:bg-champagne/30 selection:text-white overflow-x-hidden">
      {/* Premium Standalone Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05080e]/85 backdrop-blur-2xl shadow-sm shadow-black/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="group flex items-center gap-4 transition-all hover:opacity-90">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-champagne/20 blur-md group-hover:bg-champagne/40 transition-colors" />
              <img src="/logo.png" alt="Riwaz Studio Logo" className="relative h-11 w-11 rounded-full object-cover shadow-[0_0_15px_rgba(244,214,144,0.3)]" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-white group-hover:text-champagne transition-colors">
              Riwaz Studio
            </span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <FiArrowLeft className="text-lg" />
            <span className="hidden sm:inline">Back to Main Site</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      </header>

      {/* Ambient Glow Effects */}
      <div className="pointer-events-none fixed top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-champagne/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-champagne/5 blur-[120px]" />

      <main className="container mx-auto px-6 pt-12 pb-4 md:pt-24 md:pb-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Sidebar: Table of Contents */}
          <aside className="lg:w-[30%] shrink-0">
            <div className="sticky top-32 space-y-10">
              <div className="space-y-4">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-champagne via-[#fae5ac] to-champagne uppercase tracking-tight leading-[1.1]">
                  Terms & Conditions
                </h1>
                <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">
                  Last Updated: August 6, 2026
                </p>
              </div>

              {/* Desktop TOC */}
              <nav className="hidden lg:flex flex-col relative border-l border-white/10 ml-2 pl-6">
                <div 
                  className="absolute left-[-1.5px] w-[3px] bg-gradient-to-b from-champagne/50 via-champagne to-champagne/50 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(244,214,144,0.8)]"
                  style={{
                    top: `${sections.findIndex(s => s.id === activeSection) * 36 + 6}px`, 
                    height: '24px'
                  }}
                />
                
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left h-[36px] flex items-center text-sm font-medium transition-all duration-300 group ${
                      activeSection === section.id 
                        ? 'text-champagne translate-x-2' 
                        : 'text-white/50 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <span className={`mr-3 text-xs ${activeSection === section.id ? 'text-champagne/80 font-bold' : 'text-white/30 font-semibold group-hover:text-white/50'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:w-[70%] max-w-3xl"
          >
            {/* Intro */}
            <div className="mb-16 text-lg md:text-xl text-white/70 leading-relaxed font-light">
              <p>
                Welcome to Riwaz Studio. These terms and conditions govern your use of our website and services. 
                Please read them carefully to understand your rights and responsibilities when working with our atelier.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16 sm:space-y-24">
              
              <Section id="about" number="1" title="About Riwaz Studio">
                <p>Riwaz Studio is a creative photo and video editing studio providing professional editing and related creative services.</p>
                <p>The content displayed on this website, including images, videos, designs, portfolio work, descriptions, and other materials, is provided for informational and promotional purposes.</p>
              </Section>

              <Section id="usage" number="2" title="Website Usage">
                <p>By using this website, you agree to:</p>
                <ul className="space-y-3">
                  <ListItem>Use the website only for lawful purposes.</ListItem>
                  <ListItem>Provide accurate information when submitting contact or inquiry forms.</ListItem>
                  <ListItem>Not attempt to damage, disrupt, or gain unauthorized access to the website or its systems.</ListItem>
                  <ListItem>Not copy, reproduce, modify, or redistribute website content without prior permission.</ListItem>
                  <ListItem>Not use the website for fraudulent, illegal, or unauthorized activities.</ListItem>
                </ul>
              </Section>

              <Section id="services" number="3" title="Services">
                <p>Riwaz Studio provides creative photo and video editing services based on individual client requirements.</p>
                <p>Service availability, pricing, delivery timelines, revisions, and final deliverables may vary depending on the project.</p>
                <p>A project will be considered confirmed only after the requirements, pricing, timeline, and other applicable terms have been mutually agreed upon.</p>
              </Section>

              <Section id="requirements" number="4" title="Project Requirements">
                <p>Clients are responsible for providing:</p>
                <div className="grid grid-cols-2 gap-3 my-6">
                  <GridItem>Required images</GridItem>
                  <GridItem>Videos</GridItem>
                  <GridItem>Logos</GridItem>
                  <GridItem>Text</GridItem>
                  <GridItem>References</GridItem>
                  <GridItem>Other required project materials</GridItem>
                </div>
                <p>Clients should provide accurate information and materials on time.</p>
                <p>Riwaz Studio is not responsible for delays caused by incomplete, incorrect, or late submission of client materials or instructions.</p>
              </Section>

              <Section id="content" number="5" title="Client-Provided Content">
                <p>Clients confirm that they have the necessary rights and permissions to provide photographs, videos, documents, logos, music, or other materials submitted to Riwaz Studio.</p>
                <p>Clients must not submit content that infringes another person's intellectual property rights or violates applicable laws.</p>
              </Section>

              <Section id="ip" number="6" title="Intellectual Property">
                <p>All original content created by Riwaz Studio, including:</p>
                <div className="grid sm:grid-cols-2 gap-3 my-6">
                  <GridItem>Website design</GridItem>
                  <GridItem>Branding elements</GridItem>
                  <GridItem>Graphics</GridItem>
                  <GridItem>Original creative designs</GridItem>
                  <GridItem>Written content</GridItem>
                  <GridItem>Portfolio presentation</GridItem>
                  <GridItem>Original editing work</GridItem>
                </div>
                <p>remains the intellectual property of Riwaz Studio unless otherwise agreed in writing.</p>
                <p>Clients retain ownership of their original materials unless a separate agreement states otherwise.</p>
              </Section>

              <Section id="portfolio" number="7" title="Portfolio & Promotional Usage">
                <p>Unless otherwise agreed with the client, Riwaz Studio may showcase completed work in:</p>
                <div className="flex flex-wrap gap-3 my-6">
                  <PillItem>Website portfolio</PillItem>
                  <PillItem>Social media</PillItem>
                  <PillItem>Marketing materials</PillItem>
                  <PillItem>Promotional presentations</PillItem>
                </div>
                <p>If a project contains confidential material or the client requests that completed work not be publicly displayed, the client should communicate this to Riwaz Studio before project completion.</p>
              </Section>

              <Section id="revisions" number="8" title="Revisions">
                <p>The number of revisions included in a project depends on the individual project agreement.</p>
                <p>Additional revisions or major changes outside the agreed project scope may require additional charges or an updated delivery timeline.</p>
              </Section>

              <Section id="delivery" number="9" title="Delivery Time">
                <p>Estimated delivery timelines depend on:</p>
                <ul className="space-y-3">
                  <ListItem>Project complexity</ListItem>
                  <ListItem>Amount of content</ListItem>
                  <ListItem>Client requirements</ListItem>
                  <ListItem>Revision requests</ListItem>
                  <ListItem>Availability of required materials</ListItem>
                </ul>
                <p>Riwaz Studio will make reasonable efforts to complete projects within the agreed timeframe.</p>
              </Section>

              <Section id="payments" number="10" title="Payments">
                <p>Payment terms, advance payments, balance payments, cancellation terms, refunds, and additional charges will be communicated and agreed upon before or during the project.</p>
                <p>Specific payment conditions may vary depending on the project.</p>
              </Section>

              <Section id="cancellation" number="11" title="Cancellation">
                <p>Cancellation requests should be communicated as soon as possible.</p>
                <p>Depending on the stage of the project and work already completed, cancellation may result in applicable charges or the advance payment being non-refundable, as agreed between Riwaz Studio and the client.</p>
              </Section>

              <Section id="accuracy" number="12" title="Website Content Accuracy">
                <p>Riwaz Studio makes reasonable efforts to keep website information accurate and updated.</p>
                <p>However, Riwaz Studio does not guarantee that all website information will always be complete, accurate, current, or error-free.</p>
                <p>Riwaz Studio reserves the right to modify, update, suspend, or remove website content or services without prior notice.</p>
              </Section>

              <Section id="links" number="13" title="Third-Party Links">
                <p>The website may contain links to third-party websites or social media platforms.</p>
                <p>Riwaz Studio does not control or take responsibility for the content, availability, privacy practices, or policies of third-party websites.</p>
              </Section>

              <Section id="liability" number="14" title="Limitation of Liability">
                <p>Riwaz Studio makes reasonable efforts to maintain the website and provide professional services.</p>
                <p>However, Riwaz Studio shall not be responsible for losses or damages resulting from:</p>
                <ul className="space-y-3">
                  <ListItem>Temporary website downtime</ListItem>
                  <ListItem>Technical problems beyond reasonable control</ListItem>
                  <ListItem>Third-party services</ListItem>
                  <ListItem>Incorrect information provided by clients</ListItem>
                  <ListItem>Delays caused by client revisions</ListItem>
                  <ListItem>Late submission of required materials</ListItem>
                  <ListItem>Circumstances beyond reasonable control</ListItem>
                </ul>
              </Section>

              <Section id="privacy" number="15" title="Privacy">
                <p>Information submitted through contact or inquiry forms may be used to respond to requests, communicate about services, and manage project-related communication.</p>
                <p>For more information, users can view the Privacy Policy.</p>
                <div className="mt-8">
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-champagne hover:border-champagne hover:text-black hover:shadow-[0_0_25px_rgba(244,214,144,0.4)]"
                  >
                    View Privacy Policy
                    <FiExternalLink className="text-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </Section>

              <Section id="changes" number="16" title="Changes to These Terms">
                <p>Riwaz Studio reserves the right to update or modify these Terms & Conditions from time to time.</p>
                <p>Any changes will be published on this page with an updated "Last Updated" date.</p>
              </Section>

              <Section id="governing-law" number="17" title="Governing Law">
                <p>These Terms & Conditions shall be governed by and interpreted in accordance with the applicable laws of India.</p>
              </Section>

              <Section id="contact" number="18" title="Contact Us" noBorder>
                <p className="mb-8">For questions regarding these Terms & Conditions, contact:</p>
                
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/10 blur-[80px] rounded-full group-hover:bg-champagne/20 transition-colors duration-700" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold text-white mb-6">RIWAZ STUDIO</h3>
                    <div className="space-y-4 mb-10">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-sm text-white/50 uppercase tracking-widest font-bold">Email</span>
                        <a href="mailto:riwazstudioofficial@gmail.com" className="text-lg text-champagne hover:text-white transition-colors">
                          riwazstudioofficial@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <a
                      href="mailto:riwazstudioofficial@gmail.com"
                      className="inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-white hover:shadow-[0_0_25px_rgba(244,214,144,0.6)]"
                    >
                      <FiMail className="text-lg" />
                      Contact Riwaz Studio
                    </a>
                  </div>
                </div>
              </Section>

            </div>
          </motion.div>
        </div>
      </main>

      {/* Standalone Premium Footer */}
      <footer className="mt-8 sm:mt-12 relative z-10 overflow-hidden bg-[#05080e] border-t border-white/10 pt-12 pb-10">
        {/* Ambient Footer Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[radial-gradient(ellipse_at_top,rgba(244,214,144,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Logo with pulsing glow */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 rounded-full bg-champagne/40 blur-xl group-hover:bg-champagne/60 transition-colors duration-500 animate-pulse" />
              <img src="/logo.png" alt="Riwaz Studio Logo" className="relative h-20 w-20 rounded-full object-cover border-2 border-champagne/30 shadow-[0_0_30px_rgba(244,214,144,0.3)]" />
            </div>

            <h3 className="font-display text-3xl font-extrabold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-champagne via-white to-champagne mb-4">
              RIWAZ STUDIO
            </h3>
            
            <p className="text-white/60 text-base max-w-md mb-8 leading-relaxed font-light">
              A world-class retouching atelier crafting emotive visual storytelling for elite photographers and luxury brands worldwide.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/5 px-5 py-2 text-xs font-bold text-champagne backdrop-blur-md mb-12">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse" />
              <span>Currently Accepting Global Commissions</span>
            </div>

            <div className="flex items-center justify-center gap-6 mb-8">
              <SocialLink href="https://www.instagram.com/riwazstudio_?igsh=bWRzdzFmZG1hczFy" icon={<FiInstagram />} label="Instagram" colorClass="text-pink-400 border-pink-500/30 bg-pink-500/10 hover:border-transparent hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]" />
              <SocialLink href="mailto:riwazstudioofficial@gmail.com" icon={<FiMail />} label="Email" colorClass="text-blue-400 border-blue-500/30 bg-blue-500/10 hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
              <SocialLink href="https://wa.me/918780464627" icon={<FaWhatsapp />} label="WhatsApp" colorClass="text-green-400 border-green-500/30 bg-green-500/10 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]" />
            </div>
          </div>

          <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-white/40 tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} RIWAZ STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <a href="/terms-and-conditions" className="hover:text-champagne transition-colors duration-300">Terms & Conditions</a>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors duration-300">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------
// Reusable Components
// ----------------------

function Section({ id, number, title, children, noBorder = false }) {
  return (
    <section id={id} className={`scroll-mt-32 pb-16 sm:pb-24 ${!noBorder ? 'border-b border-white/5' : ''}`}>
      <div className="flex items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
        <span className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 text-champagne text-base sm:text-lg font-bold border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
          {number}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight pt-1 sm:pt-0">
          {title}
        </h2>
      </div>
      <div className="prose prose-invert prose-base sm:prose-lg max-w-none text-white/60 leading-relaxed font-light">
        {children}
      </div>
    </section>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start gap-4 before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-champagne before:mt-2.5 before:shadow-[0_0_8px_rgba(244,214,144,0.6)]">
      <span>{children}</span>
    </li>
  );
}

function GridItem({ children }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-white/80">
      <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
      {children}
    </div>
  );
}

function PillItem({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white/80">
      {children}
    </span>
  );
}

function SocialLink({ href, icon, label, colorClass }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={label}
      className={`group relative flex h-14 w-14 items-center justify-center rounded-full border text-xl transition-all duration-300 hover:scale-110 ${colorClass || 'bg-white/5 border-white/10 text-white/70 hover:bg-champagne/10 hover:border-champagne/50 hover:text-champagne hover:shadow-[0_0_25px_rgba(244,214,144,0.3)]'}`}
    >
      {icon}
    </a>
  );
}
