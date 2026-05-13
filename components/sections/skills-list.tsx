'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SkillsListProps {
  skills: string[];
  title?: string;
  icon?: string;
  delay?: number;
}

export function SkillsList({ skills, title, icon = '/icons/skills.webp', delay = 0 }: SkillsListProps) {
  const t = useTranslations('skillsInstruments');
  const displayTitle = title ?? t('skills');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full"
    >
      <h3 className="font-suisse text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3 bg-[#e8e8e8] rounded-3xl p-6">
        <Image src={icon} alt={displayTitle} width={40} height={30} />
        {displayTitle}
      </h3>
      <ul className="flex-1 space-y-3 bg-[#e8e8e8] rounded-3xl p-6">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-900">
            <CheckCircle2 className="w-5 h-5 text-gray-600 shrink-0" />
            <span className="text-base">{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
