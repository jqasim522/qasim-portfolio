import { Award, BadgeCheck } from 'lucide-react';

export default function CertIcon({ kind }: { kind: 'badge' | 'award' }) {
  const Icon = kind === 'badge' ? BadgeCheck : Award;
  return <Icon size={22} aria-hidden="true" />;
}
