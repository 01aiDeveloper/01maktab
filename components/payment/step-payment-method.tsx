'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { StepIndicator } from './step-indicator';
import { useCheckPromocode } from '@/hooks/use-promocode';
import api from '@/lib/api';
import type { ApiResponse, ApiPaymentResponse } from '@/types/api';

interface StepPaymentMethodProps {
  courseId: number;
  coursePrice: number;
  discountedPrice?: number;
  discountPercent?: number;
  onNext: () => void;
  onBack: () => void;
  promocodeId?: number;
  onPromocodeApplied?: (data: { discountedPrice: number; promocodeId: number }) => void;
}

type PaymentProvider = 'click' | 'payme' | 'uzum';

export function StepPaymentMethod({
  courseId,
  coursePrice,
  discountedPrice,
  discountPercent,
  onNext,
  onBack,
  promocodeId,
  onPromocodeApplied,
}: StepPaymentMethodProps) {
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('click');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Promo kod state
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [promoError, setPromoError] = useState('');
  const checkPromocode = useCheckPromocode();

  const finalPrice = discountedPrice ?? coursePrice;
  const hasDiscount = discountedPrice !== undefined && discountedPrice < coursePrice;

  const fmt = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setPromoStatus('idle');
    setPromoError('');

    try {
      const result = await checkPromocode.mutateAsync({
        code: promoCode.trim(),
        targetId: courseId,
        price: coursePrice,
        type: 'course',
      });

      let newPrice = coursePrice;
      if (typeof result.finalPrice === 'number') {
        newPrice = result.finalPrice;
      } else if (typeof result.discountAmount === 'number') {
        newPrice = Math.max(0, coursePrice - result.discountAmount);
      } else if (
        result.discountType === 'PERCENT' &&
        typeof result.discountValue === 'number'
      ) {
        newPrice = Math.round(coursePrice * (1 - result.discountValue / 100));
      } else if (
        result.discountType === 'FIXED' &&
        typeof result.discountValue === 'number'
      ) {
        newPrice = Math.max(0, coursePrice - result.discountValue);
      }

      setPromoStatus('success');
      onPromocodeApplied?.({ discountedPrice: newPrice, promocodeId: result.id });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      const apiMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setPromoStatus('error');
      if (status === 404) {
        setPromoError('Promo kod topilmadi');
      } else if (apiMsg) {
        setPromoError(typeof apiMsg === 'string' ? apiMsg : 'Promo kod yaroqsiz');
      } else {
        setPromoError('Promo kod yaroqsiz');
      }
    }
  };

  const handlePay = async () => {
    if (paymentProvider === 'uzum') {
      onNext();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body: { courseId: number; promocodeId?: number } = { courseId };
      if (promocodeId) body.promocodeId = promocodeId;

      const endpoint = paymentProvider === 'click' ? '/click/course' : '/payme/course';
      const res = await api.post<ApiResponse<ApiPaymentResponse>>(endpoint, body);
      const data = res.data.data;

      // Bepul kurs (presale 100% chegirma yoki FREE pricingType) — link talab qilmaydi
      if (data.free) {
        onNext();
        return;
      }

      const link = paymentProvider === 'click'
        ? `https://my.click.uz/services/pay/${data.link}`
        : data.link;

      window.location.href = link;
    } catch (err) {
      console.error('Payment error:', err);
      setError("To'lov amalga oshmadi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StepIndicator currentStep={2} />

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
        2-qadam: To&apos;lov usulini tanlang
      </h2>

      {/* Price Display — Figma style */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        {hasDiscount ? (
          <>
            <span className="text-gray-400 text-lg line-through decoration-2">
              {fmt(coursePrice)} so&apos;m
            </span>
            <span className="text-gray-400 text-lg">&rarr;</span>
            <span className="bg-[#E8F5E9] text-[#2E7D32] text-xl sm:text-2xl font-bold px-4 py-1.5 rounded-xl">
              {fmt(finalPrice)} so&apos;m
            </span>
            {discountPercent && (
              <span className="bg-[#FFF3E0] text-[#E65100] text-sm font-bold px-3 py-1 rounded-lg">
                -{discountPercent}%
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between w-full bg-gray-50 rounded-2xl px-6 py-4">
            <span className="text-gray-500 text-base font-medium">Kurs narxi:</span>
            <span className="text-gray-900 text-xl sm:text-2xl font-bold">{fmt(coursePrice)} so&apos;m</span>
          </div>
        )}
      </div>

      {/* Promo kod */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">Promo kod</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoStatus !== 'idle') {
                setPromoStatus('idle');
                setPromoError('');
              }
            }}
            placeholder="Promo kodni kiriting"
            disabled={promoStatus === 'success'}
            className={`flex-1 h-12 px-4 rounded-xl border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 transition-colors ${
              promoStatus === 'success'
                ? 'border-green-500 focus:ring-green-500/30 focus:border-green-500'
                : promoStatus === 'error'
                  ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500'
                  : 'border-gray-200 focus:ring-[#3B5BFF]/30 focus:border-[#3B5BFF]'
            }`}
          />
          {promoStatus === 'success' ? (
            <button
              disabled
              className="h-12 px-5 rounded-xl bg-green-500 text-white font-medium text-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" strokeWidth={3} />
              Qo&apos;llanildi
            </button>
          ) : (
            <button
              onClick={handleApplyPromo}
              disabled={checkPromocode.isPending || !promoCode.trim()}
              className="h-12 px-5 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {checkPromocode.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Qo'llash"
              )}
            </button>
          )}
        </div>
        {promoStatus === 'error' && (
          <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
        )}
      </div>

      {/* Payment Providers */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-4">To&apos;lov usuli</h3>
      <div className="flex justify-center gap-3 mb-8">
        {(['click', 'payme', 'uzum'] as PaymentProvider[]).map((provider) => (
          <button
            key={provider}
            onClick={() => setPaymentProvider(provider)}
            className={`flex items-center justify-center w-24 sm:w-28 h-14 rounded-xl border-2 transition-all ${
              paymentProvider === provider
                ? 'border-[#3B5BFF] bg-blue-50/40 shadow-sm'
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <Image
              src={`/icons/payment/${provider}.svg`}
              alt={provider}
              width={72}
              height={28}
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* Buttons — mobile: ko'k yuqorida */}
      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium text-sm transition-colors disabled:opacity-50"
        >
          Orqaga
        </button>
        <button
          onClick={handlePay}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Yuklanmoqda...
            </>
          ) : (
            "To'lovga o'tish"
          )}
        </button>
      </div>
    </>
  );
}
