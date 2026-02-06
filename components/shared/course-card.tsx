"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface CourseCardProps {
  id?: number | string
  slug?: string
  title: string
  description: string
  imageUrl: string
}

export function CourseCard({ id, slug, title, description, imageUrl }: CourseCardProps) {
  const courseSlug = slug || id?.toString() || "course"
  
  return (
    <Link href={`/courses/${courseSlug}`}>
      <motion.div
        className="group relative min-h-[380px] md:h-[500px] w-full overflow-hidden rounded-xl   sm:rounded-[40px] shadow-sm"
      >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8 lg:p-10 flex flex-col justify-center min-h-32 bg-linear-to-t from-white/50 via-white/30 to-transparent backdrop-blur-sm max-h-[160px]  rounded-t-xl sm:rounded-t-3xl  ">
        <div className="relative">
          <div className="absolute -top-2 right-0 text-white opacity-80 group-hover:opacity-100 transition-opacity z-10">
            <ArrowUpRight size={40} strokeWidth={1.5} />
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
