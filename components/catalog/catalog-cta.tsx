'use client';

import { useSearchParams } from 'next/navigation';

const CTA_TEXTS: Record<string, string> = {
  skills:
    "Skillar orqali bilimingizni bo\u2018shliqlarni to\u2018ldiring. Tez va amaliy mini-kurslar orqali Python, SQL, Prompt yozish kabi ko\u2018nikmalarni o\u2018rganing.",
  courses:
    "Kurslar bu mutaxassislar tayyorlagan to\u2018liq video-kurslar orqali o\u2018zingizga kerak yo\u2018nalishda chuqur bilim oling \u2014 Data Analytics, Machine Learning va boshqalar faqat \u201C01AI\u201Dda",
  professions:
    "Kasblar bu stajerovka, live darslar, mentorlar, student support, kompaniyalardagi real loyihalar va xalqaro sertifikat o\u2018z ichiga oladigan to\u2018liq ta\u2018lim dasturlari faqat \u201C01AI\u201Dda",
};

export function CatalogCta() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'skills';
  const text = CTA_TEXTS[tab] || CTA_TEXTS.skills;

  return (
    <section className="container pb-12! pt-4!">
      <div className="bg-[#EBEBEB] rounded-[22px] p-8 lg:p-10 text-center">
        <p className="text-[#1A1A1A] text-base lg:text-lg font-bold leading-relaxed max-w-lg mx-auto">
          {text}
        </p>
      </div>
    </section>
  );
}
