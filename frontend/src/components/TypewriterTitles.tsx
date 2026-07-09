import { useEffect, useState } from 'react';

interface Props {
  titles: string[];
  fallback?: string;
  className?: string;
}

export default function TypewriterTitles({ titles, fallback = '', className = '' }: Props) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activeTitles = titles.length > 0 ? titles : fallback ? [fallback] : [];

  useEffect(() => {
    if (activeTitles.length === 0) return;

    const currentText = activeTitles[titleIndex];
    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentText.length) {
      delay = 2000;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % activeTitles.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [activeTitles, titleIndex, charIndex, isDeleting]);

  useEffect(() => {
    setTitleIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [titles.join('|'), fallback]);

  if (activeTitles.length === 0) return null;

  const displayed = activeTitles[titleIndex].slice(0, charIndex);

  return (
    <p className={`text-lg text-slate-500 dark:text-slate-400 mt-1 min-h-[1.75rem] ${className}`}>
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-5 ms-1 bg-indigo-500 animate-pulse align-middle" aria-hidden="true" />
    </p>
  );
}
