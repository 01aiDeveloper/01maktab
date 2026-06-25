"use client";

import { ArrowLeft, ArrowRight, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { MainButton } from "@/components/ui/main-button";
import { Badge } from "@/components/ui/badge";
import { ModuleAccordion } from "@/components/shared/module-accordion";
import type { ModuleItem } from "@/components/shared/module-accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MentorCard } from "@/components/cards/mentor-card";
import { useSkill } from "@/hooks/use-skill";
import { useSkillModules } from "@/hooks/use-course-modules";
import { useMySkills } from "@/hooks/use-my-courses";
import { baseMediaUrl, stripInlineFont } from "@/lib/utils";
import type { ApiSkillModule } from "@/types/api";
import { PageLoader } from "@/components/ui/page-loader";
import { PageError } from "@/components/ui/page-error";
import { NoData } from "@/components/ui/no-data";
import { useAuthStore } from "@/store/auth-store";
import { PresaleSection } from "@/components/sections/skills/presale-section";
import { WaitlistSection } from "@/components/sections/skills/waitlist-section";
import { useCourseBadges } from "@/hooks/use-course-badges";
import { CourseStartModal } from "@/components/modals/course-start-modal";
import { useSmartBack } from "@/hooks/use-smart-back";
import { pickResumeLesson } from "@/lib/lesson-utils";


// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseMediaUrl}/${path}`;
}

function getDifficultyKey(difficulty: string): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null {
  if (difficulty === 'BEGINNER' || difficulty === 'INTERMEDIATE' || difficulty === 'ADVANCED') {
    return difficulty;
  }
  return null;
}

