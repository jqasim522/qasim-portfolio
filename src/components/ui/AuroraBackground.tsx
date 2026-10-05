import { m } from 'framer-motion';
import MotionRoot from './Motion';

const orbs = [
  { c: '#0a8f6a', s: 720, pos: '-left-48 -top-48', o: 0.12, x: [0, 60, -30, 0], y: [0, -40, 20, 0], d: 30 },
  { c: '#667eea', s: 640, pos: '-right-40 top-[8%]', o: 0.11, x: [0, -70, 30, 0], y: [0, 50, -30, 0], d: 26 },
  { c: '#f5a623', s: 600, pos: 'bottom-[-20%] left-[30%]', o: 0.08, x: [0, 50, -60, 0], y: [0, -50, 30, 0], d: 22 },
  { c: '#0a8f6a', s: 680, pos: '-bottom-64 -right-56', o: 0.1, x: [0, -40, 40, 0], y: [0, 40, -40, 0], d: 28 },
];

/** Drifting blurred orbs. Transform-only animation (GPU). `fixed=false` for use inside a section. */
export default function AuroraBackground({ fixed = true }: { fixed?: boolean }) {
  return (
    <MotionRoot>
      <div aria-hidden="true" className={`${fixed ? 'fixed' : 'absolute'} inset-0 z-0 overflow-hidden pointer-events-none`}>
        {orbs.map((o, i) => (
          <m.div
            key={i}
            className={`absolute rounded-full will-change-transform ${o.pos}`}
            style={{ width: o.s, height: o.s, background: o.c, opacity: o.o, filter: 'blur(120px)' }}
            animate={{ x: o.x, y: o.y }}
            transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </MotionRoot>
  );
}
