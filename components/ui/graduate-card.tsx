"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface GraduateCardProps {
  name: string
  company: string
  image: string
}

export function GraduateCard({ name, company, image }: GraduateCardProps) {
  return (
    <motion.div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Image */}
      <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />

      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold text-sm truncate">{name}</h4>
            <p className="text-white/80 text-xs truncate">{company}</p>
          </div>
          <motion.div
            className="w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
