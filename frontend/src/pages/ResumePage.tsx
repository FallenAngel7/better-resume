import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Loader2, AlertCircle } from 'lucide-react';
import { publicApi } from '../api/services';
import type { ResumeData } from '../types';
import ThemeToggle from '../components/ThemeToggle';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import EducationTimeline from '../components/EducationTimeline';
import SkillsSection from '../components/SkillsSection';
import WritingsSection from '../components/WritingsSection';
import FloatingNav from '../components/FloatingNav';
import ProfileSidebar from '../components/ProfileSidebar';
import AnimatedSection from '../components/AnimatedSection';
import { resetFavicon, setFavicon } from '../utils/favicon';
import { resolveMediaUrl } from '../utils/media';

const BentoCard = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <div
    id={id}
    className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/50 dark:border-slate-800/50 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-slate-900/80 scroll-mt-28 ${className}`}
  >
    {children}
  </div>
);

export default function ResumePage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      publicApi.getPersonalInfo(),
      publicApi.getExperiences(),
      publicApi.getEducations(),
      publicApi.getSkills(),
      publicApi.getSocialLinks(),
      publicApi.getProfileTitles(),
    ])
      .then(([personalInfo, experiences, educations, skills, socialLinks, profileTitles]) => {
        setData({ personalInfo, experiences, educations, skills, socialLinks, profileTitles });
      })
      .catch(() => setError('خطا در دریافت اطلاعات از سرور. لطفاً ارتباط خود را بررسی کنید.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data?.personalInfo.avatarUrl) return;

    setFavicon(resolveMediaUrl(data.personalInfo.avatarUrl) ?? '');
    return () => resetFavicon();
  }, [data?.personalInfo.avatarUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">در حال بارگذاری رزومه...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <BentoCard className="p-8 max-w-md w-full flex flex-col items-center text-center gap-4 border-red-200 dark:border-red-900/50">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-slate-700 dark:text-slate-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity"
          >
            تلاش مجدد
          </button>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30">
      {/* Animated Ambient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] start-[-10%] w-[40vw] h-[40vw] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] end-[-5%] w-[35vw] h-[35vw] bg-rose-400/20 dark:bg-rose-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] start-[60%] w-[30vw] h-[30vw] bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Top Bar */}
      <header className="sticky top-4 z-40 mx-4 md:mx-auto max-w-[1400px]">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-2xl px-4 md:px-6 py-3 shadow-lg shadow-slate-200/20 dark:shadow-none flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent shrink-0"
          >
            {data.personalInfo.fullName || 'رزومه'}
          </button>
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
            <Link
              to="/admin"
              className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
              aria-label="پنل مدیریت"
            >
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </header>

      {/* Three-Column Layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-10 flex gap-8">
        {/* Column 1 — Sticky Profile Sidebar */}
        <div className="hidden lg:block w-1/4 shrink-0">
          <ProfileSidebar
            info={data.personalInfo}
            socialLinks={data.socialLinks}
            profileTitles={data.profileTitles.map((t) => t.title)}
          />
        </div>

        {/* Column 2 — Main Scrolling Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Mobile Profile (shown below lg) */}
          <div className="lg:hidden">
            <ProfileSidebar
              info={data.personalInfo}
              socialLinks={data.socialLinks}
              profileTitles={data.profileTitles.map((t) => t.title)}
              sticky={false}
            />
          </div>

          <BentoCard id="hero" className="p-8 md:p-10">
            <AnimatedSection>
              <Hero info={data.personalInfo} />
            </AnimatedSection>
          </BentoCard>

          <BentoCard id="about" className="p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <AboutSection text={data.personalInfo.aboutMeText} />
          </BentoCard>

          <BentoCard id="experience" className="p-8 md:p-10">
            <ExperienceTimeline experiences={data.experiences} />
          </BentoCard>

          <BentoCard id="education" className="p-8 md:p-10">
            <EducationTimeline educations={data.educations} />
          </BentoCard>

          <BentoCard id="skills" className="p-8 md:p-10">
            <SkillsSection skills={data.skills} />
          </BentoCard>

          <BentoCard id="writings" className="p-8 md:p-10">
            <WritingsSection />
          </BentoCard>
        </main>
      </div>

      {/* Column 3 — Floating Pill Nav */}
      <FloatingNav />

      <footer className="text-center py-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
        طراحی و توسعه با ❤️
      </footer>
    </div>
  );
}
