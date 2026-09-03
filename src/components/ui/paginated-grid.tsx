'use client';

import type { ReactNode } from 'react';
import { useClientPagination } from '@/hooks/common/use-client-pagination';
import { CustomPagination } from '@/components/ui/custom-pagination';

interface PaginatedGridProps<T> {
  items: T[];
  className: string;
  children: (item: T, index: number) => ReactNode;
}

/** Responsive, local-state pagination for sections backed by a complete array. */
export function PaginatedGrid<T>({ items, className, children }: PaginatedGridProps<T>) {
  const { page, setPage, pageCount, visibleItems } = useClientPagination(items);

  return (
    <>
      <div className={className}>{visibleItems.map(children)}</div>
      <CustomPagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </>
  );
}
