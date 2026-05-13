'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSmartBack } from '@/hooks/use-smart-back';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';

interface SkillHeroSectionProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
}

export function SkillHeroSection({ title, description, duration, level, price, image }: SkillHeroSectionProps) {
  const t = useTranslations('skillHero');
  const goBack = useSmartBack('/catalog?tab=skills');
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center"
        >
          <div className="space-y-6">
            <button onClick={goBack} className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{t('back')}</span>
            </button>

            <h1 className="font-suisse text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance text-gray-900">{title}</h1>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0 rounded-xl px-4 py-2.5 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {duration}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0 rounded-xl px-4 py-2.5 text-sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                {level}
              </Badge>
              <Badge className="bg-[#22c55e] hover:bg-[#22c55e] text-white border-0 rounded-xl px-4 py-2.5 text-sm font-medium">
                {price}
              </Badge>
            </div>

            <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6">{description}</p>

            <MainButton
              variant="gradient"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5] rounded-xl w-fit"
            >
              {t('startNow')}
            </MainButton>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden"
          >
            <Image src={image} alt={title} fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
