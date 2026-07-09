import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl glass hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors"
      aria-label="تغییر تم"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-slate-600" />
      ) : (
        <Sun className="w-5 h-5 text-amber-400" />
      )}
    </button>
  );
}
