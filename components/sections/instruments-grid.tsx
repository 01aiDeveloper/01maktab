'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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
  title = 'Instrumentlar',
  icon = '/icons/instrument.webp',
  delay = 0.1,
}: InstrumentsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className=""
    >
      <h3 className="font-suisse text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3 bg-[#e8e8e8] rounded-3xl p-6">
        <Image src={icon} alt={title} width={40} height={30} />
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 bg-[#e8e8e8] rounded-3xl p-6">
        {instruments.map((instrument, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-900">
            <span className="text-2xl">{instrument.icon}</span>
            <span className="text-base font-medium">{instrument.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
