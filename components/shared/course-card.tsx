"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { EnrollmentBadge } from "@/components/ui/enrollment-badge"
import { StatusBadge, resolveStatus, type StatusFlags } from "@/components/ui/status-badge"

interface CourseCardProps extends StatusFlags {
  id?: number | string
  slug?: string
  title: string
  description: string
  imageUrl: string
  enrollmentCount?: number
  waitlistCount?: number
  hideQueueStatus?: boolean
}

export function CourseCard({
  id, slug, title, description, imageUrl,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
}: CourseCardProps) {
  const courseSlug = slug || id?.toString() || "course"
  const rawStatus = resolveStatus({ hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled })
  const status = hideQueueStatus ? null : rawStatus
  const countNum = enrollmentCount ?? waitlistCount ?? 0
  const countKind: 'enrolled' | 'waitlist' = enrollmentCount ? 'enrolled' : 'waitlist'
  
  return (
    <Link href={`/courses/${courseSlug}`}>
      <motion.div
        className="group relative w-full aspect-[654/430] overflow-hidden rounded-xl sm:rounded-[40px] shadow-sm"
      >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {status ? (
        <div className="absolute top-4 left-4 z-10">
          <StatusBadge status={status} />
        </div>
      ) : null}

      {countNum > 0 ? (
        <div className={`absolute top-4 z-10 ${status ? 'right-4' : 'left-4'}`}>
          <EnrollmentBadge count={countNum} kind={countKind} />
        </div>
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8 lg:p-10 flex flex-col justify-center min-h-32 bg-white/20 backdrop-blur-[53.25px] max-h-[160px] rounded-t-xl sm:rounded-t-3xl">
        <div className="relative">
          <div className="absolute -top-2 right-0 opacity-80 group-hover:opacity-100 transition-opacity z-10">
            <Image src="/icons/main-arrow.svg" alt="arrow" width={25} height={25} unoptimized />
          </div>
          <div className="pr-12">
            <h3 className="text-base sm:text-base md:text-lg lg:text-3xl font-bold text-white tracking-tight">{title}</h3>
            <p className="mt-3 text-white/90 line-clamp-2 text-sm lg:text-base font-normal leading-relaxed max-w-[90%]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}
