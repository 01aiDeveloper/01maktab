'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StepConfirmInfo } from '@/components/payment/step-confirm-info';
import { StepPaymentMethod } from '@/components/payment/step-payment-method';
import { StepSuccess } from '@/components/payment/step-success';
import { StepPresaleSuccess } from '@/components/payment/step-presale-success';
import { useAuth } from '@/hooks/common/use-auth';
import { useProfile } from '@/hooks/queries/use-profile';
import {
  courseDetailBackPath,
  getPaymentBasePrice,
  isWaitlistOnlyPurchaseBlocked,
  useCourseInfo,
} from '@/hooks/queries/use-course-info';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { useSmartBack } from '@/hooks/common/use-smart-back';
import type { ApiPaymentResponse } from '@/types/api';

function PaymentContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;

  const courseType = searchParams.get('courseType') ?? 'course';
  const detailPath = courseDetailBackPath(courseType, courseId);
  const goBack = useSmartBack(detailPath);

  const { data: profileData } = useProfile();
  const storeUser = useAuth((state) => state.user);
  const user = profileData ?? storeUser;

  const { data: courseInfo, isLoading: courseLoading, isError: courseError } = useCourseInfo(courseId, courseType);

  const stepParam = searchParams.get('step');
  const currentStep = stepParam ? parseInt(stepParam, 10) : 1;

  const discountedPriceParam = searchParams.get('discountedPrice');
  const urlDiscountedPrice = discountedPriceParam ? parseInt(discountedPriceParam, 10) : undefined;

  const discountPercentParam = searchParams.get('discountPercent');
  const urlDiscountPercent = discountPercentParam ? parseInt(discountPercentParam, 10) : undefined;

  const isPresaleFlow =
    searchParams.get('flow') === 'presale' || Boolean(courseInfo?.preSales);

  const [promoDiscountedPrice, setPromoDiscountedPrice] = useState<number | undefined>(undefined);
  const [promocodeId, setPromocodeId] = useState<string | undefined>(undefined);
  const [paymentResult, setPaymentResult] = useState<ApiPaymentResponse | null>(null);

  const listPrice = courseInfo?.price ?? 0;
  const basePrice = courseInfo ? getPaymentBasePrice(courseInfo) : listPrice;
  const discountedPrice = promoDiscountedPrice ?? urlDiscountedPrice ?? (basePrice < listPrice ? basePrice : undefined);
  const discountPercent = urlDiscountPercent;

  useEffect(() => {
    if (!courseInfo) return;
    if (isWaitlistOnlyPurchaseBlocked(courseInfo) && !urlDiscountedPrice && searchParams.get('flow') !== 'presale') {
      router.replace(detailPath);
    }
  }, [courseInfo, detailPath, router, urlDiscountedPrice, searchParams]);

  const userInfo = {
    firstName: searchParams.get('firstName') ?? user?.firstname ?? '',
    lastName: searchParams.get('lastName') ?? user?.lastname ?? '',
    phone: searchParams.get('phone') ?? String(user?.phone ?? ''),
    email: searchParams.get('email') ?? user?.email ?? '',
  };

  const courseName = courseInfo?.title ?? courseInfo?.name ?? '';

  if (courseLoading) {
    return (
      <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex justify-center">
        <PageLoader />
      </div>
    );
  }

  if (courseError || !courseInfo) {
    return (
      <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
        <PageError />
      </div>
    );
  }

  const goToStep = (step: number, extra?: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('step', String(step));
    if (extra) Object.entries(extra).forEach(([k, v]) => next.set(k, v));
    router.push(`/payment/${courseId}?${next.toString()}`, { scroll: false });
  };

  const showPresaleSuccess =
    paymentResult?.discountType === 'PRE_SALES' ||
    (paymentResult?.free === true && isPresaleFlow);

  return (
    <div className="bg-white rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      {currentStep === 1 && (
        <StepConfirmInfo
          userInfo={userInfo}
          onNext={() => goToStep(2)}
          onBack={goBack}
        />
      )}

      {currentStep === 2 && (
        <StepPaymentMethod
          courseId={courseId}
          listPrice={listPrice}
          basePrice={basePrice}
          discountedPrice={discountedPrice}
          discountPercent={discountPercent}
          promocodeId={promocodeId}
          onNext={(result) => {
            setPaymentResult(result ?? null);
            goToStep(3);
          }}
          onBack={() => goToStep(1)}
          onPromocodeApplied={(data) => {
            setPromoDiscountedPrice(data.discountedPrice);
            setPromocodeId(data.promocodeId);
          }}
        />
      )}

      {currentStep === 3 &&
        (showPresaleSuccess ? (
          <StepPresaleSuccess courseName={courseName} />
        ) : (
          <StepSuccess courseId={courseId} />
        ))}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f0f0f0] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[560px]">
          <Suspense
            fallback={
              <div className="bg-white rounded-[28px] p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex justify-center">
                <PageLoader />
              </div>
            }
          >
            <PaymentContent />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
