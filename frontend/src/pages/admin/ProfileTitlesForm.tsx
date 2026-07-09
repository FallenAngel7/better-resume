import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { adminApi, publicApi } from '../../api/services';
import type { ProfileTitle } from '../../types';

const emptyForm = { title: '', orderIndex: 0 };

export default function ProfileTitlesForm() {
  const [items, setItems] = useState<ProfileTitle[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => publicApi.getProfileTitles().then(setItems);
  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await adminApi.updateProfileTitle(editingId, form);
    } else {
      await adminApi.createProfileTitle(form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: ProfileTitle) => {
    setForm({ title: item.title, orderIndex: item.orderIndex });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await adminApi.deleteProfileTitle(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">عناوین شغلی</h2>
          <p className="text-sm text-slate-500 mt-1">
            این عناوین در صفحه رزومه با افکت تایپ نمایش داده می‌شوند.
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" /> افزودن
        </button>
      </div>

      {showForm && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="مثال: من توسعه‌دهنده هستم"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none md:col-span-2"
            />
            <input
              type="number"
              placeholder="ترتیب"
              value={form.orderIndex}
              onChange={(e) => setForm({ ...form, orderIndex: +e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none"
            />
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
            <p className="font-medium">{item.title}</p>
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
