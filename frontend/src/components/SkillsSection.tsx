import { motion } from 'framer-motion';
import type { Skill } from '../types';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

interface Props {
  skills: Skill[];
}

export default function SkillsSection({ skills }: Props) {
  return (
    <AnimatedSection>
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">مهارت‌ها</h2>

      <motion.div
        className="space-y-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {skills.map((skill) => (
          <motion.div key={skill.id} variants={staggerItem}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {skill.name}
              </span>
              <span className="text-xs text-slate-500">{skill.proficiencyPercentage}٪</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiencyPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
