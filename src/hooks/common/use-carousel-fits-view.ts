"use client"

import { useEffect, useState } from "react"
import type { EmblaCarouselType } from "embla-carousel"

/** True when all slides fit in the viewport and the track should be centered. */
export function useCarouselFitsView(
  emblaApi: EmblaCarouselType | undefined,
  itemCount: number,
) {
  const [fitsInView, setFitsInView] = useState(true)

  useEffect(() => {
    if (!emblaApi) return

    const update = () => {
      const viewport = emblaApi.rootNode()
      const container = emblaApi.containerNode()
      const slides = emblaApi.slideNodes()
      if (!viewport || slides.length === 0) {
        setFitsInView(true)
        return
      }

      const gap = Number.parseFloat(window.getComputedStyle(container).columnGap || "0") || 0
      const slidesWidth = slides.reduce((sum, slide, index) => {
        return sum + slide.getBoundingClientRect().width + (index > 0 ? gap : 0)
      }, 0)
      const viewportWidth = viewport.getBoundingClientRect().width
      setFitsInView(slidesWidth <= viewportWidth - 8)
    }

    update()
    emblaApi.on("resize", update)
    emblaApi.on("reInit", update)
    return () => {
      emblaApi.off("resize", update)
      emblaApi.off("reInit", update)
    }
  }, [emblaApi, itemCount])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit({
      loop: false,
      slidesToScroll: 1,
      align: fitsInView ? "center" : "start",
      containScroll: fitsInView ? "trimSnaps" : false,
    })
  }, [emblaApi, fitsInView])

  return fitsInView
}
