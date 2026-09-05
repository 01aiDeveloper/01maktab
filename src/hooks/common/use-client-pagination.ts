'use client';

import { useEffect, useState } from 'react';

function getPageSize() {
  if (typeof window === 'undefined') return 4;
  if (window.matchMedia('(min-width: 1024px)').matches) return 4;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

/** Keeps array-backed sections consistent with API-backed pagination. */
export function useClientPagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    const update = () => setPageSize(getPageSize());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount));
  }, [pageCount]);

  useEffect(() => {
    setPage(1);
  }, [items.length]);

  const start = (page - 1) * pageSize;
  return { page, setPage, pageSize, pageCount, visibleItems: items.slice(start, start + pageSize) };
}
