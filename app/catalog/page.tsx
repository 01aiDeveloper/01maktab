'use client';

import { Suspense } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CatalogHero } from '@/components/catalog/catalog-hero';
import { CatalogTabs } from '@/components/catalog/catalog-tabs';
import { CatalogCta } from '@/components/catalog/catalog-cta';

export default function CatalogPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f5f5f5]">
        <CatalogHero />

        <Suspense fallback={
          <div className="container py-12">
            <div className="flex justify-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
            </div>
          </div>
        }>
          <CatalogTabs />
        </Suspense>

        <Suspense fallback={null}>
          <CatalogCta />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
