// FAQAccordion.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type Variant = "dark" | "light";

type Props = {
  faqs?: FAQItem[];
  variant: Variant;
  title?: string;
  titleClassName?: string;
  className?: string;
  emptyState?: React.ReactNode;
};

const styles: Record<Variant, any> = {
  dark: {
    section: "w-full py-8 bg-[#101010]",
    title: "text-white",
    item: "bg-[#18181a] rounded-3xl border-0 overflow-hidden",
    trigger: "px-6 lg:px-8 py-6 hover:no-underline text-left text-white hover:bg-white/5 transition-colors",
    content: "px-6 lg:px-8 pb-6 text-gray-300 text-sm lg:text-base leading-relaxed",
    emptyCard: "bg-[#282828] text-gray-300 border border-gray-700",
    emptyMuted: "text-gray-400",
  },
  light: {
    section: "w-full py-8",
    title: "text-gray-900",
    item: "bg-white rounded-3xl border-0 overflow-hidden shadow-sm",
    trigger: "px-6 lg:px-8 py-6 hover:no-underline text-left text-gray-900 hover:bg-gray-50 transition-colors",
    content: "px-6 lg:px-8 pb-6 text-gray-600 text-sm lg:text-base leading-relaxed",
    emptyCard: "bg-white text-gray-700 border border-gray-100",
    emptyMuted: "text-gray-500",
  },
};

export function FAQAccordion({
  faqs,
  variant,
  title,
  titleClassName,
  className,
  emptyState,
}: Props) {
  const t = useTranslations("faq");
  const displayTitle = title ?? t("title");
  const s = styles[variant];
  const list = faqs ?? [];

  if (list.length === 0) {
    return (
      <section className={s.section}>
        <div className="container mx-auto px-4">
          <div className={cn("rounded-3xl p-6 lg:p-8", s.emptyCard, className)}>
            {emptyState ?? (
              <div>
                <div className="font-semibold">{t("emptyTitle")}</div>
                <div className={cn("mt-1 text-sm", s.emptyMuted)}>
                  {t("emptyDescription")}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={cn(
              "font-suisse text-2xl lg:text-3xl font-bold mb-8 text-center",
              s.title,
              titleClassName
            )}
          >
            {displayTitle}
          </h2>

          <Accordion type="single" collapsible className={cn("space-y-4", className)}>
            {list.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem value={faq.id} className={s.item}>
                  <AccordionTrigger className={s.trigger}>
                    <span className="font-medium text-base lg:text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={s.content}>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
