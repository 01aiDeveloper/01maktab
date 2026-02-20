'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText, X, CheckCircle2, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
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
}: LessonHeaderActionsProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [openModuleId, setOpenModuleId] = useState<number | null>(() => {
    // Default open: the module that contains the current lesson
    for (const m of modules) {
      if ((m.lessons ?? []).some((l) => l.id === currentLessonId)) return m.id;
    }
    return modules[0]?.id ?? null;
  });

  const backHref = courseId
    ? `/${courseType === 'course' ? 'courses' : courseType === 'skill' ? 'skills' : 'professions'}/${courseId}`
    : '/';

  const toggleModule = (id: number) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </Link>

        <div className="flex items-center gap-2">
          {isPublic && (
            <div className="hidden sm:flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
              <FileText className="w-3.5 h-3.5" />
              Bepul sinov darsi
            </div>
          )}

          {/* Prev arrow */}
          <button
            disabled={!prevLesson}
            onClick={() => prevLesson && onLessonSelect(prevLesson.moduleId, prevLesson.id)}
            className={cn(
              'w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors',
              prevLesson
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed',
            )}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Next arrow */}
          <button
            disabled={!nextLesson}
            onClick={() => nextLesson && onLessonSelect(nextLesson.moduleId, nextLesson.id)}
            className={cn(
              'w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-colors',
              nextLesson
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed',
            )}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Module list button */}
          <button
            onClick={() => setPanelOpen(true)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"
            title="Kurs dasturi"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Center modal ─────────────────────────────────────────── */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setPanelOpen(false)}
        >
          <div
            className="w-full max-w-[560px] max-h-[80vh] bg-white rounded-3xl flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <h2 className="font-semibold text-gray-900 text-base">Kurs dasturi</h2>
              <button
                onClick={() => setPanelOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Module list */}
            <div className="flex-1 overflow-y-auto">
              {modules.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-400 text-sm">
                  Modullar topilmadi
                </div>
              ) : (
                modules.map((module) => {
                  const lessons = module.lessons ?? [];
                  const isOpen = openModuleId === module.id;
                  const lessonCount = lessons.length;
                  const testCount = module.test ? 1 : 0;

                  return (
                    <div key={module.id} className="border-b border-gray-100 last:border-b-0">
                      {/* Module header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                          <FileText className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{module.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              Dars: {lessonCount}
                            </span>
                            {testCount > 0 && (
                              <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                Test: {testCount}
                              </span>
                            )}
                          </div>
                        </div>

                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>

                      {/* Lessons */}
                      {isOpen && (
                        <div className="pb-2">
                          {lessons.map((lesson, idx) => {
                            const isActive = lesson.id === currentLessonId;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  onLessonSelect(module.id, lesson.id);
                                  setPanelOpen(false);
                                }}
                                className={cn(
                                  'w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-gray-50',
                                  isActive && 'bg-blue-50',
                                )}
                              >
                                <span className="text-xs text-gray-400 w-12 shrink-0">
                                  Dars {idx + 1}
                                </span>
                                <span className={cn('text-sm flex-1', isActive ? 'text-[#3B5BFF] font-medium' : 'text-gray-700')}>
                                  {lesson.title}
                                </span>
                                <span className="shrink-0 ml-2">
                                  {lesson.isCompleted ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  ) : lesson.isPublic ? (
                                    <CheckCircle2 className="w-4 h-4 text-gray-200" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-gray-300" />
                                  )}
                                </span>
                              </button>
                            );
                          })}

                          {/* Test row */}
                          {module.test && (
                            <div className="flex items-center gap-3 px-5 py-2.5">
                              <span className="text-xs text-gray-400 w-12 shrink-0">Test</span>
                              <span className="text-sm text-gray-500 flex-1">{module.test.name}</span>
                              <span className="shrink-0 ml-2">
                                {module.test.isPassed ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-300" />
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
