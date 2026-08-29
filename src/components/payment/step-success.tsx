'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { courseApi, type CourseKind } from '@/services/react-query/course';

interface StepSuccessProps {
  courseId: string;
}

export function StepSuccess({ courseId }: StepSuccessProps) {
  const t = useTranslations('payment');
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseType = searchParams.get('courseType') ?? 'course';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lessonUrl, setLessonUrl] = useState<string | null>(null);

  useEffect(() => {
    const enroll = async () => {
      try {
        // Kursga yozilish
        if (courseType === 'profession') {
          await courseApi.applyProfession(courseId);
        } else {
          await courseApi.enroll(courseId);
        }

        // Birinchi modul va darsni olish
        const data = await courseApi.getModules(courseType as CourseKind, courseId);
        const modules = data?.modules ?? [];

        const firstModule = modules[0];
        const firstLesson = firstModule?.lessons?.[0];

        if (firstModule && firstLesson) {
          const params = new URLSearchParams({
            lessonId: String(firstLesson.id),
            courseType,
            courseId: String(courseId),
          });
          setLessonUrl(`/module/${firstModule.id}?${params.toString()}`);
        } else {
          setLessonUrl(`/courses/${courseId}`);
        }
      } catch {
        setError(t('enrollError'));
        setLessonUrl(`/courses/${courseId}`);
      } finally {
        setLoading(false);
      }
    };

    enroll();
  }, [courseId, courseType, t]);

  const handleStart = () => {
    if (lessonUrl) router.push(lessonUrl);
  };

  return (
    <div className="flex flex-col items-center text-center py-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#1EBB4A]/10 flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1EBB4A] flex items-center justify-center">
          <Check className="w-6 h-6 text-white stroke-[2.5]" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#18181A] mb-3">
        {t('successTitle')}
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-500 max-w-md mb-8">
        {t('successDescription')}
      </p>

      {/* Error if enroll failed but payment succeeded */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm max-w-md">
          {error}
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full max-w-sm h-12 sm:h-14 rounded-2xl bg-[#5D7BF5] hover:bg-[#4d6be5] disabled:opacity-50 text-white font-medium text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('preparingCourse')}</span>
          </>
        ) : (
          <>
            <span>{t('startLearning')}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}
