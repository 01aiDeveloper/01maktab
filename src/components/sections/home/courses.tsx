"use client"

import { CourseCard } from "@/components/shared/course-card"
import { useTranslations } from "next-intl"
import { MainTitle } from "@/components/ui/main-title"
import { Subtitle } from "@/components/ui/subtitle"
import { useCatalog } from "@/hooks/queries/use-catalog"
import { getMediaUrl } from "@/lib/utils"
import { NoData } from "@/components/shared/no-data"
import { useAuth } from "@/hooks/common/use-auth"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

export function CoursesSection() {
  const t = useTranslations("courses")
  const { user } = useAuth()
  // Fetch courses from API
  const { data: response, isLoading: loading, error } = useCatalog("course", Boolean(user), 100)
  const courses = response?.data ?? []

  // Transform API data to component format
  const displayCourses = courses.map((course: any) => ({
    id: course.id,
    title: course.name || course.title,
    description: course.description?.replace(/<[^>]*>/g, "") || "", // Strip HTML tags
    imageUrl: getMediaUrl(course.photo || course.cardImage) || "/images/courses/1.webp",
    difficulty: course.difficulty,
    duration: course.duration,
    price: course.price,
    pricingType: course.pricingType,
    enrollmentCount: course.enrollmentCount,
    waitlistCount: course.waitlistCount,
    hasPurchased: course.hasPurchased,
    presalesEnabled: course.presalesEnabled,
    waitlistEnabled: course.waitlistEnabled,
  }))

  return (
    <section id="kurslar" className="flex flex-col justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
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
            className="mx-auto mt-4 md:mt-6 max-w-2xl "
            animated
            animationDelay={0.1}
          >
            {t("subtitle")}
          </Subtitle>
        </div>
      </div>

      <div className="mt-8 md:mt-12 w-full max-w-7xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : courses.length === 0 ? (
          <NoData message={t("noDataMessage")} description={t("noDataDescription")} />
        ) : (
          <PaginatedGrid items={displayCourses} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-stretch">
            {(course: any, index) => (
              <div key={course.id || index} className="min-w-0 w-full">
                <CourseCard {...course} hideQueueStatus />
              </div>
            )}
          </PaginatedGrid>
        )}
      </div>
    </section>
  )
}
