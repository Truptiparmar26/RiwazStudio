import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CursorGlow from './components/CursorGlow.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Preloader from './components/Preloader.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';

// Route-level code splitting for optimized mobile speed and minimal initial bundle size
const About = lazy(() => import('./pages/About.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const BeforeAfterPage = lazy(() => import('./pages/BeforeAfterPage.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions.jsx'));
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-9 w-9 rounded-full border-2 border-champagne border-t-transparent animate-spin" />
    </div>
  );
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
    // Disable Lenis smooth scrolling on mobile / touch devices to prevent scroll stuttering
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || window.innerWidth < 1024) {
      return;
    }

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
      {showLayout && <CursorGlow />}
      {showLayout && <Navbar />}
      {isAdminRoute ? (
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Suspense>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
          </motion.main>
        </AnimatePresence>
      )}
      {showLayout && <Footer />}
      {showLayout && <WhatsAppButton />}
    </>
  );
}
