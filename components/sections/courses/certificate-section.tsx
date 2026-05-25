'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface CertificateSectionProps {
  certificate: {
    image: string;
    benefits: string[];
  };
  title?: string;
}

export function CertificateSection({ certificate, title }: CertificateSectionProps) {
  const t = useTranslations('courseSections');
  const displayTitle = title ?? t('certificateTitle');
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{displayTitle}</h2>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Left - Certificate Image Card */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <Image quality={95} src={certificate.image} alt="Certificate" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
            </div>

            {/* Right - Dark Text Card */}
            <div className="bg-[#18181a] text-white rounded-3xl p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-lg lg:text-xl font-semibold mb-2">{t('certificateSubtitle1')}</h3>
              <h4 className="text-xl lg:text-2xl font-bold mb-6">{t('certificateSubtitle2')}</h4>
              <ul className="space-y-3 text-sm lg:text-base text-gray-300 leading-relaxed">
                {certificate.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
