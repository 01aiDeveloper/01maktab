'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface CustomPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ page, pageCount, onPageChange }: CustomPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={page === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === page} onClick={() => onPageChange(p)} className="cursor-pointer">
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
            className={page === pageCount ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
