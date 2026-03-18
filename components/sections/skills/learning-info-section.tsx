'use client';

import { motion } from 'framer-motion';

interface LearningInfoSectionProps {
  learningTopics: string[];
  learningFormat: string[];
  learningResult: string;
}

export function LearningInfoSection({ learningTopics, learningFormat, learningResult }: LearningInfoSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 lg:p-12"
        >
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Bu skillda nima o'rganasiz?</h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Kurs mavzulari:</h3>
                <ul className="space-y-3">
                  {learningTopics.map((topic, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-[#5d7bf5] font-bold shrink-0">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Format o'qitish:</h3>
                <ul className="space-y-3">
                  {learningFormat.map((format, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-[#5d7bf5] font-bold shrink-0">•</span>
                      <span className="text-gray-600 text-sm leading-relaxed">{format}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Kurs natijasi:</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{learningResult}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
