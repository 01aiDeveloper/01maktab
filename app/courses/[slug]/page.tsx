'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import api from '@/lib/api';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MentorCard } from '@/components/cards/mentor-card';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import type { ModuleItem } from '@/components/shared/module-accordion';
import { SkillsList } from '@/components/sections/skills-list';
import { InstrumentsGrid } from '@/components/sections/instruments-grid';
import type { Instrument } from '@/components/sections/instruments-grid';
import { FAQAccordion } from '@/components/shared/faq-accordion';
import { CourseHeroSection } from '@/components/sections/courses/course-hero-section';
import { CourseDescriptionSection } from '@/components/sections/courses/course-description-section';
import { LearningOutcomesSection } from '@/components/sections/courses/learning-outcomes-section';
import { ProjectsCarouselSection } from '@/components/sections/courses/projects-carousel-section';
import type { Project } from '@/components/sections/courses/projects-carousel-section';
import { TrialVideoSection } from '@/components/sections/courses/trial-video-section';
import { CourseStatsSection } from '@/components/sections/courses/course-stats-section';
import { CertificateSection } from '@/components/sections/courses/certificate-section';
import { EnrollmentCTASection } from '@/components/sections/courses/enrollment-cta-section';
import { HomeGraduatesSection } from '@/components/sections/home/home-graduates-section';
import { PartnersSection } from '@/components/sections/home/partners';
import { useCourse } from '@/hooks/use-course';
import { useCourseModules } from '@/hooks/use-course-modules';
import { baseMediaUrl } from '@/lib/utils';
import type { ApiCourseModule, ApiProject } from '@/types/api';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function toModuleItem(m: ApiCourseModule): ModuleItem {
  return {
    id: String(m.id),
    title: m.title,
    darsCount: m.lessons.length,
    testCount: 0,
    lessons: m.lessons.map((l, i) => ({
      id: l.id,
      title: l.title,
      isFree: i === 0,
      type: 'video' as const,
    })),
    test: undefined,
  };
}

function toProject(p: ApiProject, index: number, total: number): Project {
  return {
    id: String(p.id),
    number: `${index + 1}/${total}`,
    title: p.title,
    description: p.description.replace(/<[^>]*>/g, ''),
    image: '/images/3d-cylinder.jpg',
  };
}

// ─── Static data (o'zgarmaydigan sectionlar uchun) ────────────────────────────

const staticLearningOutcomes = [
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
      'Узнаете о правилах композиции дэшбордов, научитесь правильно выбирать тип диаграммы, чтобы понятно доносить выводы до аудитории. Будете создавать дэшборды в Power BI, рисовать графики и визуализировать с помощью Python-библиотек plotly и matplotlib.',
  },
  {
    title: 'Презентовать результаты заказчику',
    description:
      'Узнаете, как сформулировать понятный вывод и составить развёрнутый аналитический отчёт. Познакомитесь с типовой структурой презентации. Поймёте, как удержать внимание аудитории. Научитесь конструктивно критиковать и адекватно реагировать на обратную связь.',
  },
];

const staticStats = {
  graduates: 1247,
  employmentRate: '78%',
  rating: '4.8/5',
};

const staticCertificate = {
  image: '/images/certificate.webp',
  benefits: [
    'Помогает в составлении резюме и упаковке портфолио,',
    'рекомендациях вашей кандидатуры работодателям, а также',
    'полным сопровождением до трудоустройства.',
  ],
};

