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
    category: "ML Contest",
    date: "02.12.2025",
    imageUrl: "/images/event.webp",
  },
  {
    title: "ML Contest",
    category: "ML Contest",
    date: "02.12.2025",
    imageUrl: "/images/event.webp",
  },
]

export function EventsSection() {
  return (
    <section className=" py-24">
      <div className="container">
        <div className="text-center">
          <MainTitle 
            align="center" 
            color="text-dark"
            className="text-[#121212]"
            animated
          >
            Tadbirlarmiz Kalendari
          </MainTitle>
          <Subtitle
            align="center"
            color="muted"
            className="mx-auto mt-4 md:mt-6 max-w-2xl text-gray-500"
            animated
            animationDelay={0.1}
          >
            ML Community Uzbekistan hamjamiyatidagi tadbirlarda ishtirok eting, soha vakillari bilan tanishing,
            bilimingizni oshiring va shu sohaga chuqurroq kiring.
          </Subtitle>
        </div>

        <div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3">
          {EVENTS.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  )
}
