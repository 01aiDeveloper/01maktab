'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function MentorCommunicationSection() {
  const t = useTranslations('mentorComm');
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-4"
        >
          {/* Left Media Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[500px] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <Image quality={95} src="/icons/professions/bg.webp" alt="Live mentoring" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Phone image on top */}
            <div className="relative z-10">
              <Image
                quality={95} src="/images/professions/mentor-communication.webp"
                alt="mentor-communication-image"
                width={300}
                height={250}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content Card */}
          <div className="bg-[#2a2a2d] rounded-3xl p-8 lg:p-10 flex flex-col justify-center">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-6">{t('title')}</h2>

            <ul className="space-y-3 text-white/85">
              {[t('item1'), t('item2'), t('item3'), t('item4'), t('item5')].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm lg:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
