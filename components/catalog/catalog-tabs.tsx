'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { CatalogCard } from '@/components/cards/catalog-card';
import { NoData } from '@/components/ui/no-data';
import { useAuthStore } from '@/store/auth-store';
import { useMyCourses, useMySkills, useMyProfessions } from '@/hooks/use-my-courses';
import api from '@/lib/api';
import { getMediaUrl } from '@/lib/utils';

type TabKey = 'skills' | 'courses' | 'professions';

const TAB_META: { key: TabKey; labelKey: 'tabSkills' | 'tabCourses' | 'tabProfessions'; icon: string }[] = [
  { key: 'skills', labelKey: 'tabSkills', icon: '/icons/catalog/1.svg' },
  { key: 'courses', labelKey: 'tabCourses', icon: '/icons/catalog/2.svg' },
  { key: 'professions', labelKey: 'tabProfessions', icon: '/icons/catalog/3.svg' },
];

interface CatalogItem {
  id: number;
  title: string;
  slug?: string;
  image?: string;
  photo?: string;
  cardImage?: string;
  icon?: string;
  price?: number;
  mentorId?: number;
  mentor?: { id?: number; fullname?: string } | string;
  mentorName?: string;
  pricingType?: 'FREE' | 'PAID';
  presalesEnabled?: boolean;
  waitlistEnabled?: boolean;
  waitlistCount?: number;
  enrollmentCount?: number;
  hasPurchased?: boolean;
}

const detailPaths: Record<TabKey, (id: number) => string> = {
  skills: (id) => `/course/skill/${id}/public`,
  courses: (id) => `/course/${id}/public`,
  professions: (id) => `/course/profession/${id}/public`,
};

export function CatalogTabs() {
  const t = useTranslations('catalog');
  const TABS = TAB_META.map((tab) => ({ ...tab, label: t(tab.labelKey) }));
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

  const listEndpoint = user ? '/course/client' : '/course/public';

  const { data: items = [], isLoading: loading } = useQuery<CatalogItem[]>({
    queryKey: ['catalog', activeTab, user ? 'client' : 'public'],
    queryFn: async () => {
      const response = await api.get(listEndpoint, {
        params: { format: formats[activeTab], pageSize: 20 },
      });
      const data = response.data?.data?.data || response.data?.data || [];
      return Array.isArray(data) ? data : [];
    },
  });

  // Fetch detail (mentor + pricing + cardImage) — list endpoint ba'zi maydonlarni qaytarmaydi
  const detailQueries = useQueries({
    queries: items.map((item) => ({
      queryKey: ['catalog-detail', activeTab, item.id],
      queryFn: async () => {
        const res = await api.get(detailPaths[activeTab](item.id));
        const data = res.data?.data;
        return {
          id: item.id,
          mentorName: data?.mentor?.fullname || null,
          pricingType: data?.pricingType as 'FREE' | 'PAID' | undefined,
          price: data?.price as number | undefined,
          hasPurchased: data?.hasPurchased as boolean | undefined,
          cardImage: (data?.cardImage as string | undefined) || undefined,
          photo: (data?.photo as string | undefined) || undefined,
        };
      },
      staleTime: 10 * 60 * 1000,
    })),
  });

  const mentorNames: Record<number, string> = {};
  const itemDetail: Record<
    number,
    { pricingType?: 'FREE' | 'PAID'; price?: number; hasPurchased?: boolean; cardImage?: string; photo?: string }
  > = {};
  detailQueries.forEach((q) => {
    if (!q.data) return;
    if (q.data.mentorName) mentorNames[q.data.id] = q.data.mentorName;
    itemDetail[q.data.id] = {
      pricingType: q.data.pricingType,
      price: q.data.price,
      hasPurchased: q.data.hasPurchased,
      cardImage: q.data.cardImage,
      photo: q.data.photo,
    };
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
    const detail = itemDetail[item.id];
    const raw =
      detail?.cardImage || item.cardImage || detail?.photo || item.image || item.photo;
    return raw ? getMediaUrl(raw) : '/placeholder.svg';
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
        <NoData title={t('noItemsTitle')} description={t('noItemsDescription')} />
      ) : (
        <div className="grid grid-flow-col grid-rows-2 auto-cols-[70%] overflow-x-auto snap-x snap-mandatory -mx-4 px-4 gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:grid-rows-none sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:snap-none">
          {items.map((item: CatalogItem) => {
            const detail = itemDetail[item.id];
            const hasPurchased = detail?.hasPurchased ?? item.hasPurchased;
            const pricingType = detail?.pricingType ?? item.pricingType;
            const price = detail?.price ?? item.price;
            const isBought = hasPurchased ?? (user ? myItemIds[activeTab].has(item.id) : false);
            const isFree = pricingType === 'FREE' || price === 0;
            const status: 'bought' | 'free' | 'waitlist' | 'presale' =
              isBought ? 'bought'
              : isFree ? 'free'
              : item.presalesEnabled ? 'presale'
              : item.waitlistEnabled ? 'waitlist'
              : 'free';

            return (
              <div key={item.id} className="snap-start">
                <CatalogCard
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  image={getItemImage(item)}
                  icon={item.icon}
                  status={status}
                  enrollmentCount={item.enrollmentCount}
                  waitlistCount={item.waitlistCount}
                  mentorName={mentorNames[item.id]}
                  href={getItemHref(item)}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
