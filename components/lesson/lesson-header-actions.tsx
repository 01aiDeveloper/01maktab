'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { LessonModuleModal } from './lesson-module-modal';
import type { CourseModule, CourseType } from './lesson-content';

interface LessonHeaderActionsProps {
  isPublic: boolean;
  modules: CourseModule[];
  currentLessonId: number;
  courseType: CourseType;
  courseId: string;
  prevLesson: { moduleId: number; id: number } | null;
  nextLesson: { moduleId: number; id: number } | null;
  onLessonSelect: (moduleId: number, lessonId: number) => void;
  isCurrentCompleted?: boolean;
  onLockedNext?: () => void;
  hasModuleTestPending?: boolean;
  onModuleTest?: () => void;
  isCourseExamReady?: boolean;
  onCourseExam?: () => void;
  isEnrolled?: boolean;
}

export function LessonHeaderActions({
  isPublic,
  modules,
  currentLessonId,
  courseType,
  courseId,
  prevLesson,
  nextLesson,
  onLessonSelect,
  isCurrentCompleted = true,
  onLockedNext,
  hasModuleTestPending,
  onModuleTest,
  isCourseExamReady,
  onCourseExam,
  isEnrolled = false,
}: LessonHeaderActionsProps) {
  const t = useTranslations('lesson');
  const [modalOpen, setModalOpen] = useState(false);

  const backHref = courseId ? `/${courseType === 'course' ? 'courses' : courseType === 'skill' ? 'skills' : 'professions'}/${courseId}` : '/';

  return (
    <>
      <div className="sticky top-4 z-30 mb-6">
        <div className="bg-white rounded-[23px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex items-center justify-between pl-6 pr-2 py-2">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </Link>

          <div className="flex items-center gap-3">
            {isPublic && (
              <div className="hidden sm:flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium h-9">
                <Image quality={90} src="/icons/free-lesson.svg" alt="" width={14} height={14} />
                {t('freeTrialLesson')}
              </div>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 h-10 pl-3 pr-4 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity"
              title={t('courseProgram')}
            >
              <Image
                quality={90} src="/icons/module-menu.svg"
                alt={t('courseProgram')}
                width={18}
                height={18}
              />
              <span>{t('courseProgram')}</span>
            </button>

            <button
              disabled={!prevLesson}
              onClick={() => prevLesson && onLessonSelect(prevLesson.moduleId, prevLesson.id)}
              className={cn(
                'w-9 h-9 flex items-center justify-center transition-colors',
                prevLesson ? 'text-gray-700 hover:text-foreground' : 'text-gray-300 cursor-not-allowed'
              )}
              aria-label="prev"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              disabled={!nextLesson && !hasModuleTestPending && !isCourseExamReady}
              onClick={() => {
                if (hasModuleTestPending) {
                  if (!isCurrentCompleted) { onLockedNext?.(); return; }
                  onModuleTest?.();
                  return;
                }
                if (isCourseExamReady) {
                  if (!isCurrentCompleted) { onLockedNext?.(); return; }
                  onCourseExam?.();
                  return;
                }
                if (!nextLesson) return;
                if (!isCurrentCompleted) { onLockedNext?.(); return; }
                onLessonSelect(nextLesson.moduleId, nextLesson.id);
              }}
              className={cn(
                'w-9 h-9 flex items-center justify-center transition-colors',
                (nextLesson || hasModuleTestPending || isCourseExamReady)
                  ? 'text-gray-700 hover:text-foreground'
                  : 'text-gray-300 cursor-not-allowed'
              )}
              aria-label="next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <LessonModuleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        modules={modules}
        currentLessonId={currentLessonId}
        courseType={courseType}
        courseId={courseId}
        currentLessonUrlId={String(currentLessonId)}
        onLessonSelect={onLessonSelect}
        isEnrolled={isEnrolled}
      />
    </>
  );
}
