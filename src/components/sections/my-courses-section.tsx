"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { MyCourseCard } from "@/components/cards/my-course-card"
import { NoData } from "@/components/shared/no-data"
import { PageLoader } from "@/components/ui/page-loader"
import { useMyCourses } from "@/hooks/queries/use-my-courses"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

export function MyCoursesSection() {
  const t = useTranslations("userHome")
  const { data: courses, isLoading } = useMyCourses()

  if (isLoading) {
    return (
      <section className="py-8">
        <PageLoader />
      </section>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{t("myCourses")}</h2>
        </div>
        <NoData
          message={t("noCoursesMessage")}
          description={t("noCoursesDescription")}
          buttonText={t("noCoursesButton")}
          buttonLink="/catalog?tab=courses"
        />
      </section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t("myCourses")}</h2>
      </div>

      <PaginatedGrid items={courses} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(course) => (
            <div key={course.id} className="min-w-0">
              <MyCourseCard item={course} href={`/courses/${course.id}`} />
            </div>
          )}
      </PaginatedGrid>
    </motion.section>
  )
}
