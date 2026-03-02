"use client"

import Image from "next/image"
import { motion } from "framer-motion"

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
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-[31px] bg-gray-100"
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay - black with 20% opacity */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Top - Category and Date */}
      <div className="absolute left-5 top-6 z-10 flex items-center gap-[31px]">
        <div className="flex flex-col gap-[12.46px]">
          <h4 className="text-white font-semibold text-[30px] leading-[31px] tracking-[-0.05em] capitalize">
            {category}
          </h4>
          <span className="text-white font-[450] text-[20px] leading-[31px] tracking-[-0.05em] capitalize">
            {date}
          </span>
        </div>
      </div>

      {/* Top Right - Arrow Button */}
      <div className="absolute top-6 right-5 z-10">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/20 backdrop-blur-[5.64px]">
          <Image src="/icons/main-arrow.svg" alt="arrow" width={22.38} height={22.38} unoptimized />
        </div>
      </div>

      {/* Center - Large Title */}
      <div className="absolute top-[245px] left-9 z-10 w-[320px] h-11.5">
        <h3 className="text-white font-semibold text-[54px] leading-[77px] tracking-[-0.05em] capitalize text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  )
}
