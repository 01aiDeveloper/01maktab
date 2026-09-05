"use client"

import { useTranslations } from "next-intl"
import { EventCard } from "@/components/shared/event-card"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

const EVENT_META = [
  { title: "ML Contest", category: "ML Contest", locked: true, imageUrl: "/images/event.webp" },
  { title: "ML Party", locked: true, imageUrl: "/images/event.webp" },
  { title: "ML Gap", locked: true, imageUrl: "/images/event.webp" },
] as const

export function EventsSection() {
  const t = useTranslations("events")
  const EVENTS = EVENT_META.map((e) => ({ ...e, subtitle: t("comingSoon") }))
  return (
    <section className="flex flex-col justify-center py-8 md:py-10 overflow-hidden">
      <div className="container">
        <div className="text-center">
          <MainTitle
            align="center"
            color="text-dark"
            animated
          >
            {t("title")}
          </MainTitle>
          <Subtitle
            align="center"
            color="muted"
            className="mx-auto mt-2 md:mt-3 max-w-2xl "
            animated
            animationDelay={0.1}
          >
            {t("subtitle")}
          </Subtitle>
        </div>

        <div className="mt-6 md:mt-10">
          <PaginatedGrid items={EVENTS} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {(event, index) => <EventCard key={index} {...event} />}
          </PaginatedGrid>
        </div>
      </div>
    </section>
  )
}
