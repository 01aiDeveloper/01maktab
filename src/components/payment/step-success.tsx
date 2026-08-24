'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { courseApi, type CourseKind } from '@/services/react-query/course';

interface StepSuccessProps {
  courseId: string;
}

function getModuleEndpoint(courseType: string, courseId: string) {
  if (courseType === 'skill') return `/course/skill/${courseId}/module`;
  if (courseType === 'profession') return `/course/profession/${courseId}/module`;
  return `/course/${courseId}/module`;
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
        await courseApi.enroll(courseId);

        // Birinchi modul va darsni olish
        const data = await courseApi.getModules(courseType as CourseKind, courseId);
        const modules: Array<{
          id: number;
          lessons?: Array<{ id: number }> | null;
        }> = data.modules ?? data ?? [];

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
  }, [courseId, courseType]);

  const handleStart = () => {
    if (lessonUrl) router.push(lessonUrl);
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#3B5BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3">
        {t('successTitle')}
      </h2>

      <p className="text-gray-500 text-sm text-center mb-8 max-w-xs mx-auto leading-relaxed">
        {t('successDescription')}
      </p>

      {error && (
        <p className="text-red-500 text-xs text-center mb-4">{error}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={loading}
          className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('preparing')}
            </>
          ) : (
            <>
              {t('startCourse')}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
