"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Code2, Grid2X2, Database, ArrowUpRight } from "lucide-react"

interface SkillCardProps {
  image: string
  title: string
  icon?: "code" | "grid" | "database"
}

export function SkillCard({ image, title, icon = "code" }: SkillCardProps) {
  const IconComponent = icon === "code" ? Code2 : icon === "grid" ? Grid2X2 : Database

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-3xl aspect-[3/4] min-w-[160px] cursor-pointer group"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute top-3 left-3 bg-white/40 backdrop-blur-xl p-2.5 rounded-xl">
        <IconComponent className="w-4 h-4 text-gray-700" />
      </div>

      <div className="absolute top-3 right-3 bg-white/40 backdrop-blur-xl p-2.5 rounded-xl">
        <ArrowUpRight className="w-4 h-4 text-gray-700" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/50 via-white/30 to-transparent backdrop-blur-sm">
        <h3 className="text-gray-800 font-semibold text-sm leading-tight">{title}</h3>
      </div>
    </motion.div>
  )
}
