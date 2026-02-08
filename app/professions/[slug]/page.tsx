'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, BookCheck, Award, Briefcase } from 'lucide-react';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FAQAccordion } from '@/components/shared/faq-accordion';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MentorCard } from '@/components/cards/mentor-card';
import { ProgramBenefits } from '@/components/sections/program-benefits';
import { JourneySection } from '@/components/sections/journey-section';
import { MentorCommunicationSection } from '@/components/sections/mentor-communication-section';
import { SupportCardsSection } from '@/components/sections/support-cards-section';
import { CertificatesSection } from '@/components/sections/certificates-section';
import { InternshipStatsSection } from '@/components/sections/internship-stats-section';
import { JobSupportSection } from '@/components/sections/job-support-section';
import { RefundSection } from '@/components/sections/refund-section';
import { GraduatesSection } from '@/components/sections/graduates-section';
import { PaymentOptionsSection } from '@/components/sections/payment-options-section';
import { EnrollmentCtaCountdown } from '@/components/sections/enrollment-cta-countdown';
import { PartnersSection } from '@/components/sections/home/partners';
import { ModuleAccordion } from '@/components/shared/module-accordion';

// Mock data - replace with actual data fetching
const professionData = {
  slug: 'ml-engineer',
  title: 'ML Engineer Kasbi',
  subtitle: 'С нуля до аналитика в топ-компании: твоя карьера начинается здесь',
  enrollmentOpen: true,
  remainingSeats: "Qolgan o'rinlar 15/20",
  startDate: 'Start: 6 iyuldan 2025',
  image: '/images/hero3.webp',
  features: [
    {
      id: 1,
      icon: Calendar,
      label: '5 Месяцев',
    },
    {
      id: 2,
      icon: Award,
      label: '100% возврат средств',
    },
    {
      id: 3,
      icon: BookCheck,
      label: '2 Сертификата',
    },
    {
      id: 4,
      icon: Briefcase,
      label: 'Стажировка',
    },
  ],
  intro: {
    title: 'ML Engineer Kasbi',
    description:
      '5-месячная интенсивная программа: живые занятия, стажировка, международные сертификаты и гарантированный результат. Начните профессиональную карьеру сегодня.',
  },
  mentor: {
    name: 'Farrukh Ruziyev',
    role: 'Senior Data Analyst',
    company: 'TBC Bank',
    experience: 'Работал в Yandex, м.ru, TBC Bank',
    technologies: 'Стек технологий: Django, Flask, PostgreSQL, React.',
    image: '/images/mentor/1.png',
    decorImage: '/images/mentor/bg.png',
  },
  benefits: [
    {
      id: 1,
      title: 'Профессиональные навыки',
      bullets: ['Python, SQL, ML, Визуализация', '8+ проектов в портфолио'],
      icon: <Image src="/icons/professions/1.webp" alt="Certificate" width={80} height={80} className="opacity-40 grayscale" />,
      isDefaultActive: true,
    },
    {
      id: 2,
      title: 'Международные сертификаты',
      bullets: ['Сертификат IBM (международный)', 'Сертификат AICA (аккредитованный)'],
      icon: <Image src="/icons/professions/2.webp" alt="Certificate" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 3,
      title: 'Практический опыт',
      bullets: ['Стажировка в компаниях-партнерах', 'Работа над реальными проектами'],
      icon: <Image src="/icons/professions/3.webp" alt="Briefcase" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 4,
      title: 'Карьерная подготовка',
      bullets: ['Профессиональное резюме', 'Mock interview и подготовка'],
      icon: <Image src="/icons/professions/4.png" alt="Career" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 5,
      title: 'Сообщество',
      bullets: ['Вступление в MLC сообщество', 'Регулярные мероприятия и нетворкинг'],
      icon: <Image src="/icons/professions/5.png" alt="Community" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 6,
      title: '100% возврат денег',
      bullets: ['После завершения программы', 'Полный возврат инвестиций'],
      icon: <Image src="/icons/professions/6.png" alt="Money back" width={80} height={80} className="opacity-40 grayscale" />,
    },
  ],
  certificates: [
    {
      id: 1,
      title: 'Google Professional Certificate',
      badgeText: 'Международный сертификат',
      badgeColor: 'bg-[#5d7bf5] text-white',
      bullets: ['Признается по всему миру', 'Добавьте в LinkedIn', 'Для международных компаний'],
      image: '/images/professions/certificate.png',
    },
    {
      id: 2,
      title: 'Сертификат MLC',
      badgeText: 'Аккредитованный AICA',
      badgeColor: 'bg-[#5d7bf5] text-white',
      bullets: ['Центрально-Азиатская Ассоциация ИИ', 'Признается государственными и частными организациями', 'Официальный документ'],
      image: '/images/professions/certificate.png',
    },
  ],
  certificatesFootnote:
    'Для группы профессий международный сертификат может быть от Google, Microsoft или других ведущих компаний в зависимости от направления',
  partners: [
    {
      id: 1,
      name: 'Ipak Yuli Bank',
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w2DkEqKDQnhS30pPfuiCxoXtzpe5Bq.png',
    },
    {
      id: 2,
      name: 'Ipak Yuli Bank',
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w2DkEqKDQnhS30pPfuiCxoXtzpe5Bq.png',
    },
    {
      id: 3,
      name: 'Ipak Yuli Bank',
      logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w2DkEqKDQnhS30pPfuiCxoXtzpe5Bq.png',
    },
  ],
  modules: [
    {
      id: 'module-1',
      title: 'I модуль - Основы SQL',
      darsCount: 4,
      testCount: 1,
      lessons: [
        { id: 1, title: 'Введение в базы данных и SQL', isFree: true },
        { id: 2, title: 'Типы данных и создание таблиц (CREATE TABLE)', isFree: false },
        { id: 3, title: 'Базовые запросы: SELECT, WHERE, ORDER BY', isFree: false },
        { id: 4, title: 'Фильтрация и логические операторы (AND, OR, NOT)', isFree: false },
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
  ],
  faqs: [
    {
      id: '1',
      question: 'Подойдёт ли курс новичкам?',
      answer:
        'Программа рассчитана на новичков: вы сначала изучите основы и постепенно будете переходить к сложным темам. Каждый из них заканчивается практикой, чтобы вы не просто понимали материал, но и могли применять его на деле. Для старта достаточно базовых навыков работы с компьютером (набор текста, ориентирование в системе). Если у вас нет опыта — мы бесплатно обучим вас компьютерной грамотности перед началом курса.',
    },
    {
      id: '2',
      question: 'Почему мне стоит выбрать именно 01Maktab?',
      answer: '01Maktab предлагает уникальную методологию обучения с реальными проектами и поддержкой менторов.',
    },
    {
      id: '3',
      question: 'Кто ваши наставники?',
      answer: 'Наши наставники — практикующие специалисты из топовых IT-компаний с многолетним опытом.',
    },
    {
      id: '4',
      question: 'Почему обучение длится так долго?',
      answer: 'Качественное обучение требует времени для усвоения материала и практики на реальных проектах.',
    },
    {
      id: '5',
      question: 'Можно ли начать зарабатывать во время обучения?',
      answer: 'Да, многие наши студенты начинают работать на фрилансе уже после первых модулей.',
    },
    {
      id: '6',
      question: 'Я смогу устроиться на работу во время курса?',
      answer: 'Мы помогаем с трудоустройством и многие студенты находят работу ещё до окончания курса.',
    },
  ],
};

export default function ProfessionPage({ params }: { params: { slug: string } }) {
  const [openModule, setOpenModule] = React.useState<string>('module-1');
  return (
    <div className="min-h-screen bg-[#101010]">
      <SiteHeader variant="dark" />
      <main className="">
        {/* Hero Section */}
        <section className="w-full py-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-[40px] overflow-hidden relative min-h-[500px] lg:min-h-[600px]"
            >
              {/* Background Image */}
              <Image src={professionData.image} alt={professionData.title} fill className="object-cover" priority />

              {/* Content Overlay */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center min-h-[500px] lg:min-h-[600px]">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Orqaga</span>
                </Link>

                {/* Enrollment Badge */}
                {professionData.enrollmentOpen && (
                  <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-xs w-fit mb-6">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block" />
                    Набор открыт
                  </Badge>
                )}

                {/* Title */}
                <MainTitle className="mb-4 !leading-tight max-w-2xl">{professionData.title}</MainTitle>

                {/* Subtitle */}
                <Subtitle className="mb-8 max-w-xl">{professionData.subtitle}</Subtitle>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-4 h-auto text-base font-medium w-fit mb-8"
                >
                  Оставить заявку
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>

                {/* Meta Info Pills */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-xs">
                    <Users className="w-4 h-4 mr-2" />
                    {professionData.remainingSeats}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-xs">
                    <Calendar className="w-4 h-4 mr-2" />
                    {professionData.startDate}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Pills Row */}
        <section className="w-full py-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {professionData.features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-[#282828] rounded-3xl p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#5d7bf5] rounded-2xl flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-white text-sm lg:text-base">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Dark Intro Card */}
        <section className="w-full py-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#282828] text-white rounded-3xl p-8 lg:p-12"
            >
              <h2 className="font-suisse text-2xl lg:text-3xl font-bold mb-4">{professionData.intro.title}</h2>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-4xl">{professionData.intro.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Mentor Section */}
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-6">Ментор курса</h2>
            <MentorCard
              name={professionData.mentor.name}
              role={professionData.mentor.role}
              company={professionData.mentor.company}
              experience={professionData.mentor.experience}
              technologies={professionData.mentor.technologies}
              image={professionData.mentor.image}
              decorationUrl={professionData.mentor?.decorImage}
              variant="dark"
            />
          </div>
        </section>

        {/* Program Benefits Section */}
        <ProgramBenefits benefits={professionData.benefits} />

        {/* Journey Section */}
        <JourneySection />

        {/* Mentor Communication Section */}
        <MentorCommunicationSection />

        {/* Support Cards Section */}
        <SupportCardsSection />

        {/* Certificates Section */}
        <CertificatesSection certificates={professionData.certificates} footnote={professionData.certificatesFootnote} />

        {/* Partners Section */}
        <PartnersSection variant="dark" showSubtitle={false} />

        {/* Internship Statistics Section */}
        <InternshipStatsSection />

        {/* Job Support Section */}
        <JobSupportSection />

        {/* Refund Section */}
        <RefundSection />

        {/* Graduates Section */}
        <GraduatesSection />

        {/* Course Program Section */}
        <section className="w-full bg-[#101010] py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-white font-bold text-3xl lg:text-4xl mb-8 lg:mb-12">Kurs dasturi</h2>

            <ModuleAccordion variant="dark" modules={professionData.modules} value={openModule} onValueChange={setOpenModule} />
          </div>
        </section>

        {/* Payment Options Section */}
        <PaymentOptionsSection />

        {/* Enrollment CTA with Countdown */}
        <EnrollmentCtaCountdown />

        {/* FAQ Section */}
        <FAQAccordion variant="dark" faqs={professionData.faqs} />
      </main>
      <SiteFooter variant="dark" />
    </div>
  );
}
