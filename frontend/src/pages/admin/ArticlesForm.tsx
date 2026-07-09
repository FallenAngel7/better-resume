import { useEffect, useRef, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { adminApi } from '../../api/services';
import { useThemeStore } from '../../stores/themeStore';
import type { Article, ArticleFormData } from '../../types';
import { formatArticleDate, slugify } from '../../utils/article';

const emptyForm: ArticleFormData = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  isPublished: false,
};

export default function ArticlesForm() {
  const theme = useThemeStore((s) => s.theme);
  const [items, setItems] = useState<Article[]>([]);
  const [form, setForm] = useState<ArticleFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const slugManuallyEdited = useRef(false);

  const load = () => adminApi.getArticles().then(setItems);
  useEffect(() => { load(); }, []);

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited.current ? prev.slug : slugify(title),
    }));
  };

  const handleSlugChange = (slug: string) => {
    slugManuallyEdited.current = true;
    setForm((prev) => ({ ...prev, slug }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    slugManuallyEdited.current = false;
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.slug.trim()) return;

    if (editingId) {
      await adminApi.updateArticle(editingId, form);
    } else {
      await adminApi.createArticle(form);
    }
    resetForm();
    load();
  };

  const handleEdit = (item: Article) => {
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      isPublished: item.isPublished,
    });
    setEditingId(item.id);
    setShowForm(true);
    slugManuallyEdited.current = true;
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await adminApi.deleteArticle(id);
    load();
  };

  return (
    <div className="space-y-6" data-color-mode={theme}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">دل نوشته‌ها</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> افزودن
        </button>
      </div>

      {showForm && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="عنوان"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none"
            />
            <input
              placeholder="اسلاگ (آدرس SEO)"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              dir="ltr"
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none text-start"
            />
          </div>

          <textarea
            placeholder="خلاصه (برای SEO و پیش‌نمایش)"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none resize-none"
          />

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <MDEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val ?? '' })}
              height={360}
              preview="edit"
              textareaProps={{ dir: 'rtl', placeholder: 'محتوای مقاله را بنویسید...' }}
            />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              className="rounded border-slate-300"
            />
            منتشر شده
          </label>

          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm">
              ذخیره
            </button>
            <button onClick={resetForm} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">
              انصراف
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium">{item.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.isPublished ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {item.isPublished ? 'منتشر شده' : 'پیش‌نویس'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
              <p className="text-xs text-slate-400 mt-2" dir="ltr">{item.slug}</p>
              <p className="text-xs text-slate-400 mt-1">{formatArticleDate(item.createdAt)}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
