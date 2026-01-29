"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { MyCoursesSection } from "@/components/sections/my-courses-section"
import { MyProfessionsSection } from "@/components/sections/my-professions-section"
import { MySkillsSection } from "@/components/sections/my-skills-section"
import { GraduatesSection } from "@/components/sections/graduates-section"
import { StatsSection } from "@/components/sections/stats-section"
import { SiteFooter } from "@/components/site-footer"
import { ProfileSetupModal } from "@/components/auth/profile-setup-modal"
import { useAuthStore } from "@/store/auth-store"

export default function PrivateHomePage() {
  const { user, prompt } = useAuthStore()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Check if user needs to complete profile setup
  useEffect(() => {
    // Agar user signup qilgan bo'lsa va hali firstname/lastname bo'lmasa
    if (prompt === "signup" && (!user?.firstname || !user?.lastname)) {
      setIsProfileModalOpen(true)
    }
  }, [prompt, user])

  const handleProfileComplete = () => {
    setIsProfileModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="pt-4">
        <div className="container">
          <SiteHeader />
        </div>
      </div>
      <main>
        <HeroSection userName={user?.firstname || "Foydalanuvchi"} />
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

      {/* Profile Setup Modal */}
      <ProfileSetupModal isOpen={isProfileModalOpen} onClose={handleProfileComplete} />
    </div>
  )
}
