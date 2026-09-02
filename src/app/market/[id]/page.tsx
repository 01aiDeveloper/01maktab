'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ProductDetailInfo } from '@/components/market/product-detail-info';
import { ProductDetailGallery } from '@/components/market/product-detail-gallery';
import { RelatedProductsCarousel } from '@/components/market/related-products-carousel';
import { useMarketProduct, useMarketProducts } from '@/hooks/queries/use-market';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: product, isLoading } = useMarketProduct(id);
  const { data: allProducts } = useMarketProducts();

  const related = (allProducts ?? []).filter((p) => p.id !== id);

  return (
    <>
      <SiteHeader variant="light" />
      <main className="min-h-screen bg-[#f5f5f5] pb-6 flex flex-col gap-10">
        <section className="container pt-6 pb-2">
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Skeleton className="rounded-3xl aspect-[4/5]" />
              <Skeleton className="rounded-3xl h-[600px]" />
            </div>
          )}

          {!isLoading && !product && (
            <div className="bg-white rounded-3xl p-10 text-center">
              <p className="text-neutral-700 mb-4">Mahsulot topilmadi.</p>
              <Link
                href="/market"
                className="inline-flex items-center text-[#3B5BFF] hover:underline"
              >
                Marketga qaytish
              </Link>
            </div>
          )}

          {product && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_560px] gap-4 lg:h-[673px]"
            >
              <ProductDetailInfo product={product} />
              <ProductDetailGallery product={product} />
            </motion.div>
          )}
        </section>

        {product && related.length > 0 && (
          <RelatedProductsCarousel products={related} />
        )}
      </main>
      <SiteFooter />
    </>
  );
}
