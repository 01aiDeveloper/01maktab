'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { TestScreen } from '@/components/test/test-screen';
import { useModuleTest } from '@/hooks/queries/use-module-test';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { buildLessonUrl } from '@/components/lesson/lesson-content';

function TestContent() {
  const t = useTranslations('pageError');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleId = params.moduleId as string;

  const courseType = searchParams.get('courseType') ?? 'course';
  const courseId = searchParams.get('courseId') ?? '';
  const lessonId = searchParams.get('lessonId') ?? '';
  const nextLessonId = searchParams.get('nextLessonId') ?? '';
  const nextModuleId = searchParams.get('nextModuleId') ?? '';

  const { data: test, isLoading, isError } = useModuleTest(moduleId);

  const handleBack = () => {
    if (lessonId) {
      router.push(buildLessonUrl(Number(moduleId), Number(lessonId), courseType, courseId));
    } else {
      router.push(`/module/${moduleId}?courseType=${courseType}&courseId=${courseId}`);
    }
  };

  const handleContinue = () => {
    if (nextLessonId && nextModuleId) {
      router.push(buildLessonUrl(Number(nextModuleId), Number(nextLessonId), courseType, courseId));
    } else {
      handleBack();
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 flex justify-center">
        <PageLoader />
      </div>
    );
  }

  if (isError || !test) {
    return <PageError title={t('testNotFound')} description={t('testNotFoundDescription')} showBack />;
  }

  return (
    <TestScreen
      test={test}
      moduleId={moduleId}
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
}

export default function TestPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main className="min-h-screen bg-[#f5f5f5] py-8">
        <div className="container mx-auto px-4 max-w-[760px]">
          <Suspense fallback={
            <div className="bg-white rounded-2xl p-12 flex justify-center">
              <PageLoader />
            </div>
          }>
            <TestContent />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
