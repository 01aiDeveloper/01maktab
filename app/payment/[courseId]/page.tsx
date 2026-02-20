'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StepConfirmInfo } from '@/components/payment/step-confirm-info';
import { StepPaymentMethod } from '@/components/payment/step-payment-method';
import { StepSuccess } from '@/components/payment/step-success';
import { useAuthStore } from '@/store/auth-store';
import { PageLoader } from '@/components/ui/page-loader';

function PaymentContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;

  const user = useAuthStore((state) => state.user);

  const stepParam = searchParams.get('step');
  const currentStep = stepParam ? parseInt(stepParam, 10) : 1;

  // userInfo URL query da saqlanadi — step ozgarganda yoki reload da yoqolmaydi
  const userInfo = {
    firstName: searchParams.get('firstName') ?? user?.firstname ?? '',
    lastName:  searchParams.get('lastName')  ?? user?.lastname  ?? '',
    phone:     searchParams.get('phone')     ?? user?.phone     ?? '',
    email:     searchParams.get('email')     ?? user?.email     ?? '',
  };

  const coursePrice = 1_500_000;

  const goToStep = (step: number, extra?: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('step', String(step));
    if (extra) Object.entries(extra).forEach(([k, v]) => next.set(k, v));
    router.push(`/payment/${courseId}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      {currentStep === 1 && (
        <StepConfirmInfo
          userInfo={userInfo}
          onNext={(data) =>
            goToStep(2, {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              email: data.email,
            })
          }
          onBack={() => router.back()}
        />
      )}

      {currentStep === 2 && (
        <StepPaymentMethod
          courseId={Number(courseId)}
          coursePrice={coursePrice}
          onNext={() => goToStep(3)}
          onBack={() => goToStep(1)}
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
              <PageLoader />
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
