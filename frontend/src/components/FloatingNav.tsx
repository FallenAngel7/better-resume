import { Home, User, Briefcase, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'خانه', icon: Home },
  { id: 'about', label: 'درباره من', icon: User },
  { id: 'experience', label: 'سوابق شغلی', icon: Briefcase },
  { id: 'education', label: 'تحصیلات', icon: GraduationCap },
  { id: 'skills', label: 'مهارت‌ها', icon: Sparkles },
  { id: 'writings', label: 'دل نوشته‌ها', icon: BookOpen },
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function FloatingNav() {
  return (
    <nav
      className="fixed bottom-1/2 translate-y-1/2 end-4 z-50 hidden lg:flex flex-col items-center gap-1 p-2 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/30 dark:shadow-black/30"
      aria-label="ناوبری صفحه"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            title={item.label}
            className="p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </nav>
  );
}
