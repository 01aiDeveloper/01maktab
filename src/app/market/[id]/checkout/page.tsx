'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StepConfirmInfo } from '@/components/payment/step-confirm-info';
import { CheckoutStepPayment } from '@/components/market/checkout-step-payment';
import { CheckoutStepSuccess } from '@/components/market/checkout-step-success';
import { useAuth } from '@/hooks/common/use-auth';
import { useProfile } from '@/hooks/queries/use-profile';
import { useMarketProduct } from '@/hooks/queries/use-market';
import { PageLoader } from '@/components/ui/page-loader';

function CheckoutContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = params.id as string;

  const { data: profileData } = useProfile();
  const storeUser = useAuth((state) => state.user);
  const user = profileData ?? storeUser;

  const { data: product, isLoading } = useMarketProduct(productId);

  const stepParam = searchParams.get('step');
  const currentStep = stepParam ? parseInt(stepParam, 10) : 1;

  const colorId = searchParams.get('colorId') ?? '';
  const size = searchParams.get('size') ?? '';
  const payment = searchParams.get('payment') ?? 'sum';

  const userInfo = {
    firstName: searchParams.get('firstName') ?? user?.firstname ?? '',
    lastName:  searchParams.get('lastName')  ?? user?.lastname  ?? '',
    phone:     searchParams.get('phone')     ?? String(user?.phone ?? ''),
    email:     searchParams.get('email')     ?? user?.email     ?? '',
  };

  if (isLoading || !product) {
    return (
      <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex justify-center">
        <PageLoader />
      </div>
    );
  }

  const selectedColor = product.colors.find((c) => c.id === colorId) ?? product.colors[0];

  const goToStep = (step: number, extra?: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('step', String(step));
    if (extra) Object.entries(extra).forEach(([k, v]) => next.set(k, v));
    router.push(`/market/${productId}/checkout?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      {currentStep === 1 && (
        <StepConfirmInfo
          userInfo={userInfo}
          onNext={() => goToStep(2)}
          onBack={() => router.push(`/market/${productId}`)}
        />
      )}

      {currentStep === 2 && (
        <CheckoutStepPayment
          product={product}
          selectedColor={selectedColor}
          selectedSize={size}
          payment={payment}
          onNext={() => goToStep(3)}
          onBack={() => goToStep(1)}
        />
      )}

      {currentStep === 3 && (
        <CheckoutStepSuccess />
      )}
    </div>
  );
}

export default function MarketCheckoutPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f0f0f0] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[640px]">
          <Suspense fallback={
            <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex justify-center">
              <PageLoader />
            </div>
          }>
            <CheckoutContent />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
