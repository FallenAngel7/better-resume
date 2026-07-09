import { Globe, Code, Users, Send } from 'lucide-react';
import type { SocialLink } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  github: <Code className="w-5 h-5" />,
  linkedin: <Users className="w-5 h-5" />,
  telegram: <Send className="w-5 h-5" />,
};

interface Props {
  links: SocialLink[];
}

export default function SocialLinks({ links }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.platformName}
          title={link.platformName}
          className="p-3 rounded-xl glass hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          {iconMap[link.iconName.toLowerCase()] ?? <Globe className="w-5 h-5" />}
        </a>
      ))}
    </div>
  );
}
