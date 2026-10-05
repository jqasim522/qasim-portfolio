import { m, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** Five-layer card (see .card in global.css). Sets --mx/--my on mouse move; 4px spring lift; 2px inner parallax. */
export default function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useSpring(0, { stiffness: 220, damping: 25, mass: 0.8 });
  const py = useSpring(0, { stiffness: 220, damping: 25, mass: 0.8 });
  const move = (e: React.MouseEvent) => {
    const el = ref.current!, r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`);
    px.set((x / r.width - 0.5) * 4); py.set((y / r.height - 0.5) * 4);
  };
  return (
    <m.div ref={ref} onMouseMove={move} onMouseLeave={() => { px.set(0); py.set(0); }} whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.8 }} className={`card group ${className}`}>
      <m.div style={{ x: px, y: py }} className="relative flex h-full flex-col">{children}</m.div>
    </m.div>
  );
}
