'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export interface Instrument {
  name: string;
  icon: string;
}

interface InstrumentsGridProps {
  instruments: Instrument[];
  title?: string;
  icon?: string;
  delay?: number;
}

export function InstrumentsGrid({
  instruments,
  title,
  icon = '/icons/instrument.webp',
  delay = 0.1,
}: InstrumentsGridProps) {
  const t = useTranslations('skillsInstruments');
  const displayTitle = title ?? t('instruments');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full"
    >
      <h3 className="font-suisse text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3 bg-[#e8e8e8] rounded-3xl p-6">
        <Image quality={90} src={icon} alt={displayTitle} width={40} height={30} />
        {displayTitle}
      </h3>
      <div className="flex-1 grid grid-cols-2 gap-4 bg-[#e8e8e8] rounded-3xl p-6 content-start">
        {instruments.map((instrument, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-900">
            {instrument.icon.startsWith('http') || instrument.icon.startsWith('/') ? (
              <Image quality={90} src={instrument.icon} alt={instrument.name} width={28} height={28} className="object-contain" />
            ) : (
              <span className="text-2xl">{instrument.icon}</span>
            )}
            <span className="text-base font-medium">{instrument.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
