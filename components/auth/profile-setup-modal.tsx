'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProfile } from '@/hooks/use-update-profile';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { REGIONS } from '@/constants/regions';
import { Search } from 'lucide-react';

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = [
  { value: '1', label: 'Yanvar' },
  { value: '2', label: 'Fevral' },
  { value: '3', label: 'Mart' },
  { value: '4', label: 'Aprel' },
  { value: '5', label: 'May' },
  { value: '6', label: 'Iyun' },
  { value: '7', label: 'Iyul' },
  { value: '8', label: 'Avgust' },
  { value: '9', label: 'Sentabr' },
  { value: '10', label: 'Oktabr' },
  { value: '11', label: 'Noyabr' },
  { value: '12', label: 'Dekabr' },
];
const YEARS = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

const schema = z.object({
  firstName: z.string().min(1, 'Ism kiritilishi shart'),
  lastName: z.string().min(1, 'Familiya kiritilishi shart'),
  email: z.string().email("Email noto'g'ri").optional().or(z.literal('')),
  birthDay: z.string().min(1, 'Kun tanlanishi shart'),
  birthMonth: z.string().min(1, 'Oy tanlanishi shart'),
  birthYear: z.string().min(1, 'Yil tanlanishi shart'),
  region: z.string().min(1, 'Viloyat tanlanishi shart'),
  gender: z.string().min(1, 'Jins tanlanishi shart'),
});

type FormValues = z.infer<typeof schema>;

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls = 'h-12.5! rounded-[10px] border-gray-200 text-sm text-gray-900';

export function ProfileSetupModal({ isOpen, onClose }: ProfileSetupModalProps) {
  const { updateProfile, isLoading: isSubmitting, error, setError } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      region: '',
      gender: '',
    },
  });

  const watched = watch();
  const isFormFilled =
    watched.firstName && watched.lastName && watched.birthDay && watched.birthMonth && watched.birthYear && watched.region && watched.gender;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      reset();
      setError(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, reset, setError]);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    const birthday = new Date(Date.UTC(parseInt(data.birthYear), parseInt(data.birthMonth) - 1, parseInt(data.birthDay))).toISOString();

    try {
      await updateProfile({
        firstname: data.firstName,
        lastname: data.lastName,
        ...(data.email ? { email: data.email } : {}),
        birthday,
        gender: data.gender,
        region: data.region,
      });
      onClose();
    } catch {
      // error is handled inside hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={(e) => e.preventDefault()} />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center py-2 px-4">
          <div className="w-full max-w-md bg-white rounded-[24px] shadow-2xl p-5">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
            <span className="font-black">01AI</span>
          </h1>

          <div className="text-center mb-2">
            <h2 className="text-base font-bold text-gray-900">Iltimos ma'lumotlaringizni to'ldiring</h2>
          </div>

          {error && <p className="text-xs text-red-500 font-medium mb-2 text-center">{error}</p>}

          <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Ism & Familiya */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Ismingizni kiriting<span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ismingizni kiriting"
                  {...register('firstName')}
                  className={`${inputCls} ${errors.firstName ? 'border-red-400' : ''}`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Familiyangizni kiriting<span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Familiyangizni kiriting"
                  {...register('lastName')}
                  className={`${inputCls} ${errors.lastName ? 'border-red-400' : ''}`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">E-mail</label>
              <Input
                type="email"
                placeholder="Введите почту"
                {...register('email')}
                className={`${inputCls} ${errors.email ? 'border-red-400' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Tug'ilgan sana */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Tug'ilgan sana<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div>
                  <Controller
                    name="birthDay"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthDay ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="Kun" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="birthMonth"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthMonth ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="Oy" />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Controller
                    name="birthYear"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm ${errors.birthYear ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="Yil" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                <p className="text-xs text-red-500 mt-1">Tug'ilgan sana to'liq kiritilishi shart</p>
              )}
            </div>

            {/* Viloyat */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Viloyat<span className="text-red-500">*</span>
              </label>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`w-full h-12.5! rounded-[10px] border-gray-200 text-sm [&>svg:last-child]:ml-auto ${errors.region ? 'border-red-400' : ''}`}
                    >
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <SelectValue placeholder="Viloyatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region.message}</p>}
            </div>

            {/* Jins */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Jins<span className="text-red-500">*</span>
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Tabs value={field.value} onValueChange={field.onChange}>
                    <TabsList className={`w-full h-12.5 rounded-[10px] bg-[#F4F4F4] p-1 ${errors.gender ? 'ring-1 ring-red-400' : ''}`}>
                      <TabsTrigger value="MALE" className="flex-1 rounded-[8px] text-sm font-medium">
                        Erkak
                      </TabsTrigger>
                      <TabsTrigger value="FEMALE" className="flex-1 rounded-[8px] text-sm font-medium">
                        Ayol
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              />
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 leading-relaxed">
              Tugmani bosib, siz{' '}
              <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
                shaxsiy ma&apos;lumotlarni qayta ishlash shartlari
              </a>{' '}
              va{' '}
              <a href="/docs/public-offer.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
                ommaviy taklif
              </a>{' '}
              bilan rozilik bildirasiz
            </p>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="w-full h-12.5 rounded-[10px] font-semibold text-sm mt-1 transition-opacity cursor-pointer text-white hover:opacity-90 disabled:opacity-100 disabled:bg-[#E5E7EB] disabled:text-gray-400 disabled:cursor-not-allowed"
              style={isFormFilled ? { background: 'linear-gradient(135deg, #2A51E6 0%, #4469F6 100%)' } : undefined}
            >
              {isSubmitting ? 'Saqlanmoqda...' : 'Kirish  →'}
            </Button>
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
