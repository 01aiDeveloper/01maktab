'use client';

import { motion } from 'framer-motion';
import { MarketProductCard } from '@/components/cards/market-product-card';
import { useMarketProducts } from '@/hooks/use-market';
import { Skeleton } from '@/components/ui/skeleton';

export function MarketGrid() {
  const { data, isLoading, isError } = useMarketProducts();

  if (isLoading) {
    return (
      <section className="container py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="container py-2">
        <p className="text-center text-neutral-500">Mahsulotlarni yuklab bo'lmadi.</p>
      </section>
    );
  }

  return (
    <section className="container py-2">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {data.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <MarketProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
