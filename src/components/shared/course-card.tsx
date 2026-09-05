"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
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
}

export function CourseCard({
  id, slug, title, imageUrl,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
}: CourseCardProps) {
  const reduceMotion = useReducedMotion()
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
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="group relative w-full aspect-3/4 overflow-hidden rounded-[23px] shadow-[0_10px_24px_rgba(24,38,86,0.08)] bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F]"
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

      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 rounded-[23px] bg-[rgba(96,96,96,0.20)] backdrop-blur-[76px]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-white text-[20px] font-semibold leading-[1.1] tracking-[-1px] capitalize">{title}</h3>
          <Image quality={90} src="/icons/main-arrow.svg" alt="arrow" width={20} height={20} unoptimized className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
    </Link>
  )
}
