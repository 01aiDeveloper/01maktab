'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { AxiosError } from 'axios';
import { LessonHeaderActions } from '@/components/lesson/lesson-header-actions';
import { LessonNavButtons } from '@/components/lesson/lesson-nav-buttons';
import { UniversalVideoPlayer } from '@/components/lesson/universal-video-player';
import { LessonBlockRenderer } from '@/components/lesson/lesson-block-renderer';
import { AuthRequiredCard } from '@/components/lesson/auth-required-card';
import { sortByOrder } from '@/lib/lesson-utils';
import { useQueryClient } from '@tanstack/react-query';
import { useLesson } from '@/hooks/use-lesson';
import { useCourseModules, useSkillModules, useProfessionModules } from '@/hooks/use-course-modules';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import api from '@/lib/api';

// ─── Re-exported types (used by lesson-header-actions) ───────────────────────

export type CourseType = 'course' | 'skill' | 'profession';
export type { ApiModule as CourseModule, ApiModuleLesson as ModuleLesson } from '@/types/api';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function buildLessonUrl(
  moduleId: number,
  lessonId: number,
  courseType: string,
  courseId: string,
): string {
  const params = new URLSearchParams({ lessonId: String(lessonId), courseType, courseId });
  return `/module/${moduleId}?${params.toString()}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const lessonId = searchParams.get('lessonId') ?? '';
  const courseType = (searchParams.get('courseType') ?? 'course') as 'course' | 'skill' | 'profession';
  const courseId = searchParams.get('courseId') ?? '';

  const {
    data: lesson,
    isLoading,
    isError,
    error,
  } = useLesson(lessonId);

  const courseModules = useCourseModules(courseType === 'course' ? courseId : undefined);
  const skillModules = useSkillModules(courseType === 'skill' ? courseId : undefined);
  const professionModules = useProfessionModules(courseType === 'profession' ? courseId : undefined);

  const modulesLoading =
    courseType === 'skill' ? skillModules.isLoading :
    courseType === 'profession' ? professionModules.isLoading :
    courseModules.isLoading;

  const courseData =
    courseType === 'skill' ? skillModules.data :
    courseType === 'profession' ? professionModules.data :
    courseModules.data;

  const modules = courseData?.modules ?? [];

  // Flat list of all lessons for prev/next navigation
  const flatLessons = modules.flatMap((m) =>
    (m.lessons ?? []).map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );

  const goToLesson = useCallback(
    (targetModuleId: number, targetLessonId: number) => {
      router.push(buildLessonUrl(targetModuleId, targetLessonId, courseType, courseId));
    },
    [router, courseType, courseId],
  );

  const handleLessonComplete = useCallback(async (id: string) => {
    try {
      console.log('[LessonComplete] POST /lesson/' + id + '/complete');
      await api.post(`/lesson/${id}/complete`);
      console.log('[LessonComplete] success → refetching modules');
      await queryClient.invalidateQueries({ queryKey: ['modules', courseType, courseId] });
    } catch (err) {
      console.error('[LessonComplete] error:', err);
    }
  }, [queryClient, courseType, courseId]);

  const currentIndex = flatLessons.findIndex((l) => String(l.id) === String(lessonId));
  const currentLesson = currentIndex >= 0 ? flatLessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;

  // Auto-navigate when lessonId is missing: find first uncompleted lesson, or last lesson if all completed
  useEffect(() => {
    if (lessonId || modulesLoading || flatLessons.length === 0) return;

    const firstUncompleted = flatLessons.find((l) => !l.isCompleted);
    const target = firstUncompleted ?? flatLessons[flatLessons.length - 1];

    router.replace(buildLessonUrl(target.moduleId, target.id, courseType, courseId));
  }, [lessonId, modulesLoading, flatLessons, courseType, courseId, router]);

  if (!lessonId) return <PageLoader />;

  if (isLoading || modulesLoading) return <PageLoader />;

  // 401 → auth required
  const status = (error as AxiosError)?.response?.status;
  if (status === 401) return <AuthRequiredCard />;

  if (isError || !lesson) {
    return <PageError title="Dars topilmadi" description="Kechirasiz, bu dars mavjud emas" showBack={false} />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-8 lg:p-12 mb-6">
        <LessonHeaderActions
          isPublic={lesson.isPublic}
          modules={modules}
          currentLessonId={Number(lessonId)}
          courseType={courseType}
          courseId={courseId}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          onLessonSelect={(targetModuleId, targetLessonId) => goToLesson(targetModuleId, targetLessonId)}
        />
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Dars {lesson.orderId}. {lesson.title}
        </h1>
        {lesson.description && (
          <p className="text-muted-foreground mb-8">{lesson.description}</p>
        )}

        {lesson.videos && lesson.videos.length > 0 && (
          <div className="space-y-6 mb-8">
            {sortByOrder(lesson.videos).map((video, index) => (
              <UniversalVideoPlayer
                key={video.id}
                sourceUrl={video.link}
                sourceType={video.linkType}
                isFirst={index === 0}
                onComplete={index === 0 && !currentLesson?.isCompleted ? () => handleLessonComplete(lessonId) : undefined}
              />
            ))}
          </div>
        )}

        {lesson.blocks && lesson.blocks.length > 0 && <LessonBlockRenderer blocks={lesson.blocks} />}

        {/* Bottom prev/next navigation */}
        <LessonNavButtons
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          onPrev={() => prevLesson && goToLesson(prevLesson.moduleId, prevLesson.id)}
          onNext={() => nextLesson && goToLesson(nextLesson.moduleId, nextLesson.id)}
          className="mt-10 pt-8 border-t border-gray-100"
        />
      </div>

      <div className="h-12" />
    </>
  );
}
