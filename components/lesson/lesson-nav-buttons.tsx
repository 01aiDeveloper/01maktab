'use client';

import { cn } from '@/lib/utils';

interface LessonNavButtonsProps {
  prevLesson: { moduleId: number; id: number } | null;
  nextLesson: { moduleId: number; id: number } | null;
  onPrev: () => void;
  onNext: () => void;
  isCurrentCompleted?: boolean;
  onLockedNext?: () => void;
  moduleTestPending?: { moduleId: number; testId: number } | null;
  onModuleTest?: () => void;
  isCourseExamReady?: boolean;
  onCourseExam?: () => void;
  className?: string;
}

export function LessonNavButtons({
  prevLesson,
  nextLesson,
  onPrev,
  onNext,
  isCurrentCompleted = true,
  onLockedNext,
  moduleTestPending,
  onModuleTest,
  isCourseExamReady,
  onCourseExam,
  className,
}: LessonNavButtonsProps) {
  const handleNext = () => {
    if (moduleTestPending) {
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
    if (!isCurrentCompleted) {
      onLockedNext?.();
      return;
    }
    onNext();
  };

  const nextLabel = moduleTestPending
    ? "Modul testiga o'tish"
    : isCourseExamReady
    ? "Kurs imtihoniga o'tish"
    : 'Keyingi dars';
  const isNextEnabled = !!(nextLesson || moduleTestPending || isCourseExamReady);
  return (
    <div className={cn('flex items-center gap-3 justify-center', className)}>
      <button
        disabled={!prevLesson}
        onClick={onPrev}
        className={cn(
          'h-9 px-16 rounded-[10px] border text-sm font-medium transition-colors',
          prevLesson
            ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
            : 'border-gray-200 text-gray-400 opacity-40 cursor-not-allowed',
        )}
      >
        Oldingi dars
      </button>
      <button
        disabled={!isNextEnabled}
        onClick={handleNext}
        className={cn(
          'h-9 px-12 rounded-[10px] border text-sm font-medium transition-colors',
          isNextEnabled
            ? isCurrentCompleted
              ? moduleTestPending || isCourseExamReady
                ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                : 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
              : 'border-gray-300 bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer'
            : 'border-gray-200 text-gray-400 opacity-40 cursor-not-allowed',
        )}
      >
        {nextLabel}
      </button>
    </div>
  );
}
