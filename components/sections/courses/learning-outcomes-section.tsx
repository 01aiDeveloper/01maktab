'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NoData } from '@/components/ui/no-data';
import { stripInlineFont } from '@/lib/utils';

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
          <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] text-[#18181a] mb-6">{displayTitle}</h2>
          {courseOutcomes ? (
            <div className="max-w-none text-[#18181A] [&_*]:text-[16px]! [&_*]:font-normal! [&_*]:leading-[21px]! [&_*]:tracking-[-0.8px]! [&_*]:text-[#18181A]! [&_strong]:font-semibold! [&_b]:font-semibold! [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2" dangerouslySetInnerHTML={{ __html: stripInlineFont(courseOutcomes) }} />
          ) : (
            <NoData title={t('infoNotAdded')} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
