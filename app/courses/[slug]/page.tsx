'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
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
import { useMyCourses } from '@/hooks/use-my-courses';
import { baseMediaUrl } from '@/lib/utils';
import { pickResumeLesson } from '@/lib/lesson-utils';
import type { ApiCourseModule, ApiProject } from '@/types/api';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { useAuthStore } from '@/store/auth-store';
import { PresaleSection } from '@/components/sections/skills/presale-section';
import { PresaleDisabledSection } from '@/components/sections/skills/presale-disabled-section';
import { WaitlistSection } from '@/components/sections/skills/waitlist-section';
import { useCourseBadges } from '@/hooks/use-course-badges';


// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function toModuleItem(m: ApiCourseModule, moduleTestLabel: string, isEnrolled = false): ModuleItem {
  const lessons = m.lessons ?? [];
  return {
    id: String(m.id),
    title: m.title,
    darsCount: m.lessonCount,
    testCount: m.testCount,
    lessons: lessons.map((l) => ({
      id: l.id,
      title: l.title,
      isFree: isEnrolled || !!l.isPublic,
      type: 'video' as const,
    })),
    test: m.testCount > 0 ? { id: String(m.id), title: moduleTestLabel } : undefined,
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursePage() {
  const t = useTranslations('courseDetail');
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const staticCertificate = {
    image: '/images/certificate.webp',
    benefits: [t('certBenefit1'), t('certBenefit2'), t('certBenefit3')],
  };

  const staticFaqs = [
    { id: '1', question: t('faqs.q1'), answer: t('faqs.a1') },
    { id: '2', question: t('faqs.q2'), answer: t('faqs.a2') },
    { id: '3', question: t('faqs.q3'), answer: t('faqs.a3') },
    { id: '4', question: t('faqs.q4'), answer: t('faqs.a4') },
    { id: '5', question: t('faqs.q5'), answer: t('faqs.a5') },
    { id: '6', question: t('faqs.q6'), answer: t('faqs.a6') },
  ];

  const { user } = useAuthStore();
  const { data: course, isLoading, isError } = useCourse(slug);
  const { data: courseModules } = useCourseModules(course?.id);
  const { data: courseBadges } = useCourseBadges(course?.id);
  const { data: myCourses } = useMyCourses();
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!course) return;
    setStartLoading(true);
    try {
      const alreadyAdded = !!course.hasPurchased || !!myCourses?.some((c) => String(c.id) === String(course.id));
      if (!alreadyAdded) {
        try {
          await api.post(`/course/${course.id}/enroll`);
        } catch (err: unknown) {
          const status = (err as { response?: { status?: number } })?.response?.status;
          if (status === 400 && course.pricingType !== 'FREE') {
            router.push(`/payment/${course.id}?courseType=course`);
            return;
          }
        }
      }
      const target = pickResumeLesson(courseModules?.modules, courseModules?.progress);
      if (target) {
        router.push(`/module/${target.moduleId}?lessonId=${target.id}&courseType=course&courseId=${course.id}`);
      }
    } finally {
      setStartLoading(false);
    }
  }, [course, courseModules, myCourses, router, user]);

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

  const isPurchased = !!course.hasPurchased || !!myCourses?.some((c) => String(c.id) === String(course.id));
  const isAddedToProfile = isPurchased;
  const isFree = course.pricingType === 'FREE';
  const isEnrolledForLessons = isAddedToProfile;
  const modules: ModuleItem[] = course.modules.map((m) => toModuleItem(m, t('moduleTest'), isEnrolledForLessons));
  const projects: Project[] = course.projects.map((p, i) => toProject(p, i, course.projects.length));
  const mentor = course.mentor;

  const skillNames: string[] = course.skills.map((s) => s.name);

  const instruments: Instrument[] = course.technologies.map((t) => ({
    name: t.name,
    icon: t.icon ? mediaUrl(t.icon) : '🔧',
  }));

  const courseImage = mediaUrl(course.photo);
  const priceLabel = course.pricingType === 'FREE' ? t('free') : `${course.price.toLocaleString()} ${t('currencySom')}`;

  const totalLessons = course.modules.reduce((acc, m) => acc + (m.lessons?.length ?? 0), 0);

  const handleLessonClick = (lesson: { id: string | number; isFree?: boolean }, ctx: { module: ModuleItem }) => {
    if (!user) { router.push('/login'); return; }
    if (!isAddedToProfile) {
      if (isFree) {
        handleStart();
        return;
      }
      router.push(`/payment/${course.id}?courseType=course`);
      return;
    }
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=course&courseId=${course.id}`);
  };

  const handleTestClick = (_test: { id?: string; title: string }, ctx: { module: ModuleItem }) => {
    const params = new URLSearchParams({ courseType: 'course', courseId: String(course.id) });
    router.push(`/test/${ctx.module.id}?${params.toString()}`);
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
        level={t('level')}
        price={priceLabel}
        stats={{ graduates: course.enrollmentCount }}
        progress={courseModules?.progress ?? null}
        onStart={handleStart}
        startLoading={startLoading}
        badges={courseBadges ?? []}
        isAddedToProfile={isAddedToProfile}
        isFree={isFree}
      />

      {/* Presale Section */}
      <PresaleSection courseId={course.id} courseType="course" />
      <PresaleDisabledSection courseId={course.id} />
      <WaitlistSection courseId={course.id} enrollmentCount={course.enrollmentCount} />

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
        {projects.length > 0 && <ProjectsCarouselSection projects={projects} title={t('realProjects', { count: projects.length })} />}
      </div>

      {/* Trial Video Section */}
      <TrialVideoSection
        title={t('tryCourseTitle')}
        subtitle={t('tryCourseSubtitle')}
        videoImage="/images/courses/bg.webp"
      />

      {/* Full Curriculum Section */}
      <section id="kurs-dasturi" className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{t('fullProgram')}</h2>
          <p className="text-gray-500 mb-6">
            {t('modulesLessons', { modules: course.modules.length, lessons: totalLessons })}
          </p>
          <ModuleAccordion
            variant="light"
            modules={modules}
            value={openModule}
            onValueChange={setOpenModule}
            freeBadgeClassName="bg-green-500 hover:bg-green-500 text-white"
            actionButtonClassName="bg-[#5d7bf5] hover:bg-[#5d7bf5] text-white"
            onLessonClick={handleLessonClick}
            onTestClick={handleTestClick}
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
            <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{t('courseMentor')}</h2>
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
