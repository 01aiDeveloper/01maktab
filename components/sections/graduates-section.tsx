'use client';

import { GraduateCard } from '@/components/cards/graduate-card';

const graduatesData = [
  {
    id: 1,
    name: 'Sarvar Karimov',
    age: 27,
    previousRole: 'Sales-menejerdan Data Analitikga',
    currentRole: 'Hozir: TBC Bankda Data Analyst stajyor',
    story:
      'Sarvar kursga analitikada tijorat tajribasiz, lekin ma\'lumotlarga katta qiziqish bilan keldi. O\'qish davomida u SQL, Python va ma\'lumotlarni vizualizatsiya qilishni o\'zlashtirib, bitirganidan so\'ng mamlakatdagi eng yirik banklardan birida stajirovka oldi.',
    image: '/images/graduates/1.png',
  },
  {
    id: 2,
    name: 'Lola Sharipova',
    age: 24,
    previousRole: 'Talabadan Data Analitikga',
    currentRole: 'Hozir: IT-kompaniyada Junior Data Analyst',
    story:
      'Lola kasbini o\'zgartirib, analitikada noldan yo\'l boshladi. Amaliy loyihalar va mentorlar yordami unga kuchli portfolio to\'plashga va Junior Data Analyst lavozimiga suhbatdan muvaffaqiyatli o\'tishga yordam berdi.',
    image: '/images/graduates/2.png',
  },
];

export function GraduatesSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-white font-bold text-3xl lg:text-4xl mb-12 lg:mb-16">Bizning bitiruvchilar</h2>

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
