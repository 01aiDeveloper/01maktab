'use client';

import Image from 'next/image';
import { ArrowLeft, Clock, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/use-smart-back';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';

interface SkillDisabledHeroProps {
  title: string;
  subtitle?: string;
  duration: number;
  price: number;
  difficulty: string;
  courseImage: string;
  icon?: string;
}

function getDifficultyKey(difficulty: string): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null {
  if (difficulty === 'BEGINNER' || difficulty === 'INTERMEDIATE' || difficulty === 'ADVANCED') {
    return difficulty;
  }
  return null;
}

export function SkillDisabledHero({
  title,
  subtitle,
  duration,
  price,
  difficulty,
  courseImage,
  icon,
}: SkillDisabledHeroProps) {
  const t = useTranslations('skillHero');
  const goBack = useSmartBack('/catalog?tab=skills');
  const priceLabel = price === 0 ? t('free') : `${price.toLocaleString()} ${t('currencySom')}`;
  const difficultyKey = getDifficultyKey(difficulty);
  const difficultyLabel = difficultyKey ? t(`difficulty.${difficultyKey}`) : difficulty;

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="bg-linear-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-[29px] lg:rounded-[40px] overflow-hidden relative h-80 lg:h-full order-first lg:order-last"
          >
            {courseImage && (
              <Image
                quality={100} src={courseImage}
                alt={title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover grayscale-[30%] opacity-80"
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

            <div className="absolute top-6 left-6 lg:top-auto lg:left-auto lg:bottom-6 lg:right-6 z-10">
              <Badge className="bg-orange-500 text-white border-0 rounded-full px-4 py-2 text-xs font-semibold">
                {t('notOnSale')}
              </Badge>
            </div>

            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
              <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm backdrop-blur-[119px]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {t('duration', { hours: duration })}
              </Badge>
              <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-[119px]">
                {t('price', { price: priceLabel })}
              </Badge>
              <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm backdrop-blur-[119px]">
                <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                {t('level', { level: difficultyLabel })}
              </Badge>
            </div>

            {icon && (
              <div className="absolute top-6 right-6 w-12 h-12 lg:w-14 lg:h-14 bg-white/25 rounded-full flex items-center justify-center shadow-lg">
                <Image
                  quality={100} src={icon}
                  alt="icon"
                  width={28}
                  height={28}
                  className="object-contain"
                  style={{ backdropFilter: 'blur(19.368366241455078px)' }}
                />
              </div>
            )}
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-2 order-last lg:order-first">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-[29px] lg:rounded-[40px] p-6 lg:p-8 flex flex-col relative overflow-hidden"
            >
              <button
                onClick={goBack}
                className="hidden lg:inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors w-fit cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('back')}</span>
              </button>

              <h1 className="font-suisse text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {title}
              </h1>

              {subtitle && (
                <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6 line-clamp-10">
                  {subtitle}
                </p>
              )}

              <MainButton
                variant="gradient"
                size="md"
                className="rounded-xl w-fit flex flex-row items-center opacity-50 cursor-not-allowed"
                disabled
              >
                {t('preRegister')}
              </MainButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
