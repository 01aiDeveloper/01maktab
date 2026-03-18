"use client"

import { motion } from "framer-motion"
import { Calendar, Lock, CreditCard, GraduationCap } from "lucide-react"
import { PaymentOptionCard } from "@/components/cards/payment-option-card"

const paymentOptions = [
  {
    id: 1,
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Oylik to'lov",
    tag: "5 oy davomida",
    bullets: [
      "Har oy to'lang",
      "Moslashuvchan variant",
      "Minimal summadan boshlang",
    ],
  },
  {
    id: 2,
    icon: <Lock className="w-6 h-6 text-white" />,
    title: "To'liq to'lov",
    tag: "Bir martalik",
    bullets: [
      "5-oy sovg'a sifatida!",
      "Maksimal tejash",
      "4 oylik narx",
    ],
  },
  {
    id: 3,
    icon: <CreditCard className="w-6 h-6 text-white" />,
    title: "Yil davomida",
    tag: "12 oylik bo'lib to'lash",
    bullets: [
      "Xuddi shu narx",
      "Uzaytirish bepul",
      "Qulay to'lovlar",
    ],
  },
  {
    id: 4,
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    title: "O'qishdan keyin to'lov",
    tag: "O'qish boshlanganidan 8 oydan keyin",
    bullets: [
      "Avval o'qing",
      "Keyin to'lang",
      "Ishga joylashganingizdan keyin",
    ],
  },
]

export function PaymentOptionsSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-3xl lg:text-4xl text-center mb-12 lg:mb-16"
        >
          Qulay to'lov variantlari
        </motion.h2>

        {/* Payment Cards Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {paymentOptions.map((option, index) => (
            <PaymentOptionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              tag={option.tag}
              bullets={option.bullets}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom Note Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#1a1a1d] rounded-3xl p-6 lg:p-8"
        >
          <p className="text-white/70 text-center text-base lg:text-lg">
            Aniq narxlarni ariza topshirganingizdan keyin bilasiz
          </p>
        </motion.div>
      </div>
    </section>
  )
}
