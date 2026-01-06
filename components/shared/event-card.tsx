"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  imageUrl: string
  category: string
}

export function EventCard({ title, date, imageUrl, category }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-[40px] bg-gray-100"
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay - background color */}
      <div className="absolute inset-0" style={{ backgroundColor: '#00000066' }} />

      {/* Top Left - Category and Date */}
      <div className="absolute left-6 top-6 md:left-8 md:top-8 z-10">
        <div className="text-white drop-shadow-lg">
          <span className="block text-base md:text-lg font-bold">{category}</span>
          <span className="block text-xs md:text-sm text-white/90 mt-1">{date}</span>
        </div>
      </div>

      {/* Top Right - Arrow Button */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gray-200/80 backdrop-blur-sm text-white transition-all group-hover:bg-gray-300">
          <ArrowUpRight size={20} strokeWidth={2} className="md:w-6 md:h-6" />
        </div>
      </div>

      {/* Center - Large Title (absolute center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-full px-6 md:px-8">
        <h3 className="text-5xl md:text-6xl lg:text-4xl font-black text-white leading-[0.9] tracking-tighter text-center drop-shadow-lg">
          {title}
        </h3>
      </div>
    </motion.div>
  )
}
