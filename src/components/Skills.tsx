import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import MotionRoot from './ui/Motion';
import SectionLabel from './ui/SectionLabel';
import SpotlightCard from './ui/SpotlightCard';

const groups = [
  { name: 'AI/ML', color: '#8b9eff', span: 'lg:col-span-7', items: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'LangChain', 'LangGraph', 'CrewAI', 'Pydantic AI', 'RAG', 'YOLOv8', 'OpenCV'] },
  { name: 'Backend', color: '#10d695', span: 'lg:col-span-5', items: ['FastAPI', 'Django REST', 'PostgreSQL', 'MySQL', 'Firebase'] },
  { name: 'Frontend', color: '#ffb84d', span: 'lg:col-span-5', items: ['React', 'Flutter', 'Streamlit', 'HTML5', 'Tailwind'] },
  { name: 'DevOps', color: '#ff7b9c', span: 'lg:col-span-7', items: ['Docker', 'AWS EC2', 'Git', 'Vercel'] },
];

// Only skills named in a project stack or experience bullet get a tooltip.
const used: Record<string, string> = {
  Python: 'Neat Now', 'Scikit-learn': 'Heart Disease Prediction', LangChain: 'Web3 Geeks internship',
  LangGraph: 'RealEstate Hub, Web3 Geeks internship', CrewAI: 'Web3 Geeks internship', 'Pydantic AI': 'Bookme internship',
  RAG: 'Web3 Geeks and Bookme internships', YOLOv8: 'Neat Now', FastAPI: 'RealEstate Hub, Heart Disease Prediction',
  'Django REST': 'Neat Now', PostgreSQL: 'Neat Now, Heart Disease Prediction', React: 'Neat Now', Flutter: 'Neat Now',
  Streamlit: 'Heart Disease Prediction', Docker: 'RealEstate Hub', 'AWS EC2': 'Neat Now',
};
const spring = { type: 'spring', stiffness: 220, damping: 25, mass: 0.8 } as const;

export default function Skills() {
  const [tip, setTip] = useState<string | null>(null);
  return (
    <MotionRoot>
      <section id="skills" className="sec tint">
        <div className="wrap">
          <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <SectionLabel>SKILLS</SectionLabel>
            <h2 className="h2">Skills</h2>
          </m.div>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {groups.map((g) => (
              <div key={g.name} className={g.span}>
                <SpotlightCard className="h-full p-8 md:p-10">
                  <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color, boxShadow: `0 0 12px ${g.color}` }} aria-hidden="true" />{g.name}
                  </h3>
                  <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-4">
                    {g.items.map((s, i) => {
                      const k = `${g.name}-${s}`;
                      return (
                        <m.li key={k} className="relative" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...spring, delay: i * 0.06 }}>
                          <m.button type="button" whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}
                            onHoverStart={() => setTip(k)} onHoverEnd={() => setTip(null)} onFocus={() => setTip(k)} onBlur={() => setTip(null)}
                            style={{ ['--c' as string]: g.color }}
                            className="group/p inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-line bg-surf/80 px-4 font-mono text-[12px] font-medium tracking-[0.04em] text-t1 transition-colors hover:border-line-strong hover:bg-surfh">
                            <span className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover/p:scale-125 group-hover/p:shadow-[0_0_10px_3px_var(--c)]" style={{ background: g.color }} aria-hidden="true" />{s}
                          </m.button>
                          <AnimatePresence>
                            {tip === k && used[s] && (
                              <m.span role="tooltip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.18 }}
                                className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[240px] -translate-x-1/2 rounded-xl border border-line-strong bg-surfh px-3 py-1.5 text-center text-xs text-t1 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                                Used in: {used[s]}
                              </m.span>
                            )}
                          </AnimatePresence>
                        </m.li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
