'use client';

import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/hero-section';
import { FeatureCards } from '@/components/feature-cards';
import { MyCoursesSection } from '@/components/sections/my-courses-section';
import { MyProfessionsSection } from '@/components/sections/my-professions-section';
import { MySkillsSection } from '@/components/sections/my-skills-section';
import { HomeGraduatesSection } from '@/components/sections/home/home-graduates-section';

import { StatsSection } from '@/components/sections/home/stats-section';

import { ProfileSetupModal } from '@/components/auth/profile-setup-modal';
import { useAuthStore } from '@/store/auth-store';
import { SiteFooter } from '@/components/layout/site-footer';
import { MainButton } from '@/components/ui/main-button';
import { PresaleQueueSection } from '@/components/sections/presale-queue-section';
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
      <SiteHeader variant="light" />
      <main>
        <HeroSection userName={user?.firstname || 'Foydalanuvchi'} />
        <FeatureCards />

        {/* Presale Queue Mode */}
        <section className="w-full py-6">
          <PresaleQueueSection
            queueNumber={12}
            title="SQL: Ma'lumotlar bazasi asoslari"
            duration="8 Soat"
            price="Bepul"
            level="Boshlang'ich"
            partnerName="TBC BANK"
            modules={[
              {
                id: '1',
                title: 'I modul - Основы SQL',
                darsCount: 4,
                testCount: 1,
                lessons: [
                  { id: 1, title: 'Введение в базы данных и SQL', type: 'video' },
                  { id: 2, title: 'Типы данных и создание таблиц (CREATE TABLE)', type: 'video' },
                  { id: 3, title: 'Вставка данных (INSERT) и простые запросы (SELECT)', type: 'video' },
                  { id: 4, title: 'Фильтрация данных (WHERE, AND, OR, NOT)', type: 'video' },
                ],
                test: { id: '1', title: 'Test 1' },
              },
              {
                id: '2',
                title: 'II modul - Работа с несколькими таблицами',
                darsCount: 4,
                testCount: 1,
                lessons: [],
              },
              {
                id: '3',
                title: 'III modul - Группировка и агрегация',
                darsCount: 4,
                testCount: 1,
                lessons: [],
              },
              {
                id: '4',
                title: 'IV modul - Управление данными и оптимизация',
                darsCount: 4,
                testCount: 1,
                lessons: [],
              },
            ]}
          />
        </section>

        <div className="container space-y-8 pb-16">
          <MyCoursesSection />
          <MyProfessionsSection />
          <MySkillsSection />
        </div>

        <HomeGraduatesSection rows={1} />

        <StatsSection />

        {/* CTA Section */}
        <section className="w-full py-6">
          <div className="container">
            <div
              className="flex flex-col items-center justify-center gap-8 px-6 py-14"
              style={{ background: '#E6E6E7', borderRadius: '25px', minHeight: '311px' }}
            >
              <p
                className="text-center text-[#18181A] max-w-3xl"
                style={{ fontWeight: 600, fontSize: '36px', lineHeight: '41px', letterSpacing: '-0.05em' }}
              >
                Siz ham ularning orasida bo&apos;lishingiz mumkin. Bizdan sharoit - sizdan harakat. Harakatni &quot;01AI&quot;da davom
                eting!
              </p>
              <MainButton size="md" href="/catalog" className="!h-[54px] !text-[20px] !gap-[39px] !px-4">
                Hoziroq boshlash →
              </MainButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      {/* Profile Setup Modal */}
      <ProfileSetupModal isOpen={isProfileModalOpen} onClose={handleProfileComplete} />
    </div>
  );
}
