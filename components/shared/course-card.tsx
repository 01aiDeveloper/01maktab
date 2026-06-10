"use client"

import { useState } from "react"
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
  const hidden = hideQueueStatus && (rawStatus === 'waitlist' || rawStatus === 'presale')
  const status = !rawStatus || hidden ? 'available' : rawStatus
  const countNum = enrollmentCount ?? waitlistCount ?? 0
  const countKind: 'enrolled' | 'waitlist' = enrollmentCount ? 'enrolled' : 'waitlist'
  const [imgSrc, setImgSrc] = useState(imageUrl || "/placeholder.svg")

  return (
    <Link href={`/courses/${courseSlug}`}>
      <motion.div
        whileHover={{ scale: 1.01, y: -1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative w-full aspect-3/4 overflow-hidden rounded-[23px] shadow-sm bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F]"
      >
      <Image
        quality={90} src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgSrc("/placeholder.svg")}
      />

      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start gap-2">
        {countNum > 0 ? <EnrollmentBadge count={countNum} kind={countKind} /> : null}
        {status && status !== "available" ? <StatusBadge status={status} /> : null}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 rounded-[23px] bg-[rgba(96,96,96,0.20)] backdrop-blur-[76px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white text-[20px] font-semibold leading-[1.05] tracking-[-1px] capitalize">{title}</h3>
          <Image quality={90} src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized className="shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="mt-3 text-white text-[16px] font-[450] leading-[18px] tracking-[-0.8px] line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
    </Link>
  )
}
