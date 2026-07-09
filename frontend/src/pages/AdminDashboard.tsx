import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Link as LinkIcon,
  Type,
  LogOut,
  Home,
  BookOpen,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import ThemeToggle from '../components/ThemeToggle';
import PersonalInfoForm from './admin/PersonalInfoForm';
import ExperienceForm from './admin/ExperienceForm';
import EducationForm from './admin/EducationForm';
import SkillsForm from './admin/SkillsForm';
import SocialLinksForm from './admin/SocialLinksForm';
import ProfileTitlesForm from './admin/ProfileTitlesForm';
import ArticlesForm from './admin/ArticlesForm';

type Section = 'personal' | 'titles' | 'experience' | 'education' | 'skills' | 'social' | 'writings';

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'personal', label: 'اطلاعات شخصی', icon: <User className="w-5 h-5" /> },
  { id: 'titles', label: 'عناوین شغلی', icon: <Type className="w-5 h-5" /> },
  { id: 'experience', label: 'سوابق کاری', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'education', label: 'تحصیلات', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'skills', label: 'مهارت‌ها', icon: <Wrench className="w-5 h-5" /> },
  { id: 'social', label: 'شبکه‌های اجتماعی', icon: <LinkIcon className="w-5 h-5" /> },
  { id: 'writings', label: 'دل نوشته‌ها', icon: <BookOpen className="w-5 h-5" /> },
];

const sectionComponents: Record<Section, React.ReactNode> = {
  personal: <PersonalInfoForm />,
  titles: <ProfileTitlesForm />,
  experience: <ExperienceForm />,
  education: <EducationForm />,
  skills: <SkillsForm />,
  social: <SocialLinksForm />,
  writings: <ArticlesForm />,
};

export default function AdminDashboard() {
  const [active, setActive] = useState<Section>('personal');
  const logout = useAuthStore((s) => s.logout);
  const username = useAuthStore((s) => s.username);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="glass border-s border-slate-200/50 dark:border-slate-800/50 flex flex-col">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <h1 className="font-bold text-lg">پنل مدیریت</h1>
          <p className="text-sm text-slate-500 mt-1">{username}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                active === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Home className="w-5 h-5" />
            مشاهده رزومه
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
          >
            <LogOut className="w-5 h-5" />
            خروج
          </button>
        </div>
      </aside>

      <div className="min-w-0 w-full flex flex-col">
        <header className="glass border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-3 flex items-center justify-start">
          <ThemeToggle />
        </header>
        <main className="flex-1 w-full p-6 overflow-auto">
          <div className="w-full">
            {sectionComponents[active]}
          </div>
        </main>
      </div>
    </div>
  );
}
