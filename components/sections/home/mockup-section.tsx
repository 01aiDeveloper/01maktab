"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export function MockupSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="container py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* MacBook Frame */}
        <div
          className="relative w-full max-w-4xl mx-auto"
          style={{ perspective: "2000px" }}
        >
          <div
            className="relative rounded-t-xl bg-[#1a1a1a] pt-6 pb-0 px-3 md:px-6 shadow-2xl"
            style={{
              transform: "rotateX(2deg)",
              transformOrigin: "bottom center",
            }}
          >
            {/* Camera dot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3a3a3a]" />

            {/* Screen bezel */}
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-black">
              {/* Video inside screen */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              >
                <source src="/videos/banner1.webm" type="video/webm" />
              </video>

              {/* Shine overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
            </div>
          </div>

          {/* MacBook base/hinge */}
          <div className="relative">
            {/* Hinge */}
            <div className="w-full h-3 bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a] rounded-b-lg" />
            {/* Bottom plate */}
            <div className="w-[110%] -ml-[5%] h-2 bg-[#e0e0e0] rounded-b-xl shadow-md" />
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-28 h-1 bg-[#4a4a4a] rounded-b-md" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
