import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail, FiInstagram, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const sections = [
  { id: 'introduction', title: 'Introduction & Overview' },
  { id: 'collection', title: 'Information We Collect' },
  { id: 'usage', title: 'How We Use Your Data' },
  { id: 'client-content', title: 'Client Content & Portfolios' },
  { id: 'protection', title: 'Data Protection & Security' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'rights', title: 'Your Privacy Rights' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'changes', title: 'Changes to Policy' },
  { id: 'contact', title: 'Contact Us' }
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    document.title = 'Privacy Policy | Riwaz Studio';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Read the Privacy Policy for using the Riwaz Studio website and creative editing services.';
    document.head.appendChild(meta);
    
    // Smooth scrolling observer for active section in sidebar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -75% 0px' }); 

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
                  Privacy Policy
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
                At Riwaz Studio, your privacy is extremely important to us. This Privacy Policy details how we collect, use, and protect your personal information and media files when you interact with our website and utilize our creative editing services.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16 sm:space-y-24">
              
              <Section id="introduction" number="1" title="Introduction & Overview">
                <p>Welcome to Riwaz Studio. We respect your privacy and are committed to safeguarding the personal data you share with us.</p>
                <p>By accessing our website and engaging our services, you consent to the data practices outlined in this policy. We ensure that any data collected is processed strictly in accordance with applicable privacy laws.</p>
              </Section>

              <Section id="collection" number="2" title="Information We Collect">
                <p>To provide you with our high-end retouching services, we may collect the following types of information:</p>
                <div className="grid sm:grid-cols-2 gap-3 my-6">
                  <GridItem>Name & Email Address</GridItem>
                  <GridItem>Phone Number / WhatsApp</GridItem>
                  <GridItem>Project Specifications</GridItem>
                  <GridItem>Billing Information</GridItem>
                  <GridItem>Raw Images & Videos</GridItem>
                  <GridItem>Reference Materials</GridItem>
                </div>
                <p>We only collect information that is strictly necessary for the successful completion of your project and seamless communication.</p>
              </Section>

              <Section id="usage" number="3" title="How We Use Your Data">
                <p>The information we collect is utilized to enhance your experience and deliver exceptional results. Specifically, we use your data to:</p>
                <ul className="space-y-3">
                  <ListItem>Process and deliver your customized editing projects.</ListItem>
                  <ListItem>Communicate regarding project updates, revisions, and feedback.</ListItem>
                  <ListItem>Manage billing, invoices, and payment processing securely.</ListItem>
                  <ListItem>Improve our website's functionality and user experience.</ListItem>
                  <ListItem>Send occasional updates regarding new services or VIP offers (only if subscribed).</ListItem>
                </ul>
              </Section>

              <Section id="client-content" number="4" title="Client Content & Portfolios">
                <p>Your creative assets (raw images, videos, and project files) are treated with the utmost confidentiality.</p>
                <p>We understand the sensitive nature of unreleased campaigns and personal photography. We will <strong>never</strong> use, publish, or distribute your raw or finalized assets without your explicit permission.</p>
                <p>If you consent, we may occasionally feature completed, approved work on our portfolio or social channels to showcase our retouching capabilities.</p>
              </Section>

              <Section id="protection" number="5" title="Data Protection & Security">
                <p>We employ enterprise-grade security measures to protect your digital assets and personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                <p>All file transfers are conducted through secure, encrypted platforms, and project files are stored on protected servers accessible only by authorized editing personnel.</p>
              </Section>

              <Section id="cookies" number="6" title="Cookies & Tracking">
                <p>Our website utilizes cookies and similar tracking technologies to ensure optimal performance and analyze site traffic.</p>
                <p>These cookies do not collect personally identifiable information. You may choose to disable cookies through your browser settings, though this may limit certain functionalities of the website.</p>
              </Section>

              <Section id="third-party" number="7" title="Third-Party Services">
                <p>Riwaz Studio does not sell, trade, or rent your personal information to third parties.</p>
                <p>We may employ trusted third-party service providers (such as payment gateways and secure file-hosting platforms) who assist us in operating our studio. These partners are bound by strict confidentiality agreements and are permitted to use your data only to the extent necessary to provide their specific services.</p>
              </Section>

              <Section id="rights" number="8" title="Your Privacy Rights">
                <p>You retain full control over your personal information. At any time, you have the right to:</p>
                <div className="flex flex-wrap gap-3 my-6">
                  <PillItem>Request Access to Your Data</PillItem>
                  <PillItem>Request Data Deletion</PillItem>
                  <PillItem>Update Incorrect Info</PillItem>
                  <PillItem>Opt-out of Marketing</PillItem>
                </div>
                <p>If you wish to exercise any of these rights, simply reach out to our team via email.</p>
              </Section>

              <Section id="retention" number="9" title="Data Retention">
                <p>We retain your personal information and project files only for as long as necessary to fulfill the purposes outlined in this policy, or to comply with legal obligations.</p>
                <p>Once a project is finalized and the retention period expires, your raw assets and files are securely deleted from our active servers to ensure your ongoing privacy.</p>
              </Section>

              <Section id="changes" number="10" title="Changes to Policy">
                <p>Riwaz Studio reserves the right to update this Privacy Policy periodically to reflect changes in our practices or legal requirements.</p>
                <p>Any modifications will be posted directly on this page, and the "Last Updated" date at the top will be revised accordingly.</p>
              </Section>

              <Section id="contact" number="11" title="Contact Us" noBorder>
                <p className="mb-8">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our privacy team:</p>
                
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
                      Contact Privacy Team
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
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors duration-300">Terms & Conditions</a>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <a href="/privacy-policy" className="hover:text-champagne transition-colors duration-300">Privacy Policy</a>
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
