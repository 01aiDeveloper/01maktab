'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Users, FileText, Heart, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/use-smart-back';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { baseMediaUrl } from '@/lib/utils';

interface CourseProgress {
  moduleTitile: string | null;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

interface CourseBadgeDisplay {
  id: number;
  title: string;
  icon: string;
  description: string;
}

interface CourseHeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  videosCount: number;
  tasksCount: number;
  projectsCount: number;
  duration: string;
  level: string;
  price: string;
  stats: {
    graduates: number;
  };
  progress?: CourseProgress | null;
  onStart?: () => void;
  startLoading?: boolean;
  badges?: CourseBadgeDisplay[];
  isAddedToProfile?: boolean;
  isFree?: boolean;
}

export function CourseHeroSection({
  title,
  subtitle,
  description,
  image,
  videosCount,
  tasksCount,
  projectsCount,
  duration,
  level,
  price,
  stats,
  progress,
  onStart,
  startLoading = false,
  badges = [],
  isAddedToProfile = false,
  isFree = false,
}: CourseHeroSectionProps) {
  const t = useTranslations('courseHero');
  const tSkill = useTranslations('skillDetail');
  const goBack = useSmartBack('/catalog?tab=courses');
  const completedCount = progress?.completedLessonsCount ?? 0;
  const totalCount = progress?.totalLessonsCount ?? 0;
  const hasStarted = isAddedToProfile && completedCount > 0;
  const progressPercent = hasStarted && totalCount > 0
    ? Math.round((completedCount / totalCount) * 100)
    : 0;
  const buttonLabel = startLoading
    ? t('loading')
    : !isAddedToProfile && !isFree
    ? tSkill('buy')
    : hasStarted
    ? tSkill('continueLesson')
    : tSkill('startNow');
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 h-[511px] lg:h-[calc(100vh-90px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[29px] lg:rounded-[40px] overflow-hidden relative h-full"
        >
          {/* Background Image */}
          <Image
            src={image}
            alt={title}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top"
            priority
            quality={90}
          />

          {/* Content Overlay — fonni oqartirmaymiz, matn o'qilishi text-shadow halo orqali */}
          <div className="relative z-10 p-6 lg:p-12 flex flex-col justify-center h-full [text-shadow:0_1px_18px_rgba(255,255,255,0.9),0_1px_3px_rgba(255,255,255,0.8)]">
            {/* Back button */}
            <button onClick={goBack} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">{t('back')}</span>
            </button>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {t('videoHours', { count: videosCount })}
              </Badge>
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('topicsCount', { count: tasksCount })}
              </Badge>
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                {t('projectsCount', { count: projectsCount })}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-6 max-w-2xl">
              <MainTitle className="mb-4 leading-tight!">{title}</MainTitle>
              {subtitle && (
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-6">{subtitle}</p>
              )}
              {hasStarted && progress ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                      {t('moduleLabel', { title: progress.moduleTitile ?? '—' })}
                    </span>
                    <span className="text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                      {t('lessonLabel', { done: progress.completedLessonsCount, total: progress.totalLessonsCount })}
                    </span>
                  </div>
                  <div className="w-full max-w-sm bg-white/30 rounded-full h-2">
                    <div
                      className="bg-[#5d7bf5] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : null}
              <MainButton
                variant="gradient"
                size="md"
                icon={startLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5]"
                onClick={onStart}
                disabled={startLoading}
              >
                {buttonLabel}
              </MainButton>
            </div>

            {/* Course badges (plashkalar) */}
            {badges.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    className="bg-[#5d7bf5] text-white border-0 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg"
                    title={badge.description}
                  >
                    {badge.icon && (
                      <Image
                        quality={90} src={badge.icon.startsWith('http') ? badge.icon : `${baseMediaUrl}/${badge.icon}`}
                        alt={badge.title}
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    )}
                    {badge.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Bottom stats badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {level}
              </Badge>
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <FileText className="w-4 h-4 mr-2" />
                {t('noCreativityNeeded')}
              </Badge>
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2 text-red-500 fill-red-500" />
                {t('studentsStarted', { count: stats.graduates.toLocaleString() })}
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
