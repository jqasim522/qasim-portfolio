import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Animation/gesture/layout features load in a separate chunk after first paint.
const load = () => import('./features').then((m) => m.default);

/** Wrap every island: lazy features + prefers-reduced-motion disables transform animations. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={load}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
