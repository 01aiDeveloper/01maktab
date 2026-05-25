'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Bell, Clock, BarChart3, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import type { ModuleItem } from '@/components/shared/module-accordion';
import { MentorCard } from '@/components/cards/mentor-card';
import { PageLoader } from '@/components/ui/page-loader';
import { useSkill } from '@/hooks/use-skill';
import { useMyWaitlist } from '@/hooks/use-waitlist';
import { baseMediaUrl } from '@/lib/utils';
import type { ApiSkillModule } from '@/types/api';

interface PresaleQueuePageProps {
  /** Skill slug or id — used to fetch all data dynamically */
  courseSlug: string;
  backHref?: string;
}

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function getDifficultyKey(d: string): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null {
  if (d === 'BEGINNER' || d === 'INTERMEDIATE' || d === 'ADVANCED') return d;
  return null;
}

function toModuleItem(m: ApiSkillModule): ModuleItem {
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
      isFree: l.isPublic,
      type: 'video' as const,
    })),
    test: tests.length > 0 ? { id: String(tests[0].id), title: tests[0].name } : undefined,
  };
}

export function PresaleQueuePage({ courseSlug, backHref = '/classroom' }: PresaleQueuePageProps) {
  const t = useTranslations('presaleQueue');
  const { data: skill, isLoading: skillLoading } = useSkill(courseSlug);
  const { data: waitlistEntries, isLoading: waitlistLoading } = useMyWaitlist();

  const [openModule, setOpenModule] = useState<string>('');

  if (skillLoading || waitlistLoading) return <PageLoader />;
  if (!skill) return null;

  // Find the current user's queue number for this course
  const waitlistEntry = waitlistEntries?.find((w) => w.id === skill.id);
  const queueNumber = waitlistEntry?.queueNumber ?? 0;

  const modules: ModuleItem[] = skill.modules.map(toModuleItem);
  if (modules.length > 0 && !openModule) {
    // will set on next render
  }

  const partner = skill.partners[0] ?? null;
  const mentor = skill.mentor;
  const courseImage = mediaUrl(skill.cardImage || skill.photo);
  const priceLabel = skill.pricingType === 'FREE' ? t('free') : `${skill.price.toLocaleString()} ${t('currencySom')}`;
  const difficultyKey = getDifficultyKey(skill.difficulty);
  const difficultyLabel = difficultyKey ? t(`difficulty.${difficultyKey}`) : skill.difficulty;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero: two-column layout */}
      <section className="w-full py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Queue info card — green gradient */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[29px] lg:rounded-[40px] p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[400px]"
              style={{ background: 'linear-gradient(93.13deg, #CAE25B -36.46%, #00DB30 102.2%)' }}
            >
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors w-fit mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('back')}</span>
              </Link>

              <h1 className="font-suisse text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                {t('inWaitlist')}
              </h1>

              <div className="space-y-3 mt-auto">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2.5 text-sm font-medium text-black">
                  <Users className="w-4 h-4" />
                  <span>{t('yourQueue', { n: queueNumber })}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-white">
                  <Bell className="w-4 h-4 shrink-0" />
                  <span>{t('notification')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Course image card — blue gradient */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="bg-gradient-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-[29px] lg:rounded-[40px] overflow-hidden relative min-h-[300px] lg:min-h-[400px]"
            >
              {courseImage && (
                <Image
                  quality={95} src={courseImage}
                  alt={skill.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              )}

              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {t('duration', { hours: skill.duration })}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <Banknote className="w-3.5 h-3.5 shrink-0" />
                  {t('price', { price: priceLabel })}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  {t('level', { level: difficultyLabel })}
                </Badge>
              </div>

              {partner && (
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 z-10">
                  <span className="text-white/70 text-xs">{t('createdWith')}</span>
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2">
                    {partner.logo && (
                      <Image quality={95} src={mediaUrl(partner.logo)} alt={partner.name} width={20} height={20} className="object-contain" />
                    )}
                    <span className="text-black text-xs font-bold">{partner.name}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Module accordion */}
      {modules.length > 0 && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <ModuleAccordion
              variant="light"
              modules={modules}
              value={openModule || String(modules[0]?.id ?? '')}
              onValueChange={setOpenModule}
            />
          </div>
        </section>
      )}

      {/* Mentor section */}
      {mentor && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {t('mentorTitle')}
            </h2>
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

      {/* Partner banner */}
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
                    {t('partnerWith', { name: partner.name })}
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                    {partner.description}
                  </p>
                  <Link href={`/partners/${partner.id}`}>
                    <button className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-black font-medium text-sm transition-colors hover:bg-gray-100">
                      {t('details')}
                    </button>
                  </Link>
                </div>
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-2xl flex items-center justify-center aspect-square lg:aspect-auto lg:h-64 relative overflow-hidden p-8">
                    {partner.logo ? (
                      <Image
                        quality={95} src={mediaUrl(partner.logo)}
                        alt={partner.name}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain p-8"
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
    </div>
  );
}
