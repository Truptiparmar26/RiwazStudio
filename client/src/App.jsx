import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CursorGlow from './components/CursorGlow.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Preloader from './components/Preloader.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin.jsx';
import BeforeAfterPage from './pages/BeforeAfterPage.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Gallery from './pages/Gallery.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Services from './pages/Services.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Testimonials from './pages/Testimonials.jsx';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-champagne" style={{ scaleX }} />;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isStandaloneRoute = location.pathname === '/terms-and-conditions' || location.pathname === '/privacy-policy';
  const showLayout = !isAdminRoute && !isStandaloneRoute;

  useEffect(() => {
    document.body.classList.remove('light');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {showLayout && <Preloader />}
      {showLayout && <ScrollProgress />}
      {showLayout && <CursorGlow />}
      {showLayout && <Navbar />}
      {isAdminRoute ? (
        <Routes location={location}>
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/before-after" element={<BeforeAfterPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      )}
      {showLayout && <Footer />}
      {showLayout && <WhatsAppButton />}
    </>
  );
}
