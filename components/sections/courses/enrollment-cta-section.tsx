'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MainButton } from '@/components/ui/main-button';

interface EnrollmentCTASectionProps {
  title?: string;
  subtitle?: string;
  previewImage?: string;
}

export function EnrollmentCTASection({
  title,
  subtitle,
  previewImage = '',
}: EnrollmentCTASectionProps) {
  const t = useTranslations('courseSections');
  const displayTitle = title ?? t('ctaTitle');
  const displaySubtitle = subtitle ?? t('ctaSubtitle');
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-[#2A51E6] rounded-[40px] py-20 px-8 lg:px-16 overflow-hidden lg:min-h-[950px]">
          {/* Header texts */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <h2 className="font-suisse font-semibold text-4xl lg:text-[64px] lg:leading-[81px] tracking-[-0.05em] text-white text-center max-w-5xl">
              {displayTitle}
            </h2>
            <p className="font-suisse font-normal text-xl lg:text-[40px] lg:leading-[81px] tracking-[-0.05em] text-white text-center max-w-5xl">
              {displaySubtitle}
            </p>
          </div>

          {/* Image preview container - larger */}
          <div className="relative max-w-[856px] mx-auto rounded-[40px] overflow-hidden shadow-2xl mb-16">
            <div className="aspect-video relative bg-gray-900">
              <Image quality={90} src={'/images/courses/try-now.png'} alt="Course preview" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain" />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <Link href="/login">
              <MainButton
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-6 h-6" />}
                iconPosition="right"
                className="text-xl shadow-lg"
              >
                {t('ctaButton')}
              </MainButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
