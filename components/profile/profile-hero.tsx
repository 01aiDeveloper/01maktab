'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function ProfileHero() {
  return (
    <section className="pt-2 pb-4">
      {/* Mobile layout */}
      <div className="lg:hidden relative rounded-[24px] overflow-hidden h-64">
        <Image
          src="/images/profile-hero.webp"
          alt="Profile"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Orqaga button top left */}
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </Link>
        {/* Profil text bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 pt-10 pb-5">
          <h1 className="text-3xl font-bold text-white">Profil</h1>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-[1fr_1.2fr] gap-4 h-60">
        {/* Left: Dark Card */}
        <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-[24px] p-8 flex flex-col justify-between overflow-hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga</span>
          </Link>
          <h1 className="text-4xl font-bold text-white">Profil</h1>
        </div>

        {/* Right: Illustration Card */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-[24px] overflow-hidden">
          <Image
            src="/images/profile-hero.webp"
            alt="Profile"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
