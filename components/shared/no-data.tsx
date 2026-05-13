'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

interface NoDataProps {
  message?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  isDark?: boolean
}

export function NoData({
  message,
  description,
  buttonText,
  buttonLink,
  isDark = false
}: NoDataProps) {
  const t = useTranslations('noData')
  const finalMessage = message ?? t('messageDefault')
  const finalDescription = description ?? t('descriptionDefault')
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-48 h-48 mb-6">
        <Image
          src="/images/common/nodata.png"
          alt="No data"
          fill
          className={`object-contain ${isDark ? "opacity-40" : "opacity-60"}`}
        />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        {finalMessage}
      </h3>
      <p className={`text-sm text-center max-w-md mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {finalDescription}
      </p>
      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
            isDark
              ? "bg-white text-gray-900 hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
