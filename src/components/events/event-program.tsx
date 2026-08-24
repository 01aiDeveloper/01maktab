'use client';

import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProgramItem {
  order: number;
  text: string;
}

interface ProgramStage {
  id: number;
  title: string;
  items: ProgramItem[];
}

interface EventProgramProps {
  program: ProgramStage[];
}

export function EventProgram({ program }: EventProgramProps) {
  const t = useTranslations('eventSections');
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
        {t('programTitle')}
      </h2>

      <div className="space-y-4">
        {program.map((stage, index) => (
          <div
            key={stage.id}
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-3xl overflow-hidden"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 lg:p-8 text-left hover:bg-[#323232] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3a3a3a] flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white">{stage.title}</h3>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              {stage.items.length > 0 && (
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="border-t border-[#3a3a3a] pt-6 space-y-4">
                    {stage.items.map((item) => (
                      <div key={item.order} className="flex gap-6">
                        <div className="w-8 text-center flex-shrink-0">
                          <span className="text-lg font-semibold text-white/60">{item.order}</span>
                        </div>
                        <p className="text-base text-white/70 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
