'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={className}
        >
          {visibleItems.map(children)}
        </motion.div>
      </AnimatePresence>
      <CustomPagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </>
  );
}
