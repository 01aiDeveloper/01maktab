'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { ModuleModalAccordion } from '@/components/shared/module-modal-accordion';
import type { ModuleItem } from '@/components/shared/module-modal-accordion';
import type { CourseModule } from './lesson-content';

interface LessonModuleModalProps {
  open: boolean;
  onClose: () => void;
  modules: CourseModule[];
  currentLessonId: number;
  courseType: string;
  courseId: string;
  currentLessonUrlId?: string;
  onLessonSelect: (moduleId: number, lessonId: number) => void;
  isEnrolled?: boolean;
}

function toModuleItem(m: CourseModule, isEnrolled: boolean): ModuleItem {
  return {
    id: String(m.id),
    title: m.title,
    darsCount: (m.lessons ?? []).length,
    testCount: m.test ? 1 : 0,
    lessons: (m.lessons ?? []).map((l) => ({
      id: l.id,
      title: l.title,
      isFree: isEnrolled || l.isPublic,
      isCompleted: l.isCompleted,
    })),
    test: m.test ? { id: String(m.test.id), title: m.test.name } : undefined,
  };
}

export function LessonModuleModal({
  open,
  onClose,
  modules,
  currentLessonId,
  courseType,
  courseId,
  currentLessonUrlId,
  onLessonSelect,
  isEnrolled = false,
}: LessonModuleModalProps) {
  const router = useRouter();
  const currentModule = modules.find((m) =>
    (m.lessons ?? []).some((l) => l.id === currentLessonId)
  );
  const [openModuleId, setOpenModuleId] = useState<string>(
    String(currentModule?.id ?? modules[0]?.id ?? '')
  );

  if (!open) return null;

  const moduleItems: ModuleItem[] = modules.map((m) => toModuleItem(m, isEnrolled));

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] max-h-[80vh] bg-[#f5f5f7] rounded-3xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 shrink-0">
          <h2 className="font-semibold text-gray-900 text-base">Kurs dasturi</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <ModuleModalAccordion
            variant="light"
            modules={moduleItems}
            value={openModuleId}
            onValueChange={setOpenModuleId}
            renderLessonRight={(lesson) => {
              if (lesson.isCompleted) {
                return (
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                );
              }
              if (lesson.isFree) {
                return (
                  <svg className="w-4 h-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                );
              }
              return (
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              );
            }}
            onLessonClick={(lesson, ctx) => {
              onLessonSelect(Number(ctx.module.id), Number(lesson.id));
              onClose();
            }}
            onTestClick={(_test, ctx) => {
              const params = new URLSearchParams({ courseType, courseId });
              if (currentLessonUrlId) params.set('lessonId', currentLessonUrlId);

              // Keyingi darsni topish: shu moduldan keyin keluvchi modul/dars
              const allLessons = modules.flatMap((m) =>
                (m.lessons ?? []).map((l) => ({ ...l, moduleId: m.id }))
              );
              const testModuleId = Number(ctx.module.id);
              const lastLessonOfModule = [...(modules.find((m) => m.id === testModuleId)?.lessons ?? [])].pop();
              const lastIdx = lastLessonOfModule
                ? allLessons.findIndex((l) => l.id === lastLessonOfModule.id)
                : -1;
              const nextAfterModule = lastIdx >= 0 ? allLessons[lastIdx + 1] : undefined;
              if (nextAfterModule) {
                params.set('nextLessonId', String(nextAfterModule.id));
                params.set('nextModuleId', String(nextAfterModule.moduleId));
              }

              router.push(`/test/${ctx.module.id}?${params.toString()}`);
              onClose();
            }}
          />

        </div>
      </div>
    </div>
  );
}
