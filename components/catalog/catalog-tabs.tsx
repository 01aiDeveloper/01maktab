'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CatalogCard } from '@/components/cards/catalog-card';
import api from '@/lib/api';

type TabKey = 'skills' | 'courses' | 'professions';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'skills', label: 'Skilllar' },
  { key: 'courses', label: 'Kurslar' },
  { key: 'professions', label: 'Kasblar' },
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

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const setTab = (tab: TabKey) => {
    router.push(`/catalog?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        if (activeTab === 'skills') endpoint = '/course/public/skills';
        if (activeTab === 'courses') endpoint = '/course/public/courses';
        if (activeTab === 'professions') endpoint = '/course/public/professions';

        const response = await api.get(endpoint, { params: { pageSize: 20 } });
        const data = response.data?.data?.data || response.data?.data || [];
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch catalog items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab]);

  const getItemHref = (item: CatalogItem) => {
    const slug = item.slug || item.id.toString();
    if (activeTab === 'skills') return `/skills/${slug}`;
    if (activeTab === 'courses') return `/courses/${slug}`;
    return `/professions/${slug}`;
  };

  const getItemImage = (item: CatalogItem) => {
    return item.image || item.photo || '/placeholder.svg';
  };

  const getItemSubtitle = (item: CatalogItem) => {
    return item.mentor || item.mentorName || item.instructorName || 'Mentor: Kursni Ko\'ring';
  };

  return (
    <section className="max-w-300 mx-auto px-4 py-6 lg:py-10">
      {/* Tab Navigation */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`relative px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-[#3B5BFF]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#3B5BFF] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-base">Hozircha ma&apos;lumot yo&apos;q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <CatalogCard
              key={item.id}
              id={item.id}
              slug={item.slug}
              title={item.title}
              subtitle={getItemSubtitle(item)}
              image={getItemImage(item)}
              badge="Bepul"
              badgeColor="green"
              href={getItemHref(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
