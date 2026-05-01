'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery, useQueries } from '@tanstack/react-query';
import { CatalogCard } from '@/components/cards/catalog-card';
import { NoData } from '@/components/ui/no-data';
import { useAuthStore } from '@/store/auth-store';
import { useMyCourses, useMySkills, useMyProfessions } from '@/hooks/use-my-courses';
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
  cardImage?: string;
  icon?: string;
  mentorId?: number;
  mentor?: { id?: number; fullname?: string } | string;
  mentorName?: string;
  pricingType?: 'FREE' | 'PAID';
  enrollmentCount?: number;
}

const detailPaths: Record<TabKey, (id: number) => string> = {
  skills: (id) => `/course/skill/${id}/public`,
  courses: (id) => `/course/${id}/public`,
  professions: (id) => `/course/profession/${id}/public`,
};

export function CatalogTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();

  const { data: myCourses } = useMyCourses();
  const { data: mySkills } = useMySkills();
  const { data: myProfessions } = useMyProfessions();

  const myItemIds: Record<TabKey, Set<number>> = {
    courses: new Set(myCourses?.map((c) => c.id) || []),
    skills: new Set(mySkills?.map((s) => s.id) || []),
    professions: new Set(myProfessions?.map((p) => p.id) || []),
  };

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

  // Fetch mentor names from individual detail endpoints
  const mentorQueries = useQueries({
    queries: items.map((item) => ({
      queryKey: ['catalog-mentor', activeTab, item.id],
      queryFn: async () => {
        const res = await api.get(detailPaths[activeTab](item.id));
        const data = res.data?.data;
        return { id: item.id, mentorName: data?.mentor?.fullname || null };
      },
      staleTime: 10 * 60 * 1000,
    })),
  });

  const mentorNames: Record<number, string> = {};
  mentorQueries.forEach((q) => {
    if (q.data?.mentorName) {
      mentorNames[q.data.id] = q.data.mentorName;
    }
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
    return item.cardImage || item.image || item.photo || '/placeholder.svg';
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
        <NoData title="Bu yerda hozircha hech narsa yo'q" description="Hozircha ma'lumot yo'q" />
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {items.map((item: CatalogItem) => {
            const isBought = user ? myItemIds[activeTab].has(item.id) : false;
            const isFree = item.pricingType === 'FREE';
            const status: 'bought' | 'free' | 'waitlist' = isBought ? 'bought' : isFree ? 'free' : 'waitlist';

            return (
              <CatalogCard
                key={item.id}
                id={item.id}
                slug={item.slug}
                title={item.title}
                image={getItemImage(item)}
                icon={item.icon}
                status={status}
                enrollmentCount={item.enrollmentCount}
                mentorName={mentorNames[item.id]}
                href={getItemHref(item)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
