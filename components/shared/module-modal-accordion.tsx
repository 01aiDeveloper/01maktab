// ModuleAccordion.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export type LessonItem = {
  id: string | number;
  title: string;
  type?: "lesson" | "test" | "video" | "practice";
  isFree?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
};

export type ModuleItem = {
  id: string;
  title: string;
  darsCount?: number;
  testCount?: number;
  lessonsCount?: number;
  testsCount?: number;
  lessons: LessonItem[];
  test?: { id?: string; title: string } | { title: string };
};

type Variant = "dark" | "light";

type Props = {
  modules?: ModuleItem[];

  variant: Variant;

  // accordion controlled (optional)
  value?: string;
  onValueChange?: (val: string) => void;

  // module icon (optional)
  moduleIconSrc?: string;
  moduleIconAlt?: string;

  // colors for default free actions
  freeBadgeClassName?: string; // e.g. "bg-green-500 hover:bg-green-500"
  actionButtonClassName?: string; // e.g. "bg-blue-600 hover:bg-blue-600"

  // header middle slot (o'rtada badge/button/status)
  renderModuleMiddle?: (module: ModuleItem) => React.ReactNode;

  // lesson right side slot (custom actions)
  renderLessonRight?: (lesson: LessonItem, ctx: { module: ModuleItem; lessonIndex: number }) => React.ReactNode;

  // click handlers (optional)
  onLessonClick?: (lesson: LessonItem, ctx: { module: ModuleItem; lessonIndex: number }) => void;
  onTestClick?: (test: { id?: string; title: string } | { title: string }, ctx: { module: ModuleItem }) => void;

  // wrapper classes
  className?: string;

  // empty state override
  emptyState?: React.ReactNode;
};

const styles: Record<Variant, any> = {
  dark: {
    moduleItem: "bg-[#282828] border-0 rounded-3xl overflow-hidden",
    trigger: "px-5 lg:px-6 py-5 hover:no-underline hover:bg-[#333]/50 data-[state=open]:bg-[#282828] transition-colors",
    headerTitle: "font-semibold text-white text-base lg:text-lg",
    headerMeta: "text-xs text-gray-400",
    contentWrap: "border-t border-gray-700",
    row: "flex items-center justify-between px-5 lg:px-6 py-4 border-b border-gray-700 last:border-b-0 hover:bg-[#333]/50 transition-colors",
    rowLeftLabel: "text-gray-500 text-sm w-14 shrink-0",
    rowTitle: "text-gray-300 text-sm truncate",
    emptyCard: "bg-[#282828] text-gray-300 border border-gray-700",
    emptyMuted: "text-gray-400",
  },
  light: {
    moduleItem: "bg-white border-0 rounded-3xl overflow-hidden",
    trigger: "px-5 lg:px-6 py-5 hover:no-underline hover:bg-gray-50/50 data-[state=open]:bg-white transition-colors",
    headerTitle: "font-semibold text-gray-900 text-base lg:text-lg",
    headerMeta: "text-xs text-gray-500",
    contentWrap: "border-t border-gray-100",
    row: "flex items-center justify-between px-5 lg:px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors",
    rowLeftLabel: "text-gray-400 text-sm w-14 shrink-0",
    rowTitle: "text-gray-700 text-sm truncate",
    emptyCard: "bg-white text-gray-700 border border-gray-100",
    emptyMuted: "text-gray-500",
  },
};

function getDarsCount(m: ModuleItem) {
  return m.lessonsCount ?? m.darsCount ?? m.lessons?.filter((x) => x.type !== "test").length ?? 0;
}
function getTestCount(m: ModuleItem) {
  if (m.test) return 1;
  const fromLessons = m.lessons?.filter((x) => x.type === "test").length ?? 0;
  return m.testsCount ?? m.testCount ?? fromLessons;
}

