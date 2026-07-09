import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 18,
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 18,
    },
  },
};
