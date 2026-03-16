"use client"

import { EventCard } from "@/components/shared/event-card"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"

const EVENTS = [
  {
    title: "ML Contest",
    category: "ML Contest",
    date: "02.12.2025",
    imageUrl: "/images/event.webp",
  },
  {
    title: "ML Party",
    imageUrl: "/images/event.webp",
    locked: true,
    subtitle: "Регистрация скоро откроется",
  },
  {
    title: "ML Gap",
    imageUrl: "/images/event.webp",
    locked: true,
    subtitle: "Регистрация скоро откроется",
  },
]

export function EventsSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-8 md:py-10">
      <div className="container">
        <div className="text-center">
          <MainTitle
            align="center"
            color="text-dark"
            animated
          >
            Tadbirlarmiz Kalendari
          </MainTitle>
          <Subtitle
            align="center"
            color="muted"
            className="mx-auto mt-2 md:mt-3 max-w-2xl "
            animated
            animationDelay={0.1}
          >
            ML Community Uzbekistan hamjamiyatidagi tadbirlarda ishtirok eting, soha vakillari bilan tanishing,
            bilimingizni oshiring va shu sohaga chuqurroq kiring.
          </Subtitle>
        </div>

        <div className="mt-6 md:mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
          {EVENTS.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  )
}
