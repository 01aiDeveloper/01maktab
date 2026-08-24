"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type HlsType from "hls.js"

const VIDEO_SRC =
  "https://video.01ai.uz/2c9eb729-1ae9-4434-a5bf-e477bade2f1b/playlist.m3u8"

export function MockupSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: HlsType | null = null
    let cancelled = false

    const tryPlay = () => {
      const p = video.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC
      video.addEventListener("loadedmetadata", tryPlay, { once: true })
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !videoRef.current) return
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true })
          hls.loadSource(VIDEO_SRC)
          hls.attachMedia(video)
          hls.on(Hls.Events.MANIFEST_PARSED, tryPlay)
        } else {
          video.src = VIDEO_SRC
          video.addEventListener("loadedmetadata", tryPlay, { once: true })
        }
      })
    }

    return () => {
      cancelled = true
      video.removeEventListener("loadedmetadata", tryPlay)
      hls?.destroy()
    }
  }, [])

  return (
    <section className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-[90%] mx-auto h-[450px] md:h-[540px] lg:h-[630px] rounded-3xl overflow-hidden border border-gray-200"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-10">
          <h2 className="text-3xl md:text-[56px] lg:text-[64px] font-semibold text-white leading-[120px] tracking-[-0.05em] capitalize">
            01AI
          </h2>
        </div>
      </motion.div>
    </section>
  )
}
