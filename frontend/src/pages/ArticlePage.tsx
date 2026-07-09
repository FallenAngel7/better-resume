import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-markdown-preview/markdown.css';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { publicApi } from '../api/services';
import type { Article } from '../types';
import ThemeToggle from '../components/ThemeToggle';
import { useThemeStore } from '../stores/themeStore';
import { formatArticleDate } from '../utils/article';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const theme = useThemeStore((s) => s.theme);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    publicApi.getArticleBySlug(slug)
      .then(setArticle)
      .catch(() => setError('مقاله مورد نظر یافت نشد.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-slate-600 dark:text-slate-400">{error}</p>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-50" data-color-mode={theme}>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        {pageUrl && <meta property="og:url" content={pageUrl} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
      </Helmet>

      <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به رزومه
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <article>
          <time className="text-sm text-slate-500 dark:text-slate-400">
            {formatArticleDate(article.createdAt)}
          </time>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 leading-tight text-slate-900 dark:text-slate-50">
            {article.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            {article.summary}
          </p>

          <div className="article-content mt-10">
            <MDEditor.Markdown source={article.content} />
          </div>
        </article>
      </main>
    </div>
  );
}
