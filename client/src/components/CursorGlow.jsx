import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobileTouch, setIsMobileTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, lightweight follower ring
  const ringSpring = { damping: 25, stiffness: 300, mass: 0.2 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  // Immediate 1:1 tracking for the center dot
  const dotSpring = { damping: 40, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    if (window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobileTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], select');
      setHovered(Boolean(target));
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (isMobileTouch || !visible) return null;

  return (
    <>
      {/* Simple, clean follower circle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border md:block transition-all duration-200 ease-out"
        style={{
          x: ringX,
          y: ringY,
          width: hovered ? 46 : 28,
          height: hovered ? 46 : 28,
          borderColor: hovered ? 'rgba(244, 214, 144, 0.9)' : 'rgba(244, 214, 144, 0.45)',
          backgroundColor: hovered ? 'rgba(244, 214, 144, 0.12)' : 'transparent',
          boxShadow: hovered ? '0 0 16px rgba(244, 214, 144, 0.35)' : 'none',
        }}
      />

      {/* Crisp precision gold dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[102] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne shadow-[0_0_6px_#f4d690] md:block transition-transform duration-200"
        style={{ 
          x: dotX, 
          y: dotY, 
          scale: hovered ? 0.5 : 1 
        }}
      />
    </>
  );
}

