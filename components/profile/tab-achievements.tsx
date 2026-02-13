'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';

interface Achievement {
  id: number;
  title: string;
  image?: string;
  isLocked?: boolean;
}

export function TabAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.get('/course/my/skills', { params: { pageSize: 20 } });
        const data = response.data?.data?.data || response.data?.data || [];
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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
        <div className="bg-white rounded-[22px] p-12 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.52.952m0 0a6.003 6.003 0 01-2.52-.952" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">Yutuqlar mavjud emas</p>
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
