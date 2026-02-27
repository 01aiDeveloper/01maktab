'use client';

import { GraduateCard } from '@/components/cards/graduate-card';

const graduatesData = [
  {
    id: 1,
    name: 'Sarvar Karimov',
    age: 27,
    previousRole: 'Из sales-менеджера в Data Analyst',
    currentRole: 'Сейчас: стажер Data Analyst в TBC Bank',
    story:
      'Сарвар пришёл на курс без коммерческого опыта в аналитике, но с большим интересом к данным. За время обучения он освоил SQL, Python и визуализацию данных, а уже после выпуска получил стажировку в одном из крупнейших банков страны.',
    image: '/images/graduates/1.png',
  },
  {
    id: 2,
    name: 'Lola Sharipova',
    age: 24,
    previousRole: 'От студента до Data Analyst',
    currentRole: 'Сейчас: Junior Data Analyst в IT-компании',
    story:
      'Лола сменила профессию и начала путь в аналитике с нуля. Практические проекты и поддержка менторов помогли ей собрать сильное портфолио и успешно пройти собеседование на позицию Junior Data Analyst.',
    image: '/images/graduates/2.png',
  },
];

export function GraduatesSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-white font-bold text-3xl lg:text-4xl mb-12 lg:mb-16">Наши выпускники</h2>

        {/* Graduates List */}
        <div className="space-y-8 lg:space-y-12">
          {graduatesData.map((graduate) => (
            <GraduateCard
              key={graduate.id}
              name={graduate.name}
              age={graduate.age}
              previousRole={graduate.previousRole}
              currentRole={graduate.currentRole}
              story={graduate.story}
              image={graduate.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
