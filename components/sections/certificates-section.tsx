'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Certificate {
  id: number;
  title: string;
  badgeText: string;
  badgeColor: string;
  bullets: string[];
  image: string;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
  footnote?: string;
}

export function CertificatesSection({ certificates, footnote }: CertificatesSectionProps) {
  const t = useTranslations('certificatesSection');
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {/* Section Title */}
          <h2 className="font-suisse text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">{t('title')}</h2>

          {/* Certificates Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cert.id * 0.1 }}
                className="bg-[#2a2a2d] rounded-3xl overflow-hidden flex flex-col"
              >
                {/* Certificate Image with Background */}
                <div className="relative w-full aspect-[4/3]">
                  {/* <div className="absolute inset-0 bg-black/70 z-10"></div> */}

                  {/* Background Image */}
                  <Image
                    quality={95} src={`/images/professions/certificate-bg${index + 1}.webp`}
                    alt="Certificate background"
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover brightness-[0.3]"
                  />

                  {/* Certificate Image Centered */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                    <div className="relative w-full max-w-[300px] aspect-[4/3]">
                      <Image quality={95} src={cert.image} alt={cert.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain drop-shadow-2xl" />
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6 lg:p-8">
                  {/* Title */}
                  <h3 className="text-white font-bold text-2xl lg:text-3xl leading-tight mb-4">{cert.title}</h3>

                  {/* Badge */}
                  <div className="inline-block mb-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${cert.badgeColor}`}>{cert.badgeText}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {cert.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80 text-sm lg:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          {footnote && (
            <div className="bg-[#18181a] rounded-3xl p-6 lg:p-8">
              <p className="text-white/60 text-xs lg:text-sm leading-relaxed">{footnote}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
