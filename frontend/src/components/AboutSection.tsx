import AnimatedSection from './AnimatedSection';

interface Props {
  text: string;
}

export default function AboutSection({ text }: Props) {
  return (
    <AnimatedSection>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">درباره من</h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-base">
        {text}
      </p>
    </AnimatedSection>
  );
}
