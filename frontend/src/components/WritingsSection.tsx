import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { publicApi } from '../api/services';
import type { ArticleListItem } from '../types';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';
import { formatArticleDate } from '../utils/article';

export default function WritingsSection() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getArticles(1, 6)
      .then((res) => setArticles(res.items))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AnimatedSection>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800 dark:text-slate-200">
        <BookOpen className="w-6 h-6 text-rose-500" />
        دل نوشته‌ها
      </h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-8">
          هنوز مقاله‌ای منتشر نشده است.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <Link
                to={`/blog/${article.slug}`}
                className="block h-full p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/40 dark:bg-slate-800/30 hover:bg-white/70 dark:hover:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 group"
              >
                <time className="text-xs text-slate-500 dark:text-slate-400">
                  {formatArticleDate(article.createdAt)}
                </time>
                <h3 className="font-bold text-lg mt-2 text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 mt-4 font-medium">
                  ادامه مطلب
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  );
}
