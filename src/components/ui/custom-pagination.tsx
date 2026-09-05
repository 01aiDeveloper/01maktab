'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface CustomPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ page, pageCount, onPageChange }: CustomPaginationProps) {
  if (pageCount <= 1) return null;

  const pages = pageCount <= 7
    ? Array.from({ length: pageCount }, (_, index) => index + 1)
    : Array.from(new Set([1, 2, page - 1, page, page + 1, pageCount - 1, pageCount]))
        .filter((value) => value >= 1 && value <= pageCount)
        .sort((a, b) => a - b);

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
        {pages.map((p, index) => (
          <>
            {index > 0 && p - pages[index - 1] > 1 && (
              <PaginationItem key={`ellipsis-${p}`}><PaginationEllipsis /></PaginationItem>
            )}
            <PaginationItem key={p}>
              <PaginationLink isActive={p === page} onClick={() => onPageChange(p)} className="cursor-pointer">
                {p}
              </PaginationLink>
            </PaginationItem>
          </>
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
