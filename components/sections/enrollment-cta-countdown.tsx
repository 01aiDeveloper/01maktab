"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTile } from "@/components/ui/countdown-tile";

interface EnrollmentCtaCountdownProps {
  deadline?: Date;
}

export function EnrollmentCtaCountdown({
  deadline,
}: EnrollmentCtaCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 20, minutes: 0 });
  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 20,
    hours: 20,
    minutes: 0,
  });

  useEffect(() => {
    const targetDeadline =
      deadline ||
      new Date(Date.now() + 20 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDeadline.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft((prev) => {
        setPrevTimeLeft(prev);
        return { days, hours, minutes };
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval);
  }, [deadline]);

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
            <h2 className="text-white font-suisse font-semibold text-3xl md:text-[64px] leading-tight md:leading-[81px] tracking-[-0.05em] text-center mb-3">
              Начните карьеру сегодня
            </h2>
            <p className="text-white/100 font-suisse text-xl md:text-[40px] leading-tight md:leading-[47px] tracking-[-0.05em] text-center">
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

          {/* Countdown Label - Left aligned */}
          <div className="mb-6 text-left">
            <h3 className="text-white font-suisse font-semibold text-[32px] lg:text-[64px] leading-[75px] tracking-[-0.05em]">
              До закрытия набора:
            </h3>
          </div>

          {/* Countdown Tiles - Hours & Minutes */}
          <div className="flex items-center justify-evenly gap-12 lg:gap-[10px]">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
