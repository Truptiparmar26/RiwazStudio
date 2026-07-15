import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[90] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/10 blur-3xl md:block"
      style={{ left: position.x, top: position.y }}
    />
  );
}
