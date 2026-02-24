'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Users, BookOpen, CheckCircle2, FileText, Heart } from 'lucide-react';
import { MainButton } from '@/components/ui/main-button';
import { Badge } from '@/components/ui/badge';
import { HomeGraduatesSection } from '@/components/sections/home/home-graduates-section';
import { PartnersSection } from '@/components/sections/home/partners';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MentorCard } from '@/components/cards/mentor-card';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import { SkillsList } from '@/components/sections/skills-list';
import { InstrumentsGrid } from '@/components/sections/instruments-grid';
import { FAQAccordion } from '@/components/shared/faq-accordion';
import { CourseHeroSection } from '@/components/sections/courses/course-hero-section';
import { CourseDescriptionSection } from '@/components/sections/courses/course-description-section';
import { LearningOutcomesSection } from '@/components/sections/courses/learning-outcomes-section';
import { ProjectsCarouselSection } from '@/components/sections/courses/projects-carousel-section';
import { TrialVideoSection } from '@/components/sections/courses/trial-video-section';
import { CourseStatsSection } from '@/components/sections/courses/course-stats-section';
import { CertificateSection } from '@/components/sections/courses/certificate-section';
import { EnrollmentCTASection } from '@/components/sections/courses/enrollment-cta-section';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

// Course data type
interface Lesson {
  id: string;
  title: string;
  isFree?: boolean;
  type: 'video' | 'test' | 'practice';
}

interface Module {
  id: string;
  title: string;
  lessonsCount: number;
  testsCount: number;
  lessons: Lesson[];
}

interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface CourseData {
  title: string;
  description: string;
  image: string;
  videosCount: number;
  tasksCount: number;
  projectsCount: number;
  duration: string;
  level: string;
  price: string;
  learningOutcomes: {
    title: string;
    description: string;
  }[];
  skills: string[];
  instruments: { name: string; icon: string }[];
  modules: Module[];
  projects: Project[];
  mentor: {
    name: string;
    role: string;
    company: string;
    experience: string;
    technologies: string;
    image: string;
  };
  stats: {
    graduates: number;
    employmentRate: string;
    rating: string;
  };
  certificate: {
    image: string;
    benefits: string[];
  };
  faqs: FAQ[];
}

