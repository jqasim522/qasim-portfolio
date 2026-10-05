import { m, useSpring } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

interface Props { children: ReactNode; href?: string; onClick?: () => void; variant?: 'primary' | 'ghost'; download?: boolean; external?: boolean }
const clamp = (v: number) => Math.max(-8, Math.min(8, v));

/** Pulled toward the cursor within 100px (max 8px) with a cursor-following glow. */
export default function MagneticButton({ children, href, onClick, variant = 'primary', download, external }: Props) {
  const wrap = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 25, mass: 0.8 });
  const y = useSpring(0, { stiffness: 220, damping: 25, mass: 0.8 });

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const move = (e: MouseEvent) => {
      const r = wrap.current!.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0));
      if (d < 100) { x.set(clamp(dx * 0.2)); y.set(clamp(dy * 0.2)); } else { x.set(0); y.set(0); }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  const glow = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };
  const cls = `group relative inline-flex min-h-[48px] items-center gap-2 overflow-hidden rounded-full px-7 text-[15px] font-semibold ${
    variant === 'primary' ? 'bg-brand text-base shadow-[0_0_40px_rgba(16,214,149,0.25)]' : 'border border-line-strong bg-surf text-t1'}`;
  const Tag: any = href ? m.a : m.button;
  const extra = href ? { href, ...(download ? { download: true } : {}), ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : { type: 'button', onClick };
  return (
    <span ref={wrap} className="inline-block">
      <Tag {...extra} style={{ x, y }} onMouseMove={glow} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.8 }} className={cls}>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(110px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,0.35),transparent 70%)' }} />
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </Tag>
    </span>
  );
}
