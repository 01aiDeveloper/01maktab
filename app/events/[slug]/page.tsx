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
  description: 'Соревнуйся с сильнейшими, решай реальные задачи и получи шанс на стажировку, призы и признание индустрии.',
  date: '02.12.2025',
  location: 'IT Park, Muminov Street 4',
  about: {
    title: 'О мероприятии',
    content: 'ML Contest — это практический конкурс для начинающих и junior-специалистов в IT. Участники решают реальные кейсы, работают в командах и получают опыт, который ценится работодателями.',
  },
  program: [
    {
      id: 1,
      title: 'Этап 1. Регистрация и отбор',
      items: [
        { order: 1, text: 'Онлайн-регистрация участников' },
        { order: 2, text: 'Выбор направления (Data, Frontend, Backend, UI/UX, QA и др.)' },
        { order: 3, text: 'Входное задание для оценки уровня' },
      ],
    },
    {
      id: 2,
      title: 'Этап 2. Открытие ML Contest',
      items: [],
    },
    {
      id: 3,
      title: 'Этап 3. Работа над кейсами',
      items: [],
    },
    {
      id: 4,
      title: 'Этап 4. Презентация решений',
      items: [],
    },
    {
      id: 5,
      title: 'Этап 5. Награждение и нетворкинг',
      items: [],
    },
  ],
  benefits: [
    'Практический опыт и готовый кейс в портфолио',
    'Обратную связь от IT-экспертов',
    'Сертификат участника',
    'Шанс попасть на стажировку или в команду компании-партнёра',
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
