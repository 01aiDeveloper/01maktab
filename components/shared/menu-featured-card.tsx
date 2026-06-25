"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { courseService } from "@/services/course.service"
import { useApi } from "@/hooks/use-api"
import { getMediaUrl } from "@/lib/utils"

const AI_STARTUP_COURSE_ID = 25

interface MenuFeaturedCardProps {
  className?: string
  onNavigate?: () => void
}

export function MenuFeaturedCard({ className = "", onNavigate }: MenuFeaturedCardProps) {
  const { data } = useApi(
    () => courseService.getCourses({ format: "COURSE", pageSize: 20 }),
    { autoFetch: true }
  )

  const courses: any[] = data?.data?.data || []
  const featured =
    courses.find((c) => c.id === AI_STARTUP_COURSE_ID) ||
    courses.find((c) => /start(a|u)p/i.test(c.name || c.title || "")) ||
    courses[0]

  const [imgSrc, setImgSrc] = useState<string | null>(null)

  if (!featured) return null

  const title = featured.name || featured.title || ""
  const href = `/courses/${featured.slug || featured.id}`
  const src = imgSrc ?? (getMediaUrl(featured.photo || featured.cardImage) || "/placeholder.svg")

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group relative block aspect-4/3 overflow-hidden rounded-[23px] bg-gradient-to-br from-[#3B5BFF] to-[#2A3F8F] ${className}`}
    >
      <Image
        quality={90}
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 90vw, 320px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgSrc("/placeholder.svg")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-end justify-between gap-3 p-5">
        <h3 className="text-white text-[22px] font-semibold leading-[1.1] tracking-[-1px] capitalize">
          {title}
        </h3>
        <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#18181A] transition-colors group-hover:bg-white">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>
    </Link>
  )
}