// Mock data for course
const courseData: CourseData = {
  title: 'Data Analyst Kursi',
  description: 'С нуля до аналитика в топ-компаниях: твоя карьера начинается здесь',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-oEsNyTYc1iK3q5egr13QUpvEXjf8aN.jpeg',
  videosCount: 120,
  tasksCount: 45,
  projectsCount: 12,
  duration: '8 Soat',
  level: "Boshlang'ich",
  price: 'Bepul',
  learningOutcomes: [
    {
      title: 'Общаться с заказчиком',
      description:
        'Узнаете, как правильно провести интервью, собрать и задокументировать требования. Научитесь трансформировать бизнес-задачи в исследовательские вопросы.',
    },
    {
      title: 'Понимать проблемы бизнеса',
      description:
        'Разберётесь, как устроены типичные процессы в компаниях: разработка, поддержка и сопровождение IT-продукта, маркетинг, продажи. Узнаете, какие проблемы возникают на каждом из этапов, и научитесь их решать с помощью аналитики.',
    },
    {
      title: 'Готовить данные для анализа',
      description:
        'Будете извлекать данные из различных источников: читать из файлов, баз данных. Научитесь очищать и трансформировать данные, находить аномалии и выбросы.',
    },
    {
      title: 'Проводить исследование',
      description:
        'Научитесь проводить когортный анализ, рассчитывать коэффициенты корреляции и строить прогнозы. Будете формулировать гипотезы и подбирать методы для их проверки.',
    },
    {
      title: 'Визуализировать результаты работы',
      description:
        'Узнаете о правилах композиции дэшбордов, научитесь правильно выбирать тип диаграммы, чтобы понятно доносить выводы до аудитории Будете создавать дэшборды в Power BI, рисовать графики и визуализировать с помощью Python-библиотек plotly и matplotlib.',
    },
    {
      title: 'Презентовать результаты заказчику',
      description:
        'Узнаете, как сформулировать понятный вывод и составить развёрнутый аналитический отчёт Познакомитесь с типовой структурой презентации. Поймёте, как удержать внимание аудитории. Научитесь конструктивно критиковать и адекватно реагировать на обратную связь.',
    },
  ],
  skills: ["SQL so'rovlari yozish", 'Python bilan ishlash', 'Vizualizatsiya', 'Dashboard yaratish'],
  instruments: [
    { name: 'Python', icon: '🐍' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Tableau', icon: '📊' },
    { name: 'Power BI', icon: '📈' },
    { name: 'Pandas', icon: '🐼' },
    { name: 'NumPy', icon: '🔢' },
  ],
  modules: [
    {
      id: '1',
      title: 'I modul - Основы Python',
      lessonsCount: 4,
      testsCount: 1,
      lessons: [
        { id: '1-1', title: 'Что такое операторы и выражения в Python', isFree: true, type: 'video' },
        { id: '1-2', title: 'Что такое функции и для чего нужны', isFree: true, type: 'video' },
        { id: '1-3', title: 'Работа с файлами', isFree: true, type: 'video' },
        { id: '1-4', title: 'Типы данных в Python', type: 'video' },
        { id: '1-5', title: 'Циклы while и for. Бесконечные циклы', type: 'video' },
        { id: '1-6', title: 'Типы данных в Python', type: 'video' },
        { id: '1-7', title: 'Сложные функции и рекурсия', type: 'video' },
        { id: '1-8', title: 'Промежуточное тестирование', type: 'test' },
      ],
    },
    {
      id: '2',
      title: 'II modul - Основы Python, часть 2',
      lessonsCount: 4,
      testsCount: 4,
      lessons: [],
    },
    {
      id: '3',
      title: 'III modul - Python Advanced',
      lessonsCount: 4,
      testsCount: 4,
      lessons: [],
    },
    {
      id: '4',
      title: 'IV modul - Практика',
      lessonsCount: 4,
      testsCount: 4,
      lessons: [],
    },
  ],
  projects: [
    {
      id: '1',
      number: '1/4',
      title: 'Запуск первого ML сервиса в интернет',
      description:
        'Создайте свою первую работающую ML модель и разместите её в интернете. Любой человек сможет зайти по ссылке и лучить педсказание от вашей модели. Научитесь делать API и работать с Docker.',
      image: '/images/3d-cylinder.jpg',
    },
    {
      id: '2',
      number: '2/4',
      title: 'Dashboard для бизнес-аналитики',
      description: 'Создайте интерактивный дашборд для анализа продаж и метрик бизнеса.',
      image: '/images/projects/dashboard.png',
    },
    {
      id: '3',
      number: '3/4',
      title: 'Анализ данных электронной коммерции',
      description: 'Проведите полный цикл анализа данных интернет-магазина.',
      image: '/images/projects/ecommerce.png',
    },
    {
      id: '4',
      number: '4/4',
      title: 'Предсказание оттока клиентов',
      description: 'Постройте модель машинного обучения для предсказания оттока.',
      image: '/images/projects/churn.png',
    },
  ],
  mentor: {
    name: 'Shakhzod Nuriev',
    role: 'Backend-разработчик',
    company: 'Uzum Technologies',
    experience: 'Работал в Yandex, ivi.ru, TBC Bank',
    technologies: 'Стек технологий: Django, Flask, PostgreSQL, React.',
    image: '/images/mentor/1.png',
    decorImage: '/images/mentor/bg.png',
  },

  stats: {
    graduates: 1247,
    employmentRate: '78%',
    rating: '4.8/5',
  },
  certificate: {
    image: '/images/certificate.webp',
    benefits: [
      'Помогает в составлении резюме и упаковке портфолио,',
      'рекомендациях вашей кандидатуры работодателям, а также',
      'полным сопровождением до трудоустройства.',
    ],
  },
  faqs: [
    {
      id: '1',
      question: 'Подойдёт ли курс новичкам?',
      answer:
        'Программа рассчитана на новичков: вы сначала изучите основы и постепенно будете переходить к сложным темам. Каждый из них заканчивается практикой, чтобы вы не просто понимали материал, но и могли применять его на деле. Для старта достаточно базовых навыков работы с компьютером (набор текста, ориентирование в системе). Если у вас нет опыта — мы бесплатно обучим вас компьютерной грамотности перед началом курса.',
    },
    {
      id: '2',
      question: 'Почему мне стоит выбрать именно 01AI?',
      answer: '01AI предлагает уникальную методологию обучения с реальными проектами и поддержкой ��енторов.',
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

// Trial video section data
const trialVideoData = {
  title: "Kursni sinab ko'ring",
  subtitle: 'Dastlabki darslar bepul. Sizga yoqsa, davom eting',
  videoImage: '/images/trial-video.png',
};

export default function CoursePage() {
  // Projects carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <SiteHeader variant="light" />

      {/* Hero Section */}
      <CourseHeroSection
        title={courseData.title}
        description={courseData.description}
        image="/images/hero1.webp"
        videosCount={courseData.videosCount}
        tasksCount={courseData.tasksCount}
        projectsCount={courseData.projectsCount}
        duration={courseData.duration}
        level={courseData.level}
        price={courseData.price}
        stats={courseData.stats}
      />

      {/* Course Description Section */}
      <CourseDescriptionSection
        title={courseData.title}
        description="Вы научитесь решать задачи бизнеса с помощью данных. Сначала получите необходимую подготовку: подтянете математику и статистику, а затем изучите SQL, Python, Power BI и через год станете дата-аналитиком."
      />

      {/* Learning Outcomes Section */}
      <LearningOutcomesSection outcomes={courseData.learningOutcomes} />

      {/* Skills and Instruments Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <SkillsList skills={courseData.skills} />
            <InstrumentsGrid instruments={courseData.instruments} />
          </div>
        </div>
      </section>

      {/* Real Projects Section */}
      <ProjectsCarouselSection projects={courseData.projects} />

      {/* Trial Video Section */}
      <TrialVideoSection title={trialVideoData.title} subtitle={trialVideoData.subtitle} videoImage="/images/courses/bg.webp" />

      {/* Full Curriculum Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-2">To'liq kurs dasturi</h2>
          <p className="text-gray-500 mb-6">45 ta modullar, 120 soat materiallar</p>

          <ModuleAccordion
            variant="light"
            modules={courseData.modules}
            freeBadgeClassName="bg-green-500 hover:bg-green-500 text-white"
            actionButtonClassName="bg-[#5d7bf5] hover:bg-[#5d7bf5] text-white"
          />
        </div>
      </section>

      {/* Graduates Section */}
      <HomeGraduatesSection rows={1} />

      {/* Stats Section */}
      <CourseStatsSection stats={courseData.stats} />

      {/* Mentor Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Ментор курса</h2>
          <MentorCard
            name={courseData.mentor.name}
            role={courseData.mentor.role}
            company={courseData.mentor.company}
            experience={courseData.mentor.experience}
            technologies={courseData.mentor.technologies}
            image={courseData.mentor.image}
            decorationUrl={courseData.mentor?.decorImage}
            variant="light"
          />

          {/* <MentorCard
            name={mentor.name}
            role={mentor.role}
            company={mentor.company}
            experience={mentor.experience}
            technologies={mentor.technologies}
            image={mentor.image}
           
            variant="light"
          /> */}
        </div>
      </section>

      {/* Certificate Section */}
      <CertificateSection certificate={courseData.certificate} />

      {/* Partners Section */}
      <PartnersSection />

      {/* FAQ Section */}
      <FAQAccordion variant="light" faqs={courseData.faqs} />

      {/* Final CTA Section */}
      <EnrollmentCTASection />

      <SiteFooter />
    </div>
  );
}
