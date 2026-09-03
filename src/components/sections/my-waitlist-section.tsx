"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useMyWaitlist } from "@/hooks/mutations/use-waitlist"
import { baseMediaUrl } from "@/lib/utils"
import { StatusBadge } from "@/components/ui/status-badge"
import { PaginatedGrid } from '@/components/ui/paginated-grid'

function mediaUrl(path: string | null | undefined): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${baseMediaUrl}/${path}`
}

export function MyWaitlistSection() {
  const t = useTranslations("userHome")
  const { data: entries, isLoading } = useMyWaitlist()

  if (isLoading || !entries || entries.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{t("myWaitlist")}</h2>
      </div>

      <PaginatedGrid items={entries} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(entry) => {
            const courseTitle = entry.title || entry.name || t("unknownCourse")
            const detailHref =
              entry.format === "SKILL"
                ? `/skills/${entry.id}`
                : entry.format === "PROFESSION"
                ? `/professions/${entry.id}`
                : `/courses/${entry.id}`
            const mentorName = entry.mentor?.fullname
            const photoUrl = mediaUrl(entry.photo)
            return (
              <div
                key={entry.id}
                className="min-w-0"
              >
                <Link href={detailHref} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.18 }}
                    whileHover={{ y: -7, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative rounded-3xl cursor-pointer h-102 border-0 shadow-[0_10px_24px_rgba(24,38,86,0.08)]"
                  >
                    {photoUrl ? (
                      <Image
                        quality={90} src={photoUrl}
                        alt={courseTitle}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover rounded-[20px] overflow-hidden"
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#5d7bf5] to-[#7c71f4]" />
                    )}

                    <div className="absolute top-3 right-3 z-10">
                      <StatusBadge status="waitlist" size="sm" />
                    </div>

                    <div
                      className="absolute z-10 rounded-[20px] flex items-center justify-between gap-2 px-4 bg-white"
                      style={{ bottom: "-4px", left: "-2px", right: "-2px", height: "126px" }}
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-base leading-snug line-clamp-2 text-[#1a1a1a]">
                          {courseTitle}
                        </h3>
                        {mentorName && (
                          <p className="text-sm mt-1 truncate text-gray-500">
                            {t("mentorLabel")} {mentorName}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#1a1a1a]">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            )
          }}
      </PaginatedGrid>
    </motion.section>
  )
}
