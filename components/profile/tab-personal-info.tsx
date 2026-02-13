'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import api from '@/lib/api';

export function TabPersonalInfo() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: user?.birthday || '',
    gender: user?.gender || 'MALE',
  });

  const formatBirthday = (birthday: string) => {
    if (!birthday) return '';
    const date = new Date(birthday);
    if (isNaN(date.getTime())) return birthday;
    return date.toLocaleDateString('ru-RU');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.patch('/user/me', {
        firstname: form.firstname,
        lastname: form.lastname,
        birthday: form.birthday || undefined,
        gender: form.gender || undefined,
      });
      if (response.data?.data) {
        setUser(response.data.data);
      }
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="max-w-300 mx-auto px-4 pb-8">
        <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#3B5BFF] rounded-full flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 mb-8">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Ism</label>
              <input
                type="text"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">E-mail</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Viloyat</label>
              <select className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF] appearance-none">
                <option>Toshkent viloyati</option>
                <option>Toshkent shahri</option>
                <option>Andijon</option>
                <option>Buxoro</option>
                <option>Farg&apos;ona</option>
                <option>Jizzax</option>
                <option>Xorazm</option>
                <option>Namangan</option>
                <option>Navoiy</option>
                <option>Qashqadaryo</option>
                <option>Qoraqalpog&apos;iston</option>
                <option>Samarqand</option>
                <option>Sirdaryo</option>
                <option>Surxondaryo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Familiya</label>
              <input
                type="text"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Telefon raqami</label>
              <input
                type="tel"
                value={form.phone}
                disabled
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Pol</label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden h-11">
                <button
                  onClick={() => setForm({ ...form, gender: 'MALE' })}
                  className={`flex-1 text-sm font-medium transition-colors ${form.gender === 'MALE' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  Erkak
                </button>
                <button
                  onClick={() => setForm({ ...form, gender: 'FEMALE' })}
                  className={`flex-1 text-sm font-medium transition-colors ${form.gender === 'FEMALE' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  Ayol
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Tug&apos;ilgan sana</label>
              <input
                type="date"
                value={form.birthday ? form.birthday.split('T')[0] : ''}
                onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="max-w-300 mx-auto px-4 pb-8">
      <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        {/* Avatar */}
        <div className="flex justify-center lg:justify-start mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#3B5BFF] rounded-full flex items-center justify-center">
              <Pencil className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 mb-8">
          <div>
            <p className="text-xs text-gray-400 mb-1">Ism</p>
            <p className="text-sm font-medium text-gray-900">{user?.firstname || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">E-mail</p>
            <p className="text-sm font-medium text-gray-900">{user?.email || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Viloyat</p>
            <p className="text-sm font-medium text-gray-900">Toshkent viloyati</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Familiya</p>
            <p className="text-sm font-medium text-gray-900">{user?.lastname || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Telefon raqami</p>
            <p className="text-sm font-medium text-gray-900">{user?.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Jins</p>
            <p className="text-sm font-medium text-gray-900">{user?.gender === 'FEMALE' ? 'Ayol' : 'Erkak'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Tug&apos;ilgan kungi</p>
            <p className="text-sm font-medium text-gray-900">{formatBirthday(user?.birthday || '')}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 h-11 px-8 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
          >
            <Pencil className="w-4 h-4" />
            O&apos;zgartirish
          </button>
        </div>
      </div>
    </div>
  );
}
