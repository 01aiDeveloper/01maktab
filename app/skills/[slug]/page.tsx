'use client';

import { ArrowLeft, ArrowRight, Clock, BarChart3, FileText, Folder, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainButton } from '@/components/ui/main-button';
import { Badge } from '@/components/ui/badge';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MentorCard } from '@/components/cards/mentor-card';

// Static course data
const courseData = {
  title: "SQL: Ma'lumotlar bazasi asoslari",
  description:
    'Освой SQL и научись уверенно работать с данными: от написания корректных запросов и объединения таблиц до использования оконных функций и подготовки аналитических выборок. Курс построен на реальных кейсах и поможет применять SQL в аналитике, BI и продуктовой работе.',
  duration: '8 Soat',
  level: "Boshlang'ich",
  price: 'Bepul',
  image: '/images/skills/2.webp',
};

const partner = {
  name: 'TBC Bank',
  logo: '/images/partners/tbc.png',
  title: 'Hamkorlik - TBC Bank',
  description: 'TBC Bank — один из двух крупнейших по активам в стране, на него приходится около 40% активов сектора',
};

const learningTopics = [
  'Основы реляционных баз данных и их структуры.',
  'Основные команды SQL: SELECT, INSERT, UPDATE, DELETE.',
  'Работа с фильтрацией, сортировкой и группировкой данных.',
  'Использование функций для обработки данных и вычислений.',
  'Создание и управление таблицами, индексация, связи между таблицами.',
  'Продвинутые запросы: JOIN, подзапросы, агрегатные функции.',
  'Практика написания запросов на реальных данных.',
  'Оптимизация запросов и основы работы с большими объемами данных.',
];

const learningFormat = [
  'Видеоуроки с пошаговыми объяснениями.',
  'Практические задания после каждого модуля.',
  'Работа с реальными проектами для закрепления навыка.',
  'Поддержка наставника и обратная связь по домашним заданиям.',
];

const learningResult =
  'После прохождения курса вы сможете уверенно писать SQL-запросы, анализировать данные, создавать собственные базы данных и работать с информацией на профессиональном уровне. Этот навык откроет возможности в аналитике, разработке и управлении данными.';

const modules = [
  {
    id: 'module-1',
    title: 'I модуль - Основы SQL',
    darsCount: 4,
    testCount: 1,
    lessons: [
      { id: '1', title: 'Введение в базы данных и SQL', isFree: true, type: 'video' as const },
      { id: '2', title: 'Типы данных и создание таблиц (CREATE TABLE)', isFree: false, type: 'video' as const },
      { id: '3', title: 'Базовые запросы: SELECT, WHERE, ORDER BY', isFree: false, type: 'video' as const },
      { id: '4', title: 'Фильтрация и логические операторы (AND, OR, NOT)', isFree: false, type: 'video' as const },
    ],
    test: { title: 'Связи между таблицами (PK, FK)' },
  },
  {
    id: 'module-2',
    title: 'II модуль - Работа с несколькими таблицами',
    darsCount: 4,
    testCount: 4,
    lessons: [],
    test: null,
  },
  {
    id: 'module-3',
    title: 'III модуль - Группировка и агрегации',
    darsCount: 4,
    testCount: 4,
    lessons: [],
    test: null,
  },
  {
    id: 'module-4',
    title: 'IV модуль - Управление данными и оптимизация',
    darsCount: 4,
    testCount: 4,
    lessons: [],
    test: null,
  },
];

const mentor = {
  name: 'Shakhzod Nuriev',
  role: 'Backend-разработчик',
  company: 'Uzum Technologies',
  experience: 'Работал в Yandex, ivi.ru, TBC Bank',
  technologies: 'Стек технологий: Django, Flask, PostgreSQL, React.',
  image: '/images/mentor/1.png',
  decorImage: '/images/mentor/bg.png',
};

// Folder icon component
function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 12C6 9.79086 7.79086 8 10 8H18L22 12H38C40.2091 12 42 13.7909 42 16V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V12Z"
        fill="#E5E7EB"
      />
      <path d="M6 16H42V36C42 38.2091 40.2091 40 38 40H10C7.79086 40 6 38.2091 6 36V16Z" fill="#D1D5DB" />
      <rect x="10" y="20" width="16" height="2" rx="1" fill="#9CA3AF" />
      <rect x="10" y="26" width="12" height="2" rx="1" fill="#9CA3AF" />
    </svg>
  );
}

