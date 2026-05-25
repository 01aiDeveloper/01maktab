'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth-store';
import { useUpdateProfile } from '@/hooks/use-update-profile';
import { useUploadFile } from '@/hooks/use-upload-file';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, CalendarIcon } from 'lucide-react';
import { REGIONS } from '@/constants/regions';
import { format } from 'date-fns';
import { SuccessModal } from '@/components/ui/success-modal';

export function TabPersonalInfo() {
  const t = useTranslations('profile');
  const user = useAuthStore((state) => state.user);
  const { updateProfile, isLoading: saving } = useUpdateProfile();
  const { uploadFile, isUploading } = useUploadFile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editing = searchParams.get('edit') === 'true';
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
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
    region: user?.region || '',
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
        region: user.region || '',
      });
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
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
      let avatarUrl: string | undefined;
      if (avatarFile) {
        avatarUrl = await uploadFile(avatarFile);
      }
      await updateProfile({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email || undefined,
        phone: form.phone || undefined,
        birthday: form.birthday || undefined,
        gender: form.gender || undefined,
        region: form.region || undefined,
        ...(avatarUrl ? { photo: avatarUrl } : {}),
      });
      const res = await api.get('/user/me');
      if (res.data?.data) setUser(res.data.data);
      setAvatarFile(null);
      setEditing(false);
      setSuccessOpen(true);
      setTimeout(() => setSuccessOpen(false), 2000);
    } catch {
      // error is handled inside hook
    }
  };

  const inputCls = '!h-11 rounded-[10px] border-gray-200 text-sm text-gray-900';

  if (editing) {
    return (
      <div className="pb-8">
        <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Avatar - left aligned */}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          <div className="flex justify-start mb-8 ">
            <button className="relative" onClick={handleAvatarClick}>
              <div className="w-20 h-20 cursor-pointer rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {avatarPreview || user?.photo ? (
                  <Image
                    quality={95} src={avatarPreview || getMediaUrl(user!.photo) || ''}
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
              <span className="absolute cursor-pointer -bottom-1 -right-1 w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </div>

          {/* Form Grid - row 1: Ism, Email, Viloyat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('firstname')}</label>
              <Input
                type="text"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('email')}</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('region')}</label>
              <Select value={form.region || 'toshkent-viloyati'} onValueChange={(v) => setForm({ ...form, region: v })}>
                <SelectTrigger className="w-full !h-11 rounded-[10px] border-gray-200 bg-white text-sm text-gray-900 [&>svg:last-child]:ml-auto">
                  <Search className="w-4 h-4 text-gray-600 shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* row 2: Familiya, Telefon, Pol */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('lastname')}</label>
              <Input type="text" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('phone')}</label>
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('gender')}</label>
              <Tabs value={form.gender || 'MALE'} onValueChange={(v) => setForm({ ...form, gender: v })}>
                <TabsList className="w-full h-11 rounded-[10px] bg-[#F4F4F4] p-1">
                  <TabsTrigger value="MALE" className="flex-1 rounded-[8px] text-sm font-medium">{t('male')}</TabsTrigger>
                  <TabsTrigger value="FEMALE" className="flex-1 rounded-[8px] text-sm font-medium">{t('female')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* row 3: Tug'ilgan sana */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">{t('birthday')}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full !h-11 rounded-[10px] border border-gray-200 bg-white px-4 text-sm text-gray-900 flex items-center justify-between">
                    <span className={form.birthday ? 'text-gray-900' : 'text-gray-600'}>
                      {form.birthday ? format(new Date(form.birthday), 'dd.MM.yyyy') : t('pickDate')}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.birthday ? new Date(form.birthday) : undefined}
                    onSelect={(date) => setForm({ ...form, birthday: date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString() : '' })}
                    captionLayout="dropdown"
                    startMonth={new Date(1950, 0)}
                    endMonth={new Date(new Date().getFullYear(), 11)}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Buttons - outside the card */}
        <div className="flex gap-3 justify-center  flex-col sm:flex-row mt-4">
          <button
            onClick={handleSave}
            disabled={saving || isUploading}
            className=" w-full sm:w-fit px-8  sm:px-18 cursor-pointer   h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors disabled:bg-[#D2D2D2] disabled:opacity-100"
          >
            {isUploading ? t('uploading') : saving ? t('saving') : t('save')}
          </button>
          <button
            onClick={() => setEditing(false)}
            className=" w-full sm:w-fit px-8  sm:px-18 cursor-pointer  h-12 disabled:bg-[#D2D2D2] bg-[#D2D2D2] rounded-xl text-gray-600 text-sm font-medium"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    );
  }

  const avatarSrc = avatarPreview || (user?.photo ? getMediaUrl(user.photo) : null);

  // View Mode
  return (
    <div className="pb-8">
      <div className="bg-white rounded-[22px] p-6 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        {/* Avatar */}
      
        <div className="flex justify-center lg:justify-start mb-8">
          <button className="relative" onClick={handleAvatarClick}>
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {avatarSrc ? (
                <Image quality={95} src={avatarSrc} alt="avatar" width={80} height={80} className="w-full h-full object-cover" />
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
            <p className="text-xs text-gray-600 mb-1">{t('firstname')}</p>
            <p className="text-sm font-medium text-gray-900">{user?.firstname || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('email')}</p>
            <p className="text-sm font-medium text-gray-900">{user?.email || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('region')}</p>
            <p className="text-sm font-medium text-gray-900">{REGIONS.find((r) => r.value === user?.region)?.label || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('lastname')}</p>
            <p className="text-sm font-medium text-gray-900">{user?.lastname || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('phone')}</p>
            <p className="text-sm font-medium text-gray-900">{user?.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('genderView')}</p>
            <p className="text-sm font-medium text-gray-900">{user?.gender === 'FEMALE' ? t('female') : t('male')}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t('birthdayView')}</p>
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
              region: user?.region || '',
            });
            setEditing(true); // URL: ?tab=info&edit=true
          }}
          className="w-fit px-8 sm:px-18 cursor-pointer mx-auto flex items-center justify-center gap-2 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors"
        >
          <Pencil className="w-4 h-4" />
          {t('edit')}
        </button>
      </div>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title={t('savedTitle')}
      />
    </div>
  );
}
