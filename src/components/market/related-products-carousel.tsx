'use client';

import { MarketProductCard } from '@/components/cards/market-product-card';
import type { MarketProduct } from '@/types/market';
import { PaginatedGrid } from '@/components/ui/paginated-grid';

interface RelatedProductsCarouselProps {
  products: MarketProduct[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  if (!products.length) return null;

  return (
    <section className="container pt-2 pb-2">
      <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-6">
        Смотреть другие товары
      </h2>

      <PaginatedGrid items={products} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {(product) => <MarketProductCard key={product.id} product={product} />}
      </PaginatedGrid>
    </section>
  );
}
