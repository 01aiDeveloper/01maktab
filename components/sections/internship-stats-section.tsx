'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ProgressRingCard } from '@/components/cards/progress-ring-card';

export function InternshipStatsSection() {
  const t = useTranslations('internshipStats');
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {/* Top Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#2a2a2d] rounded-3xl p-8 lg:p-10"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Left Icon/Illustration */}
              <div className="w-24 h-24 lg:w-1/5 lg:h-28 flex-shrink-0 relative flex items-center justify-center">
                {/* <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center"> */}
                  <Image quality={90} src="/icons/professions/internship.webp" alt="Internship icon" width={164} height={164} className="object-contain" />
                {/* </div> */}
              </div>

              {/* Right Text Block */}
              <div className="flex-1">
                <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-3">{t('title')}</h2>
                <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-2xl">
                  {t('description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Statistics Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Card 1 - Blue 85% */}
            <ProgressRingCard variant="blue" percent={85} label={t('stat1Label')} icon="graduation" />

            {/* Card 2 - Dark 60% */}
            <ProgressRingCard variant="dark" percent={60} label={t('stat2Label')} icon="briefcase" />
          </div>
        </div>
      </div>
    </section>
  );
}
