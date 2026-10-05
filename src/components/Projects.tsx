import { LayoutGroup, m } from 'framer-motion';
import { useState } from 'react';
import ProjectCard, { type Project } from './ProjectCard';
import VideoModal from './VideoModal';
import MotionRoot from './ui/Motion';
import SectionLabel from './ui/SectionLabel';

const projects: Project[] = [
  {
    id: 'realestate', n: '01', featured: true, title: 'RealEstate Hub — UrduLish AI Voice Agent', year: '2026', duration: 'Aug – Sep 2026',
    desc: 'Production-grade voice agent for Pakistani real estate. 11-node LangGraph orchestration, 575 real listings, UrduLish conversation, Google Calendar + Gmail integration, full booking lifecycle (book / reschedule / cancel).',
    stack: 'FastAPI · LangGraph · Groq · Edge TTS · Docker · Railway', yt: 'JRPry7mpXq0',
    live: 'https://web-production-7d18f.up.railway.app', code: 'https://github.com/jqasim522/Web3-Geeks-Internship/tree/copilot/week1-readme-update/week4',
    stats: [{ label: 'grounding (20-Q eval)', value: '100%' }, { label: 'hallucination', value: '0' }, { label: 'tests', value: '775' }, { label: 'blocked', value: '127' }, { label: 'warm TTFT', value: '<900ms' }],
  },
  {
    id: 'neatnow', n: '02', title: 'Neat Now — AI Waste Detection System (FYP)', year: '2026', duration: 'Sep 2025 – May 2026',
    desc: 'A production-ready hybrid waste management platform for Pakistani housing societies. Multi-class YOLOv8m detection over 9 waste categories, integrated with Flutter citizen + worker apps, a React.js admin portal, and Django REST backend. Includes before-after AI cleanup verification.',
    stack: 'Python · YOLOv8m · Django · Flutter · React.js · PostgreSQL · AWS EC2', yt: 'gbwqvXIvG4k', code: 'https://github.com/jqasim522',
    stats: [{ label: 'images', value: '12,270' }, { label: 'annotations', value: '26,596' }, { label: 'mAP@50', value: '82.5%' }, { label: 'precision', value: '88.6%' }, { label: 'inference', value: '41ms' }],
  },
  {
    id: 'heart', n: '03', title: 'Heart Disease Prediction System', year: '2025', duration: 'Dec 2024 – Jan 2025',
    desc: 'Multi-class severity prediction (4 levels: No disease, Mild, Severe, Critical) with ML pipeline, FastAPI backend, Streamlit frontend, PostgreSQL persistence, and user-based prediction tracking.',
    stack: 'Scikit-learn · FastAPI · Streamlit · PostgreSQL · Pandas',
    yt: 'KLNIANBhJlQ', // if the thumbnail ever fails to load, the card falls back to a designed poster linking to the code
    code: 'https://github.com/jqasim522/Heart-disease-detection',
    stats: [{ label: 'classes', value: '4' }, { label: 'backend', value: 'FastAPI' }, { label: 'database', value: 'PostgreSQL' }],
  },
];

export default function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const current = projects.find((p) => p.id === open) ?? null;
  return (
    <MotionRoot>
      <section id="projects" className="sec overflow-hidden">
        <div className="glow -right-32 top-24 h-[600px] w-[600px]" aria-hidden="true" />
        <div className="wrap relative">
          <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <SectionLabel>PROJECTS</SectionLabel>
            <h2 className="h2">Projects</h2>
            <p className="mt-4 max-w-[52ch] text-t2">Hover a video for a muted preview. Click to watch with sound.</p>
          </m.div>
          <LayoutGroup>
            <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <m.div key={p.id} className="h-full"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                  <ProjectCard p={p} isOpen={open === p.id} onOpen={setOpen} />
                </m.div>
              ))}
            </div>
          </LayoutGroup>
        </div>
        <VideoModal project={current} onClose={() => setOpen(null)} />
      </section>
    </MotionRoot>
  );
}
