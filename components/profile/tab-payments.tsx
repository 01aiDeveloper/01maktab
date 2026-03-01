'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';
import { CustomPagination } from '@/components/ui/custom-pagination';
import type { ApiResponse, PaginatedResponse, Payment } from '@/types/api.types';

const PAGE_SIZE = 10;

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  PAID: { label: 'To\'langan', className: 'bg-[#1EBB4A] text-white' },
  PENDING: { label: 'Kutilmoqda', className: 'bg-[#E6E6E7] text-[#18181A]' },
  FAILED: { label: 'Xatolik', className: 'bg-red-100 text-red-600' },
};

export function TabPayments() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<ApiResponse<PaginatedResponse<Payment>>>({
    queryKey: ['my-payments', page],
    queryFn: async () => {
      const res = await api.get('/user/my/payments', {
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
          <NoData title="Hozircha hech narsa yo'q" description="To'langan kurslaringiz shu yerda ko'rinadi" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const status = STATUS_MAP[item.status] ?? STATUS_MAP.PENDING;
          const offset = (page - 1) * PAGE_SIZE;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-5 md:px-[45px] bg-white border-b border-[#E6E6E6] rounded-[22px]"
              style={{ minHeight: 91 }}
            >
              {/* Left: number + title + amount */}
              <div className="flex items-center gap-[53px]">
                <span
                  className="font-suisse text-[24px] leading-[25px] tracking-[-0.05em] text-black shrink-0"
                  style={{ fontWeight: 450 }}
                >
                  {offset + index + 1}
                </span>
                <span
                  className="font-suisse text-[24px] leading-[25px] tracking-[-0.05em] text-black"
                  style={{ fontWeight: 450 }}
                >
                  {item.amount.toLocaleString('uz-UZ')} so'm
                </span>
              </div>

              {/* Right: date + status */}
              <div className="flex items-center gap-4 md:gap-[215px] shrink-0">
                <span className="hidden sm:block bg-[#E6E6E7] text-[#18181A] rounded-[10px] px-4 py-2 font-suisse text-base" style={{ fontWeight: 450 }}>
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')} –{' '}
                  {new Date(item.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span
                  className={`rounded-[10px] px-4 py-2 font-suisse text-base tracking-[-0.05em] ${status.className}`}
                  style={{ fontWeight: 450 }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <CustomPagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </div>
  );
}
