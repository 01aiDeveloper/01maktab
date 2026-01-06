"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { MainButton } from "@/components/ui/main-button"
import { MentorCard } from "@/components/shared/mentor-card"
import useEmblaCarousel from "embla-carousel-react"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"

const MENTORS = [
  {
    name: "Anvar Karimov",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Nilufar Sadikova",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Anvar Karimov",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "youtube" as const,
    videoSrc: "https://youtube.com/shorts/e11wbC04l1o?si=YKV-M_9nv2OETGDH",
  },
  {
    name: "Shaxzod Bek",
    role: "Mentor",
    imageUrl: "/images/image.png",
    videoType: "video" as const,
    videoSrc: "/videos/mentor-shaxzod.mp4",
  },
]

export function MentorsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselNavigation(emblaApi)

  return (
    <section className="relative w-full  pb-32 bg-base-dark py-28 overflow-hidden sm:rounded-b-[120px] rounded-b-[70px] ">
      <div className="container">
        <div className=" ">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-2xl font-black leading-[1.1] text-white md:text-4xl lg:text-5xl tracking-tighter lg:mb-12 sm:mb-10 mb-4"
            >
              Sun’iy Intellekt Yangi Davr Texnologiyasi Birinchilardan Bo’ling!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mx-auto  max-w-3xl text-xl text-white/50 leading-relaxed font-medium"
            >
             Blogerlar Texnoplov va Teacher Azam hamda HR sohasining yirik mutaxassisi Temirxon Xolmirzayev karyera yo‘lingizni qanday boshlash haqida so‘zlab berishadi: ish izlashdan tortib, karyerada tez ko‘tarilishga yordam beradigan moslashuvchan ko‘nikmalarni rivojlantirishgacha
            </motion.p>
          </div>

          <div className="mt-24">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 md:gap-8">
                {MENTORS.map((mentor, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_83.33%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(48%-16px)] lg:flex-[0_0_calc(33.333%-21px)]"
                  >
                    <MentorCard {...mentor} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <CarouselNavigation
                onPrevClick={scrollPrev}
                onNextClick={scrollNext}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
                variant="dark"
                iconType="arrow"
                size="lg"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 flex justify-center"
          >
            <MainButton
              variant="gradient"
              size="lg"
              icon={<ArrowRight className="h-6 w-6" />}
              iconPosition="right"
              className="group"
            >
              Bepul Boshlash
            </MainButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
