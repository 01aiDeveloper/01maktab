"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountdownTile } from "@/components/ui/countdown-tile"

interface EnrollmentCtaCountdownProps {
  deadline?: Date
}

export function EnrollmentCtaCountdown({ deadline }: EnrollmentCtaCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 20, minutes: 0 })
  const [prevTimeLeft, setPrevTimeLeft] = useState({ days: 20, hours: 20, minutes: 0 })

  useEffect(() => {
    const targetDeadline = deadline || new Date(Date.now() + 20 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = targetDeadline.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft((prev) => {
        setPrevTimeLeft(prev)
        return { days, hours, minutes }
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000) // Update every second

    return () => clearInterval(interval)
  }, [deadline])

  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#5d7bf5] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 overflow-hidden"
        >
          {/* Top Content - Centered */}
          <div className="text-center mb-8">
            <h2 className="text-white font-bold text-2xl lg:text-4xl mb-3">
              Начните карьеру сегодня
            </h2>
            <p className="text-white/85 text-sm lg:text-base">
              Места ограничены.
              <br />
              Следующий поток через 3 месяца.
            </p>
          </div>

          {/* Media Preview Block */}
          <div className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden mb-6 lg:mb-8">
            <Image
              src="/images/courses/try-now.png"
              alt="Course preview"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>

          {/* CTA Button - Centered */}
          <div className="flex justify-center mb-8 lg:mb-10">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-black font-semibold rounded-full flex items-center gap-2 h-12 px-6 lg:px-8 text-base"
            >
              Оставить заявку сейчас
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Countdown Label - Left Aligned */}
          <div className="mb-6">
            <h3 className="text-white font-bold text-lg lg:text-xl">
              До закрытия набора:
            </h3>
          </div>

          {/* Countdown Tiles - Responsive */}
          <div className="flex items-center justify-start gap-4 lg:gap-6">
            <CountdownTile 
              value={timeLeft.days} 
              prevValue={prevTimeLeft.days}
              label="дней" 
            />
            <CountdownTile 
              value={timeLeft.hours} 
              prevValue={prevTimeLeft.hours}
              label="часов" 
            />
            {/* Show minutes only on desktop */}
            <div className="hidden lg:block">
              <CountdownTile 
                value={timeLeft.minutes} 
                prevValue={prevTimeLeft.minutes}
                label="минут" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
