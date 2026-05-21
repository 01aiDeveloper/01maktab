"use client"

import type { MouseEvent } from "react"
import { motion } from "framer-motion"
import { Check, Users, X, Loader2, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useMyWaitlist, useLeaveWaitlist } from "@/hooks/use-waitlist"
import { baseMediaUrl } from "@/lib/utils"

function mediaUrl(path: string | null | undefined): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${baseMediaUrl}/${path}`
}

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  return String(n)
}

export function MyWaitlistSection() {
  const t = useTranslations("userHome")
  const { data: entries, isLoading } = useMyWaitlist()
  const leaveWaitlist = useLeaveWaitlist()

  const handleRemove = (e: MouseEvent, courseId: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(t("removeWaitlistConfirm"))) return
    leaveWaitlist.mutate(courseId)
  }

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
        <h2 className="text-3xl font-bold text-[#18181A] tracking-[-0.04em]">{t("myWaitlist")}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {entries.map((entry) => {
          const courseTitle = entry.title || entry.name || t("unknownCourse")
          const detailHref =
            entry.format === "SKILL"
              ? `/skills/${entry.id}`
              : entry.format === "PROFESSION"
              ? `/professions/${entry.id}`
              : `/courses/${entry.id}`
          const mentorName = entry.mentor?.fullname
          const waitingCount =
            typeof entry.soldCount === "number" && entry.soldCount > 0
              ? entry.soldCount
              : typeof entry.queueNumber === "number"
              ? entry.queueNumber
              : null
          return (
            <Link key={entry.id} href={detailHref} className="group relative block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-shadow flex flex-col">
                <div className="relative h-56 bg-gradient-to-br from-[#5d7bf5] to-[#7c71f4]">
                  {entry.photo && (
                    <Image
                      src={mediaUrl(entry.photo)}
                      alt={courseTitle}
                      fill
                      className="object-cover"
                    />
                  )}

                  <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-[#FF7A1A] text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      {t("waiting")}
                    </span>
                    {waitingCount !== null && (
                      <span className="inline-flex items-center gap-1.5 bg-[#18181A] text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                        <Users className="w-3.5 h-3.5" />
                        {t("peopleWaiting", { count: formatCount(waitingCount) })}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, entry.id)}
                    disabled={leaveWaitlist.isPending}
                    aria-label={t("removeFromWaitlist")}
                    title={t("removeFromWaitlist")}
                    className="absolute top-3 left-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100"
                  >
                    {leaveWaitlist.isPending && leaveWaitlist.variables === entry.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#18181A] text-lg leading-tight line-clamp-2">
                      {courseTitle}
                    </h3>
                    {mentorName && (
                      <p className="text-sm text-gray-500 mt-1">
                        {t("mentorLabel")} {mentorName}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#18181A] shrink-0 mt-1" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}
