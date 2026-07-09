import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { adminApi, publicApi } from '../../api/services';
import type { Education } from '../../types';

const emptyForm = {
  degree: '',
  institution: '',
  startDate: '',
  endDate: '',
  description: '',
  orderIndex: 0,
};

export default function EducationForm() {
  const [items, setItems] = useState<Education[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => publicApi.getEducations().then(setItems);
  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    const payload = {
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
    };

    if (editingId) {
      await adminApi.updateEducation(editingId, payload);
    } else {
      await adminApi.createEducation(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: Education) => {
    setForm({
      degree: item.degree,
      institution: item.institution,
      startDate: item.startDate.split('T')[0],
      endDate: item.endDate?.split('T')[0] ?? '',
      description: item.description,
      orderIndex: item.orderIndex,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await adminApi.deleteEducation(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">تحصیلات</h2>
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
            <input placeholder="مدرک" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input placeholder="موسسه" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
            <input type="number" placeholder="ترتیب" value={form.orderIndex} onChange={(e) => setForm({ ...form, orderIndex: +e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none" />
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
              <p className="font-medium">{item.degree}</p>
              <p className="text-sm text-slate-500">{item.institution}</p>
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
