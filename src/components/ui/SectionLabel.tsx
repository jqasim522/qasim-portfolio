import type { ReactNode } from 'react';

/** Small uppercase eyebrow above each H2 (style lives in .label in global.css). `reveal` opts into the scroll-reveal used by .astro sections. */
export default function SectionLabel({ children, reveal = false }: { children: ReactNode; reveal?: boolean }) {
  return <p className="label" {...(reveal ? { 'data-reveal': '' } : {})}>{children}</p>;
}
