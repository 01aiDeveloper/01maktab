'use client';

import Image from 'next/image';
import { Heart, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface CourseStatsSectionProps {
  stats: {
    graduates: number | string;
    employmentRate: string;
    rating: string;
  };
}

export function CourseStatsSection({ stats }: CourseStatsSectionProps) {
  const t = useTranslations('courseSections');
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4"
        >
          {/* Left Large Image Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
            <Image src="/images/completeTeam.jpg" alt="Graduates" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-white fill-white" />
                <span className="text-white text-sm font-medium">{t('statsGraduates')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white">
                {typeof stats.graduates === 'number' ? stats.graduates.toLocaleString() : stats.graduates}
              </p>
            </div>
          </div>

          {/* Right Stacked Cards */}
          <div className="flex flex-col gap-4">
            {/* Top Right - Employment Card */}
            <div className="bg-[#18181a] rounded-3xl p-8 flex-1 flex flex-col justify-center relative">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">{t('statsEmployed')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white text-center">{stats.employmentRate}</p>
            </div>

            {/* Bottom Right - Salary Card */}
            <div className="bg-[#5d7bf5] rounded-3xl p-8 flex-1 flex flex-col justify-center relative">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">{t('statsSalary')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white text-center">{stats.rating}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
