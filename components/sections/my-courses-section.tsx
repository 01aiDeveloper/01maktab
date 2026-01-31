"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { CarouselNavigation } from "@/components/ui/carousel-navigation"
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation"
import { CourseCard } from "../cards/course-card"
import { NoData } from "@/components/shared/no-data"
import { getMediaUrl } from "@/lib/utils"
import api from "@/lib/api"
import Link from "next/link"

interface Course {
  id: number
  name: string
  title: string
  photo: string
  icon: string
  moduleTitle: string
  mentor: {
    id: number
    fullname: string
    photo: string
  }
  totalLessons: number
  completedLessons: number
}

export function MyCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  })

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(emblaApi)

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get("/course/my/courses")
        if (response.data?.data) {
          setCourses(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch my courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyCourses()
  }, [])

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    )
  }

  if (courses.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Kurslarim</h2>
        </div>
        <NoData
          message="Bu yer hozircha bo'sh, kurslar qo'shishni boshlang"
          description="Pastdagi ma'lumotlarni to'ldiring"
          buttonText="Kurslarni ko'rish"
          buttonLink="/kurslar"
        />
      </section>
    )
  }

  // Transform API data to CourseCard format
  const displayCourses = courses.map((course) => ({
    id: course.id,
    image: getMediaUrl(course.photo),
    title: course.title || course.name,
    instructor: `Ustoz: ${course.mentor?.fullname || "Noma'lum"}`,
    progress: `Dars: ${course.completedLessons}/${course.totalLessons}`,
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Kurslarim</h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {displayCourses.map((course) => (
            <div key={course.id} className="flex-[0_0_calc(25%-12px)] min-w-0">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <CarouselNavigation
          onPrevClick={scrollPrev}
          onNextClick={scrollNext}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          variant="light"
        />
      </div>
    </motion.section>
  )
}
