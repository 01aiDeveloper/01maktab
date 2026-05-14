"use client"

import type { MouseEvent } from "react"
import { motion } from "framer-motion"
import { Clock, Users, X, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useMyWaitlist, useLeaveWaitlist } from "@/hooks/use-waitlist"
import { baseMediaUrl } from "@/lib/utils"

function mediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseMediaUrl}/${path}`;
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
        <h2 className="text-2xl font-bold text-foreground">{t("myWaitlist")}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {entries.map((entry) => {
          const courseTitle = entry.title || entry.name || t("unknownCourse");
          const detailHref =
            entry.format === "SKILL"
              ? `/skills/${entry.id}`
              : entry.format === "PROFESSION"
              ? `/professions/${entry.id}`
              : `/courses/${entry.id}`;
          return (
            <Link key={entry.id} href={detailHref} className="h-full relative group">
              <button
                type="button"
                onClick={(e) => handleRemove(e, entry.id)}
                disabled={leaveWaitlist.isPending}
                aria-label={t("removeFromWaitlist")}
                title={t("removeFromWaitlist")}
                className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors disabled:opacity-50"
              >
                {leaveWaitlist.isPending && leaveWaitlist.variables === entry.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-[#5d7bf5] to-[#7c71f4] shrink-0">
                  {entry.photo && (
                    <Image
                      src={mediaUrl(entry.photo)}
                      alt={courseTitle}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex flex-col flex-1">
                  <h3 className="font-suisse font-bold text-gray-900 text-base line-clamp-2 flex-1">
                    {courseTitle}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {t("waiting")}
                    </div>
                    {typeof entry.queueNumber === "number" && (
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-medium">
                        <Users className="w-3.5 h-3.5" />
                        {t("queue", { number: entry.queueNumber })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  )
}
