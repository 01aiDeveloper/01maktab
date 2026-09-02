'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { CatalogCard } from '@/components/cards/catalog-card';
import { NoData } from '@/components/ui/no-data';
import { useAuth } from '@/hooks/common/use-auth';
import { useMyCourses, useMySkills, useMyProfessions } from '@/hooks/queries/use-my-courses';
import { getMediaUrl } from '@/lib/utils';
import { catalogApi } from '@/services/react-query/catalog';
import type { CourseKind } from '@/services/react-query/course';

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

const courseKinds: Record<TabKey, CourseKind> = {
  skills: 'skill',
  courses: 'course',
  professions: 'profession',
};

export function CatalogTabs() {
  const t = useTranslations('catalog');
  const TABS = TAB_META.map((tab) => ({ ...tab, label: t(tab.labelKey) }));
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

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

  const { data: items = [], isLoading: loading } = useQuery<CatalogItem[]>({
    queryKey: ['catalog', activeTab, user ? 'client' : 'public'],
    queryFn: () => catalogApi.getList(courseKinds[activeTab], Boolean(user)),
  });

  // /course/client cardImage/photo'ni qaytarmaydi — public listdan id->{cardImage,photo} map olamiz
  const { data: publicImageMap = {} } = useQuery<Record<number, { cardImage?: string; photo?: string }>>({
    queryKey: ['catalog-image', activeTab],
    queryFn: async () => {
      const data = await catalogApi.getList(courseKinds[activeTab]);
      const map: Record<number, { cardImage?: string; photo?: string }> = {};
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item?.id == null) continue;
          map[item.id] = {
            cardImage: item?.cardImage || undefined,
            photo: item?.photo || undefined,
          };
        }
      }
      return map;
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
  });

  // Fetch detail (mentor + pricing + cardImage) — list endpoint ba'zi maydonlarni qaytarmaydi
  const detailQueries = useQueries({
    queries: items.map((item) => ({
      queryKey: ['catalog-detail', activeTab, item.id],
      queryFn: async () => {
        const data = await catalogApi.getDetail(courseKinds[activeTab], item.id);
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
    const pub = publicImageMap[item.id];
    const raw = activeTab === 'skills'
      ? (detail?.photo || item.photo || pub?.photo)
      : (detail?.cardImage || item.cardImage || pub?.cardImage || detail?.photo || item.photo || pub?.photo);
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
                isActive ? 'text-[#18181A]' : 'text-[#CDCDCD] opacity-[0.58] hover:opacity-100'
              }`}
            >
              <Image quality={90} src={tab.icon} alt={tab.label} width={32} height={32} className={`w-8 h-8 object-contain ${!isActive ? 'grayscale opacity-50' : ''}`} />
              {tab.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[137px] h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(178.7deg, rgb(42,81,230), rgb(101,133,255))' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 2 qator — har biri alohida yonga scroll */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <NoData title={t('noItemsTitle')} description={t('noItemsDescription')} />
      ) : (
        <div className="flex flex-col gap-4">
          {[0, 1].map((rowIdx) => {
            const rowItems = items.filter((_, i) => i % 2 === rowIdx);
            if (rowItems.length === 0) return null;
            return (
              <div
                key={rowIdx}
                className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {rowItems.map((item: CatalogItem) => {
                  const detail = itemDetail[item.id];
                  const hasPurchased = detail?.hasPurchased ?? item.hasPurchased;
                  const pricingType = detail?.pricingType ?? item.pricingType;
                  const price = detail?.price ?? item.price;
                  const isBought = hasPurchased ?? (user ? myItemIds[activeTab].has(item.id) : false);
                  const isFree = pricingType === 'FREE' || price === 0;
                  const status: 'bought' | 'free' | 'waitlist' | 'presale' | 'available' =
                    isBought ? 'bought'
                    : isFree ? 'free'
                    : item.presalesEnabled ? 'presale'
                    : item.waitlistEnabled ? 'waitlist'
                    : 'available';

                  return (
                    <div key={item.id} className="shrink-0 w-[300px] sm:w-[340px]">
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
            );
          })}
        </div>
      )}
    </section>
  );
}
