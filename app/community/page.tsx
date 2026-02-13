'use client';

import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function CommunityPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen bg-[#f5f5f5]">
        {/* Hero Section */}
        <section className="max-w-300 mx-auto px-4 pt-8 pb-4">
        {/* Desktop: 2 columns, Mobile: stacked reversed */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-4">
          {/* Right card first on mobile */}
          <div className="lg:hidden relative rounded-[24px] overflow-hidden h-[240px]"
            style={{
              background: 'linear-gradient(135deg, #e8ddf5 0%, #f0e0f0 25%, #e5d5e8 50%, #d5c8d8 75%, #c8bcc8 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Lock className="w-7 h-7 text-white/80" />
              </div>
            </div>
          </div>

          {/* Left: Dark Card */}
          <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-[24px] p-7 lg:p-8 flex flex-col justify-between h-[200px] lg:h-[240px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Hamjamiyat –<br />tez orada
            </h1>
          </div>

          {/* Right: Gradient Lock Card (desktop only) */}
          <div
            className="hidden lg:block relative rounded-[24px] overflow-hidden h-[240px]"
            style={{
              background: 'linear-gradient(135deg, #e8ddf5 0%, #f0e0f0 25%, #e5d5e8 50%, #d5c8d8 75%, #c8bcc8 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Spacer to push footer down */}
        <div className="flex-1 min-h-75" />
      </main>

      <SiteFooter />
    </>
  );
}
