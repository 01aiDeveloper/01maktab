"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface CourseCardProps {
  image: string
  title: string
  instructor: string
  progress: string
}

export function CourseCard({ image, title, instructor, progress }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-3xl aspect-[4/3] min-w-[200px] cursor-pointer group"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Progress Badge */}
      <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
        {progress}
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-white/30 backdrop-blur-xl rounded-2xl p-4">
        <h3 className="text-white font-semibold text-base mb-1 drop-shadow-sm">{title}</h3>
        <p className="text-white/90 text-sm drop-shadow-sm">{instructor}</p>
      </div>
    </motion.div>
  )
}
