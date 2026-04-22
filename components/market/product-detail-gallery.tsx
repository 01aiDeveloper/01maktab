'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MarketProduct, ProductStatus } from '@/types/market';
import { ProductGalleryLightbox } from './product-gallery-lightbox';

interface ProductDetailGalleryProps {
  product: MarketProduct;
}

const statusLabel: Record<ProductStatus, string> = {
  IN_STOCK: 'В наличии',
  OUT_OF_STOCK: 'Нет в наличии',
  COIN_ONLY: 'Только за 01',
  SOON: 'Скоро',
};

const statusClass: Record<ProductStatus, string> = {
  IN_STOCK: 'bg-[#1EBB4A] text-white',
  OUT_OF_STOCK: 'bg-neutral-200 text-neutral-700',
  COIN_ONLY: 'bg-neutral-900 text-white',
  SOON: 'bg-[#3B5BFF] text-white',
};

export function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const main = product.images[active] ?? product.images[0];

  return (
    <div className="flex flex-col gap-3 lg:h-full">
      {/* Main image */}
      <div className="relative bg-white rounded-3xl overflow-hidden flex-1 aspect-[560/545] lg:aspect-auto">
        <span
          className={cn(
            'absolute top-4 left-4 z-10 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold',
            statusClass[product.status],
          )}
        >
          {statusLabel[product.status]}
        </span>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Fullscreen"
          className="absolute top-4 right-4 z-10 w-6 h-6 rounded-md border border-neutral-100 hover:bg-white hover:text-neutral-900 cursor-pointer text-white flex items-center justify-center transition-colors"
        >
          <Expand className="w-4 h-4" />
        </button>

        {main && (
          <Image
            src={main}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        )}
      </div>

      {/* Thumbnails — 3 visible, rest scroll horizontally */}
      {product.images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-hide">
          {product.images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative rounded-2xl overflow-hidden transition-all bg-white min-w-0',
                'basis-[calc((100%-16px)/3)] shrink-0 aspect-square',
                i === active
                  ? 'ring-1 ring-neutral-300'
                  : 'opacity-80 hover:opacity-100',
              )}
            >
              <Image src={img} alt="" fill sizes="33vw" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      <ProductGalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={product.images}
        initialIndex={active}
      />
    </div>
  );
}
