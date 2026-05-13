"use client"

import { motion } from "framer-motion"
import { Calendar, Lock, CreditCard, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { PaymentOptionCard } from "@/components/cards/payment-option-card"

export function PaymentOptionsSection() {
  const t = useTranslations("paymentOptions")
  const paymentOptions = [
    {
      id: 1,
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: t("opt1Title"),
      tag: t("opt1Tag"),
      bullets: [t("opt1B1"), t("opt1B2"), t("opt1B3")],
    },
    {
      id: 2,
      icon: <Lock className="w-6 h-6 text-white" />,
      title: t("opt2Title"),
      tag: t("opt2Tag"),
      bullets: [t("opt2B1"), t("opt2B2"), t("opt2B3")],
    },
    {
      id: 3,
      icon: <CreditCard className="w-6 h-6 text-white" />,
      title: t("opt3Title"),
      tag: t("opt3Tag"),
      bullets: [t("opt3B1"), t("opt3B2"), t("opt3B3")],
    },
    {
      id: 4,
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: t("opt4Title"),
      tag: t("opt4Tag"),
      bullets: [t("opt4B1"), t("opt4B2"), t("opt4B3")],
    },
  ]

  return (
    <section className="w-full bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-3xl lg:text-4xl text-center mb-12 lg:mb-16"
        >
          {t("title")}
        </motion.h2>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#1a1a1d] rounded-3xl p-6 lg:p-8"
        >
          <p className="text-white/70 text-center text-base lg:text-lg">
            {t("footer")}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
