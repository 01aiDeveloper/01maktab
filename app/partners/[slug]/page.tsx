'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';
import { getMediaUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Partner } from '@/types/api.types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://app-dev.01ai.uz/api/v1';

export default function PartnerPage() {
  const params = useParams();
  const partnerId = params.slug as string;

  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPartner() {
      try {
        const response = await fetch(`${API_BASE_URL}/partner/public?pageSize=100`);
        const result = await response.json();
        const partners: Partner[] = result?.data?.data || [];
        const found = partners.find((p) => String(p.id) === String(partnerId));
        if (found) {
          setPartner(found);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (partnerId) {
      fetchPartner();
    }
  }, [partnerId]);

  if (loading) {
    return (
      <>
        <SiteHeader variant="light" />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Yuklanmoqda...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (error || !partner) {
    return (
      <>
        <SiteHeader variant="light" />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Hamkor topilmadi</p>
          <Link href="/" className="text-primary hover:underline">
            Bosh sahifaga qaytish
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader variant="light" />

      <main className="min-h-screen ">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </Link>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-16">
          {/* Left: Content Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {partner.name}
            </h1>
            {partner.description && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {partner.description}
              </p>
            )}
            {partner.website && (
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-fit rounded-xl">
                  Hamkor haqida batafsil
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>

          {/* Right: Logo Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <Image
                src={getMediaUrl(partner.logo)}
                alt={partner.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Partnership Section */}
        <section className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hamkorlik haqida
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
              {`Bizning hamkorligimizda Maktab01 ta'lim platformasi talabalariga ${partner.name} — O'zbekiston va Qafqazdagi eng yirik moliyaviy institutlardan birida stajirovka o'tash imkoniyati beriladi.

Stajirovka talabalarga olgan bilimlarini amalda qo'llash, professional dasturlash muhitlarini o'zlashtirish va yuqori darajadagi IT-mutaxassislar jamoasida real biznes masalalarini hal qilishni o'rganish imkonini beradi.
Maktab01 uchun bu hamkorlik — ta'lim sifatining tasdig'i va bozor talablarining tan olinishi. Stajyorlar uchun — bu o'qishning yangi maqsadini ochish, professional o'sish va karyerani boshlash imkoniyati.
Biz ${partner.name} kabi kompaniyalar bilan hamkorlik IT-industriyaning kelajagini shakllantirishiga ishonamiz.`}
            </p>
          </div>

          {partner.website && (
            <div className="flex justify-center">
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-xl">
                  Hamkor haqida batafsil
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          )}
        </section>

        {/* Bottom Spacing */}
        <div className="h-12" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
