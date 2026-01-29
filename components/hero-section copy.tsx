'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  userName?: string;
}

export function HeroSection({ userName = 'Aziz' }: HeroSectionProps) {
  return (
    <section className="w-full py-6">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[480px]">
          {/* Left Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden"
          >
            {/* Back Link */}
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-8 transition-colors w-fit">
              <ArrowLeft className="h-4 w-4" />
              <span>Bosh sahifaga qaytish</span>
            </Link>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              {"Biz bilan birga bo'lganingiz uchun rahmat, "}
              <span className="text-gray-900">{userName}!</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-base md:text-lg"
            >
              Har bir yangi bilim sizni orzuyingizga bir qadam yaqinlashtiradi!
            </motion.p>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="bg-[#c4b5fd] rounded-3xl overflow-hidden relative h-[300px] lg:h-full"
          >
            <Image src="/images/hero-img.png" alt="Friendly purple monster mascot" fill className="object-cover object-center" priority />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
