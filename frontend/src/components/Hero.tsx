import { Mail, Phone, MapPin } from 'lucide-react';
import type { PersonalInfo } from '../types';

interface Props {
  info: PersonalInfo;
}

export default function Hero({ info }: Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          خوش آمدید
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-50">
          من{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {info.fullName}
          </span>
          {' '}هستم
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {info.jobTitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
        <a
          href={`mailto:${info.email}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Mail className="w-4 h-4 shrink-0" />
          {info.email}
        </a>
        <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass">
          <Phone className="w-4 h-4 shrink-0" />
          {info.phone}
        </span>
        <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass">
          <MapPin className="w-4 h-4 shrink-0" />
          {info.location}
        </span>
      </div>
    </div>
  );
}
