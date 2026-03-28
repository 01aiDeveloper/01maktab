'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import api from '@/lib/api';
import { CourseHeader } from '@/components/course-header';
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
import { useAuthStore } from '@/store/auth-store';


// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function toModuleItem(m: ApiCourseModule): ModuleItem {
  const lessons = m.lessons ?? [];
  return {
    id: String(m.id),
    title: m.title,
    darsCount: m.lessonCount,
    testCount: m.testCount,
    lessons: lessons.map((l, i) => ({
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
    description: p.description,
    image: '/images/3d-cylinder.jpg',
  };
}



const staticStats = {
  graduates: 1247,
  employmentRate: '78%',
  rating: '4.8/5',
};

const staticCertificate = {
  image: '/images/certificate.webp',
  benefits: [
    'Rezyume tuzish va portfolio tayyorlashda yordam beradi,',
    'nomzodingizni ish beruvchilarga tavsiya qiladi, shuningdek',
    'ishga joylashguncha to\'liq hamrohlik qiladi.',
  ],
};

const staticFaqs = [
  {
    id: '1',
    question: 'Kurs yangi boshlovchilar uchun mosmi?',
    answer:
      'Dastur yangi boshlovchilar uchun mo\'ljallangan: avval asoslarni o\'rganasiz va bosqichma-bosqich murakkab mavzularga o\'tasiz. Har bir modul amaliyot bilan tugaydi, siz materialni nafaqat tushunasiz, balki amalda qo\'llay olasiz. Boshlash uchun kompyuter bilan ishlashning asosiy ko\'nikmalari yetarli. Agar tajribangiz bo\'lmasa — kurs boshlanishidan oldin kompyuter savodxonligini bepul o\'rgatamiz.',
  },
  {
    id: '2',
    question: 'Nega aynan 01AI ni tanlashim kerak?',
    answer: '01AI real loyihalar va mentorlar yordami bilan noyob o\'qitish metodologiyasini taklif etadi.',
  },
  {
    id: '3',
    question: 'Mentorlaringiz kimlar?',
    answer: 'Bizning mentorlar — ko\'p yillik tajribaga ega top IT-kompaniyalardan amaliyotchi mutaxassislar.',
  },
  {
    id: '4',
    question: 'Nega o\'qish shuncha uzoq davom etadi?',
    answer: 'Sifatli ta\'lim materialni o\'zlashtirish va real loyihalarda amaliyot uchun vaqt talab qiladi.',
  },
  {
    id: '5',
    question: 'O\'qish davomida pul ishlashni boshlash mumkinmi?',
    answer: 'Ha, ko\'plab talabalarimiz birinchi modullardan keyin freelance ishlay boshlaydilar.',
  },
  {
    id: '6',
    question: 'Kurs davomida ishga joylasha olamanmi?',
    answer: 'Biz ishga joylashishda yordam beramiz va ko\'plab talabalar kursni tugatmasdan ish topadilar.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { user } = useAuthStore();
  const { data: course, isLoading, isError } = useCourse(slug);
  const { data: courseModules } = useCourseModules(course?.id);
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!course) return;
    setStartLoading(true);
    try {
      await api.post(`/course/${course.id}/enroll`);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 400) {
        router.push(`/payment/${course.id}?courseType=course`);
        return;
      }
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
        <CourseHeader variant="light" />
        <PageLoader />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <CourseHeader variant="light" />
        <PageError />
        <SiteFooter />
      </div>
    );
  }

  const modules: ModuleItem[] = course.modules.map((m) => toModuleItem(m));
  const projects: Project[] = course.projects.map((p, i) => toProject(p, i, course.projects.length));
  const mentor = course.mentor;

  const skillNames: string[] = course.skills.map((s) => s.name);

  const instruments: Instrument[] = course.technologies.map((t) => ({
    name: t.name,
    icon: t.icon ? mediaUrl(t.icon) : '🔧',
  }));

  const courseImage = mediaUrl(course.photo);
  const priceLabel = course.pricingType === 'FREE' ? 'Bepul' : `${course.price.toLocaleString()} so'm`;

  const totalLessons = course.modules.reduce((acc, m) => acc + (m.lessons?.length ?? 0), 0);

  const handleLessonClick = (lesson: { id: string | number }, ctx: { module: ModuleItem }) => {
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=course&courseId=${course.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <CourseHeader variant="light" />

      {/* Hero Section */}
      <CourseHeroSection
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        image={courseImage || '/images/hero1.webp'}
        videosCount={totalLessons}
        tasksCount={course.modules.length}
        projectsCount={course.projects.length}
        duration={priceLabel}
        level="Boshlang'ich"
        price={priceLabel}
        stats={{ graduates: course.enrollmentCount }}
        progress={courseModules?.progress ?? null}
        onStart={handleStart}
        startLoading={startLoading}
      />

      {/* Course Description Section */}
      <CourseDescriptionSection title={course.title} description={course.description} />


      {/* Learning Outcomes Section */}
      <div id="nima-organasiz">
        <LearningOutcomesSection courseOutcomes={course?.courseOutcomes || ""} />
      </div>

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
      <div id="loyihalar">
        {projects.length > 0 && <ProjectsCarouselSection projects={projects} title={`${projects.length} ta real loyiha`} />}
      </div>

      {/* Trial Video Section */}
      <TrialVideoSection
        title="Kursni sinab ko'ring"
        subtitle="Dastlabki darslar bepul. Sizga yoqsa, davom eting"
        videoImage="/images/courses/bg.webp"
      />

      {/* Full Curriculum Section */}
      <section id="kurs-dasturi" className="w-full py-8">
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
        <section id="mentor" className="w-full py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Kurs mentori</h2>
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
      <div id="sertifikat">
        <CertificateSection certificate={staticCertificate} />
      </div>

      {/* Partners Section */}
      <div id="hamkor">
        <PartnersSection />
      </div>

      {/* FAQ Section */}
      <FAQAccordion variant="light" faqs={staticFaqs} />

      {/* Final CTA Section */}
      <EnrollmentCTASection />

      <SiteFooter />
    </div>
  );
}
