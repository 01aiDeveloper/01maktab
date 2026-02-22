'use client';

import { cn } from '@/lib/utils';

interface LessonNavButtonsProps {
  prevLesson: { moduleId: number; id: number } | null;
  nextLesson: { moduleId: number; id: number } | null;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function LessonNavButtons({
  prevLesson,
  nextLesson,
  onPrev,
  onNext,
  className,
}: LessonNavButtonsProps) {
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
        disabled={!nextLesson}
        onClick={onNext}
        className={cn(
          'h-9 px-16 rounded-[10px] border text-sm font-medium transition-colors',
          nextLesson
            ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
            : 'border-gray-200 text-gray-400 opacity-40 cursor-not-allowed',
        )}
      >
        Keyingi dars
      </button>
    </div>
  );
}
