import { m, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AnimatedText from './ui/AnimatedText';
import MagneticButton from './ui/MagneticButton';
import MotionRoot from './ui/Motion';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');
// Put a square photo at public/hero.jpg. If the file is missing, the QJ monogram is shown instead.
const HERO_PHOTO = `${B}/hero.jpg`;

const spring = { type: 'spring', stiffness: 220, damping: 25, mass: 0.8 } as const;
const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const rise: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const blurIn: Variants = { hidden: { opacity: 0, filter: 'blur(10px)' }, show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

function Avatar() {
  const [ok, setOk] = useState(true);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => { const el = img.current; if (el && el.complete && el.naturalWidth === 0) setOk(false); }, []);

  if (!ok) {
    return (
      <div className="avatar-ring grid h-56 w-56 place-items-center lg:h-80 lg:w-80" aria-hidden="true">
        <span className="grad-text font-display text-7xl font-extrabold tracking-tighter lg:text-9xl">QJ</span>
      </div>
    );
  }
  return (
    <div className="relative h-56 w-56 lg:h-80 lg:w-80">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand via-[#5eead4] to-indigo p-[2px]">
        <div className="h-full w-full rounded-full bg-elev">
          <img ref={img} src={HERO_PHOTO} alt="Muhammad Qasim Javed" width={320} height={320} loading="eager" onError={() => setOk(false)} className="h-full w-full rounded-full object-cover object-[center_20%]" />
        </div>
      </div>
      <span className="absolute bottom-4 right-4 h-4 w-4 rounded-full border-2 border-elev bg-brand">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand" />
      </span>
    </div>
  );
}

const badge = 'inline-flex items-center gap-2.5 rounded-full border border-line bg-surf/70 px-4 py-1.5 text-sm font-medium text-t2 backdrop-blur';

export default function Hero() {
  const { scrollY } = useScroll();
  const hint = useTransform(scrollY, [0, 160], [1, 0]);
  const follow = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--hx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--hy', `${e.clientY - r.top}px`);
  };
  return (
    <MotionRoot>
      <section id="home" onMouseMove={follow} className="relative flex min-h-screen items-center overflow-hidden pb-32 pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(300px circle at var(--hx,30%) var(--hy,30%), rgba(16,214,149,0.05), transparent 70%)' }} />
        <div className="glow -left-40 top-10 h-[600px] w-[600px]" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.5fr_0.5fr]">
          <m.div variants={parent} initial="hidden" animate="show">
            <m.div variants={rise} className="flex flex-wrap gap-3">
              <p className={badge}>
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand" /></span>
                Available for opportunities
              </p>
              <p className={badge}><span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" />Remote-friendly</p>
            </m.div>
            <h1 className="mt-8 font-display text-[clamp(56px,10vw,120px)] font-extrabold leading-[0.95] tracking-[-0.05em]">
              <AnimatedText text="Qasim Javed" delay={0.25} />
            </h1>
            <m.p variants={blurIn} className="mt-6 font-display text-xl font-medium text-t1 md:text-2xl">AI/ML Engineer · Software Engineering Graduate</m.p>
            <m.p variants={rise} className="py-2 font-mono text-[13px] text-[#a4b0ac]">Open to: AI/ML Engineer · ML Engineer · Data Scientist roles</m.p>
            <m.p variants={rise} className="mt-3 max-w-[560px] text-t2">
              I build production-grade AI systems — RAG pipelines, voice agents, and computer vision models that ship to real users. UET graduate, class of 2026. Formerly at Web3 Geeks and Bookme.
            </m.p>
            <m.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projects">View Projects <ChevronRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></MagneticButton>
              <MagneticButton href={`${B}/resume.pdf`} variant="ghost" download>Download CV <ArrowDown size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1" /></MagneticButton>
            </m.div>
            <m.ul variants={rise} className="mt-6 flex flex-wrap gap-x-5 gap-y-0 font-mono text-[13px] text-t3">
              <li><a href="mailto:muhammadqasimjaved19@gmail.com" className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-brand"><Mail size={14} aria-hidden="true" />muhammadqasimjaved19@gmail.com</a></li>
              <li><a href="tel:+923214622075" className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-brand"><Phone size={14} aria-hidden="true" />+92 321 4622075</a></li>
              <li className="inline-flex min-h-[44px] items-center gap-2"><MapPin size={14} aria-hidden="true" />Lahore, PK</li>
            </m.ul>
          </m.div>

          <m.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.5 }} className="justify-self-start lg:justify-self-end">
            <Avatar />
          </m.div>
        </div>

        <m.a href="#about" aria-label="Scroll to About" style={{ opacity: hint }} className="mono-tag absolute bottom-8 left-1/2 inline-flex min-h-[44px] -translate-x-1/2 items-center gap-1.5 uppercase tracking-[0.15em] text-t3">
          Scroll
          <m.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={14} aria-hidden="true" /></m.span>
        </m.a>
      </section>
    </MotionRoot>
  );
}
