'use client';

import { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { TestScreen } from '@/components/test/test-screen';
import { useCourseExam } from '@/hooks/use-course-exam';
import { useCourseInfo } from '@/hooks/use-course-info';
import { useGenerateCourseCertificate } from '@/hooks/use-course-certificate';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';

function ExamContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const courseType = searchParams.get('courseType') ?? 'course';

  const { data: exam, isLoading, isError } = useCourseExam(courseId);
  const { data: courseInfo } = useCourseInfo(courseId, courseType);
  const { mutateAsync: generateCertificate, isPending: claiming } =
    useGenerateCourseCertificate();

  const detailHref =
    courseType === 'skill' ? `/skills/${courseId}` :
    courseType === 'profession' ? `/professions/${courseId}` :
    `/courses/${courseId}`;

  const mode = courseType === 'skill' ? 'skill' : 'final-course';

  const handleBack = () => router.push(detailHref);
  const handleContinue = () => router.push(detailHref);

  const handleClaim = async () => {
    console.log('[Certificate] Claim boshlandi', { courseId, courseType, mode });
    try {
      const result = await generateCertificate(courseId);
      console.log('[Certificate] Response data', result);
      console.log('[Certificate] file URL:', result?.file);
      if (result.file) {
        console.log('[Certificate] window.open chaqirilmoqda:', result.file);
        window.open(result.file, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('[Certificate] file field bo\'sh!');
      }
    } catch (e: any) {
      console.error('[Certificate] Xato yuz berdi');
      console.error('Status:', e?.response?.status);
      console.error('Data:', e?.response?.data);
      console.error('Full error:', e);
      const status = e?.response?.status;
      const msg = status === 500
        ? "Sertifikat hozirda yaratib bo'lmadi. Iltimos, birozdan keyin qayta urinib ko'ring."
        : (e?.response?.data?.message ?? "Sertifikatni olishda xatolik yuz berdi.");
      alert(msg);
    }
  };

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
      onClaim={handleClaim}
      mode={mode}
      skillName={courseType === 'skill' ? courseInfo?.name : undefined}
      skillIcon={courseType === 'skill' ? courseInfo?.icon ?? undefined : undefined}
      courseName={courseInfo?.name}
      claiming={claiming}
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
