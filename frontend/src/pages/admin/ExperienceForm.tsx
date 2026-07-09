import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { adminApi, publicApi } from '../../api/services';
import type { Experience } from '../../types';

const emptyForm = {
  jobTitle: '',
  companyName: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  orderIndex: 0,
};

export default function ExperienceForm() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => publicApi.getExperiences().then(setItems);
  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    const payload = {
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: form.isCurrent || !form.endDate ? null : new Date(form.endDate).toISOString(),
    };

    if (editingId) {
      await adminApi.updateExperience(editingId, payload);
    } else {
      await adminApi.createExperience(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: Experience) => {
    setForm({
      jobTitle: item.jobTitle,
      companyName: item.companyName,
      startDate: item.startDate.split('T')[0],
      endDate: item.endDate?.split('T')[0] ?? '',
      isCurrent: item.isCurrent,
      description: item.description,
      orderIndex: item.orderIndex,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await adminApi.deleteExperience(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">سوابق کاری</h2>
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
            <input placeholder="عنوان شغلی" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input placeholder="نام شرکت" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input type="date" value={form.endDate} disabled={form.isCurrent} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none disabled:opacity-50" />
            <input type="number" placeholder="ترتیب" value={form.orderIndex} onChange={(e) => setForm({ ...form, orderIndex: +e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isCurrent} onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })} />
              مشغول به کار
            </label>
          </div>
          <textarea placeholder="توضیحات" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none resize-none" />
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
              <p className="font-medium">{item.jobTitle}</p>
              <p className="text-sm text-slate-500">{item.companyName}</p>
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
