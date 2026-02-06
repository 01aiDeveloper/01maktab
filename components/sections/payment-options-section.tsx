"use client"

import { motion } from "framer-motion"
import { Calendar, Lock, CreditCard, GraduationCap } from "lucide-react"
import { PaymentOptionCard } from "@/components/cards/payment-option-card"

const paymentOptions = [
  {
    id: 1,
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Помесячная оплата",
    tag: "В течение 5 месяцев",
    bullets: [
      "Платите каждый месяц",
      "Гибкий вариант",
      "Начните с минимальной суммы",
    ],
  },
  {
    id: 2,
    icon: <Lock className="w-6 h-6 text-white" />,
    title: "Полная оплата",
    tag: "Единоразово",
    bullets: [
      "5-й месяц в подарок!",
      "Максимальная экономия",
      "Цена за 4 месяца",
    ],
  },
  {
    id: 3,
    icon: <CreditCard className="w-6 h-6 text-white" />,
    title: "В течение года",
    tag: "Рассрочка на 12 месяцев",
    bullets: [
      "Та же цена",
      "Продление бесплатно",
      "Комфортные платежи",
    ],
  },
  {
    id: 4,
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    title: "Оплата после обучения",
    tag: "Начиная с 8 месяца после начала обучения",
    bullets: [
      "Сначала учитесь",
      "Потом платите",
      "После трудоустройства",
    ],
  },
]

export function PaymentOptionsSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-3xl lg:text-4xl text-center mb-12 lg:mb-16"
        >
          Удобные варианты оплаты
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
            Точные цены узнаете после подачи заявки
          </p>
        </motion.div>
      </div>
    </section>
  )
}
