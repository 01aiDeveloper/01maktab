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
      className="group relative aspect-3/4 w-full overflow-hidden rounded-xl sm:rounded-[40px] shadow-sm"
    >
      {/* Background Image */}
      <Image 
        src={image || "/placeholder.svg"} 
        alt={name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8 lg:p-10 flex flex-col justify-center min-h-24 bg-linear-to-t from-white/50 via-white/30 to-transparent backdrop-blur-sm max-h-[110px] rounded-t-xl sm:rounded-t-3xl">
        <div className="relative">
          <div className="absolute -top-2 right-0 text-white opacity-80 group-hover:opacity-100 transition-opacity z-10">
            <ArrowUpRight size={40} strokeWidth={1.5} />
          </div>
          <div className="pr-12">
            <h3 className="text-base sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-tight">{name}</h3>
            <p className="mt-3 text-white/90 text-sm lg:text-base font-normal leading-relaxed max-w-[90%]">
              {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
