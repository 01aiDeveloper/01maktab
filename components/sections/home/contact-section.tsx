"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { MainTitle } from "@/components/ui/main-title"
import { MainButton } from "@/components/ui/main-button"
import { useState } from "react"
import { sendMessage } from "@/lib/telegram"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ContactSection() {
  const t = useTranslations("contact")
  const tCommon = useTranslations("common")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = sendMessage({ name, phone })
    if (result.success) {
      setSent(true)
      setName("")
      setPhone("")
      setTimeout(() => setSent(false), 4000)
    }
  }

  return (
    <section className="container py-8 md:py-12 my-12!  ">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bg-[#E6E6E7] rounded-3xl p-6 md:p-8 lg:p-10"
      >
          <MainTitle
            className="mb-6 md:mb-8 text-black text-left sm:text-center"
            align="left"
            animated
            animationDelay={0.2}
          >
            {t("title")}
          </MainTitle>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-end">
              {/* Name Input */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-gray-700">{t("name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="w-full h-12 border border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none transition-all bg-white"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-gray-700">{t("phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className="w-full h-12 border border-gray-200 rounded-xl px-4 focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none transition-all bg-white"
                  required
                />
              </div>

              {/* Submit Button */}
              <MainButton
                type="submit"
                variant="gradient"
                size="default"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full md:w-61.5 h-12 rounded-[10px] px-4 py-3.75 md:shrink-0"
              >
                {sent ? tCommon("sent") : tCommon("send")}
              </MainButton>
            </div>
          </form>
      </motion.div>
    </section>
  )
}

