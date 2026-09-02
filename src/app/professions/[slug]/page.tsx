'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, BookCheck, Award, Briefcase, Loader2, Flame } from 'lucide-react';
import { courseApi } from '@/services/react-query/course';
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
import type { ModuleItem } from '@/components/shared/module-accordion';
import { useProfession } from '@/hooks/queries/use-profession';
import { useProfessionModules } from '@/hooks/queries/use-course-modules';
import { useMyProfessions } from '@/hooks/queries/use-my-courses';
import { baseMediaUrl, stripInlineFont } from '@/lib/utils';
import type { ApiCourseModule } from '@/types/api';
import { useSmartBack } from '@/hooks/common/use-smart-back';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { useAuth } from '@/hooks/common/use-auth';
import { PresaleSection } from '@/components/sections/skills/presale-section';
import { WaitlistSection } from '@/components/sections/skills/waitlist-section';
import { pickResumeLesson } from '@/lib/lesson-utils';


// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function toModuleItem(m: ApiCourseModule, isEnrolled = false): ModuleItem {
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
    test: undefined,
  };
}

// ─── Static data (o'zgarmaydigan sectionlar uchun) ────────────────────────────

const FEATURE_ICONS = [Calendar, Award, BookCheck, Briefcase] as const;
const FEATURE_KEYS = ['duration', 'refund', 'certificates', 'internship'] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfessionPage() {
  const t = useTranslations('professionDetail');
  const tCourse = useTranslations('courseDetail');
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const goBack = useSmartBack('/catalog?tab=professions');

  const staticFeatures = FEATURE_ICONS.map((icon, i) => ({
    id: i + 1,
    icon,
    label: t(`features.${FEATURE_KEYS[i]}`),
  }));

  const staticBenefits = [
    {
      id: 1,
      title: t('benefits.skills'),
      bullets: [t('benefits.skillsB1'), t('benefits.skillsB2')],
      icon: <Image quality={90} src="/icons/professions/1.webp" alt="" width={80} height={80} className="opacity-40 grayscale" />,
      isDefaultActive: true,
    },
    {
      id: 2,
      title: t('benefits.certs'),
      bullets: [t('benefits.certsB1'), t('benefits.certsB2')],
      icon: <Image quality={90} src="/icons/professions/2.webp" alt="" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 3,
      title: t('benefits.practice'),
      bullets: [t('benefits.practiceB1'), t('benefits.practiceB2')],
      icon: <Image quality={90} src="/icons/professions/3.webp" alt="" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 4,
      title: t('benefits.career'),
      bullets: [t('benefits.careerB1'), t('benefits.careerB2')],
      icon: <Image quality={90} src="/icons/professions/4.png" alt="" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 5,
      title: t('benefits.community'),
      bullets: [t('benefits.communityB1'), t('benefits.communityB2')],
      icon: <Image quality={90} src="/icons/professions/5.png" alt="" width={80} height={80} className="opacity-40 grayscale" />,
    },
    {
      id: 6,
      title: t('benefits.refund'),
      bullets: [t('benefits.refundB1'), t('benefits.refundB2')],
      icon: <Image quality={90} src="/icons/professions/6.png" alt="" width={80} height={80} className="opacity-40 grayscale" />,
    },
  ];

  const staticCertificates = [
    {
      id: 1,
      title: t('certificates.google'),
      badgeText: t('certificates.googleBadge'),
      badgeColor: 'bg-[#5d7bf5] text-white',
      bullets: [t('certificates.googleB1'), t('certificates.googleB2'), t('certificates.googleB3')],
      image: '/images/professions/certificate.png',
    },
    {
      id: 2,
      title: t('certificates.mlc'),
      badgeText: t('certificates.mlcBadge'),
      badgeColor: 'bg-[#5d7bf5] text-white',
      bullets: [t('certificates.mlcB1'), t('certificates.mlcB2'), t('certificates.mlcB3')],
      image: '/images/professions/certificate.png',
    },
  ];

  const staticCertificatesFootnote = t('certificates.footnote');

  const staticFaqs = [
    { id: '1', question: tCourse('faqs.q1'), answer: tCourse('faqs.a1') },
    { id: '2', question: tCourse('faqs.q2'), answer: tCourse('faqs.a2') },
    { id: '3', question: tCourse('faqs.q3'), answer: tCourse('faqs.a3') },
    { id: '4', question: tCourse('faqs.q4'), answer: tCourse('faqs.a4') },
    { id: '5', question: tCourse('faqs.q5'), answer: tCourse('faqs.a5') },
    { id: '6', question: tCourse('faqs.q6'), answer: tCourse('faqs.a6') },
  ];

  const { user } = useAuth();
  const { data: profession, isLoading, isError } = useProfession(slug);
  const { data: professionModules } = useProfessionModules(profession?.id);
  const { data: myProfessions } = useMyProfessions();
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!profession) return;
    setStartLoading(true);
    try {
      const alreadyAdded = !!profession.hasPurchased || !!profession.isEnrolled || !!myProfessions?.some((c) => String(c.id) === String(profession.id));
      if (!alreadyAdded) {
        if (profession.pricingType !== 'FREE') {
          router.push(`/payment/${profession.id}?courseType=profession`);
          return;
        }
        try {
          await courseApi.applyProfession(profession.id);
        } catch (err: unknown) {
          console.error('Failed to apply for profession:', err);
        }
      }
      const target = pickResumeLesson(professionModules?.modules, professionModules?.progress);
      if (target) {
        router.push(`/module/${target.moduleId}?lessonId=${target.id}&courseType=profession&courseId=${profession.id}`);
      }
    } finally {
      setStartLoading(false);
    }
  }, [profession, professionModules, myProfessions, router, user]);

  if (profession && !openModule && profession.modules.length > 0) {
    setOpenModule(String(profession.modules[0].id));
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010]">
        <SiteHeader variant="dark" />
        <PageLoader />
      </div>
    );
  }

  if (isError || !profession) {
    return (
      <div className="min-h-screen bg-[#101010]">
        <SiteHeader variant="dark" />
        <PageError />
        <SiteFooter variant="dark" />
      </div>
    );
  }

  const isPurchasedForLessons = !!profession.hasPurchased || !!myProfessions?.some((c) => String(c.id) === String(profession.id));
  const isProfessionReady = profession.modules.some((m) => (m.lessons?.length ?? 0) > 0 || m.testCount > 0);
  const modules: ModuleItem[] = profession.modules.map((m) => toModuleItem(m, isPurchasedForLessons));
  const mentor = profession.mentor;

  const isPurchased = !!profession.hasPurchased || !!myProfessions?.some((c) => String(c.id) === String(profession.id));
  const isAddedToProfile = isPurchased;
  const isFree = profession.pricingType === 'FREE';
  const completedCount = professionModules?.progress?.completedLessonsCount ?? 0;
  const totalCount = professionModules?.progress?.totalLessonsCount ?? 0;
  const hasStarted = isAddedToProfile && completedCount > 0;

  const handleLessonClick = (lesson: { id: string | number; isFree?: boolean }, ctx: { module: ModuleItem }) => {
    if (!user) { router.push('/login'); return; }
    if (!isAddedToProfile) {
      if (isFree) {
        handleStart();
        return;
      }
      router.push(`/payment/${profession.id}?courseType=profession`);
      return;
    }
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=profession&courseId=${profession.id}`);
  };
  const courseImage = mediaUrl(profession.photo);

  const startDateLabel = profession.publishDate
    ? t('startDate', { date: new Date(profession.publishDate).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) })
    : null;

  return (
    <div className="min-h-screen bg-[#101010]">
      <SiteHeader variant="dark" />
      <main>
        {/* Hero Section */}
        <section id="nima-organasiz" className="w-full">
          <div className="container mx-auto px-4 h-[511px] sm:h-[calc(100vh-90px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-[29px] lg:rounded-[40px] overflow-hidden relative h-full"
            >
              {/* Background Image */}
              {courseImage && <Image quality={90} src={courseImage} alt={profession.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" priority />}

              {/* Readability overlay */}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10" />

              {/* Content Overlay */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full">
                {/* Back Button */}
                <button onClick={goBack} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('back')}</span>
                </button>

                {/* Enrollment Badge */}
                <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-xs w-fit mb-6">
                  <Flame className="w-3.5 h-3.5 mr-2" />
                  {t('enrollOpen')}
                </Badge>

                {/* Title */}
                <MainTitle className="mb-4 !leading-tight max-w-2xl">{profession.name}</MainTitle>

                {/* Subtitle */}
                {profession.subtitle && (
                  <Subtitle size="md" className="mb-8 max-w-xl line-clamp-8">
                    {profession.subtitle}
                  </Subtitle>
                )}

                {/* CTA Button */}
                {hasStarted && totalCount > 0 && professionModules?.progress && (
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                        {t('moduleLabel', { title: professionModules.progress.moduleTitile ?? '—' })}
                      </span>
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                        {t('lessonLabel', { done: completedCount, total: totalCount })}
                      </span>
                    </div>
                    <div className="w-full max-w-sm bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-4 h-auto text-base font-medium w-fit mb-8 flex items-center gap-2"
                  onClick={handleStart}
                  disabled={startLoading}
                >
                  {startLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowLeft className="w-5 h-5 rotate-180" />}
                  {startLoading
                    ? t('loading')
                    : !isAddedToProfile && !isFree
                    ? t('start')
                    : hasStarted
                    ? t('continueStudy')
                    : t('start')}
                </Button>

                {/* Meta Info Pills */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="text-black border-0 rounded-full px-4 py-2 text-xs flex items-center gap-2" style={{ background: '#A9A9A933', backdropFilter: 'blur(118.8px)' }}>
                    <Users className="w-4 h-4" />
                    {t('studentsCount', { count: profession.enrollmentCount })}
                  </Badge>
                  {startDateLabel && (
                    <Badge className="text-black border-0 rounded-full px-4 py-2 text-xs flex items-center gap-2" style={{ background: '#A9A9A933', backdropFilter: 'blur(118.8px)' }}>
                      <Calendar className="w-4 h-4" />
                      {startDateLabel}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Presale / Waitlist Section */}
        <PresaleSection courseId={profession?.id} courseType="profession" presale={profession?.preSales} originalPrice={profession?.price} isPurchased={isPurchased} />
        {profession?.id && (
          <WaitlistSection
            courseId={profession.id}
            enrollmentCount={profession.enrollmentCount}
            enabled={profession.waitlistEnabled}
            isInWaitlist={profession.isInWaitlist}
            hasPresale={!!profession.preSales}
          />
        )}

        {/* Feature Pills Row */}
        <section className="w-full py-6">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {staticFeatures.map((feature, index) => (
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
              className="bg-white rounded-3xl p-8 lg:p-12"
            >
              <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] mb-6 text-[#18181A]">{profession.title}</h2>
              {profession.description && (
                <div
                  className="max-w-none text-[#18181A] [&_*]:text-[16px]! [&_*]:font-normal! [&_*]:leading-[21px]! [&_*]:tracking-[-0.8px]! [&_*]:text-[#18181A]! [&_strong]:font-semibold! [&_b]:font-semibold! [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: stripInlineFont(profession.description) }}
                />
              )}
            </motion.div>
          </div>
        </section>


        {/* Program Benefits Section */}
        <ProgramBenefits benefits={staticBenefits} />

        {/* Journey Section */}
        <JourneySection />

        {/* Mentor Section */}
        {mentor && (
          <section id="mentor" className="w-full py-8">
            <div className="container mx-auto px-4">
              <h2 className="font-suisse text-[36px] leading-[36px] lg:text-3xl lg:leading-tight font-semibold tracking-[-1.8px] text-white mb-6">{t('courseMentor')}</h2>
              <MentorCard
                name={mentor.fullname}
                role={mentor.position}
                company=""
                experience={mentor.about}
                technologies=""
                image={mediaUrl(mentor.photo)}
                decorationUrl={mentor.decorImage ? mediaUrl(mentor.decorImage) : undefined}
                variant="dark"
              />
            </div>
          </section>
        )}

        {/* Mentor Communication Section */}
        <MentorCommunicationSection />

        {/* Support Cards Section */}
        <SupportCardsSection />

        {/* Certificates Section */}
        <div id="sertifikat">
          <CertificatesSection certificates={staticCertificates} footnote={staticCertificatesFootnote} />
        </div>

        {/* Partners Section */}
        <div id="hamkor">
          <PartnersSection variant="dark" showSubtitle={false} />
        </div>

        {/* Internship Statistics Section */}
        <InternshipStatsSection />

        {/* Job Support Section */}
        <JobSupportSection />


        {/* Refund Section */}
        <RefundSection />

        {/* Graduates Section */}
        <div id="bitiruvchilar">
          <GraduatesSection />
        </div>

        {/* Course Program Section */}
        <section id="kurs-dasturi" className="w-full bg-[#101010] py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-white font-bold text-3xl lg:text-4xl mb-8 lg:mb-12">{t('whatLearn')}</h2>
            <ModuleAccordion
              variant="dark"
              modules={modules}
              overlayLocked={!isProfessionReady}
              value={openModule}
              onValueChange={setOpenModule}
              onLessonClick={handleLessonClick}
            />
          </div>
        </section>


        {/* FAQ Section */}
        <FAQAccordion variant="dark" faqs={staticFaqs} />

        {/* Payment Options Section */}
        <PaymentOptionsSection />

        {/* Enrollment CTA with Countdown */}
        <EnrollmentCtaCountdown />
      </main>
      <SiteFooter variant="dark" />
    </div>
  );
}
