import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { MyCoursesSection } from "@/components/sections/my-courses-section"
import { MyProfessionsSection } from "@/components/sections/my-professions-section"
import { MySkillsSection } from "@/components/sections/my-skills-section"
import { GraduatesSection } from "@/components/sections/graduates-section"
import { StatsSection } from "@/components/sections/stats-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="pt-4">
        <div className="container">
          <SiteHeader />
        </div>
      </div>
      <main>
        <HeroSection userName="Aziz" />
        <FeatureCards />

        <div className="container space-y-8 pb-16">
          <MyCoursesSection />
          <MyProfessionsSection />
          <MySkillsSection />
          <GraduatesSection />
        </div>

        <StatsSection />
      </main>

      <SiteFooter />
    </div>
  )
}