function toModuleItem(m: ApiSkillModule, isEnrolled = false): ModuleItem {
  const lessons = m.lessons ?? [];
  const tests = m.tests ?? [];
  return {
    id: String(m.id),
    title: m.title,
    darsCount: m.lessonCount,
    testCount: m.testCount,
    lessons: lessons.map((l) => ({
      id: l.id,
      title: l.title,
      isFree: isEnrolled || l.isPublic,
      type: "video" as const,
    })),
    test:
      tests.length > 0
        ? { id: String(tests[0].id), title: tests[0].name }
        : undefined,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SkillDetailPage() {
  const t = useTranslations('skillDetail');
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const goBack = useSmartBack('/catalog?tab=skills');

  const { user } = useAuthStore();
  const { data: skill, isLoading, isError } = useSkill(slug);
  const { data: skillModules } = useSkillModules(skill?.id);
  const { data: mySkills } = useMySkills();
  const { data: skillBadges } = useCourseBadges(skill?.id);
  const [openModule, setOpenModule] = useState<string>("");
  const [startLoading, setStartLoading] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);

  const goToFirstLesson = useCallback(() => {
    if (!skill || !skillModules) return;
    const target = pickResumeLesson(skillModules.modules, skillModules.progress);
    if (target) {
      router.push(
        `/module/${target.moduleId}?lessonId=${target.id}&courseType=skill&courseId=${skill.id}`,
      );
    }
  }, [skill, skillModules, router]);

  const handleStart = useCallback(async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!skill) return;
    setStartLoading(true);
    try {
      const alreadyAdded = !!skill.hasPurchased || !!skill.isEnrolled || !!mySkills?.some((c) => String(c.id) === String(skill.id));
      if (!alreadyAdded) {
        try {
          await api.post(`/course/${skill.id}/enroll`);
        } catch (err: unknown) {
          const status = (err as { response?: { status?: number } })?.response?.status;
          if (status === 400 && skill.pricingType !== 'FREE') {
            router.push(`/payment/${skill.id}?courseType=skill`);
            return;
          }
        }
      }
      goToFirstLesson();
    } finally {
      setStartLoading(false);
    }
  }, [user, skill, mySkills, router, goToFirstLesson]);

  const handleStartCourse = goToFirstLesson;

  if (skill && !openModule && skill.modules.length > 0) {
    setOpenModule(String(skill.modules[0].id));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader variant="light" />
        <PageLoader />
      </div>
    );
  }

  if (isError || !skill) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader variant="light" />
        <PageError />
        <SiteFooter />
      </div>
    );
  }

  const partner = skill.partners[0] ?? null;
  const isPurchasedForLessons = !!skill.hasPurchased || !!skill.isEnrolled || !!mySkills?.some((c) => String(c.id) === String(skill.id));
  const isSkillReady = skill.modules.some((m) => (m.lessons?.length ?? 0) > 0 || (m.tests?.length ?? 0) > 0);
  const modules: ModuleItem[] = skill.modules.map((m) => toModuleItem(m, isPurchasedForLessons));
  const mentor = skill.mentor;
  const priceLabel =
    skill.pricingType === "FREE"
      ? t('free')
      : `${skill.price.toLocaleString()} ${t('currencySom')}`;
  const difficultyKey = getDifficultyKey(skill.difficulty);
  const difficultyLabel = difficultyKey ? t(`difficulty.${difficultyKey}`) : skill.difficulty;
  const courseImage = mediaUrl(skill.photo);

  const isPurchased = !!skill.hasPurchased || !!mySkills?.some((c) => String(c.id) === String(skill.id));
  // isAddedToProfile — kursni o'quvchi explicit ravishda profilga qo'shgan
  const isAddedToProfile = !!skill.isEnrolled || isPurchased;
  const isFree = skill.pricingType === 'FREE';
  const completedCount = skillModules?.progress?.completedLessonsCount ?? 0;
  const totalCount = skillModules?.progress?.totalLessonsCount ?? 0;
  const hasStarted = isAddedToProfile && completedCount > 0;
  const presaleActive = !!skill.preSales;
  const isInWaitlist = !!skill.isInWaitlist;

  const handleLessonClick = (
    lesson: { id: string | number; isFree?: boolean },
    ctx: { module: ModuleItem },
  ) => {
    if (!user) { router.push('/login'); return; }
    if (!isAddedToProfile) {
      if (isFree) {
        handleStart();
        return;
      }
      router.push(`/payment/${skill.id}?courseType=skill`);
      return;
    }
    router.push(
      `/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=skill&courseId=${skill.id}`,
    );
  };

  const handleTestClick = (
    _test: { id?: string; title: string },
    ctx: { module: ModuleItem },
  ) => {
    const params = new URLSearchParams({ courseType: 'skill', courseId: String(skill.id) });
    router.push(`/test/${ctx.module.id}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <SiteHeader variant="light" />

      {/* Course Start Modal */}
      <CourseStartModal
        open={showStartModal}
        onClose={() => setShowStartModal(false)}
        onStartCourse={handleStartCourse}
      />

      {/* Hero Section */}
      <section id="nima-organasiz" className="w-full py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Image Card — first on mobile, right on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="bg-linear-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-[29px] lg:rounded-[40px] overflow-hidden relative h-80 lg:h-full order-first lg:order-last"
            >
              {courseImage && (
                <Image
                  quality={90} src={courseImage}
                  alt={skill.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              )}
              <button
                onClick={goBack}
                className="absolute top-6 left-6 inline-flex lg:hidden items-center gap-2 text-white text-sm transition-colors w-fit z-10 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('back')}</span>
              </button>
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm backdrop-blur-[119px]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {t('duration', { hours: skill.duration })}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-[119px]">
                  {t('price', { price: priceLabel })}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm backdrop-blur-[119px]">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  {t('level', { level: difficultyLabel })}
                </Badge>
                {skillBadges?.map((badge) => (
                  <Badge key={badge.id} className="bg-[#5d7bf5]/80 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-[119px]" title={badge.description}>
                    {badge.title}
                  </Badge>
                ))}
              </div>
              {skill.icon && (
                <div className="absolute top-6 right-6 w-12 h-12 lg:w-14 lg:h-14 bg-white/25 rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    quality={90} src={mediaUrl(skill.icon)}
                    alt="icon"
                    width={28}
                    height={28}
                    className="object-contain"
                    style={{ backdropFilter: "blur(19.368366241455078px)" }}
                  />
                </div>
              )}
            </motion.div>

            {/* Left Column — text content + partner */}
            <div className="flex flex-col gap-4 lg:col-span-2 order-last lg:order-first">
              {/* Text Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-[29px] lg:rounded-[40px] p-6 lg:p-8 flex flex-col relative overflow-hidden"
              >
                <button
                  onClick={goBack}
                  className="hidden lg:inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors w-fit cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t('back')}</span>
                </button>

                <h1 className="font-suisse text-[34px] md:text-4xl lg:text-5xl font-semibold text-[#18181a] leading-[1.05] tracking-[-1.7px] mb-7">
                  {skill.title}
                </h1>

                {skill.subtitle && (
                  <p className="text-[#9f9f9f] text-[16px] lg:text-base leading-[20px] tracking-[-0.8px] mb-8 line-clamp-10">
                    {skill.subtitle}
                  </p>
                )}

                {presaleActive ? (
                  <MainButton
                    variant="gradient"
                    size="md"
                    className="rounded-xl w-fit flex flex-row items-center"
                    onClick={handleStart}
                    disabled={startLoading}
                  >
                    {startLoading ? t('loading') : t('preEnroll')}
                    {startLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin inline ml-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 inline ml-1" />
                    )}
                  </MainButton>
                ) : isInWaitlist ? (
                  <MainButton
                    variant="outline"
                    size="md"
                    className="rounded-xl w-fit flex flex-row items-center opacity-70 cursor-not-allowed"
                    disabled
                  >
                    {t('inWaitlist')}
                  </MainButton>
                ) : !isAddedToProfile && !isFree ? (
                  <MainButton
                    variant="gradient"
                    size="md"
                    className="rounded-xl w-fit flex flex-row items-center"
                    onClick={handleStart}
                    disabled={startLoading}
                  >
                    {startLoading ? t('loading') : t('buy')}
                    {startLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin inline ml-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 inline ml-1" />
                    )}
                  </MainButton>
                ) : (
                  <div className="space-y-3">
                    {hasStarted && totalCount > 0 && (
                      <>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                            {t('module', { title: skillModules?.progress?.moduleTitile ?? "—" })}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                            {t('lesson', { done: completedCount, total: totalCount })}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#5d7bf5] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
                          />
                        </div>
                      </>
                    )}
                    <MainButton
                      variant="gradient"
                      size="md"
                      className="rounded-xl w-fit flex flex-row items-center"
                      onClick={handleStart}
                      disabled={startLoading}
                    >
                      {startLoading ? t('loading') : hasStarted ? t('continueLesson') : t('startNow')}
                      {startLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin inline ml-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 inline ml-1" />
                      )}
                    </MainButton>
                  </div>
                )}
              </motion.div>

              {/* Bottom Card - Partner */}
              {partner && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="bg-[#e6e6e7] rounded-[29px] lg:rounded-[40px] p-[17px] lg:p-6 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-5"
                >
                  <div className="bg-white rounded-[24px] h-[172px] lg:h-36 lg:w-36 lg:shrink-0 flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <Image
                        quality={90} src={mediaUrl(partner.logo)}
                        alt={partner.name}
                        width={134}
                        height={140}
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">
                        {partner.name}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-suisse font-semibold text-[#18181a] text-[28px] lg:text-3xl leading-[1.1] tracking-[-1.4px] capitalize mb-[22px]">
                      {t('partnership', { name: partner.name })}
                    </h3>
                    <p className="text-[#18181a] text-[16px] leading-[18px] tracking-[-0.8px] mb-6">
                      {partner.description}
                    </p>
                    <Link href={`/partners/${partner.id}`}>
                      <MainButton
                        variant="black"
                        size="sm"
                        className="rounded-[10px] border-0 text-[16px] flex flex-row items-center"
                      >
                        {t('details')}
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </MainButton>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Presale Section */}
      <PresaleSection courseId={skill?.id} courseType="skill" presale={skill?.preSales} originalPrice={skill?.price} isPurchased={isPurchased} />
      <WaitlistSection courseId={skill?.id} enrollmentCount={skill?.enrollmentCount} enabled={skill?.waitlistEnabled} isInWaitlist={skill?.isInWaitlist} hasPresale={!!skill?.preSales} />

      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 lg:p-12"
          >
            <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] text-[#18181a] mb-6">
              {t('learningTitle')}
            </h2>
            {skill.courseOutcomes ? (
              <div
                className="max-w-none text-[#18181A] [&_*]:text-[16px]! [&_*]:font-normal! [&_*]:leading-[21px]! [&_*]:tracking-[-0.8px]! [&_*]:text-[#18181A]! [&_strong]:font-semibold! [&_b]:font-semibold! [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: stripInlineFont(skill.courseOutcomes) }}
              />
            ) : (
              <NoData title={t('infoNotAdded')} />
            )}
          </motion.div>
        </div>
      </section>

      {/* Course Program Section */}
      <section id="kurs-dasturi" className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {t('programTitle')}
          </h2>
          <ModuleAccordion
            variant="light"
            modules={modules}
            overlayLocked={!isSkillReady}
            value={openModule}
            onValueChange={setOpenModule}
            freeBadgeClassName="bg-orange-500 hover:bg-orange-500 text-white"
            actionButtonClassName="bg-[#1ebb4a] hover:bg-[#19a842] text-white"
            onLessonClick={handleLessonClick}
            onTestClick={handleTestClick}
          />
        </div>
      </section>

      {/* Mentor Section */}
      {mentor && (
        <section id="mentor" className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] text-[#18181a] mb-6">
              {t('mentorTitle')}
            </h2>
            <MentorCard
              name={mentor.fullname}
              role={mentor.position}
              company=""
              experience={mentor.about}
              technologies=""
              image={mediaUrl(mentor.photo)}
              decorationUrl={
                mentor.decorImage ? mediaUrl(mentor.decorImage) : undefined
              }
              variant="light"
            />
          </div>
        </section>
      )}

      {/* CTA Button */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4 flex justify-center">
          <MainButton
            variant="gradient"
            size="lg"
            className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5] rounded-2xl w-full max-w-[70%] h-16 text-lg font-semibold flex flex-row items-center"
            onClick={handleStart}
            disabled={startLoading}
          >
            {startLoading
              ? t('loading')
              : !isAddedToProfile && !isFree
              ? t('buy')
              : hasStarted
              ? t('continueLesson')
              : t('startNow')}
            {startLoading ? (
              <Loader2 className="w-5 h-5 animate-spin inline ml-1" />
            ) : (
              <ArrowRight className="w-5 h-5 inline ml-1" />
            )}
          </MainButton>
        </div>
      </section>

      {/* Partner Banner */}
      <section id="hamkor" className="w-full py-8">
        <div className="container mx-auto px-4">
          {partner ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#18181a] rounded-[29px] lg:rounded-3xl p-[17px] lg:p-12 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-[30px] lg:gap-8">
                <div className="flex-1 text-white">
                  <h2 className="font-suisse text-[28px] lg:text-4xl font-semibold leading-[1.1] tracking-[-1.4px] capitalize mb-[22px]">
                    {t('partnerWith', { name: partner.name })}
                  </h2>
                  <p className="text-white text-[16px] lg:text-base leading-[18px] tracking-[-0.8px] mb-[26px]">
                    {partner.description}
                  </p>
                  <Link href={`/partners/${partner.id}`}>
                    <MainButton
                      variant="white"
                      size="lg"
                      className="rounded-[10px] h-11 text-[16px] flex flex-row items-center"
                    >
                      {t('details')}
                      <ArrowRight className="w-4 h-4 inline ml-2" />
                    </MainButton>
                  </Link>
                </div>
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-[24px] flex items-center justify-center h-[172px] lg:h-64 relative overflow-hidden">
                    {partner.logo ? (
                      <Image
                        quality={90} src={mediaUrl(partner.logo)}
                        alt={partner.name}
                        width={134}
                        height={140}
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-gray-600 font-bold text-xl">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <NoData title={t('noPartner')} />
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
