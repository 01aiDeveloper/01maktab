"use client"

import useEmblaCarousel from "embla-carousel-react"
import { EventCard } from "@/components/shared/event-card"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const EVENTS = [
  {
    title: "ML Contest",
    category: "ML Contest",
    // date: "02.12.2025",
    locked: true,
    imageUrl: "/images/event.webp",
    subtitle: "Ro'yxatdan o'tish tez orada ochiladi"
  },
  {
    title: "ML Party",
    imageUrl: "/images/event.webp",
    locked: true,
    subtitle: "Ro'yxatdan o'tish tez orada ochiladi",
  },
  {
    title: "ML Gap",
    imageUrl: "/images/event.webp",
    locked: true,
    subtitle: "Ro'yxatdan o'tish tez orada ochiladi",
  },
]

export function EventsSection() {
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
