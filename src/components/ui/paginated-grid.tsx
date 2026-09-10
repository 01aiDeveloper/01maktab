'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientPagination } from '@/hooks/common/use-client-pagination';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';

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
      {pageCount > 1 ? (
        <div className="flex justify-center mt-6 md:mt-8">
          <CarouselNavigation
            onPrevClick={() => setPage(Math.max(1, page - 1))}
            onNextClick={() => setPage(Math.min(pageCount, page + 1))}
            canScrollPrev={page > 1}
            canScrollNext={page < pageCount}
            variant="light"
          />
        </div>
      ) : null}
    </>
  );
}
