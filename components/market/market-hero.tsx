'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function MarketHero() {
  return (
    <section className="container pt-6 pb-2">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        {/* Left: Dark card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-linear-to-br from-[#0A0A0A] to-[#1a1a1a] rounded-3xl p-7 lg:p-8 flex flex-col justify-between aspect-[641/360]"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white transition-colors text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga</span>
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Market
          </h1>
        </motion.div>

        {/* Right: 3D banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden bg-[#3B5BFF] aspect-[641/360]"
        >
          <Image
            src="/images/market/banner.webp"
            alt="Market banner"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
