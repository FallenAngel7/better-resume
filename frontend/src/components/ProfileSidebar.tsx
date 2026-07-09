import { Mail } from 'lucide-react';
import type { PersonalInfo, SocialLink } from '../types';
import { resolveMediaUrl } from '../utils/media';
import SocialLinks from './SocialLinks';
import TypewriterTitles from './TypewriterTitles';

interface Props {
  info: PersonalInfo;
  socialLinks: SocialLink[];
  profileTitles: string[];
  sticky?: boolean;
}

export default function ProfileSidebar({ info, socialLinks, profileTitles, sticky = true }: Props) {
  const avatarSrc = resolveMediaUrl(info.avatarUrl);

  return (
    <aside className={sticky ? 'sticky top-24 self-start' : ''}>
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/50 dark:border-slate-800/50 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 p-8 flex flex-col items-center text-center gap-6 transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-slate-900/80">
        <div className="relative shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={info.fullName}
              className="w-36 h-36 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              {info.fullName.charAt(0)}
            </div>
          )}
          <div className="absolute -bottom-1 -end-1 w-5 h-5 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-slate-900" />
        </div>

        <div className="space-y-2 w-full">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {info.fullName}
          </h1>
          <TypewriterTitles
            titles={profileTitles}
            fallback={info.jobTitle}
            className="text-base justify-center"
          />
        </div>

        <a
          href={`mailto:${info.email}`}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Mail className="w-4 h-4" />
          بیایید صحبت کنیم
        </a>

        <SocialLinks links={socialLinks} />
      </div>
    </aside>
  );
}
