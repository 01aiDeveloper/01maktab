'use client';

import { NoData } from '@/components/ui/no-data';
import { stripInlineFont } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface CourseDescriptionSectionProps {
  title: string;
  description: string;
}

export function CourseDescriptionSection({ title, description }: CourseDescriptionSectionProps) {
  const t = useTranslations('courseSections');
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
          <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] text-[#18181a] mb-6">{title}</h2>

          {description ? (
            <div className="max-w-none text-[#18181A] [&_*]:text-[16px]! [&_*]:font-normal! [&_*]:leading-[21px]! [&_*]:tracking-[-0.8px]! [&_*]:text-[#18181A]! [&_strong]:font-semibold! [&_b]:font-semibold! [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2" dangerouslySetInnerHTML={{ __html: stripInlineFont(description) }} />
          ) : (
            <NoData title={t('infoNotAdded')} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
