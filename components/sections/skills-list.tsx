'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SkillsListProps {
  skills: string[];
  title?: string;
  icon?: string;
  delay?: number;
}

export function SkillsList({ skills, title = "Ko'nikmalar", icon = '/icons/skills.webp', delay = 0 }: SkillsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full"
    >
      <h3 className="font-suisse text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3 bg-[#e8e8e8] rounded-3xl p-6">
        <Image src={icon} alt={title} width={40} height={30} />
        {title}
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
