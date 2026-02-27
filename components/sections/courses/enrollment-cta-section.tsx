'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MainButton } from '@/components/ui/main-button';

interface EnrollmentCTASectionProps {
  title?: string;
  subtitle?: string;
  previewImage?: string;
}

export function EnrollmentCTASection({
  title = "Hoziroq sinab ko'ring",
  subtitle = 'Birinchi darslarni bepul boshlang',
  previewImage = '',
}: EnrollmentCTASectionProps) {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-[#2A51E6] rounded-[40px] py-20 px-8 lg:px-16 overflow-hidden lg:min-h-[950px]">
          {/* Header texts */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <h2 className="font-suisse font-semibold text-4xl lg:text-[64px] lg:leading-[81px] tracking-[-0.05em] text-white text-center max-w-5xl">
              {title}
            </h2>
            <p className="font-suisse font-normal text-xl lg:text-[40px] lg:leading-[81px] tracking-[-0.05em] text-white text-center max-w-5xl">
              {subtitle}
            </p>
          </div>

          {/* Image preview container - larger */}
          <div className="relative max-w-[856px] mx-auto rounded-[40px] overflow-hidden shadow-2xl mb-16">
            <div className="aspect-video relative bg-gray-900">
              <Image src={'/images/courses/try-now.png'} alt="Course preview" fill className="object-contain" />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <MainButton
              variant="white"
              size="lg"
              icon={<ArrowRight className="w-6 h-6" />}
              iconPosition="right"
              className="text-xl shadow-lg"
            >
              Batafsil
            </MainButton>
          </div>
        </div>
      </div>
    </section>
  );
}
