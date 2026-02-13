'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function CatalogHero() {
  return (
    <section className="max-w-300 mx-auto px-4 pt-8 pb-4">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-5 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Orqaga</span>
      </Link>

      <div className="relative rounded-[28px] overflow-hidden h-[200px] lg:h-[240px]">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f2e] via-[#1a1a3e] to-[#252560]" />

        {/* Subtle decorative blurs */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-blue-600/15 rounded-full blur-[80px]" />
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-indigo-400/10 rounded-full blur-[60px]" />

        <div className="relative z-10 grid lg:grid-cols-2 items-center h-full px-8 lg:px-12">
          {/* Left: Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Barcha Kurslar
            </h1>
          </div>

          {/* Right: 3D Image */}
          <div className="hidden lg:flex items-center justify-end h-full">
            <div className="relative w-full max-w-xs h-[200px]">
              <Image
                src="/images/catalog/hero-3d.png"
                alt="Catalog"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
