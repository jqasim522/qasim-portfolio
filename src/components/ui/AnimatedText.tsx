import { m, useReducedMotion } from 'framer-motion';

const stops = [[240, 244, 242], [16, 214, 149], [139, 158, 255]]; // --grad-hero stops
const color = (t: number) => {
  const s = t * 2, i = Math.min(1, Math.floor(s)), f = s - i;
  return `rgb(${stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f)).join(',')})`;
};

/** Per-letter reveal (opacity, y 40→0, blur 8→0, 30ms stagger). Gradient is sampled per letter. */
export default function AnimatedText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const chars = [...text];
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <m.span
          key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre', color: color(i / Math.max(chars.length - 1, 1)) }}
          initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.03 }}
          whileHover={reduce ? undefined : { y: -8, transition: { type: 'spring', stiffness: 400, damping: 14 } }}
        >
          {c}
        </m.span>
      ))}
    </span>
  );
}
