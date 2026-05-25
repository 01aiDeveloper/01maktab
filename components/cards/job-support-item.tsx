"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface JobSupportItemProps {
  number: number
  title: string
  tagText: string
  illustration: string
}

export function JobSupportItem({
  number,
  title,
  tagText,
  illustration,
}: JobSupportItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="relative bg-[#1a1a1a] rounded-3xl p-6 lg:p-8 overflow-hidden min-h-[200px] lg:min-h-[180px]"
    >
      {/* Left Side - Title */}
      <div className="relative z-10 lg:flex lg:items-center lg:h-full">
        <h3 className="text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-0">
          {number}. {title}
        </h3>
      </div>

      {/* Right Side - Tag and Illustration */}
      <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
        <div className="bg-[#5d7bf5] text-white text-xs lg:text-sm px-4 py-2 rounded-full font-medium whitespace-nowrap">
          {tagText}
        </div>
      </div>

      {/* Illustration - Anchored Bottom Right */}
      <div className="absolute bottom-0 right-4 lg:right-8 w-32 h-32 lg:w-40 lg:h-40">
        <div className="relative w-full h-full">
          <Image
            src={illustration}
            alt={title}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </motion.div>
  )
}
