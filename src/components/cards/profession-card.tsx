"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfessionCardProps {
  id?: number
  image: string
  title: string
  instructor: string
  progress: string
}

export function ProfessionCard({ image, title, instructor, progress }: ProfessionCardProps) {
  const reduceMotion = useReducedMotion()
  // Generate slug from title - handle special characters and spaces
  const slug = title
    .toLowerCase()
    .replace(/[''`]/g, "") // Remove apostrophes
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric chars except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
  
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { scale: 1.015, y: -7 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl aspect-[16/10] min-w-[280px] cursor-pointer group"
    >
      <Image
        quality={90} src={image || "/placeholder.svg"}
        alt={title}
        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Progress Badge */}
      <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
        {progress}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
        <div>
          <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
          <p className="text-white/60 text-sm">{instructor}</p>
        </div>
        
        {/* Batafsil Button */}
        <Link href={`/professions/${slug}`} className="shrink-0">
          <Button 
            asChild
            size="sm"
            className="bg-white hover:bg-gray-100 text-black font-medium rounded-full flex items-center gap-2 h-10 px-4"
          >
            <span>
              Batafsil
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
