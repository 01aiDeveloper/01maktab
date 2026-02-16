'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { SkillCard } from '@/components/cards/skill-card';
import { NoData } from '@/components/ui/no-data';
import api from '@/lib/api';

type TabKey = 'skills' | 'courses' | 'professions';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'skills', label: 'Skillar', icon: '/icons/catalog/1.svg' },
  { key: 'courses', label: 'Kurslar', icon: '/icons/catalog/2.svg' },
  { key: 'professions', label: 'Kasblar', icon: '/icons/catalog/3.svg' },
];

interface CatalogItem {
  id: number;
  title: string;
  slug?: string;
  image?: string;
  photo?: string;
  mentor?: string;
  mentorName?: string;
  instructorName?: string;
}

export function CatalogTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab') as TabKey | null;
  const activeTab: TabKey = tabParam && TABS.some((t) => t.key === tabParam) ? tabParam : 'skills';

  const formats: Record<TabKey, string> = {
    skills: 'SKILL',
    courses: 'COURSE',
    professions: 'PROFESSION',
  };

  const { data: items = [], isLoading: loading } = useQuery<CatalogItem[]>({
    queryKey: ['catalog', activeTab],
    queryFn: async () => {
      const response = await api.get('/course/public', {
        params: { format: formats[activeTab], pageSize: 20 },
      });
      const data = response.data?.data?.data || response.data?.data || [];
      return Array.isArray(data) ? data : [];
    },
  });

  const setTab = (tab: TabKey) => {
    router.push(`/catalog?tab=${tab}`, { scroll: false });
  };

  const getItemHref = (item: CatalogItem) => {
    const slug = item.slug || item.id.toString();
    if (activeTab === 'skills') return `/skills/${slug}`;
    if (activeTab === 'courses') return `/courses/${slug}`;
    return `/professions/${slug}`;
  };

  const getItemImage = (item: CatalogItem) => {
    return item.image || item.photo || '/placeholder.svg';
  };

  return (
    <section className="container  py-6! lg:py-10!">
      {/* Tab Navigation */}
      <div className="flex items-center w-full mb-8">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Image src={tab.icon} alt={tab.label} width={32} height={32} className={`w-8 h-8 object-contain ${!isActive ? 'grayscale opacity-50' : ''}`} />
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#3B5BFF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <NoData title="Здесь пока ничего нет" description="Hozircha ma'lumot yo'q" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: CatalogItem) => (
            <SkillCard
              key={item.id}
              id={item.id}
              slug={item.slug}
              title={item.title}
              image={getItemImage(item)}
              badge="Bepul"
              href={getItemHref(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
