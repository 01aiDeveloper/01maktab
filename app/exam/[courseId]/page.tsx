'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { TestScreen } from '@/components/test/test-screen';
import { useCourseExam } from '@/hooks/use-course-exam';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';

function ExamContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const courseType = searchParams.get('courseType') ?? 'course';

  const { data: exam, isLoading, isError } = useCourseExam(courseId);

  const detailHref =
    courseType === 'skill' ? `/skills/${courseId}` :
    courseType === 'profession' ? `/professions/${courseId}` :
    `/courses/${courseId}`;

  const handleBack = () => router.push(detailHref);
  const handleContinue = () => router.push(detailHref);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 flex justify-center">
        <PageLoader />
      </div>
    );
  }

  if (isError || !exam) {
    return <PageError title="Imtihon topilmadi" description="Bu kurs uchun imtihon mavjud emas yoki yuklanmadi" showBack />;
  }

  return (
    <TestScreen
      test={exam}
      moduleId={courseId}
      onBack={handleBack}
      onContinue={handleContinue}
      submitUrl={`/exam/course/${courseId}/submit`}
    />
  );
}

export default function ExamPage() {
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
            <ExamContent />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
