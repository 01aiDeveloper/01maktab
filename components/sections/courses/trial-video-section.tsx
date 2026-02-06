'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MainButton } from '@/components/ui/main-button';

interface TrialVideoSectionProps {
  title?: string;
  subtitle?: string;
  videoImage?: string;
}

export function TrialVideoSection({
  title = "Kursni sinab ko'ring",
  subtitle = 'Dastlabki darslar bepul. Sizga yoqsa, davom eting',
  videoImage = '/images/courses/bg.webp',
}: TrialVideoSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <div className="bg-[#18181A] rounded-[40px] p-8 lg:p-16 text-center">
        <h2 className="font-suisse text-3xl lg:text-5xl font-semibold text-white mb-3">{title}</h2>
        <p className="text-white/80 text-base lg:text-lg mb-12">{subtitle}</p>

        <div className="relative max-w-[1175px] mx-auto rounded-[32px] overflow-hidden border-4 border-[#0066FF] shadow-2xl">
          <div className="aspect-video relative bg-gradient-to-br from-blue-900 to-blue-950">
            <Image src={videoImage} alt="Trial video" fill className="object-cover" />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <MainButton
            variant="gradient"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] hover:from-[#0052CC] hover:to-[#0052CC] shadow-lg"
          >
            Batal
          </MainButton>
        </div>
      </div>
    </section>
  );
}
