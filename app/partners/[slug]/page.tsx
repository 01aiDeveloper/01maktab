'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { getMediaUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Partner } from '@/types/api.types';
import { ImageGroupGallery } from '@/components/story/image-group-gallery';
import { useSmartBack } from '@/hooks/use-smart-back';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://app-dev.01ai.uz/api/v1';

/** Extract all image URLs from ContentBlock[] */
function extractBlockImages(blocks: unknown): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  const images: string[] = [];
  for (const b of blocks) {
    if (!b || typeof b !== 'object') continue;
    if (b.type === 'image' && b.url) images.push(b.url);
    if (b.type === 'image_group' && Array.isArray(b.images)) {
      images.push(...b.images.filter(Boolean));
    }
  }
  return images;
}

/** Extract all text values from ContentBlock[] sorted by order */
function extractBlockTexts(blocks: unknown): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b && typeof b === 'object' && b.type === 'text' && b.value)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((b) => b.value as string);
}

export default function PartnerPage() {
  const t = useTranslations('partnerPage');
  const params = useParams();
  const partnerId = params.slug as string;
  const goBack = useSmartBack('/');

  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPartner() {
      try {
        const response = await fetch(`${API_BASE_URL}/partner/${partnerId}`);
        if (!response.ok) {
          setError(true);
          return;
        }
        const result = await response.json();
        const data = result?.data;
        if (data) {
          setPartner(data);
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
          <div className="animate-pulse text-muted-foreground">{t('loading')}</div>
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
          <p className="text-muted-foreground">{t('notFound')}</p>
          <Link href="/" className="text-primary hover:underline">
            {t('backHome')}
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
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-16">
          {/* Image or Logo Card — first on mobile */}
          <div className="relative bg-white rounded-3xl p-8 md:p-12 flex items-center justify-center order-1 lg:order-2">
            {/* Orqaga — mobile: overlay on image */}
            <button
              type="button"
              onClick={goBack}
              className="lg:hidden absolute top-4 left-4 z-10 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </button>
            {partner.image ? (
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={getMediaUrl(partner.image)}
                  alt={partner.name}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src={getMediaUrl(partner.logo)}
                  alt={partner.name}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>

          {/* Content Card — second on mobile */}
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-center order-2 lg:order-1">
            {/* Orqaga — desktop: inside content card */}
            <button
              type="button"
              onClick={goBack}
              className="hidden lg:inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm cursor-pointer w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </button>
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
                <button className="inline-flex items-center justify-between w-[321px] max-w-full h-[54px] rounded-[10px] px-4 py-[15px] bg-[#3b66f5] hover:bg-[#2d52d1] text-white transition-colors" style={{ fontWeight: 450, fontSize: '20px', lineHeight: '16px' }}>
                  <span>{t('moreAbout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            )}
          </div>
        </section>

        {/* About Partnership Section */}
        <section className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('aboutPartnership')}
            </h2>
            {(() => {
              const textBlocks = extractBlockTexts(partner.blocks);
              if (textBlocks.length > 0) {
                return textBlocks.map((text, idx) => (
                  <p key={idx} className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line mb-4 last:mb-0">
                    {text}
                  </p>
                ));
              }
              return (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {partner.description}
                </p>
              );
            })()}
          </div>

          {/* Block Images — same layout as student stories */}
          {(() => {
            const blockImages = extractBlockImages(partner.blocks);
            if (blockImages.length === 0) return null;
            if (blockImages.length === 1) {
              return (
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6">
                  <Image
                    src={getMediaUrl(blockImages[0])}
                    alt={`${partner.name}`}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              );
            }
            return (
              <div className="mb-6">
                <ImageGroupGallery images={blockImages} />
              </div>
            );
          })()}

          {partner.website && (
            <div className="flex justify-center">
              <a href={partner.website} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center justify-between w-[321px] max-w-full h-[54px] rounded-[10px] px-4 py-[15px] bg-[#3b66f5] hover:bg-[#2d52d1] text-white transition-colors" style={{ fontWeight: 450, fontSize: '20px', lineHeight: '16px' }}>
                  <span>{t('moreAbout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
