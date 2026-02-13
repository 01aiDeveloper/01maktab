'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ProfileHero } from '@/components/profile/profile-hero';
import { ProfileTabs, type TabKey } from '@/components/profile/profile-tabs';
import { TabPersonalInfo } from '@/components/profile/tab-personal-info';
import { TabAchievements } from '@/components/profile/tab-achievements';
import { TabCertificates } from '@/components/profile/tab-certificates';
import { TabPayments } from '@/components/profile/tab-payments';

function ProfileContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabKey | null;
  const activeTab: TabKey = tabParam && ['info', 'achievements', 'certificates', 'payments'].includes(tabParam) ? tabParam : 'info';

  return (
    <>
      <ProfileTabs activeTab={activeTab} />

      {activeTab === 'info' && <TabPersonalInfo />}
      {activeTab === 'achievements' && <TabAchievements />}
      {activeTab === 'certificates' && <TabCertificates />}
      {activeTab === 'payments' && <TabPayments />}
    </>
  );
}

export default function ProfilePage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f5f5f5]">
        <ProfileHero />

        <Suspense fallback={
          <div className="max-w-300 mx-auto px-4 py-12">
            <div className="flex justify-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
            </div>
          </div>
        }>
          <ProfileContent />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
