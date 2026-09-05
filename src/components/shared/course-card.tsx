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
  id, slug, title, description, imageUrl,
  enrollmentCount, waitlistCount,
  hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled,
  hideQueueStatus,
  index,
}: CourseCardProps) {
  const courseSlug = slug || id?.toString() || "course"
  const rawStatus = resolveStatus({ hasPurchased, pricingType, price, presalesEnabled, waitlistEnabled })
  const hidden = hideQueueStatus && (rawStatus === "waitlist" || rawStatus === "presale")
  const status = !rawStatus || hidden ? "available" : rawStatus
  const countNum = enrollmentCount ?? waitlistCount ?? 0
  const countKind: "enrolled" | "waitlist" = enrollmentCount ? "enrolled" : "waitlist"
  const [imgSrc, setImgSrc] = useState(imageUrl || "/placeholder.svg")

  return (
    <Link href={`/courses/${courseSlug}`} className="block group h-full">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index != null ? (index % 4) * 0.08 : 0,
        }}
        className="relative w-full aspect-[16/11] overflow-hidden rounded-[24px] md:rounded-[32px] shadow-[0_10px_24px_rgba(24,38,86,0.08)] hover:shadow-[0_20px_35px_rgba(24,38,86,0.16)] bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F] cursor-pointer transition-shadow duration-300"
      >
        <Image
          quality={90}
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 640px"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImgSrc("/placeholder.svg")}
        />

        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex items-start gap-2">
          {countNum > 0 ? <EnrollmentBadge count={countNum} kind={countKind} /> : null}
          {status && status !== "available" ? <StatusBadge status={status} /> : null}
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 px-5 py-4 md:px-6 md:py-5 rounded-[24px] md:rounded-[32px] bg-[rgba(96,96,96,0.22)] backdrop-blur-[60px] transition-colors duration-300 group-hover:bg-[rgba(96,96,96,0.32)]"
          initial={{ y: 6, opacity: 0.92 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: (index != null ? (index % 4) * 0.08 : 0) + 0.1 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-white text-[20px] md:text-[24px] font-semibold leading-[1.15] tracking-[-0.04em]">
                {title}
              </h3>
              {description ? (
                <p className="mt-2 text-white/85 text-[13px] md:text-[15px] leading-[1.35] tracking-[-0.02em] line-clamp-2">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="shrink-0 mt-0.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              <Image
                quality={90}
                src="/icons/main-arrow.svg"
                alt=""
                width={22}
                height={22}
                unoptimized
                className="opacity-80 group-hover:opacity-100 transition-opacity w-5 h-5 md:w-[22px] md:h-[22px]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