export function ModuleModalAccordion({
  modules,
  variant,
  value,
  onValueChange,
  moduleIconSrc = "/images/common/folder.png",
  moduleIconAlt = "folder icon",
  freeBadgeClassName = "bg-green-500 hover:bg-green-500 text-white",
  actionButtonClassName = "bg-blue-600 hover:bg-blue-600 text-white",
  renderModuleMiddle,
  renderLessonRight,
  onLessonClick,
  onTestClick,
  className,
  emptyState,
}: Props) {
  const t = useTranslations("moduleAccordion");
  const s = styles[variant];
  const list = modules ?? [];

  if (list.length === 0) {
    return (
      <div className={cn("rounded-3xl p-6 lg:p-8", s.emptyCard, className)}>
        {emptyState ?? (
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Image quality={95} src={moduleIconSrc} alt={moduleIconAlt} width={44} height={44} className="w-11 h-11" />
            </div>
            <div>
              <div className="font-semibold">{t("noInfoTitle")}</div>
              <div className={cn("mt-1 text-sm", s.emptyMuted)}>
                {t("noInfoDescription")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const accordionProps =
    value !== undefined && onValueChange
      ? { value, onValueChange }
      : {};

  return (
    <Accordion type="single" collapsible className={cn("space-y-3", className)} {...accordionProps}>
      {list.map((module, moduleIndex) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: moduleIndex * 0.1 }}
        >
          <AccordionItem value={module.id} className={s.moduleItem}>
            <AccordionTrigger className={s.trigger}>
              {/* Trigger content: left + optional middle + (chevron is built-in) */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <Image
                  className="w-12 h-12 lg:w-14 lg:h-14 shrink-0"
                  quality={95} src={moduleIconSrc}
                  alt={moduleIconAlt}
                  width={64}
                  height={64}
                />

                <div className="min-w-0 text-left">
                  <h3 className={s.headerTitle}>{module.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={s.headerMeta}>{t("darsLabel", { count: getDarsCount(module) })}</span>
                    <span className={s.headerMeta}>{t("testLabel", { count: getTestCount(module) })}</span>
                  </div>
                </div>

                {/* ✅ O'RTADAGI SLOT: module header ichida badge/button/status */}
                {renderModuleMiddle ? (
                  <div className="ml-auto shrink-0">
                    {renderModuleMiddle(module)}
                  </div>
                ) : (
                  <div className="ml-auto" />
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-0 pb-0">
              {(module.lessons?.length ?? 0) > 0 || module.test ? (
                <div className={s.contentWrap}>
                  {/* lessons */}
                  {(module.lessons ?? []).map((lesson, lessonIndex) => {
                    let leftLabel = t("darsItem", { n: lessonIndex + 1 });
                    if (lesson.type === "test") leftLabel = t("test");
                    else if (lesson.type === "video") leftLabel = t("darsItem", { n: lessonIndex + 1 });
                    else if (lesson.type === "practice") leftLabel = t("darsItem", { n: lessonIndex + 1 });

                    return (
                      <div
                        key={lesson.id}
                        className={s.row}
                        role={onLessonClick ? "button" : undefined}
                        tabIndex={onLessonClick ? 0 : undefined}
                        onClick={() => onLessonClick?.(lesson, { module, lessonIndex })}
                        onKeyDown={(e) => {
                          if (!onLessonClick) return;
                          if (e.key === "Enter" || e.key === " ") onLessonClick(lesson, { module, lessonIndex });
                        }}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <span className={s.rowLeftLabel}>{leftLabel}</span>
                          <span className={s.rowTitle}>{lesson.title}</span>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          {renderLessonRight ? (
                            renderLessonRight(lesson, { module, lessonIndex })
                          ) : (
                            <DefaultLessonRight
                              variant={variant}
                              lesson={lesson}
                              freeBadgeClassName={freeBadgeClassName}
                              actionButtonClassName={actionButtonClassName}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* optional module-level test row */}
                  {module.test && (
                    <div
                      className={cn(s.row, "border-b-0")}
                      role={onTestClick ? "button" : undefined}
                      tabIndex={onTestClick ? 0 : undefined}
                      onClick={() => onTestClick?.(module.test!, { module })}
                      onKeyDown={(e) => {
                        if (!onTestClick) return;
                        if (e.key === "Enter" || e.key === " ") onTestClick(module.test!, { module });
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className={s.rowLeftLabel}>{t("test")}</span>
                        <span className={s.rowTitle}>{module.test.title}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // ✅ module ichida no-data
                <div className={cn("px-5 lg:px-6 py-5", variant === "dark" ? "text-gray-400" : "text-gray-500")}>
                  {t("noLessons")}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}

function DefaultLessonRight({
  variant,
  lesson,
  freeBadgeClassName,
  actionButtonClassName,
}: {
  variant: Variant;
  lesson: LessonItem;
  freeBadgeClassName: string;
  actionButtonClassName: string;
}) {
  const t = useTranslations("moduleAccordion");
  if (lesson.isFree) {
    return (
      <>
        <Badge className={cn("text-xs rounded-full px-3 py-1.5", freeBadgeClassName)}>
          {t("freeTrialBadge")}
        </Badge>
        <Button
          size="sm"
          className={cn("rounded-full text-xs h-8 px-4", actionButtonClassName)}
        >
          {t("watch")}
        </Button>
      </>
    );
  }

  return (
    <>
      <Badge className={cn("text-xs rounded-full px-3 py-1.5", variant === "dark" ? "bg-black hover:bg-black text-white" : "bg-black hover:bg-black text-white")}>
        {t("fullCourse")}
      </Badge>
      <Lock className={cn("w-5 h-5", variant === "dark" ? "text-gray-400" : "text-gray-400")} />
    </>
  );
}