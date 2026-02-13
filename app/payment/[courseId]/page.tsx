'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StepConfirmInfo } from '@/components/payment/step-confirm-info';
import { StepPaymentMethod } from '@/components/payment/step-payment-method';
import { StepSuccess } from '@/components/payment/step-success';
import { useAuthStore } from '@/store/auth-store';

function PaymentContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;

  const user = useAuthStore((state) => state.user);

  const stepParam = searchParams.get('step');
  const currentStep = stepParam ? parseInt(stepParam, 10) : 1;

  const setStep = (step: number) => {
    router.push(`/payment/${courseId}?step=${step}`, { scroll: false });
  };

  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstname || '',
    lastName: user?.lastname || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const coursePrice = 1_500_000;

  return (
    <div className="bg-white rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      {currentStep === 1 && (
        <StepConfirmInfo
          userInfo={userInfo}
          onNext={(data) => {
            setUserInfo(data);
            setStep(2);
          }}
          onBack={() => router.back()}
        />
      )}

      {currentStep === 2 && (
        <StepPaymentMethod
          coursePrice={coursePrice}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {currentStep === 3 && (
        <StepSuccess courseId={courseId} />
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f0f0f0] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[560px]">
          <Suspense fallback={
            <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex justify-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
            </div>
          }>
            <PaymentContent />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
