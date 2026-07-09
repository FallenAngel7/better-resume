import { useEffect, useState } from 'react';
import { adminApi, publicApi } from '../../api/services';
import { resolveMediaUrl } from '../../utils/media';

export default function PersonalInfoForm() {
  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    aboutMeText: '',
    email: '',
    phone: '',
    location: '',
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    publicApi.getPersonalInfo().then((info) => {
      setForm({
        fullName: info.fullName,
        jobTitle: info.jobTitle,
        aboutMeText: info.aboutMeText,
        email: info.email,
        phone: info.phone,
        location: info.location,
      });
      setAvatarUrl(info.avatarUrl);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updated = await adminApi.updatePersonalInfo(form);
      setMessage('اطلاعات با موفقیت ذخیره شد.');
      setAvatarUrl(updated.avatarUrl);
    } catch {
      setMessage('خطا در ذخیره اطلاعات.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await adminApi.uploadAvatar(file);
      setAvatarUrl(res.avatarUrl);
      setMessage('تصویر با موفقیت آپلود شد.');
    } catch {
      setMessage('خطا در آپلود تصویر.');
    }
  };

  if (loading) return <div className="animate-pulse h-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">اطلاعات شخصی</h2>

      {message && (
        <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 text-sm">
          {message}
        </div>
      )}

      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img src={resolveMediaUrl(avatarUrl) ?? ''} alt="آواتار" className="w-20 h-20 rounded-xl object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
            {form.fullName.charAt(0) || '?'}
          </div>
        )}
        <label className="cursor-pointer px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition">
          آپلود تصویر
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {([
          ['fullName', 'نام کامل'],
          ['email', 'ایمیل'],
          ['phone', 'تلفن'],
          ['location', 'موقعیت'],
        ] as const).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">درباره من</label>
        <textarea
          rows={5}
          value={form.aboutMeText}
          onChange={(e) => setForm({ ...form, aboutMeText: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50"
      >
        {saving ? 'در حال ذخیره...' : 'ذخیره'}
      </button>
    </div>
  );
}
