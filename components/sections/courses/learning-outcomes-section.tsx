'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NoData } from '@/components/ui/no-data';

interface LearningOutcome {
  title: string;
  description: string;
}

interface LearningOutcomesSectionProps {
  courseOutcomes?:  string;
  title?: string;
}

export function LearningOutcomesSection({ courseOutcomes, title }: LearningOutcomesSectionProps) {
  const t = useTranslations('courseSections');
  const displayTitle = title ?? t('learningOutcomesTitle');
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 lg:p-12"
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{displayTitle}</h2>
          {courseOutcomes ? (
            <div className="prose prose-sm lg:prose-base max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: courseOutcomes }} />
          ) : (
            <NoData title={t('infoNotAdded')} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
