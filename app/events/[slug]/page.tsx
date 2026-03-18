'use client';

import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { EventHero } from '@/components/events/event-hero';
import { EventAbout } from '@/components/events/event-about';
import { EventProgram } from '@/components/events/event-program';
import { EventBenefits } from '@/components/events/event-benefits';

const EVENT_DATA = {
  title: 'ML Contest',
  description: 'Eng kuchlilar bilan bellashing, real masalalarni yeching va stajirovka, sovrinlar va industriya e\'tirofiga imkoniyat qo\'lga kiriting.',
  date: '02.12.2025',
  location: 'IT Park, Muminov Street 4',
  about: {
    title: 'Tadbir haqida',
    content: 'ML Contest — bu IT sohasidagi yangi boshlovchi va junior-mutaxassislar uchun amaliy tanlov. Ishtirokchilar real keyslarni hal qiladi, jamoalarda ishlaydi va ish beruvchilar tomonidan qadrlanadigan tajriba oladi.',
  },
  program: [
    {
      id: 1,
      title: '1-bosqich. Ro\'yxatdan o\'tish va tanlov',
      items: [
        { order: 1, text: 'Ishtirokchilarni onlayn ro\'yxatdan o\'tkazish' },
        { order: 2, text: 'Yo\'nalish tanlash (Data, Frontend, Backend, UI/UX, QA va boshqalar)' },
        { order: 3, text: 'Darajani baholash uchun kirish topshirig\'i' },
      ],
    },
    {
      id: 2,
      title: '2-bosqich. ML Contest ochilishi',
      items: [],
    },
    {
      id: 3,
      title: '3-bosqich. Keyslar ustida ishlash',
      items: [],
    },
    {
      id: 4,
      title: '4-bosqich. Yechimlarni taqdim etish',
      items: [],
    },
    {
      id: 5,
      title: '5-bosqich. Mukofotlash va networking',
      items: [],
    },
  ],
  benefits: [
    'Amaliy tajriba va portfolioda tayyor keys',
    'IT-ekspertlardan qayta aloqa',
    'Ishtirokchi sertifikati',
    'Stajirovkaga yoki hamkor kompaniya jamoasiga kirish imkoniyati',
  ],
};

export default function EventPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#0b0b0b]">
        <EventHero event={EVENT_DATA} onBack={() => router.back()} />

        <div className="container mx-auto my-12 lg:my-16 max-w-[1200px] space-y-8 lg:space-y-12">
          <EventAbout title={EVENT_DATA.about.title} content={EVENT_DATA.about.content} />
          <EventProgram program={EVENT_DATA.program} />
          <EventBenefits benefits={EVENT_DATA.benefits} />
        </div>
      </main>

      <SiteFooter variant='dark' />
    </div>
  );
}
