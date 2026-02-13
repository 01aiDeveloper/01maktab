'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';

const PARTNER_DATA = {
  name: 'TBC Bank',
  description:
    'Мақсад IT TBC Bankda дастурий таъминот, мобиль илова, махсулот ва IT стратегиясига регионал старт таклиф.',
  logo: '/images/partners/tbc.png',
  about: {
    title: 'О партнерстве',
    content: `В нашем партнерстве используем образовательную платформу Maktab01 получают возможность пройти стажировку в TBC Bank — одном из крупнейших финансовых институтов Узбекистана и Закавказья.

Стажировка позволяет студентам применить полученные знания на практике, освоить профессиональные среды разработки и научиться решать реальные бизнес-задачи в команде IT-специалистов высокого уровня.

Для Maktab01 это партнерство — подтверждение качества обучения и признание требований рынка. Для стажеров — это система раскрытия новой цели обучения, профессионального роста и возможный старт карьеры.

Мы верим, что сотрудничество с такими компаниями, как TBC Bank, формирует будущее IT-индустрии.`,
    image: '/images/partners/demo.webp',
  },
};

export default function PartnerPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen ">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </Link>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-16">
          {/* Left: Content Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {PARTNER_DATA.name}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              {PARTNER_DATA.description}
            </p>
            <Button size="lg" className="w-fit rounded-xl">
              Подробнее о партнере
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Logo Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <Image
                src={PARTNER_DATA.logo}
                alt={PARTNER_DATA.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Partnership Section */}
        <section className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {PARTNER_DATA.about.title}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
              {PARTNER_DATA.about.content}
            </p>
          </div>

          {/* Partnership Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6">
            <Image
              src={PARTNER_DATA.about.image}
              alt="Partnership"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="rounded-xl">
              Подробнее о партнере
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Bottom Spacing */}
        <div className="h-12" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
