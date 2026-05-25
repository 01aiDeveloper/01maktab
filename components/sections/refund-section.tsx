"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check, ArrowDown } from "lucide-react"
import { useTranslations } from "next-intl"

export function RefundSection() {
  const t = useTranslations("refund")
  return (
    <section className="w-full py-12 lg:py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-suisse text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-10"
        >
          {t("title")}
        </motion.h2>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* Blue Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4] rounded-3xl aspect-[4/3] relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                <Image
                  src="/icons/professions/refund-icon.webp"
                  alt="Investment return"
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* How it works Card - FIXED FOR MOBILE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#1a1a1d] rounded-3xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              {t("howItWorks")}
            </h3>
            
            {/* Centered Flow */}
            <div className="flex flex-col items-center text-center gap-3">
              <p className="text-white text-sm">
                {t("completeProgram")}
              </p>
              
              <ArrowDown className="w-5 h-5 text-white/60" />
              
              <div className="inline-flex items-center bg-white rounded-full px-4 py-2">
                <span className="text-black text-sm font-medium whitespace-nowrap">
                  {t("get100")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a1a1d] rounded-3xl p-6"
          >
            <p className="text-white/80 text-sm leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Conditions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl p-5"
          >
            <div className="flex flex-col gap-3">
              <h4 className="text-black font-semibold text-base">
                {t("conditions")}
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-900 text-sm">
                    {t("condition1")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-900 text-sm">
                    {t("condition2")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Grid: Blue Image + Content Cards */}
          <div className="grid grid-cols-[280px_1fr] gap-6 mb-6">
            {/* Left: Blue Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#5d7bf5] to-[#4c6ae4] rounded-3xl aspect-square relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative w-full h-full">
                  <Image
                    src="/icons/professions/refund-icon.webp"
                    alt="Investment return"
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Content Cards */}
            <div className="space-y-6">
              {/* How it works Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#1a1a1d] rounded-3xl p-8"
              >
                <h3 className="text-white font-semibold text-xl mb-6">
                  {t("howItWorks")}
                </h3>
                
                <div className="flex items-center gap-4">
                  <span className="text-white text-base">
                    {t("completeProgram")}
                  </span>
                  
                  <ArrowDown className="w-5 h-5 text-white/60 rotate-[-90deg]" />
                  
                  <div className="inline-flex items-center bg-white rounded-full px-5 py-2.5">
                    <span className="text-black text-base font-medium whitespace-nowrap">
                      {t("get100")}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1a1a1d] rounded-3xl p-8"
              >
                <p className="text-white/80 text-base leading-relaxed">
                  {t("description")}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Full-width Conditions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 w-full"
          >
            <div className="flex items-center gap-8">
              <h4 className="text-black font-semibold text-lg">
                {t("conditions")}
              </h4>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900 text-base">
                    {t("condition1")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900 text-base">
                    {t("condition2")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
