'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getMediaUrl } from '@/lib/utils';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';
import type { ApiResponse, PaginatedResponse, CourseBadge } from '@/types/api.types';
import { MainTitle } from '../ui/main-title';

const PAGE_SIZE = 8;

export function TabAchievements() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<ApiResponse<PaginatedResponse<CourseBadge>>>({
    queryKey: ['my-badges', page],
    queryFn: async () => {
      const res = await api.get('/course-badge/my', {
        params: { pageNumber: page, pageSize: PAGE_SIZE },
      });
      return res.data;
    },
  });

  const items = data?.data?.data ?? [];
  const pagination = data?.data?.meta?.pagination;
  const pageCount = pagination?.pageCount ?? 1;

  if (isLoading) {
    return (
      <div className="pb-8">
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pb-8">
        <div className="bg-white rounded-[22px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <NoData title="Hozircha hech narsa yo'q" description="Kurs o'tib yutuqlar qozonin" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <MainTitle className="text-xl font-bold text-gray-900 mb-4">Skillar</MainTitle>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center px-2  justify-center rounded-[25px] overflow-hidden"
            style={{
              aspectRatio: '315/430',
              background: item.isClaimed
                ? 'linear-gradient(180deg, #2A51E6 0%, #5C7EFD 100%)'
                : '#CDCDCD',
            }}
          >
            <div className="flex flex-col items-center gap-[38px]">
              {/* Icon Container */}
              <div
                className="flex items-center justify-center rounded-[34px] overflow-hidden flex-shrink-0"
                style={{
                  width: 108,
                  height: 108,
                  background: 'rgba(255,255,255,0.2)',
                  border: '1.1px solid rgba(255,255,255,0.17)',
                  backdropFilter: 'blur(18.35px)',
                }}
              >
                {item.icon && (
                  <Image
                    src={getMediaUrl(item.icon)}
                    alt={item.title}
                    width={66}
                    height={66}
                    className="object-contain"
                  />
                )}
              </div>

              <span className="font-suisse font-semibold  text-[49.41px] leading-[51.47px] tracking-[-0.05em] text-center uppercase text-white">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 h-9 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ←
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="px-4 h-9 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
