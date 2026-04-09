'use client';

import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePresale } from '@/hooks/use-presale';

interface PresaleDisabledSectionProps {
  courseId?: number;
}

function formatPrice(price: number) {
  return price.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

export function PresaleDisabledSection({ courseId }: PresaleDisabledSectionProps) {
  const { data: presale, isLoading } = usePresale(courseId);

  // Don't render if loading or no presale data, or if presale IS active (use PresaleSection instead)
  if (isLoading || !presale || presale.isActive) return null;

  const { originalPrice, presalePrice, discountPercent } = presale;

  return (
    <section className="w-full py-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[29px] lg:rounded-[40px] p-6 pb-32 sm:pb-6 lg:p-8 lg:pr-52 opacity-60"
          style={{ background: 'linear-gradient(93.13deg, #CAE25B -36.46%, #00DB30 102.2%)' }}
        >
          <div className="relative z-10 space-y-3 flex flex-col items-center sm:items-start">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-black text-sm font-medium">
              <span>Sotuvga chiqmagan</span>
            </div>

            {/* Price row */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 flex-wrap">
              <span className="text-white line-through decoration-red-500 decoration-2 text-lg lg:text-2xl font-bold italic">
                {formatPrice(originalPrice)} so&apos;m
              </span>
              <span className="text-white text-2xl sm:hidden">&darr;</span>
              <span className="text-white hidden sm:inline text-4xl">&rarr;</span>
              <span className="bg-[#FFE500] text-black font-suisse text-3xl lg:text-5xl font-bold tracking-tight rounded-full px-6 py-1 lg:px-8 lg:py-2">
                {formatPrice(presalePrice)} so&apos;m
              </span>
            </div>

            {/* Disabled button */}
            <div className="pt-2">
              <button
                disabled
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white/30 text-white font-medium text-sm cursor-not-allowed"
              >
                Sotuvga chiqishi kutilmoqda
              </button>
            </div>
          </div>

          {/* Dynamic discount badge — greyscale for disabled */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 sm:bottom-4 lg:right-6 lg:bottom-6 z-10 grayscale">
            <div className="flex flex-col items-center justify-center gap-0.5">
              <div className="flex items-center gap-1 text-white text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Maxsus taklif</span>
              </div>
              <div className="bg-[#FFE500] text-black rounded-lg px-4 py-1 font-suisse font-extrabold text-xl lg:text-2xl leading-none">
                Chegirma
              </div>
              <div className="text-[#0a2fff] font-suisse font-black text-4xl lg:text-5xl leading-none">
                -{discountPercent}%
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
