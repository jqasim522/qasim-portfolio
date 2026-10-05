import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MotionRoot from './ui/Motion';

const B = import.meta.env.BASE_URL.replace(/\/$/, '');
const links = [['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['education', 'Education'], ['certifications', 'Certifications'], ['contact', 'Contact']];
const spring = { type: 'spring', stiffness: 220, damping: 25, mass: 0.8 } as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id === 'home' ? '' : e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    ['home', ...links.map((l) => l[0])].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <MotionRoot>
      <m.header
        animate={{ height: scrolled ? 60 : 72 }} transition={spring}
        className={`fixed inset-x-0 top-0 z-50 flex items-center border-b transition-colors duration-300 ${scrolled ? 'border-line-subtle bg-base/65 backdrop-blur-[24px]' : 'border-transparent'}`}
      >
        <div className="wrap flex items-center justify-between">
          <a href="#home" aria-label="Qasim Javed, back to top" className="logo-ring grid h-10 w-10 place-items-center font-display text-[15px] font-extrabold tracking-tight">QJ</a>

          <div className="flex items-center gap-1">
            <nav aria-label="Primary" className="hidden items-center md:flex">
              {links.map(([id, label]) => (
                <a key={id} href={`#${id}`}
                  className={`relative inline-flex min-h-[44px] items-center rounded-full px-3 text-sm font-medium transition-colors lg:px-4 ${id === 'contact' ? 'ml-1 border border-line bg-white/[0.04]' : ''} ${active === id ? 'text-brand' : 'text-t2 hover:text-t1'}`}>
                  {active === id && <m.span layoutId="navPill" transition={spring} className="absolute inset-0 rounded-full border border-brand/30 bg-brand/10" />}
                  <span className="relative">{label}</span>
                </a>
              ))}
            </nav>

            <a href={`${B}/resume.pdf`} download aria-label="Download CV"
              className="group/dl relative ml-1 grid h-11 w-11 place-items-center rounded-full border border-line text-t2 transition-all duration-300 hover:-translate-y-1 hover:border-line-brand hover:text-brand">
              <Download size={18} aria-hidden="true" className="transition-transform duration-300 group-hover/dl:scale-110" />
              <span role="tooltip" className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-xl border border-line-strong bg-surfh px-3 py-1.5 text-xs text-t1 opacity-0 transition-opacity duration-200 group-hover/dl:opacity-100 group-focus-visible/dl:opacity-100">Download CV</span>
            </a>

            <button type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="drawer"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-t1 md:hidden">
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div id="drawer" key="drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-base/95 px-8 backdrop-blur-xl md:hidden">
            <m.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
              {links.map(([id, label]) => (
                <m.li key={id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: spring } }}>
                  <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 font-display text-4xl font-extrabold tracking-tight text-t1">{label}</a>
                </m.li>
              ))}
            </m.ul>
            <a href={`${B}/resume.pdf`} download className="btn mt-6 w-fit">Download CV <Download size={16} aria-hidden="true" /></a>
          </m.div>
        )}
      </AnimatePresence>
    </MotionRoot>
  );
}
