"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ProfessionCardProps {
  image: string
  title: string
  instructor: string
  progress: string
}

export function ProfessionCard({ image, title, instructor, progress }: ProfessionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl aspect-[16/10] min-w-[280px] cursor-pointer group"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Progress Badge */}
      <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
        {progress}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
        <p className="text-white/60 text-sm">{instructor}</p>
      </div>
    </motion.div>
  )
}
