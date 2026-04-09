'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { StepIndicator } from './step-indicator';
import api from '@/lib/api';

interface StepPaymentMethodProps {
  courseId: number;
  coursePrice: number;
  discountedPrice?: number;
  onNext: () => void;
  onBack: () => void;
  promocodeId?: number;
}

type PaymentProvider = 'click' | 'payme' | 'uzum';

interface ClickResponse {
  statusCode: number;
  data: { link: string };
}

interface PaymeResponse {
  statusCode: number;
  data: { link: string };
}

export function StepPaymentMethod({ courseId, coursePrice, discountedPrice, onNext, onBack, promocodeId }: StepPaymentMethodProps) {
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('click');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalPrice = discountedPrice ?? coursePrice;
  const hasDiscount = discountedPrice !== undefined && discountedPrice < coursePrice;

  const fmt = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

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

      let link: string;

      if (paymentProvider === 'click') {
        const res = await api.post<ClickResponse>('/click/course', body);
        link = res.data.data.link;
      } else {
        const res = await api.post<PaymeResponse>('/payme/course', body);
        link = res.data.data.link;
      }

      window.open(link, '_blank', 'noopener,noreferrer');
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
      <div className="bg-[#3B5BFF] rounded-2xl px-6 py-4 mb-6 flex flex-col items-center gap-1">
        {hasDiscount ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-base line-through decoration-2">
                {fmt(coursePrice)} so&apos;m
              </span>
              <span className="text-white text-lg">&rarr;</span>
              <span className="text-white text-xl sm:text-2xl font-bold">
                {fmt(finalPrice)} so&apos;m
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-white/90 text-base font-medium">Kurs narxi:</span>
            <span className="text-white text-xl sm:text-2xl font-bold">{fmt(coursePrice)} so&apos;m</span>
          </div>
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
