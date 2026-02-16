'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function ProfileHero() {
  return (
    <section className="max-w-300 mx-auto px-4 pt-8 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 h-50 lg:h-60">
        {/* Left: Dark Card */}
        <div className="relative bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-[24px] p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga</span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Profil</h1>
        </div>

        {/* Right: Illustration Card */}
        <div className="hidden lg:block relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-[24px] overflow-hidden">
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
