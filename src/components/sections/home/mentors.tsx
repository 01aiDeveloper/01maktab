"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { MainButton } from "@/components/ui/main-button";
import { MainTitle } from "@/components/ui/main-title";
import { MentorCard } from "@/components/shared/mentor-card";
import { useMentors } from "@/hooks/queries/use-mentors";
import { getMediaUrl } from "@/lib/utils";
import { useState } from 'react';
import { CustomPagination } from '@/components/ui/custom-pagination';

export function MentorsSection() {
  const t = useTranslations("mentors");
  const tCommon = useTranslations("common");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMentors(page, 12);
  const mentors = data?.data ?? [];
  const pageCount = data?.meta?.pagination?.pageCount ?? 1;

  return (
    <section className="relative w-full bg-base-dark overflow-hidden rounded-b-[70px] sm:rounded-b-[160px] md:rounded-b-[328px] min-h-screen flex flex-col justify-center py-10 sm:py-18">
      <div className="container">
        <div className="mx-auto max-w-[1296px] text-center">
          <MainTitle align="center" color="white" animated>
            {t("title")}
          </MainTitle>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="w-full max-w-[310px]">
                <MentorCard
                  name={mentor.fullname || ""}
                  role={mentor.position || ""}
                  imageUrl={getMediaUrl(mentor.photo) || "/placeholder.svg"}
                />
              </div>
            ))}
          </div>
          <CustomPagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>

        {!isLoading && mentors.length > 0 && <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/login">
            <MainButton
              variant="gradient"
              size="default"
              className="group w-60 h-13.5 rounded-[10px] px-4 py-3.75 flex flex-row items-center"
            >
              {tCommon("startFree")}
              <ArrowRight className="h-6 w-6 inline ml-1" />
            </MainButton>
          </Link>
        </motion.div>}
      </div>
    </section>
  );
}


