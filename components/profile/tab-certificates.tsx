'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';
import { MyCertificateCard } from '@/components/cards/my-certificate-card';
import { CustomPagination } from '@/components/ui/custom-pagination';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <MyCertificateCard key={item.id} item={item} />
        ))}
      </div>

      <CustomPagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </div>
  );
}
