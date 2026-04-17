'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { StepIndicator } from '@/components/payment/step-indicator';

export function CheckoutStepSuccess() {
  const router = useRouter();

  return (
    <>
      <StepIndicator currentStep={3} />

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#3B5BFF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
        To&apos;lov muvaffaqiyatli!
      </h2>

      <div className="flex justify-center">
        <button
          onClick={() => router.push('/market')}
          className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors"
        >
          Marketga qaytish
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
