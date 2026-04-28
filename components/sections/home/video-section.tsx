"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Play, Pause } from "lucide-react"

const TAGS = ["Python", "Data Science", "Design"]

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.log("Autoplay prevented:", error)
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-gray-200"
      >
        <video
          ref={videoRef}
          src="/videos/banner1.webm"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loop
          muted
          playsInline
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.button
            onClick={togglePlay}
            className="group flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white transition-all backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
            )}
          </motion.button>
        </div>

        {/* Gradient Overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Branding - Bottom Left */}
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-10">
          <h2 className="text-3xl md:text-[56px] lg:text-[64px]  font-semibold text-white leading-[120px] tracking-[-0.05em] capitalize">
            01AI
          </h2>
        </div>

        {/* Tags - Bottom Right */}
        {/* <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10 flex flex-wrap gap-2 md:gap-3 justify-end">
          {TAGS.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-6 py-2.5 rounded-full border border-white/30 flex items-center justify-center h-11"
            >
              <span className="text-white text-base font-[450] leading-6 tracking-[-0.01em]">{tag}</span>
            </motion.div>
          ))}
        </div> */}
      </motion.div>
    </section>
  )
}