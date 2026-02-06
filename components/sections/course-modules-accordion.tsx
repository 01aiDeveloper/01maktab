'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';

export interface Lesson {
  id: string;
  title: string;
  isFree?: boolean;
  type: 'video' | 'test' | 'practice';
}

export interface Module {
  id: string;
  title: string;
  lessonsCount?: number;
  testsCount?: number;
  darsCount?: number;
  testCount?: number;
  lessons: Lesson[];
  test?: { title: string };
}

interface CourseModulesAccordionProps {
  modules: Module[];
  title?: string;
  subtitle?: string;
  freeBadgeColor?: string;
  actionButtonColor?: string;
}

export function CourseModulesAccordion({
  modules,
  title = "To'liq kurs dasturi",
  subtitle,
  freeBadgeColor = 'bg-[#22c55e]',
  actionButtonColor = 'bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5]',
}: CourseModulesAccordionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}

          <Accordion type="single" collapsible className="space-y-3">
            {modules.map((module, moduleIndex) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: moduleIndex * 0.1 }}
              >
                <AccordionItem value={module.id} className="bg-white border-0 rounded-3xl overflow-hidden">
                  <AccordionTrigger className="px-5 lg:px-6 py-5 hover:no-underline hover:bg-gray-50/50 data-[state=open]:bg-white transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <Image
                        className="w-12 h-12 lg:w-14 lg:h-14 shrink-0"
                        src="/images/common/folder.png"
                        alt="folder icon"
                        width={64}
                        height={64}
                      />
                      <div className="text-left">
                        <h3 className="font-suisse font-semibold text-gray-900 text-base lg:text-lg">{module.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            Dars: {module.lessonsCount ?? module.darsCount ?? 0}
                          </span>
                          <span className="text-xs text-gray-500">
                            Test: {module.testsCount ?? module.testCount ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    {module.lessons.length > 0 && (
                      <div className="border-t border-gray-100">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-5 lg:px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <span className="text-gray-400 text-sm w-14 shrink-0">
                                {lesson.type === 'test' ? 'Test' : `Dars ${lessonIndex + 1}`}
                              </span>
                              <span className="text-gray-700 text-sm truncate">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-4">
                              {lesson.isFree ? (
                                <>
                                  <Badge className={`${freeBadgeColor} hover:${freeBadgeColor} text-white text-xs rounded-full px-3 py-1.5`}>
                                    Bepul sinov darsi
                                  </Badge>
                                  <MainButton
                                    variant="gradient"
                                    size="sm"
                                    icon={<ArrowRight className="w-3 h-3" />}
                                    iconPosition="right"
                                    className={`${actionButtonColor} rounded-full text-xs h-8 px-4`}
                                  >
                                    Ko'rish
                                  </MainButton>
                                </>
                              ) : (
                                <>
                                  <Badge className="bg-black hover:bg-black text-white text-xs rounded-full px-3 py-1.5">To'liq kursda</Badge>
                                  <Lock className="w-5 h-5 text-gray-400" />
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
