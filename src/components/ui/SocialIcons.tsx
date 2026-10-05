import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

const items = [
  { href: 'https://github.com/jqasim522', label: 'GitHub', Icon: Github, ext: true },
  { href: 'https://linkedin.com/in/m-qasim-javed', label: 'LinkedIn', Icon: Linkedin, ext: true },
  { href: 'https://www.youtube.com/watch?v=JRPry7mpXq0', label: 'YouTube', Icon: Youtube, ext: true },
  { href: 'mailto:muhammadqasimjaved19@gmail.com', label: 'Email', Icon: Mail, ext: false },
];

export default function SocialIcons() {
  return (
    <ul className="flex gap-3">
      {items.map(({ href, label, Icon, ext }) => (
        <li key={label}>
          <a href={href} aria-label={label} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="social grid h-10 w-10 place-items-center rounded-full border border-line text-t2 hover:border-line-brand hover:text-brand">
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
