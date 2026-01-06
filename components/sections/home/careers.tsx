"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MainTitle } from "@/components/ui/main-title";
import { Subtitle } from "@/components/ui/subtitle";
import { MainButton } from "@/components/ui/main-button";

const CAREERS = [
  {
    id: "data",
    label: "Data Analitik",
    title: "Data Analitik Kasbi",
    description:
      "Build advanced machine learning models and deploy them to production. Master deep learning, neural networks, and advanced data processing techniques.",
    cardColor: "bg-[#3361FF]",
    textColor: "text-white",
    buttonVariant: "white" as const,
    imageUrl: "/images/course_icon.png",
  },
  {
    id: "ml",
    label: "ML Engineer",
    title: "ML Engineer Kasbi",
    description:
      "Build advanced machine learning models and deploy them to production. Master deep learning, neural networks, and advanced data processing techniques.",
    cardColor: "bg-gray-100",
    textColor: "text-black",
    buttonVariant: "black" as const,
    imageUrl: "/images/course_icon.png",
  },
];

export function CareersSection() {
  const [activeTab, setActiveTab] = useState(CAREERS[0].id);
  const activeData = CAREERS.find((c) => c.id === activeTab)!;

  return (
    <section className="bg-base-dark py-12 md:py-16 rounded-[40px] ">
      <div className="container">
        <div className="overflow-hidden rounded-[30px] md:rounded-[60px]  py-12  md:py-20 text-center lg:py-24">
          <MainTitle
            align="center"
            color="white"
            className="text-white"
            animated
          >
            Kasblar
          </MainTitle>
          <Subtitle
            align="center"
            textColor="rgba(255, 255, 255, 0.5)"
            className="mx-auto mt-4 md:mt-6 max-w-xl"
            animated
            animationDelay={0.1}
          >
            Stajerovka, live darslar, mentorlar, student support,
            kompaniyalardagi real loyihalar va xalqaro sertifikat o’z ichiga
            oladigan to’liq ta’lim dasturi.
          </Subtitle>

          <div className="mt-8 md:mt-12 flex justify-center gap-2 md:gap-3 flex-wrap">
            {CAREERS.map((career) => (
              <button
                key={career.id}
                onClick={() => setActiveTab(career.id)}
                className={`px-6 md:px-10 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 border ${
                  activeTab === career.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:bg-white/5"
                }`}
              >
                {career.label}
              </button>
            ))}
          </div>

          <div className="mt-8 md:mt-16 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={`relative flex md:items-center overflow-hidden rounded-[24px] md:rounded-[48px] ${activeData.cardColor} min-h-[400px] md:min-h-[500px] lg:min-h-[580px] `}
              >
                {/* Background Image */}
                <div className="absolute bottom-0 right-0 w-full md:w-1/2 lg:w-1/2 h-1/2 md:h-full z-0">
                  {activeData.cardColor === "bg-[#3361FF]" && (
                    <div className="absolute inset-0 bg-linear-to-l from-blue-600/20 to-transparent pointer-events-none z-10" />
                  )}
                  <Image
                    src={activeData.imageUrl || "/placeholder.svg"}
                    alt={activeData.title}
                    fill
                    className="object-contain object-bottom-right scale-125 md:scale-140 lg:scale-[1.6] md:translate-x-4 lg:translate-x-10 lg:translate-y-10"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 flex-1 p-4 md:p-10 text-left lg:p-16">
                  <h3 className={`text-2xl md:text-4xl font-bold ${activeData.textColor} md:text-5xl lg:text-7xl leading-tight`}>
                    {activeData.title}
                  </h3>
                  <p className={`mt-4 md:mt-8 max-w-lg ml-0 text-sm md:text-base lg:text-lg leading-relaxed ${activeData.textColor === "text-white" ? "text-white/90" : "text-black/90"}`}>
                    {activeData.description}
                  </p>
              
                  <MainButton
                    variant={activeData.buttonVariant}
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4 md:h-6 md:w-6" />}
                    iconPosition="right"
                    className="group mt-6 md:mt-12"
                  >
                    Batafsil
                  </MainButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
