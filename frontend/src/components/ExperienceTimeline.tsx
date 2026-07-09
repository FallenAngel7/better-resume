import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import type { Experience } from '../types';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

function formatDate(date: string | null) {
  if (!date) return 'اکنون';
  return new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
}

interface Props {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: Props) {
  return (
    <AnimatedSection>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800 dark:text-slate-200">
        <Briefcase className="w-6 h-6 text-indigo-500" />
        سوابق شغلی
      </h2>

      <motion.div
        className="space-y-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            variants={staggerItem}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {i < experiences.length - 1 && (
              <div className="absolute start-[11px] top-8 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-900" />
            )}
            <div className="relative z-10 w-6 h-6 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-950 shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{exp.jobTitle}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">{exp.companyName}</p>
              <p className="text-xs text-slate-500 mt-1">
                {formatDate(exp.startDate)} — {exp.isCurrent ? 'اکنون' : formatDate(exp.endDate)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
