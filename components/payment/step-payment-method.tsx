'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { StepIndicator } from './step-indicator';
import api from '@/lib/api';

interface StepPaymentMethodProps {
  courseId: number;
  coursePrice: number;
  onNext: () => void;
  onBack: () => void;
  promocodeId?: number;
}

type PaymentPlan = 'full' | 'installment';
type PaymentProvider = 'click' | 'payme' | 'uzum';

interface ClickResponse {
  statusCode: number;
  data: { link: string };
}

interface PaymeResponse {
  statusCode: number;
  data: { link: string };
}

export function StepPaymentMethod({ courseId, coursePrice, onNext, onBack, promocodeId }: StepPaymentMethodProps) {
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>('full');
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('click');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discount = 0.1;
  const discountedPrice = coursePrice * (1 - discount);
  const installmentMonths = 3;
  const monthlyPayment = Math.ceil(coursePrice / installmentMonths);

  const fmt = (price: number) => new Intl.NumberFormat('uz-UZ').format(price);

  const handlePay = async () => {
    if (paymentProvider === 'uzum') {
      // Uzum API yo'q, keyinroq qo'shiladi
      onNext();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body: { courseId: number; promocodeId?: number } = { courseId };
      if (promocodeId) body.promocodeId = promocodeId;

      let link: string;

      if (paymentProvider === 'click') {
        const res = await api.post<ClickResponse>('/click/course', body);
        link = res.data.data.link;
        // Click link to'liq URL bo'lmasligi mumkin
        if (!link.startsWith('http')) {
          link = `https://my.click.uz/services/pay?${link}`;
        }
      } else {
        // payme
        const res = await api.post<PaymeResponse>('/payme/course', body);
        link = res.data.data.link;
      }

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

      {/* Price Banner */}
      <div className="bg-[#3B5BFF] rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
        <span className="text-white/90 text-base font-medium">Kurs narxi:</span>
        <span className="text-white text-xl sm:text-2xl font-bold">{fmt(coursePrice)} so&apos;m</span>
      </div>

      {/* Payment Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Full */}
        <button
          onClick={() => setPaymentPlan('full')}
          className={`text-left rounded-2xl p-4 border-2 transition-all ${
            paymentPlan === 'full' ? 'border-[#3B5BFF] bg-blue-50/40' : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              paymentPlan === 'full' ? 'border-[#3B5BFF] bg-[#3B5BFF]' : 'border-gray-300'
            }`}>
              {paymentPlan === 'full' && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
            </div>
            <span className="font-semibold text-sm text-gray-900">To&apos;liq to&apos;lov</span>
          </div>

          <div className="space-y-1.5 ml-7">
            <div className="flex items-center gap-1.5 text-xs text-[#3B5BFF]">
              <Check className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{fmt(coursePrice)} so&apos;m (bir martalik)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#3B5BFF]">
              <Check className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Chegirma: -{discount * 100}%</span>
            </div>
          </div>

          <div className="mt-3 ml-7">
            <span className="inline-block bg-gray-100 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800">
              Jami: {fmt(discountedPrice)} so&apos;m
            </span>
          </div>
        </button>

        {/* Installment */}
        <button
          onClick={() => setPaymentPlan('installment')}
          className={`text-left rounded-2xl p-4 border-2 transition-all ${
            paymentPlan === 'installment' ? 'border-[#3B5BFF] bg-blue-50/40' : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              paymentPlan === 'installment' ? 'border-[#3B5BFF] bg-[#3B5BFF]' : 'border-gray-300'
            }`}>
              {paymentPlan === 'installment' && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
            </div>
            <span className="font-semibold text-sm text-gray-900">Bo&apos;lib-bo&apos;lib to&apos;lash</span>
          </div>

          <div className="space-y-1.5 ml-7">
            <div className="flex items-center gap-1.5 text-xs text-[#3B5BFF]">
              <Check className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{installmentMonths} oyga: {fmt(monthlyPayment)} so&apos;m/oy</span>
            </div>
          </div>

          <div className="mt-3 ml-7">
            <span className="inline-block bg-gray-100 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800">
              Birinchi to&apos;lov: {fmt(monthlyPayment)} so&apos;m
            </span>
          </div>
        </button>
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
              src={`/images/payment/${provider}.svg`}
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

      {/* Buttons */}
      <div className="flex gap-3">
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
