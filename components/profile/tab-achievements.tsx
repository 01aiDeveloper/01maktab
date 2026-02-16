'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';

interface Achievement {
  id: number;
  title: string;
  image?: string;
  isLocked?: boolean;
}

export function TabAchievements() {
  const { data: items = [], isLoading: loading } = useQuery<Achievement[]>({
    queryKey: ['my-achievements'],
    queryFn: async () => {
      const response = await api.get('/course/my/skills', { params: { pageSize: 20 } });
      const data = response.data?.data?.data || response.data?.data || [];
      return Array.isArray(data) ? data : [];
    },
  });

  if (loading) {
    return (
      <div className="max-w-300 mx-auto px-4 pb-8">
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-300 mx-auto px-4 pb-8">
        <div className="bg-white rounded-[22px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <NoData
            title="Здесь пока ничего нет"
            description="Пройдите курс и получите достижения"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto px-4 pb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Skillar</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-[18px] aspect-square flex flex-col items-center justify-center p-4 ${
              item.isLocked
                ? 'bg-gray-100 opacity-50'
                : 'bg-[#3B5BFF] shadow-lg shadow-blue-500/20'
            }`}
          >
            {item.image && (
              <div className="relative w-10 h-10 mb-3">
                <Image src={getMediaUrl(item.image)} alt={item.title} fill className="object-contain" />
              </div>
            )}
            <span className={`text-sm font-semibold text-center ${item.isLocked ? 'text-gray-400' : 'text-white'}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
