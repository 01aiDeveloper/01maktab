'use client';

import { ArrowLeft, ArrowRight, Clock, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MainButton } from '@/components/ui/main-button';
import { Badge } from '@/components/ui/badge';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import type { ModuleItem } from '@/components/shared/module-accordion';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MentorCard } from '@/components/cards/mentor-card';
import { useSkill } from '@/hooks/use-skill';
import { useSkillModules } from '@/hooks/use-course-modules';
import { baseMediaUrl } from '@/lib/utils';
import type { ApiSkillModule } from '@/types/api';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function difficultyLabel(difficulty: string): string {
  const map: Record<string, string> = {
    BEGINNER: "Boshlang'ich",
    INTERMEDIATE: "O'rta",
    ADVANCED: 'Yuqori',
  };
  return map[difficulty] ?? difficulty;
}

function toModuleItem(m: ApiSkillModule): ModuleItem {
  return {
    id: String(m.id),
    title: m.title,
    darsCount: m.lessons.length,
    testCount: m.tests.length,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      isFree: l.isPublic,
      type: 'video' as const,
    })),
    test: m.tests.length > 0 ? { id: String(m.tests[0].id), title: m.tests[0].name } : undefined,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SkillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data: skill, isLoading, isError } = useSkill(slug);
  const { data: skillModules } = useSkillModules(skill?.id);
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!skill) return;
    setStartLoading(true);
    try {
      await api.post(`/course/${skill.id}/enroll`);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 400) {
        router.push(`/payment/${skill.id}?courseType=skill`);
        return;
      }
    }
    const modules = skillModules?.modules ?? [];
    const firstModule = modules[0];
    const firstLesson = firstModule?.lessons?.[0];
    if (firstModule && firstLesson) {
      router.push(`/module/${firstModule.id}?lessonId=${firstLesson.id}&courseType=skill&courseId=${skill.id}`);
      return;
    }
    setStartLoading(false);
  }, [skill, skillModules, router]);

  if (skill && !openModule && skill.modules.length > 0) {
    setOpenModule(String(skill.modules[0].id));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader />
        <PageLoader />
      </div>
    );
  }

  if (isError || !skill) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader />
        <PageError />
        <SiteFooter />
      </div>
    );
  }

  const partner = skill.partners[0] ?? null;
  const modules: ModuleItem[] = skill.modules.map(toModuleItem);
  const mentor = skill.mentor;
  const priceLabel = skill.pricingType === 'FREE' ? 'Bepul' : `${skill.price.toLocaleString()} so'm`;
  const courseImage = mediaUrl(skill.photo);

  const handleLessonClick = (lesson: { id: string | number }, ctx: { module: ModuleItem }) => {
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=skill&courseId=${skill.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <SiteHeader />

      {/* Hero Section */}
      <section className="w-full py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Top Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col relative overflow-hidden"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors w-fit"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Orqaga</span>
                </Link>

                <h1 className="font-suisse text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {skill.title}
                </h1>

                {skill.description && (
                  <div
                    className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: skill.description }}
                  />
                )}

                <MainButton
                  variant="gradient"
                  size="lg"
                  icon={startLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5] rounded-xl w-fit"
                  onClick={handleStart}
                  disabled={startLoading}
                >
                  {startLoading ? 'Yuklanmoqda...' : 'Xoziroq boshlash'}
                </MainButton>
              </motion.div>

              {/* Bottom Card - Partner */}
              {partner && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  className="bg-[#e8e8e8] rounded-3xl p-6 flex items-center gap-4"
                >
                  <div className="w-20 h-20 lg:w-36 lg:h-36 bg-white rounded-2xl flex items-center justify-center shrink-0">
                    {partner.logo ? (
                      <Image
                        src={mediaUrl(partner.logo)}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="object-contain p-4"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">{partner.name}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-suisse font-bold text-gray-900 text-lg lg:text-xl mb-2">
                      Hamkorlik - {partner.name}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3">{partner.description}</p>
                    <MainButton
                      variant="black"
                      size="sm"
                      icon={<ArrowRight className="w-3 h-3" />}
                      iconPosition="right"
                      className="rounded-xl border-0 text-xs"
                    >
                      Batafsil
                    </MainButton>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="bg-linear-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-3xl overflow-hidden relative h-100 lg:h-full"
            >
              {courseImage && (
                <Image src={courseImage} alt={skill.title} fill className="object-cover" priority />
              )}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm w-fit backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5" />
                  Davomiylik: {skill.duration} soat
                </Badge>
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm w-fit backdrop-blur-sm">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Daraja: {difficultyLabel(skill.difficulty)}
                </Badge>
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium w-fit backdrop-blur-sm">
                  Narxi: {priceLabel}
                </Badge>
              </div>
              {skill.icon && (
                <div className="absolute bottom-6 right-6 w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Image src={mediaUrl(skill.icon)} alt="icon" width={28} height={28} className="object-contain" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Program Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Kurs dasturi</h2>
          <ModuleAccordion
            variant="light"
            modules={modules}
            value={openModule}
            onValueChange={setOpenModule}
            freeBadgeClassName="bg-orange-500 hover:bg-orange-500 text-white"
            actionButtonClassName="bg-[#1ebb4a] hover:bg-[#19a842] text-white"
            onLessonClick={handleLessonClick}
          />
        </div>
      </section>

      {/* Mentor Section */}
      {mentor && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Skill mentori</h2>
            <MentorCard
              name={mentor.fullname}
              role={mentor.position}
              company=""
              experience={mentor.about}
              technologies=""
              image={mediaUrl(mentor.photo)}
              decorationUrl={mentor.decorImage ? mediaUrl(mentor.decorImage) : undefined}
              variant="light"
            />
          </div>
        </section>
      )}

      {/* Mobile CTA */}
   

      {/* Partner Banner */}
      {partner && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] rounded-3xl p-8 lg:p-12 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-white">
                  <h2 className="font-suisse text-2xl lg:text-4xl font-bold mb-4">
                    {partner.name} bilan hamkorlikda
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">{partner.description}</p>
                  {partner.website && (
                    <MainButton
                      variant="white"
                      size="lg"
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                      className="rounded-xl h-11 text-sm"
                    >
                      Batafsil
                    </MainButton>
                  )}
                </div>
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-2xl p-8 lg:p-12 flex items-center justify-center aspect-square lg:aspect-auto lg:h-64">
                    {partner.logo ? (
                      <Image
                        src={mediaUrl(partner.logo)}
                        alt={partner.name}
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-gray-600 font-bold text-xl">{partner.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
