'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQAccordion({ faqs, title = 'Часто задаваемые вопросы' }: FAQAccordionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>

          <div className="">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-[#18181a] rounded-3xl border-0 overflow-hidden">
                  <AccordionTrigger className="px-6 lg:px-8 py-6 hover:no-underline text-left text-white">
                    <span className="font-medium text-base lg:text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 lg:px-8 pb-6 text-gray-300 text-sm lg:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