const staticFaqs = [
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
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data: course, isLoading, isError } = useCourse(slug);
  const { data: courseModules } = useCourseModules(course?.id);
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!course) return;
    setStartLoading(true);
    try {
      await api.post(`/course/${course.id}/enroll`);
    } catch {
      // Allaqachon yozilgan bo'lsa ham davom etamiz
    }
    const modules = courseModules?.modules ?? [];
    const firstModule = modules[0];
    const firstLesson = firstModule?.lessons?.[0];
    if (firstModule && firstLesson) {
      router.push(`/module/${firstModule.id}?lessonId=${firstLesson.id}&courseType=course&courseId=${course.id}`);
      return;
    }
    setStartLoading(false);
  }, [course, courseModules, router]);

  if (course && !openModule && course.modules.length > 0) {
    setOpenModule(String(course.modules[0].id));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader variant="light" />
        <PageLoader />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader variant="light" />
        <PageError />
        <SiteFooter />
      </div>
    );
  }

  const modules: ModuleItem[] = course.modules.map(toModuleItem);
  const projects: Project[] = course.projects.map((p, i) => toProject(p, i, course.projects.length));
  const mentor = course.mentor;

  const skillNames: string[] = course.skills.map((s) => s.name);

  const instruments: Instrument[] = course.technologies.map((t) => ({
    name: t.name,
    icon: t.icon ? mediaUrl(t.icon) : '🔧',
  }));

  const courseImage = mediaUrl(course.photo);
  const priceLabel = course.pricingType === 'FREE' ? 'Bepul' : `${course.price.toLocaleString()} so'm`;

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleLessonClick = (lesson: { id: string | number }, ctx: { module: ModuleItem }) => {
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=course&courseId=${course.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <SiteHeader variant="light" />

      {/* Hero Section */}
      <CourseHeroSection
        title={course.title}
        description={course.description.replace(/<[^>]*>/g, '')}
        image={courseImage || '/images/hero1.webp'}
        videosCount={totalLessons}
        tasksCount={course.modules.length}
        projectsCount={course.projects.length}
        duration={priceLabel}
        level="Boshlang'ich"
        price={priceLabel}
        stats={{ graduates: course.enrollmentCount }}
        onStart={handleStart}
        startLoading={startLoading}
      />

      {/* Course Description Section */}
      <CourseDescriptionSection
        title={course.title}
        description={course.description.replace(/<[^>]*>/g, '')}
      />


      {/* Learning Outcomes Section */}
      <LearningOutcomesSection outcomes={staticLearningOutcomes} />

      {/* Skills and Instruments Section */}
      {(skillNames.length > 0 || instruments.length > 0) && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-4 items-stretch">
              {skillNames.length > 0 && <SkillsList skills={skillNames} />}
              {instruments.length > 0 && <InstrumentsGrid instruments={instruments} />}
            </div>
          </div>
        </section>
      )}

      {/* Real Projects Section */}
      {projects.length > 0 && <ProjectsCarouselSection projects={projects} title={`${projects.length} ta real loyiha`} />}

      {/* Trial Video Section */}
      <TrialVideoSection title="Kursni sinab ko'ring" subtitle="Dastlabki darslar bepul. Sizga yoqsa, davom eting" videoImage="/images/courses/bg.webp" />

      {/* Full Curriculum Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-2">To'liq kurs dasturi</h2>
          <p className="text-gray-500 mb-6">
            {course.modules.length} ta modul, {totalLessons} ta dars
          </p>
          <ModuleAccordion
            variant="light"
            modules={modules}
            value={openModule}
            onValueChange={setOpenModule}
            freeBadgeClassName="bg-green-500 hover:bg-green-500 text-white"
            actionButtonClassName="bg-[#5d7bf5] hover:bg-[#5d7bf5] text-white"
            onLessonClick={handleLessonClick}
          />
        </div>
      </section>

      {/* Graduates Section */}
      <HomeGraduatesSection rows={1} />

      {/* Stats Section */}
      <CourseStatsSection stats={staticStats} />

      {/* Mentor Section */}
      {mentor && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Ментор курса</h2>
            <MentorCard
              name={mentor.fullname}
              role={mentor.position}
              company=""
              experience={mentor.about}
              technologies=""
              image={mediaUrl(mentor.photo)}
              decorationUrl={mentor.decorImage ? mediaUrl(mentor.decorImage) : undefined}
              variant="light"
            />
          </div>
        </section>
      )}

      {/* Certificate Section */}
      <CertificateSection certificate={staticCertificate} />

      {/* Partners Section */}
      <PartnersSection />

      {/* FAQ Section */}
      <FAQAccordion variant="light" faqs={staticFaqs} />

      {/* Final CTA Section */}
      <EnrollmentCTASection />

      <SiteFooter />
    </div>
  );
}