export default function SkillDetailPage() {
  const [openModule, setOpenModule] = useState<string>('module-1');

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section - Matching private homepage layout */}
      <section className="w-full py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Two Stacked Cards */}
            <div className="flex flex-col gap-4">
              {/* Top Card - Course Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col relative overflow-hidden"
              >
                {/* Back Link */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors w-fit"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Orqaga</span>
                </Link>

                {/* Main Heading */}
                <h1 className="font-suisse text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">{courseData.title}</h1>

                {/* Description */}
                <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6">{courseData.description}</p>

                {/* CTA Button */}
                <MainButton
                  variant="gradient"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5] rounded-xl w-fit"
                >
                  Xoziroq boshlash
                </MainButton>
              </motion.div>

              {/* Bottom Card - Partner Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="bg-[#e8e8e8] rounded-3xl p-6 flex items-center gap-4"
              >
                {/* TBC Bank Logo */}
                <div className="w-20 h-20 lg:w-36 lg:h-36 bg-white rounded-2xl flex items-center justify-center shrink-0">
                  <Image src={partner.logo} alt={partner.name} width={80} height={80} className="object-contain p-4" />
                </div>

                {/* Partner Info */}
                <div className="flex-1">
                  <h3 className="font-suisse font-bold text-gray-900 text-lg lg:text-xl mb-2">{partner.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3">{partner.description}</p>
                  <MainButton
                    variant="black"
                    size="sm"
                    icon={<ArrowRight className="w-3 h-3" />}
                    iconPosition="right"
                    className="rounded-xl border-0 text-xs"
                  >
                    Batafsil
                  </MainButton>
                </div>
              </motion.div>
            </div>

            {/* Right Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="bg-gradient-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-3xl overflow-hidden relative h-[400px] lg:h-full"
            >
              <Image src={courseData.image} alt={courseData.title} fill className="object-cover " priority />

              {/* Badges at top */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm w-fit backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5" />
                  Davomiylik: {courseData.duration}
                </Badge>
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm w-fit backdrop-blur-sm">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Daraja: {courseData.level}
                </Badge>
                <Badge className="bg-white/95 text-gray-700 border-0 rounded-full px-3 py-1.5 text-xs font-medium w-fit backdrop-blur-sm">
                  Narxi: {courseData.price}
                </Badge>
              </div>

              {/* Database Icon at bottom-right */}
              <div className="absolute bottom-6 right-6 w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2 2 3 8 3s8-1 8-3V7M4 7c0 2 2 3 8 3s8-1 8-3M4 7c0-2 2-3 8-3s8 1 8 3m0 5c0 2-2 3-8 3s-8-1-8-3"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 lg:p-12"
          >
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Bu skillda nima o'rganasiz?</h2>

            <p className="text-gray-600 text-sm lg:text-base mb-8 leading-relaxed">
              Этот курс предназначен для всех, кто хочет освоить язык SQL — ключевой инструмент для работы с базами данных. Вы научитесь
              создавать, управлять и анализировать данные, используя современные подходы и практические задания. Курс подходит как для
              начинающих, так и для специалистов, желающих систематизировать свои знания и повысить квалификацию.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Что вы изучите:</h3>
                <ul className="space-y-2">
                  {learningTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Формат обучения:</h3>
                <ul className="space-y-2">
                  {learningFormat.map((format, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {format}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm lg:text-base">Результат курса:</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{learningResult}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Program Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Kurs dasturi</h2>

          <ModuleAccordion
            variant="light"
            modules={modules}
            freeBadgeClassName="bg-orange-500 hover:bg-orange-500 text-white"
            actionButtonClassName="bg-[#1ebb4a] hover:bg-[#19a842] text-white"
          />
        </div>
      </section>

      {/* Mentor Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Skill mentori</h2>
          <MentorCard
            name={mentor.name}
            role={mentor.role}
            company={mentor.company}
            experience={mentor.experience}
            technologies={mentor.technologies}
            image={mentor.image}
            decorationUrl={mentor.decorImage}
            variant="light"
          />
        </div>
      </section>

      {/* Mobile CTA Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <MainButton
          variant="gradient"
          size="lg"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="w-full bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5] rounded-xl"
        >
          Xoziroq boshlash
        </MainButton>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="lg:hidden h-24" />

      {/* TBC Bank Partnership Banner */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 lg:p-12 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1 text-white">
                <h2 className="font-suisse text-2xl lg:text-4xl font-bold mb-4">TBC Bank bilan hamkorlikda</h2>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                  TBC Bank — один из двух крупнейших по активам в стране, на него приходится около 40% активов сектора
                </p>
                <MainButton
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="rounded-xl h-11 text-sm"
                >
                  Batafsil
                </MainButton>
              </div>

              {/* Right Logo Card */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-white rounded-2xl p-8 lg:p-12 flex items-center justify-center aspect-square lg:aspect-auto lg:h-64">
                  <Image src={partner.logo} alt={partner.name} width={150} height={150} className="object-contain" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
