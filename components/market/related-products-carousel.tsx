'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MarketProductCard } from '@/components/cards/market-product-card';
import { cn } from '@/lib/utils';
import type { MarketProduct } from '@/types/market';

interface RelatedProductsCarouselProps {
  products: MarketProduct[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products.length) return null;

  return (
    <section className="container pt-2 pb-2">
      <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-6">
        Смотреть другие товары
      </h2>

      <div ref={emblaRef} className="overflow-hidden py-4">
        <div className="flex gap-4 pt-4 -mt-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 max-w-[425px]"
            >
              <MarketProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Oldingi"
          className={cn(
            'w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center transition-all hover:bg-neutral-300',
            !canPrev && 'opacity-40 cursor-not-allowed hover:bg-neutral-200',
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Keyingi"
          className={cn(
            'w-10 h-10 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center transition-all hover:bg-neutral-300',
            !canNext && 'opacity-40 cursor-not-allowed hover:bg-neutral-200',
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
