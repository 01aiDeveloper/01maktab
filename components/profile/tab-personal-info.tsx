'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useUpdateProfile } from '@/hooks/use-update-profile';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';

export function TabPersonalInfo() {
  const user = useAuthStore((state) => state.user);
  const { updateProfile, isLoading: saving } = useUpdateProfile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editing = searchParams.get('edit') === 'true';
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setEditing = (value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('edit', 'true');
    } else {
      params.delete('edit');
    }
    router.push(`/profile?${params.toString()}`, { scroll: false });
  };

  const [form, setForm] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: user?.birthday || '',
    gender: user?.gender || '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        birthday: user.birthday || '',
        gender: user.gender || '',
      });
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const formatBirthday = (birthday: string) => {
    if (!birthday) return '';
    const date = new Date(birthday);
    if (isNaN(date.getTime())) return birthday;
    return date.toLocaleDateString('ru-RU');
  };

  const { setUser } = useAuthStore();

  const handleSave = async () => {
    try {
      await updateProfile({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email || undefined,
        phone: form.phone || undefined,
        birthday: form.birthday || undefined,
        gender: form.gender || undefined,
      });
      // Qayta user ma'lumotlarini olish
      const res = await api.get('/user/me');
      if (res.data?.data) setUser(res.data.data);
      setEditing(false);
    } catch {
      // error is handled inside hook
    }
  };

  const inputCls =
    'w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20 focus:border-[#3B5BFF]';

  if (editing) {
    return (
      <div className="pb-8">
        <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Avatar - left aligned */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          <div className="flex justify-start mb-8">
            <button className="relative" onClick={handleAvatarClick}>
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {avatarPreview || user?.avatar ? (
                  <Image
                    src={avatarPreview || getMediaUrl(user!.avatar) || ''}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </div>

          {/* Form Grid - row 1: Ism, Email, Viloyat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Ism</label>
              <input
                type="text"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">E-mail</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Viloyat</label>
              <div className="relative">
                <select className={`${inputCls} appearance-none pr-10`}>
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* row 2: Familiya, Telefon, Pol */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Familiya</label>
              <input type="text" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Telefon raqami</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Pol</label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden h-11">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gender: 'MALE' })}
                  className={`flex-1 text-sm font-medium transition-colors ${form.gender === 'MALE' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  Erkak
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gender: 'FEMALE' })}
                  className={`flex-1 text-sm font-medium transition-colors ${form.gender === 'FEMALE' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  Ayol
                </button>
              </div>
            </div>

            {/* row 3: Tug'ilgan sana */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Tug&apos;ilgan sana</label>
              <input
                type="date"
                value={form.birthday ? form.birthday.split('T')[0] : ''}
                onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Buttons - outside the card */}
        <div className="flex gap-3 justify-center  flex-col sm:flex-row mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className=" w-full sm:w-fit px-8  sm:px-18 cursor-pointer   h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors disabled:bg-[#D2D2D2] disabled:opacity-100"
          >
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
          <button
            onClick={() => setEditing(false)}
            className=" w-full sm:w-fit px-8  sm:px-18 cursor-pointer  h-12 disabled:bg-[#D2D2D2] bg-[#D2D2D2] rounded-xl text-gray-400 text-sm font-medium"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    );
  }

  const avatarSrc = avatarPreview || (user?.avatar ? getMediaUrl(user.avatar) : null);

  // View Mode
  return (
    <div className="pb-8">
      <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        {/* Avatar */}
        {/* <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        /> */}
        <div className="flex justify-center lg:justify-start mb-8">
          <button className="relative" onClick={handleAvatarClick}>
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {avatarSrc ? (
                <Image src={avatarSrc} alt="avatar" width={80} height={80} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
          </button>
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
      </div>

      {/* Edit Button */}
      <div className="mt-4">
        <button
          onClick={() => {
            setForm({
              firstname: user?.firstname || '',
              lastname: user?.lastname || '',
              email: user?.email || '',
              phone: user?.phone || '',
              birthday: user?.birthday || '',
              gender: user?.gender || 'MALE',
            });
            setEditing(true); // URL: ?tab=info&edit=true
          }}
          className="w-fit px-8 sm:px-18 cursor-pointer mx-auto flex items-center justify-center gap-2 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
        >
          <Pencil className="w-4 h-4" />
          O&apos;zgartirish
        </button>
      </div>
    </div>
  );
}
