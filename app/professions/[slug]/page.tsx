'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, BookCheck, Award, Briefcase, Loader2, Flame } from 'lucide-react';
import api from '@/lib/api';
import { MainTitle } from '@/components/ui/main-title';
import { Subtitle } from '@/components/ui/subtitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FAQAccordion } from '@/components/shared/faq-accordion';
import { CourseHeader } from '@/components/course-header';
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
import { useProfession } from '@/hooks/use-profession';
import { useProfessionModules } from '@/hooks/use-course-modules';
import { baseMediaUrl } from '@/lib/utils';
import type { ApiCourseModule } from '@/types/api';
import { PageLoader } from '@/components/ui/page-loader';
import { PageError } from '@/components/ui/page-error';
import { useAuthStore } from '@/store/auth-store';
import { useModuleTestCounts } from '@/hooks/use-module-test';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${baseMediaUrl}/${path}`;
}

function toModuleItem(m: ApiCourseModule, questionsCount?: number): ModuleItem {
  const lessons = m.lessons ?? [];
  return {
    id: String(m.id),
    title: m.title,
    darsCount: lessons.length,
    testCount: questionsCount ?? 0,
    lessons: lessons.map((l, i) => ({
      id: l.id,
      title: l.title,
      isFree: i === 0,
      type: 'video' as const,
    })),
    test: undefined,
  };
}

// ─── Static data (o'zgarmaydigan sectionlar uchun) ────────────────────────────

const staticFeatures = [
  { id: 1, icon: Calendar, label: '5 Oy' },
  { id: 2, icon: Award, label: '100% pulni qaytarish' },
  { id: 3, icon: BookCheck, label: '2 Sertifikat' },
  { id: 4, icon: Briefcase, label: 'Stajirovka' },
];

const staticBenefits = [
  {
    id: 1,
    title: 'Professional ko\'nikmalar',
    bullets: ['Python, SQL, ML, Vizualizatsiya', '8+ loyiha portfolioda'],
    icon: <Image src="/icons/professions/1.webp" alt="Certificate" width={80} height={80} className="opacity-40 grayscale" />,
    isDefaultActive: true,
  },
  {
    id: 2,
    title: 'Xalqaro sertifikatlar',
    bullets: ['IBM sertifikati (xalqaro)', 'AICA sertifikati (akkreditatsiya qilingan)'],
    icon: <Image src="/icons/professions/2.webp" alt="Certificate" width={80} height={80} className="opacity-40 grayscale" />,
  },
  {
    id: 3,
    title: 'Amaliy tajriba',
    bullets: ['Hamkor kompaniyalarda stajirovka', 'Real loyihalar ustida ishlash'],
    icon: <Image src="/icons/professions/3.webp" alt="Briefcase" width={80} height={80} className="opacity-40 grayscale" />,
  },
  {
    id: 4,
    title: 'Karyera tayyorgarligi',
    bullets: ['Professional rezyume', 'Mock interview va tayyorgarlik'],
    icon: <Image src="/icons/professions/4.png" alt="Career" width={80} height={80} className="opacity-40 grayscale" />,
  },
  {
    id: 5,
    title: 'Hamjamiyat',
    bullets: ['MLC hamjamiyatiga kirish', 'Muntazam tadbirlar va networking'],
    icon: <Image src="/icons/professions/5.png" alt="Community" width={80} height={80} className="opacity-40 grayscale" />,
  },
  {
    id: 6,
    title: '100% pulni qaytarish',
    bullets: ['Dasturni tugatgandan keyin', 'Investitsiyalarni to\'liq qaytarish'],
    icon: <Image src="/icons/professions/6.png" alt="Money back" width={80} height={80} className="opacity-40 grayscale" />,
  },
];

const staticCertificates = [
  {
    id: 1,
    title: 'Google Professional Certificate',
    badgeText: 'Xalqaro sertifikat',
    badgeColor: 'bg-[#5d7bf5] text-white',
    bullets: ['Butun dunyoda tan olinadi', 'LinkedIn ga qo\'shing', 'Xalqaro kompaniyalar uchun'],
    image: '/images/professions/certificate.png',
  },
  {
    id: 2,
    title: 'MLC Sertifikati',
    badgeText: 'AICA akkreditatsiyasi',
    badgeColor: 'bg-[#5d7bf5] text-white',
    bullets: ['Markaziy Osiyo Sun\'iy Intellekt Assotsiatsiyasi', 'Davlat va xususiy tashkilotlar tomonidan tan olinadi', 'Rasmiy hujjat'],
    image: '/images/professions/certificate.png',
  },
];

const staticCertificatesFootnote =
  'Kasblar guruhi uchun xalqaro sertifikat yo\'nalishga qarab Google, Microsoft yoki boshqa yetakchi kompaniyalardan bo\'lishi mumkin';

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

export default function ProfessionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { user } = useAuthStore();
  const { data: profession, isLoading, isError } = useProfession(slug);
  const { data: professionModules } = useProfessionModules(profession?.id);
  const moduleIds = (profession?.modules ?? []).map((m) => m.id);
  const testCounts = useModuleTestCounts(moduleIds);
  const [openModule, setOpenModule] = useState<string>('');
  const [startLoading, setStartLoading] = useState(false);

  const handleStart = useCallback(async () => {
    if (!profession) return;
    setStartLoading(true);
    try {
      await api.post(`/course/${profession.id}/enroll`);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 400) {
        router.push(`/payment/${profession.id}?courseType=profession`);
        return;
      }
    }
    const modules = professionModules?.modules ?? [];
    const firstModule = modules[0];
    const firstLesson = firstModule?.lessons?.[0];
    if (firstModule && firstLesson) {
      router.push(`/module/${firstModule.id}?lessonId=${firstLesson.id}&courseType=profession&courseId=${profession.id}`);
      return;
    }
    setStartLoading(false);
  }, [profession, professionModules, router]);

  if (profession && !openModule && profession.modules.length > 0) {
    setOpenModule(String(profession.modules[0].id));
  }

  const professionGuestNav = [
    { label: "Nima o'rganasiz", href: '#nima-organasiz' },
    { label: 'Bepul sinov darslari', href: '#bepul-sinov' },
    { label: 'Kurs dasturi', href: '#kurs-dasturi' },
    { label: 'Bitiruvchilar', href: '#bitiruvchilar' },
    { label: 'Sertifikat', href: '#sertifikat' },
    { label: 'Hamkorlar', href: '#hamkor' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101010]">
        <CourseHeader variant="dark" guestNavLinks={professionGuestNav} />
        <PageLoader />
      </div>
    );
  }

  if (isError || !profession) {
    return (
      <div className="min-h-screen bg-[#101010]">
        <CourseHeader variant="dark" guestNavLinks={professionGuestNav} />
        <PageError />
        <SiteFooter variant="dark" />
      </div>
    );
  }

  const modules: ModuleItem[] = (professionModules?.modules ?? profession.modules).map((m) => {
    if ('order' in m) {
      const authMod = m as import('@/types/api').ApiModule;
      const lessons = authMod.lessons ?? [];
      return {
        id: String(authMod.id),
        title: authMod.title,
        lessonsCount: lessons.length,
        testsCount: testCounts.get(authMod.id) ?? authMod.test?.totalQuestions ?? 0,
        lessons: lessons.map((l) => ({
          id: l.id,
          title: l.title,
          isFree: l.isPublic,
          isCompleted: l.isCompleted,
          type: "video" as const,
        })),
        test: authMod.test
          ? { id: String(authMod.test.id), title: authMod.test.name }
          : undefined,
      } as ModuleItem;
    }
    const pub = m as import('@/types/api').ApiCourseModule;
    return toModuleItem(pub, testCounts.get(pub.id));
  });
  const mentor = profession.mentor;

  const handleLessonClick = (lesson: { id: string | number }, ctx: { module: ModuleItem }) => {
    router.push(`/module/${ctx.module.id}?lessonId=${lesson.id}&courseType=profession&courseId=${profession.id}`);
  };
  const courseImage = mediaUrl(profession.photo);

  const startDateLabel = profession.publishDate
    ? `Start: ${new Date(profession.publishDate).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}`
    : null;

  return (
    <div className="min-h-screen bg-[#101010]">
      <CourseHeader variant="dark" guestNavLinks={professionGuestNav} />
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
              {courseImage && <Image src={courseImage} alt={profession.title} fill className="object-cover" priority />}

              {/* Content Overlay */}
              <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Orqaga</span>
                </Link>

                {/* Enrollment Badge */}
                <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-xs w-fit mb-6">
                  <Flame className="w-3.5 h-3.5 mr-2" />
                  Qabul ochiq
                </Badge>

                {/* Title */}
                <MainTitle className="mb-4 !leading-tight max-w-2xl">{profession.name}</MainTitle>

                {/* Description */}
                {profession.description && (
                  <Subtitle  size="base" className="mb-8 max-w-xl line-clamp-8">
                    {profession.description.replace(/<[^>]*>/g, '')}
                  </Subtitle>
                )}

                {/* CTA Button */}
                {professionModules?.progress && professionModules.progress.totalLessonsCount > 0 ? (
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                        Modul: {professionModules.progress.moduleTitile ?? '—'}
                      </span>
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                        Dars: {professionModules.progress.completedLessonsCount}/{professionModules.progress.totalLessonsCount}
                      </span>
                    </div>
                    <div className="w-full max-w-sm bg-white/30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round((professionModules.progress.completedLessonsCount / professionModules.progress.totalLessonsCount) * 100)}%` }}
                      />
                    </div>
                    <Button
                      size="lg"
                      className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-4 h-auto text-base font-medium w-fit flex items-center gap-2"
                      onClick={handleStart}
                      disabled={startLoading}
                    >
                      {startLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowLeft className="w-5 h-5 rotate-180" />}
                      {startLoading ? 'Yuklanmoqda...' : "O'qishni davom ettirish"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="md"
                    className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-4 h-auto text-base font-medium w-fit mb-8 flex items-center gap-2"
                    onClick={handleStart}
                    disabled={startLoading}
                  >
                    {startLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Yuklanmoqda...
                      </>
                    ) : (
                      <>
                        Boshlash
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </>
                    )}
                  </Button>
                )}

                {/* Meta Info Pills */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="text-black border-0 rounded-full px-4 py-2 text-xs flex items-center gap-2" style={{ background: '#A9A9A933', backdropFilter: 'blur(118.8px)' }}>
                    <Users className="w-4 h-4" />
                    {profession.enrollmentCount} ta o'quvchi
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
              <h2 className="font-suisse text-2xl lg:text-3xl font-bold mb-4 text-[#18181A]">{profession.title}</h2>
              {profession.description && (
                <div
                  className="text-gray-600 text-sm lg:text-base leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: profession.description }}
                />
              )}
              <Button
                className="bg-[#5d7bf5] hover:bg-[#4a6ae4] text-white rounded-full px-8 py-3 h-auto text-base font-medium mt-6 flex items-center gap-2"
                onClick={handleStart}
                disabled={startLoading}
              >
                {startLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Yuklanmoqda...
                  </>
                ) : (
                  <>
                    Оставить заявку
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </>
                )}
              </Button>
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
              <h2 className="font-suisse text-2xl lg:text-3xl font-bold text-white mb-6">Kurs mentori</h2>
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
            <h2 className="text-white font-bold text-3xl lg:text-4xl mb-8 lg:mb-12">Nima o'rganamiz?</h2>
            <ModuleAccordion
              variant="dark"
              modules={modules}
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
