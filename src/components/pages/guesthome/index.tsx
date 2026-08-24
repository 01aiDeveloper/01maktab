import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/home/hero";
import { MentorsSection } from "@/components/sections/home/mentors";
import { CareersSection } from "@/components/sections/home/careers";
import { VideoSection } from "@/components/sections/home/video-section";
import { MockupSection } from "@/components/sections/home/mockup-section";
import { CoursesSection } from "@/components/sections/home/courses";
import { EventsSection } from "@/components/sections/home/events";
import { PartnersSection } from "@/components/sections/home/partners";
import { ChatWidget } from "@/components/shared/chat-widget";
import { SkillsSection } from "@/components/sections/home/skills-section";
import { HomeGraduatesSection } from "@/components/sections/home/home-graduates-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { ContactSection } from "@/components/sections/home/contact-section";
import { SiteFooter } from "@/components/layout/site-footer";
import type { Partner, Career, Skill } from "@/types/common";
import { getUserLocale } from "@/i18n/locale";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://app-dev.01ai.uz/api/v1";

export default async function GuestHomePage() {
  const locale = await getUserLocale();
  const headers = { "Accept-Language": locale };
  // Fetch all public data in parallel using Next.js fetch with caching
  const [partnersRes, careersRes, skillsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/partner/public?pageSize=20`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    }),
    fetch(`${API_BASE_URL}/course/public?format=PROFESSION`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(`${API_BASE_URL}/course/public?format=SKILL`, {
      headers,
      next: { revalidate: 3600 },
    }),
  ]);

  // Parse responses
  let partners: Partner[] = [];
  let careers: Career[] = [];
  let skills: Skill[] = [];

  try {
    const partnersData = await partnersRes.json();
    partners = partnersData?.data?.data || [];
  } catch (error) {
    console.error("Failed to parse partners:", error);
  }

  try {
    const careersData = await careersRes.json();
    careers = careersData?.data?.data || [];
    // console.log('[GuestHomePage] Fetched careers raw count:', careers.length);
    // console.table(careers.map((c: any) => ({ id: c.id, name: c.name })));
  } catch (error) {
    console.error("Failed to parse careers:", error);
  }

  try {
    const skillsData = await skillsRes.json();
    skills = skillsData?.data?.data || [];
  } catch (error) {
    console.error("Failed to parse skills:", error);
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MentorsSection />
      <CoursesSection />
      <CareersSection careers={careers} />
      <SkillsSection skills={skills} />
      <MockupSection />
      {/* <VideoSection /> */}
      <EventsSection />
      <PartnersSection partners={partners} />
      <HomeGraduatesSection rows={2} />
      <StatsSection />
      <ContactSection />

      <ChatWidget />
      <SiteFooter />
    </main>
  );
}
