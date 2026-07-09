import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import type { Education } from '../types';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

function formatDate(date: string | null) {
  if (!date) return 'اکنون';
  return new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' });
}

interface Props {
  educations: Education[];
}

export default function EducationTimeline({ educations }: Props) {
  return (
    <AnimatedSection>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800 dark:text-slate-200">
        <GraduationCap className="w-6 h-6 text-purple-500" />
        تحصیلات
      </h2>

      <motion.div
        className="space-y-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {educations.map((edu, i) => (
          <motion.div
            key={edu.id}
            variants={staggerItem}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {i < educations.length - 1 && (
              <div className="absolute start-[11px] top-8 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900" />
            )}
            <div className="relative z-10 w-6 h-6 rounded-full bg-purple-500 ring-4 ring-purple-100 dark:ring-purple-950 shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{edu.degree}</h3>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">{edu.institution}</p>
              <p className="text-xs text-slate-500 mt-1">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </p>
              {edu.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
