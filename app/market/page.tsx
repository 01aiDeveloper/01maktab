'use client';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MarketHero } from '@/components/market/market-hero';
import { MarketGrid } from '@/components/market/market-grid';
import { MarketCtaBanner } from '@/components/market/market-cta-banner';

export default function MarketPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main className="min-h-screen bg-[#f5f5f5] pb-6 flex flex-col gap-10">
        <MarketHero />
        <MarketGrid />
        <MarketCtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
