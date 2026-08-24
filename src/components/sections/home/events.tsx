"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"
import { EventCard } from "@/components/shared/event-card"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/common/use-carousel-navigation"

const EVENT_META = [
  { title: "ML Contest", category: "ML Contest", locked: true, imageUrl: "/images/event.webp" },
  { title: "ML Party", locked: true, imageUrl: "/images/event.webp" },
  { title: "ML Gap", locked: true, imageUrl: "/images/event.webp" },
] as const

export function EventsSection() {
  const t = useTranslations("events")
  const EVENTS = EVENT_META.map((e) => ({ ...e, subtitle: t("comingSoon") }))
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: true,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {EVENTS.map((event, index) => (
                <div
                  key={index}
                  className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] px-1.5 md:px-2"
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <CarouselNavigation
              onPrevClick={scrollPrev}
              onNextClick={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
              variant="gray"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
