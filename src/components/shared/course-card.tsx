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
  description?: string
  imageUrl: string
  enrollmentCount?: number
  waitlistCount?: number
  hideQueueStatus?: boolean
  index?: number
}

export function CourseCard({
  id, slug, title, imageUrl,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
  index,
}: CourseCardProps) {
  const courseSlug = slug || id?.toString() || "course"
  const rawStatus = resolveStatus({ hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled })
  const hidden = hideQueueStatus && (rawStatus === 'waitlist' || rawStatus === 'presale')
  const status = !rawStatus || hidden ? 'available' : rawStatus
  const countNum = enrollmentCount ?? waitlistCount ?? 0
  const countKind: 'enrolled' | 'waitlist' = enrollmentCount ? 'enrolled' : 'waitlist'
  const [imgSrc, setImgSrc] = useState(imageUrl || "/placeholder.svg")

  return (
    <Link href={`/courses/${courseSlug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index != null ? (index % 4) * 0.08 : 0,
        }}
        className="relative w-full aspect-3/4 overflow-hidden rounded-[23px] shadow-[0_10px_24px_rgba(24,38,86,0.08)] hover:shadow-[0_20px_35px_rgba(24,38,86,0.18)] bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F] cursor-pointer transition-all duration-300"
      >
      <Image
        quality={90} src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        onError={() => setImgSrc("/placeholder.svg")}
      />

      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start gap-2">
        {countNum > 0 ? <EnrollmentBadge count={countNum} kind={countKind} /> : null}
        {status && status !== "available" ? <StatusBadge status={status} /> : null}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 rounded-[23px] bg-[rgba(96,96,96,0.20)] backdrop-blur-[76px] transition-all duration-300 group-hover:bg-[rgba(96,96,96,0.35)]"
        initial={{ y: 6, opacity: 0.92 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: (index != null ? (index % 4) * 0.08 : 0) + 0.1 }}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-white text-[20px] font-semibold leading-[1.1] tracking-[-1px] capitalize">{title}</h3>
          <div className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
            <Image quality={90} src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </motion.div>
    </motion.div>
    </Link>
  )
}
