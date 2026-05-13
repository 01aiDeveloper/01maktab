'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  userName?: string;
}

export function HeroSection({ userName = 'Aziz' }: HeroSectionProps) {
  const t = useTranslations('userHome');
  return (
    <section className="w-full py-6">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[480px]">
          {/* Left Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12 flex flex-col justify-start relative overflow-hidden"
          >
            {/* Back Link - desktop only */}
            <Link href="/" className="hidden lg:inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors w-fit">
              <Home className="h-4 w-4" />
              <span>{t('backHome')}</span>
            </Link>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 lg:mt-25"
            >
              {t('greeting', { name: userName })}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-base md:text-lg"
            >
              {t('tagline')}
            </motion.p>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="order-1 lg:order-2 bg-[#c4b5fd] rounded-3xl overflow-hidden relative h-90 lg:h-full"
          >
            {/* Back Link - mobile only, on top of image */}
            <Link href="/" className="lg:hidden absolute top-4 left-4 z-10 inline-flex items-center gap-2 text-white text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 transition-colors hover:bg-white/30">
              <Home className="h-4 w-4" />
              <span>{t('backHome')}</span>
            </Link>
            <Image src="/images/hero-img.png" alt="Friendly purple monster mascot" fill className="object-cover object-center" priority />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
