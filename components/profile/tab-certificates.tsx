'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';
import { getMediaUrl } from '@/lib/utils';
import type { ApiResponse, PaginatedResponse, CourseCertificate } from '@/types/api.types';

const PAGE_SIZE = 12;

export function TabCertificates() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<ApiResponse<PaginatedResponse<CourseCertificate>>>({
    queryKey: ['my-certificates', page],
    queryFn: async () => {
      const res = await api.get('/course-certificate/my', {
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
          <NoData title="Hozircha hech narsa yo'q" description="Kurs o'tab professional sertifikat oling" />
          
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="bg-white rounded-[22px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-900">{item.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </span>
                {item.file && (
                  <a
                    href={getMediaUrl(item.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#3B5BFF] hover:underline"
                  >
                    Yuklab olish
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
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
