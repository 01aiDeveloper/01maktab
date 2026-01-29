import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/home/hero"
import { MentorsSection } from "@/components/sections/home/mentors"
import { CareersSection } from "@/components/sections/home/careers"
import { VideoSection } from "@/components/sections/home/video-section"
import { CoursesSection } from "@/components/sections/home/courses"
import { EventsSection } from "@/components/sections/home/events"
import { PartnersSection } from "@/components/sections/home/partners"
import { ChatWidget } from "@/components/shared/chat-widget"
import { MySkillsSection } from "@/components/sections/home/my-skills-section"
import { GraduatesSection } from "@/components/sections/home/graduates-section"
import { StatsSection } from "@/components/sections/home/stats-section"
import { ContactSection } from "@/components/sections/home/contact-section"
import { SiteFooter } from "@/components/layout/site-footer"

export default function GuestHomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MentorsSection />
      <MySkillsSection />
      <CareersSection />
      <CoursesSection />
      <VideoSection />
      <EventsSection />
      <PartnersSection />
      <GraduatesSection />
      <StatsSection />
      <ContactSection />

      <ChatWidget />
      <SiteFooter />

    </main>
  )
}
