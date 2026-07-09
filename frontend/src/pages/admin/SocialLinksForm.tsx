import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { adminApi, publicApi } from '../../api/services';
import type { SocialLink } from '../../types';

const emptyForm = { platformName: '', url: '', iconName: '' };

export default function SocialLinksForm() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => publicApi.getSocialLinks().then(setItems);
  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await adminApi.updateSocialLink(editingId, form);
    } else {
      await adminApi.createSocialLink(form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: SocialLink) => {
    setForm({ platformName: item.platformName, url: item.url, iconName: item.iconName });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await adminApi.deleteSocialLink(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">شبکه‌های اجتماعی</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> افزودن
        </button>
      </div>

      {showForm && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="نام پلتفرم" value={form.platformName} onChange={(e) => setForm({ ...form, platformName: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input placeholder="آدرس URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input placeholder="نام آیکون (github, linkedin, telegram)" value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm">ذخیره</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">انصراف</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <p className="font-medium">{item.platformName}</p>
              <p className="text-sm text-slate-500 truncate max-w-xs">{item.url}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
