"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GraduateCardProps {
  name: string
  age: number
  previousRole: string
  currentRole: string
  story: string
  image: string
}

export function GraduateCard({
  name,
  age,
  previousRole,
  currentRole,
  story,
  image,
}: GraduateCardProps) {
  return (
    <>
      {/* Desktop Layout: 2 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6"
      >
        {/* Left: Portrait Image */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-800">
          <Image
            src={image}
            alt={name}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Right: Content Card */}
        <div className="bg-[#1a1a1d] rounded-3xl p-8 flex flex-col">
          <div className="flex-1">
            <h3 className="text-white font-bold text-2xl mb-2">
              {name}, {age} yosh
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {previousRole}
            </p>
            <p className="text-white text-base mb-6">
              {currentRole}
            </p>

            <div className="mb-4">
              <h4 className="text-white font-semibold text-base mb-3">
                Hikoya:
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {story}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-gray-100 text-black font-medium rounded-full flex items-center gap-2 h-10 px-5"
            >
              Batafsil
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Layout: Vertical Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:hidden bg-[#1a1a1d] rounded-3xl overflow-hidden"
      >
        {/* Image on Top */}
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={image}
            alt={name}
            fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Content Below */}
        <div className="p-6">
          <h3 className="text-white font-bold text-xl mb-2">
            {name}, {age} yosh
          </h3>
          <p className="text-white/60 text-sm mb-3">
            {previousRole}
          </p>
          <p className="text-white text-sm mb-5">
            {currentRole}
          </p>

          <div className="mb-5">
            <h4 className="text-white font-semibold text-sm mb-2">
              Hikoya:
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {story}
            </p>
          </div>

          <Button 
            variant="secondary"
            size="sm"
            className="bg-white hover:bg-gray-100 text-black font-medium rounded-full flex items-center gap-2 h-10 px-5"
          >
            Batafsil
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </>
  )
}
