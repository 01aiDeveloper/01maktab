'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SupportCardProps {
  title: string;
  subtitle: string;
  bullets: string[];
  illustration: string;
}

export function SupportCard({ title, subtitle, bullets, illustration }: SupportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#2a2a2d] rounded-3xl p-6 lg:p-8 flex flex-col min-h-[320px] relative"
    >
      {/* Text content - takes up most space */}
      <div className="flex-1 mb-16">
        <h3 className="font-suisse text-lg lg:text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-white/70 text-sm lg:text-base mb-4">{subtitle}</p>

        <ul className="space-y-2 text-white/85">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-1.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative illustration - anchored to bottom-right */}
      <div className="absolute bottom-0 right-0 w-24 h-24 lg:w-36 lg:h-36">
        <Image src={illustration} alt={title} fill className="object-cover" />
      </div>
    </motion.div>
  );
}
