'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type TabKey = 'info' | 'achievements' | 'certificates' | 'payments';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'info', label: "Ma'lumotlarim", icon: '/icons/profile/2.webp' },
  { key: 'achievements', label: 'Yutuqlarim', icon: '/icons/profile/1.webp' },
  { key: 'certificates', label: 'Sertifikatlarim', icon: '/icons/profile/3.webp' },
  { key: 'payments', label: "To'lovlarim", icon: '/icons/profile/4.png' },
];

interface ProfileTabsProps {
  activeTab: TabKey;
}

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  const router = useRouter();

  const setTab = (tab: TabKey) => {
    router.push(`/profile?tab=${tab}`, { scroll: false });

    // Scroll animatsiya bilan #profile-content ga o'tish
    setTimeout(() => {
      const element = document.getElementById('profile-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  return (
    <div className="pb-3">
      <div className="flex items-center w-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`relative flex-1 lg:flex-1 shrink-0 lg:shrink flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Image
                src={tab.icon}
                alt={tab.label}
                width={32}
                height={32}
                className={`w-8 h-8 object-contain ${!isActive ? 'grayscale opacity-50' : ''}`}
              />
              {tab.label}
              {isActive && <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#3B5BFF] rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { TabKey };
