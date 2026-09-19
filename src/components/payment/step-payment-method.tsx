'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StepIndicator } from './step-indicator';
import { useCheckPromocode } from '@/hooks/mutations/use-promocode';
import { commerceApi } from '@/services/react-query/commerce';
import { getApiErrorMessage } from '@/lib/api-error';
import type { ApiPaymentResponse } from '@/types/api';

interface StepPaymentMethodProps {
  courseId: string;
  /** Full catalog price (strikethrough). */
  listPrice: number;
  /** Base price for payment / promocode (pre-sales price when active). */
  basePrice: number;
  discountedPrice?: number;
  discountPercent?: number;
  onNext: (result?: ApiPaymentResponse) => void;
  onBack: () => void;
  promocodeId?: string;
  onPromocodeApplied?: (data: { discountedPrice: number; promocodeId: string }) => void;
}

type PaymentProvider = 'click' | 'payme';

export function StepPaymentMethod({
  courseId,
  listPrice,
  basePrice,
  discountedPrice,
  discountPercent,
  onNext,
  onBack,
  promocodeId,
  onPromocodeApplied,
}: StepPaymentMethodProps) {
  const t = useTranslations('payment');
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('click');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [promoError, setPromoError] = useState('');
  const checkPromocode = useCheckPromocode();

  const displayListPrice = listPrice > 0 ? listPrice : basePrice;
  const finalPrice = discountedPrice ?? basePrice;
  const hasDiscount = finalPrice < displayListPrice;

  const fmt = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setPromoStatus('idle');
    setPromoError('');

    try {
      const result = await checkPromocode.mutateAsync({
        code: promoCode.trim(),
        targetId: courseId,
        price: basePrice,
        type: 'course',
      });

      let newPrice = basePrice;
      if (typeof result.finalPrice === 'number') {
        newPrice = result.finalPrice;
      } else if (typeof result.discountAmount === 'number') {
        newPrice = Math.max(0, basePrice - result.discountAmount);
      } else if (
        result.discountType === 'PERCENT' &&
        typeof result.discountValue === 'number'
      ) {
        newPrice = Math.round(basePrice * (1 - result.discountValue / 100));
      } else if (
        result.discountType === 'FIXED' &&
        typeof result.discountValue === 'number'
      ) {
        newPrice = Math.max(0, basePrice - result.discountValue);
      }

      setPromoStatus('success');
      onPromocodeApplied?.({ discountedPrice: newPrice, promocodeId: result.promocodeId });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setPromoStatus('error');
      if (status === 404) {
        setPromoError(t('promoNotFound'));
      } else {
        setPromoError(getApiErrorMessage(err, t('promoInvalid')));
      }
    }
  };

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      const body: { courseId: string; promocodeId?: string } = { courseId };
      if (promocodeId) body.promocodeId = promocodeId;

      const data = await commerceApi.createCoursePayment(paymentProvider, body);

      if (data.free) {
        onNext(data);
        return;
      }

      if (!data.link) throw new Error('Payment provider did not return a link');
      window.location.href = data.link;
    } catch (err) {
      console.error('Payment error:', err);
      setError(getApiErrorMessage(err, t('paymentError')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StepIndicator currentStep={2} />

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">
        {t('step2Title')}
      </h2>

      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        {hasDiscount ? (
          <>
            <span className="text-gray-400 text-lg line-through decoration-2">
              {fmt(displayListPrice)} {t('currencySom')}
            </span>
            <span className="text-gray-400 text-lg">&rarr;</span>
            <span className="bg-[#E8F5E9] text-[#2E7D32] text-xl sm:text-2xl font-bold px-4 py-1.5 rounded-xl">
              {fmt(finalPrice)} {t('currencySom')}
            </span>
            {discountPercent ? (
              <span className="bg-[#FFF3E0] text-[#E65100] text-sm font-bold px-3 py-1 rounded-lg">
                -{discountPercent}%
              </span>
            ) : null}
          </>
        ) : (
          <div className="flex items-center justify-between w-full bg-gray-50 rounded-2xl px-6 py-4">
            <span className="text-gray-500 text-base font-medium">{t('coursePrice')}</span>
            <span className="text-gray-900 text-xl sm:text-2xl font-bold">{fmt(finalPrice)} so&apos;m</span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-1.5">{t('promoLabel')}</label>
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
            placeholder={t('promoPlaceholder')}
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
              {t('promoApplied')}
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
                t('promoApply')
              )}
            </button>
          )}
        </div>
        {promoStatus === 'error' && (
          <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 text-center mb-4">{t('paymentMethod')}</h3>
      <div className="flex justify-center gap-3 mb-8">
        {(['click', 'payme'] as PaymentProvider[]).map((provider) => (
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
              quality={90}
              src={`/icons/payment/${provider}.svg`}
              alt={provider}
              width={72}
              height={28}
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium text-sm transition-colors disabled:opacity-50"
        >
          {t('back')}
        </button>
        <button
          onClick={handlePay}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('loading')}
            </>
          ) : (
            t('goToPayment')
          )}
        </button>
      </div>
    </>
  );
}
