'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
}: LessonHeaderActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const backHref = courseId ? `/${courseType === 'course' ? 'courses' : courseType === 'skill' ? 'skills' : 'professions'}/${courseId}` : '/';

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Link href={backHref} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </Link>

        <div className="flex items-center gap-2">
          {true && (
            <div className="hidden sm:flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-[10px] text-xs font-medium h-9">
              <Image src="/icons/free-lesson.svg" alt="" width={14} height={14} />
              Bepul sinov darsi
            </div>
          )}

          <button
            onClick={() => setModalOpen(true)}
            className="w-9 h-9 rounded-[10px] border bg-black  flex items-center justify-center  transition-colors"
            title="Kurs dasturi"
          >
            <Image src="/icons/module-menu.svg" alt="Kurs dasturi" width={18} height={18} />
          </button>

          <button
            disabled={!prevLesson}
            onClick={() => prevLesson && onLessonSelect(prevLesson.moduleId, prevLesson.id)}
            className={cn(
              'w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors',
              prevLesson ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
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
              'w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors',
              (nextLesson || hasModuleTestPending || isCourseExamReady)
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            )}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
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
      />
    </>
  );
}
