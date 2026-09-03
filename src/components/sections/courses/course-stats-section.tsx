'use client';

import Image from 'next/image';
import { Heart, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function AnimatedMetric({ value }: { value: number | string }) {
  const text = String(value);
  const numericValue = Number.parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
  const suffix = text.replace(/[0-9.]/g, '');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setCurrent(numericValue);
      return;
    }

    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(numericValue * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericValue, reduceMotion]);

  return <span ref={ref}>{current}{suffix}</span>;
}

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
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
            <Image quality={90} src="/images/completeTeam.jpg" alt="Graduates" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-white fill-white" />
                <span className="text-white text-sm font-medium">{t('statsGraduates')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white">
                <AnimatedMetric value={stats.graduates} />
              </p>
            </div>
           </motion.div>

          {/* Right Stacked Cards */}
          <div className="flex flex-col gap-4">
            {/* Top Right - Employment Card */}
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="bg-[#18181a] rounded-3xl p-8 flex-1 flex flex-col justify-center relative">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">{t('statsEmployed')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white text-center"><AnimatedMetric value={stats.employmentRate} /></p>
            </motion.div>

            {/* Bottom Right - Salary Card */}
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="bg-[#5d7bf5] rounded-3xl p-8 flex-1 flex flex-col justify-center relative">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">{t('statsSalary')}</span>
              </div>
              <p className="text-7xl lg:text-8xl font-bold text-white text-center"><AnimatedMetric value={stats.rating} /></p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
