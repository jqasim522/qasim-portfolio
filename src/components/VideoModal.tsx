import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from './ProjectCard';

const FULL = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export default function VideoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <m.div key="backdrop" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(20px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4">
          <div className="flex w-full max-w-[1000px] flex-col items-end gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" autoFocus onClick={onClose} aria-label="Close video" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/25">
              <X size={20} aria-hidden="true" />
            </button>
            <m.div layoutId={`media-${project.id}`} className="aspect-video w-full overflow-hidden bg-black shadow-[0_40px_80px_rgba(0,0,0,0.6)]" style={{ borderRadius: 14 }}>
              <iframe src={FULL(project.yt)} title={`${project.title} video`} referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="h-full w-full border-0" />
            </m.div>
            <a href={`https://www.youtube.com/watch?v=${project.yt}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white">Video not loading? Watch on YouTube</a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
