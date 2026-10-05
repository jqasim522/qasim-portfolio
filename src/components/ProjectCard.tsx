import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, HeartPulse, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SpotlightCard from './ui/SpotlightCard';

export type Stat = { label: string; value: string };
export type Project = {
  id: string; n: string; title: string; year: string; duration: string; desc: string; stack: string; yt: string;
  live?: string; code: string; stats: Stat[]; featured?: boolean;
};

const PREVIEW = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&disablekb=1`;

/** Metric that counts up on scroll into view (1.4s, expo-out). */
function Counter({ s }: { s: Stat }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mt = s.value.match(/^(<?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  const target = mt ? parseFloat(mt[2].replace(/,/g, '')) : 0;
  const dec = mt ? (mt[2].split('.')[1] || '').length : 0;
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }));
  useEffect(() => {
    if (!mt || !seen) return;
    if (reduce) { mv.set(target); return; }
    const c = animate(mv, target, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [seen]);
  return (
    <li ref={ref} className="min-w-0 text-center">
      <span className={`block font-display font-extrabold ${mt ? 'text-[28px] leading-none tracking-[-0.02em]' : 'break-words text-[18px] leading-[28px] tracking-[-0.01em]'}`}>
        {mt ? <>{mt[1]}<m.span>{out}</m.span>{mt[3]}</> : s.value}
      </span>
      <span className="mt-2 block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-t3">{s.label}</span>
    </li>
  );
}

/** Designed fallback (never a grey box). The whole poster is a link to the code. */
function Poster({ p }: { p: Project }) {
  return (
    <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label={`Case study: ${p.title}`}
      className="group/poster relative grid h-full w-full place-items-center overflow-hidden bg-[linear-gradient(135deg,#0a8f6a_0%,#173a3f_55%,#667eea_130%)] p-6 text-center">
      <span aria-hidden="true" className="absolute left-4 top-1 font-mono text-[88px] font-bold leading-none opacity-15">{p.n}</span>
      <span className="relative flex flex-col items-center gap-3">
        <HeartPulse size={36} strokeWidth={1.5} className="text-white/80 transition-transform duration-300 group-hover/poster:scale-110" aria-hidden="true" />
        <span className="font-display text-2xl font-bold leading-tight tracking-tight">{p.title}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">Case study <ArrowRight size={16} className="transition-transform duration-300 group-hover/poster:translate-x-1" aria-hidden="true" /></span>
      </span>
    </a>
  );
}

export default function ProjectCard({ p, isOpen, onOpen }: { p: Project; isOpen: boolean; onOpen: (id: string) => void }) {
  const ok = /^[\w-]{11}$/.test(p.yt); // YouTube IDs are exactly 11 chars
  const thumbs = ['maxresdefault', 'hqdefault', 'mqdefault'].map((n) => `https://img.youtube.com/vi/${p.yt}/${n}.jpg`);
  const [ti, setTi] = useState(0);
  const [prev, setPrev] = useState(false);
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const showVideo = ok && ti < thumbs.length;
  const next = () => setTi((i) => i + 1);
  const enter = () => { if (showVideo && matchMedia('(hover: hover)').matches) timer.current = setTimeout(() => setPrev(true), 500); };
  const leave = () => { clearTimeout(timer.current); setPrev(false); setReady(false); };

  return (
    <SpotlightCard className="h-full">
      <div className="p-3">
        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-surf" onMouseEnter={enter} onMouseLeave={leave}>
          {showVideo ? (
            <>
              {!isOpen && (
                <m.div layoutId={`media-${p.id}`} className="absolute inset-0 overflow-hidden" style={{ borderRadius: 14 }}>
                  <img src={thumbs[ti]} alt={`${p.title} video thumbnail`} width={1280} height={720} loading="lazy" onError={next}
                    onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120) next(); }}
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
                  {prev && (
                    <m.iframe src={PREVIEW(p.yt)} title={`${p.title} preview`} tabIndex={-1} aria-hidden="true"
                      referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media" onLoad={() => setReady(true)}
                      initial={{ opacity: 0, scale: 0.98 }} animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }} className="pointer-events-none absolute inset-0 h-full w-full border-0" />
                  )}
                </m.div>
              )}
              <button type="button" onClick={() => onOpen(p.id)} aria-label={`Play video: ${p.title}`} className="absolute inset-0 z-10 grid place-items-center">
                <span className={`grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-black/60 pl-1 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-dim ${prev && !ready ? 'animate-pulse' : ''} ${ready ? 'opacity-0' : ''}`}>
                  <Play size={24} fill="currentColor" aria-hidden="true" />
                </span>
              </button>
            </>
          ) : <Poster p={p} />}
          {p.featured && <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-amber px-3 py-1 text-xs font-bold text-base">Featured</span>}
          <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[12px] font-medium text-white/90 backdrop-blur">{p.year}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-8 pb-8 pt-5">
        <p className="mono-tag uppercase text-t3">{p.duration}</p>
        <h3 className="mt-3 font-display text-[22px] font-bold leading-snug tracking-[-0.01em]">{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-t2">{p.desc}</p>
        <ul className={`mt-6 grid min-h-[132px] content-start gap-x-6 gap-y-4 ${p.stats.length <= 2 || p.stats.length === 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`} aria-label="Key results">{p.stats.map((s) => <Counter key={s.label} s={s} />)}</ul>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label="Tech stack">
          {p.stack.split(' · ').map((t) => <li key={t} className="font-mono text-[13px] text-t3 before:mr-1.5 before:text-brand before:content-['·']">{t}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {p.live && <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={16} className="nudge" aria-hidden="true" /></a>}
          <a className="btn" href={p.code} target="_blank" rel="noopener noreferrer">Code <ArrowUpRight size={16} className="nudge" aria-hidden="true" /></a>
          {showVideo && <button type="button" className="btn" onClick={() => onOpen(p.id)}>Watch <ArrowRight size={16} className="slide" aria-hidden="true" /></button>}
        </div>
      </div>
    </SpotlightCard>
  );
}
