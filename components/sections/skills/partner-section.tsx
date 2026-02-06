'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MainButton } from '@/components/ui/main-button';

export interface Partner {
  name: string;
  logo: string;
  title: string;
  description: string;
}

interface PartnerSectionProps {
  partner: Partner;
  variant?: 'default' | 'light';
}

export function PartnerSection({ partner, variant = 'default' }: PartnerSectionProps) {
  if (variant === 'light') {
    return (
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[32px] p-8 lg:p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative h-16 w-32">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
            </div>
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{partner.title}</h2>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">{partner.description}</p>
            <MainButton
              variant="white"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="rounded-xl h-11 text-sm"
            >
              Batafsil
            </MainButton>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-3xl p-6 lg:p-8"
      >
        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="relative h-16 w-32 shrink-0">
            <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
          </div>
          <div>
            <h3 className="font-suisse font-bold text-gray-900 text-lg lg:text-xl mb-2">{partner.title}</h3>
            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3">{partner.description}</p>
            <MainButton
              variant="black"
              size="sm"
              icon={<ArrowRight className="w-3 h-3" />}
              iconPosition="right"
              className="rounded-xl border-0 text-xs"
            >
              Batafsil
            </MainButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
