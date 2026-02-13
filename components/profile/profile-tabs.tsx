'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { User, Trophy, Award, CreditCard } from 'lucide-react';

type TabKey = 'info' | 'achievements' | 'certificates' | 'payments';

const TABS: { key: TabKey; label: string; icon: typeof User }[] = [
  { key: 'info', label: "Ma'lumotlarim", icon: User },
  { key: 'achievements', label: 'Yutuqlarim', icon: Trophy },
  { key: 'certificates', label: 'Sertifikatlarim', icon: Award },
  { key: 'payments', label: "To'lovlarim", icon: CreditCard },
];

interface ProfileTabsProps {
  activeTab: TabKey;
}

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  const router = useRouter();

  const setTab = (tab: TabKey) => {
    router.push(`/profile?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="max-w-300 mx-auto px-4 py-4">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-[#3B5BFF]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#3B5BFF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { TabKey };
