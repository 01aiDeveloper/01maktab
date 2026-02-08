'use client';

import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { FeatureCards } from '@/components/feature-cards';
import { MyCoursesSection } from '@/components/sections/my-courses-section';
import { MyProfessionsSection } from '@/components/sections/my-professions-section';
import { MySkillsSection } from '@/components/sections/my-skills-section';
import { HomeGraduatesSection } from '@/components/sections/home/home-graduates-section';

import { StatsSection } from '@/components/sections/stats-section';
import { ProfileSetupModal } from '@/components/auth/profile-setup-modal';
import { useAuthStore } from '@/store/auth-store';
import { SiteFooter } from '@/components/layout/site-footer';
import api from '@/lib/api';

export default function PrivateHomePage() {
  const { user, setUser, isAuthenticated } = useAuthStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Fetch user data from API and check if profile is complete
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const response = await api.get('/user/me');
        if (response.data?.data) {
          const userData = response.data.data;
          setUser(userData);

          // Agar user firstname yoki lastname bo'lmasa, modal ochiladi
          if (!userData.firstname || !userData.lastname) {
            setIsProfileModalOpen(true);
          } else {
            console.log("✅ User ma'lumotlari to'liq, modal ochilmaydi");
          }
        }
      } catch (error) {
        console.error('❌ Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, setUser]);

  const handleProfileComplete = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <SiteHeader />
      <main>
        <HeroSection userName={user?.firstname || 'Foydalanuvchi'} />
        <FeatureCards />

        <div className="container space-y-8 pb-16">
          <MyCoursesSection />
          <MyProfessionsSection />
          <MySkillsSection />
        </div>

        <HomeGraduatesSection />

        <StatsSection />
      </main>

      <SiteFooter />
      {/* Profile Setup Modal */}
      <ProfileSetupModal isOpen={isProfileModalOpen} onClose={handleProfileComplete} />
    </div>
  );
}
