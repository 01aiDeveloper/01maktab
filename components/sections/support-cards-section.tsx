'use client';

import { SupportCard } from '@/components/cards/support-card';

export function SupportCardsSection() {
  const supportCards = [
    {
      title: 'Support Teacher',
      subtitle: 'Shaxsiy yordam',
      bullets: ['Vazifalarni tekshirish', 'Savollarga javoblar', 'Individual konsultatsiyalar'],
      illustration: '/icons/professions/card-icon1.webp',
    },
    {
      title: 'Support Hours',
      subtitle: 'Har hafta',
      bullets: ['Qo\'shimcha tushuntirishlar', 'Murakkab mavzularni tahlil qilish', 'Real keyslarni muhokama qilish'],
      illustration: '/icons/professions/card-icon2.webp',
    },
    {
      title: 'Darslar yozuvlari',
      subtitle: 'Umrbod kirish',
      bullets: ['Barcha darslar yozuvlari', 'Istalgan vaqtda qayta ko\'rish', 'O\'z tezligingizda o\'qish'],
      illustration: '/icons/professions/card-icon3.webp',
    },
  ];

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-8 text-center">Doimo siz bilan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCards.map((card, index) => (
            <SupportCard key={index} title={card.title} subtitle={card.subtitle} bullets={card.bullets} illustration={card.illustration} />
          ))}
        </div>
      </div>
    </section>
  );
}
