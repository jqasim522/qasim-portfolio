import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import AuroraBackground from './ui/AuroraBackground';
import MagneticButton from './ui/MagneticButton';
import MotionRoot from './ui/Motion';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');
const EMAIL = 'muhammadqasimjaved19@gmail.com';
const rise = { duration: 0.6, ease: [0.16, 1, 0.3, 1] } as const;
const fade = (delay: number) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { ...rise, delay } });

export default function Contact() {
  const [time, setTime] = useState('--:--');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Karachi' });
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <MotionRoot>
      <section id="contact" className="sec relative overflow-hidden bg-elev/60 text-center">
        <AuroraBackground fixed={false} />
        <div className="glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <span aria-hidden="true" className="spin-slow pointer-events-none absolute left-1/2 top-1/2 -ml-[100px] -mt-[100px] select-none font-display text-[200px] font-extrabold leading-none tracking-tighter opacity-5">QJ</span>
        <div className="wrap relative">
          <m.p className="label" {...fade(0)}>CONTACT</m.p>
          <m.h2 className="grad-text mx-auto max-w-[14ch] font-display text-[clamp(48px,7vw,88px)] font-extrabold leading-[0.98] tracking-[-0.045em]" {...fade(0.06)}>
            Let's build something.
          </m.h2>
          <m.p className="mx-auto mt-6 max-w-[48ch] text-lg text-t2" {...fade(0.12)}>Open to AI/ML engineering roles, internships, and freelance work.</m.p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={copy}>Email me <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></MagneticButton>
            <MagneticButton href={`${B}/resume.pdf`} variant="ghost" download>Download CV <Download size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" /></MagneticButton>
          </div>

          <ul className="mt-10 flex flex-col items-center font-mono text-[15px]">
            <li><a href={`mailto:${EMAIL}`} className="inline-flex min-h-[44px] items-center text-t1 transition-colors hover:text-brand">{EMAIL}</a></li>
            <li><a href="tel:+923214622075" className="inline-flex min-h-[44px] items-center text-t1 transition-colors hover:text-brand">+92 321 4622075</a></li>
            <li className="inline-flex min-h-[36px] items-center text-t3">Lahore, Pakistan</li>
          </ul>
          <p className="mono-tag mt-8 uppercase tracking-[0.1em] text-t2">Lahore · {time} PKT</p>
        </div>
        <AnimatePresence>
          {copied && (
            <m.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-base shadow-[0_0_40px_rgba(16,214,149,0.35)]">
              Copied!
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </MotionRoot>
  );
}
