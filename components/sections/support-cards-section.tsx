"use client"

import { SupportCard } from "@/components/cards/support-card"

export function SupportCardsSection() {
  const supportCards = [
    {
      title: "Support Teacher",
      subtitle: "Персональная помощь",
      bullets: [
        "Проверка заданий",
        "Ответы на вопросы",
        "Индивидуальные консультации"
      ],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vrjRNWNb492zL3W3jg57jS9GqwIn0u.png"
    },
    {
      title: "Support Hours",
      subtitle: "Каждую неделю",
      bullets: [
        "Дополнительные объяснения",
        "Разбор сложных тем",
        "Обсуждение реальных кейсов"
      ],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vrjRNWNb492zL3W3jg57jS9GqwIn0u.png"
    },
    {
      title: "Записи занятий",
      subtitle: "Пожизненный доступ",
      bullets: [
        "Записи всех занятий",
        "Пересмотр в любое время",
        "Обучение в своем темпе"
      ],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vrjRNWNb492zL3W3jg57jS9GqwIn0u.png"
    }
  ]

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
          Всегда рядом с вами
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCards.map((card, index) => (
            <SupportCard
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              bullets={card.bullets}
              illustration={card.illustration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
