'use client';

import { useState } from 'react';
import { ArrowRight, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MainButton } from '@/components/ui/main-button';
import { useAuthStore } from '@/store/auth-store';
import { usePresale } from '@/hooks/use-presale';
import { useJoinWaitlist } from '@/hooks/use-waitlist';
import api from '@/lib/api';

interface PresaleSectionProps {
  isPurchased?: boolean;
  courseId?: number;
  courseType?: 'skill' | 'course' | 'profession';
  promocodeId?: number;
  onCabinetClick?: () => void;
}

function formatPrice(price: number) {
  return price.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

import type { ApiResponse, ApiPaymentResponse } from '@/types/api';

function DiscountBadge() {
  return (
    <Image
      src="/images/skills/maxsusTaklif.png"
      alt="Maxsus taklif"
      width={160}
      height={160}
      className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 object-contain"
    />
  );
}

export function PresaleSection({
  isPurchased = false,
  courseId,
  courseType = 'skill',
  promocodeId,
  onCabinetClick,
}: PresaleSectionProps) {
  const t = useTranslations('presale');
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { data: presale, isLoading: presaleLoading } = usePresale(courseId);
  const joinWaitlist = useJoinWaitlist();

  if (presaleLoading || !presale || !presale.isActive) return null;

  const { originalPrice, presalePrice, discountPercent, enrolledCount } = presale;

  const handlePresale = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!courseId) return;

    setLoading(true);
    try {
      const body: { courseId: number; promocodeId?: number } = { courseId };
      if (promocodeId) body.promocodeId = promocodeId;

      const res = await api.post<ApiResponse<ApiPaymentResponse>>('/click/course', body);
      const data = res.data.data;
      if (data.free) {
        router.push(`/classroom?welcome=${courseId}`);
        return;
      }
      const link = data.link.startsWith('http')
        ? data.link
        : `https://my.click.uz/services/pay/${data.link}`;
      window.location.href = link;
    } catch {
      router.push(
        `/payment/${courseId}?courseType=${courseType}&discountedPrice=${presalePrice}&discountPercent=${discountPercent}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWaitlist = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!courseId) return;
    try {
      await joinWaitlist.mutateAsync(courseId);
      router.push('/classroom');
    } catch {
      // Already in waitlist or error
    }
  };

  return (
    <section className="w-full py-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[29px] lg:rounded-[40px] p-6 pb-36 sm:pb-6 lg:p-8 lg:pr-56"
          style={{
            background:
              'linear-gradient(93.13deg, #CAE25B -36.46%, #00DB30 102.2%)',
          }}
        >
          <div className="relative z-10 space-y-3 flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-black text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>{t('alreadyEnrolled', { count: enrolledCount })}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 flex-wrap">
              <span className="text-white line-through decoration-red-500 decoration-2 text-lg lg:text-2xl font-bold italic">
                {formatPrice(originalPrice)} {t('currencySom')}
              </span>
              <span className="text-white text-2xl sm:hidden">&darr;</span>
              <span className="text-white hidden sm:inline text-4xl">
                &rarr;
              </span>
              <span className="bg-[#FFE500] text-black font-suisse text-3xl lg:text-5xl font-bold tracking-tight rounded-full px-6 py-1 lg:px-8 lg:py-2">
                {formatPrice(presalePrice)} {t('currencySom')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
              {isPurchased ? (
                <>
                  <MainButton
                    variant="gradient"
                    size="md"
                    className="rounded-xl flex flex-row items-center text-sm opacity-50 cursor-not-allowed"
                    disabled
                  >
                    {t('bought')}
                  </MainButton>
                  <MainButton
                    variant="outline-white"
                    size="md"
                    className="rounded-xl text-sm border-white hover:bg-white hover:text-green-600"
                    onClick={onCabinetClick}
                  >
                    {t('goToCabinet')}
                    <ArrowRight className="w-4 h-4 inline ml-1" />
                  </MainButton>
                </>
              ) : (
                <>
                  <MainButton
                    variant="gradient"
                    size="md"
                    className="rounded-xl flex flex-row items-center text-sm"
                    onClick={handlePresale}
                    disabled={loading}
                  >
                    {loading
                      ? t('loading')
                      : t('preEnrollPrice', { price: formatPrice(presalePrice) })}
                    {!loading && (
                      <ArrowRight className="w-4 h-4 inline ml-1" />
                    )}
                  </MainButton>
                  <MainButton
                    variant="outline-white"
                    size="md"
                    className="rounded-xl text-sm border-white hover:bg-white hover:text-green-600"
                    onClick={handleWaitlist}
                    disabled={joinWaitlist.isPending}
                  >
                    {joinWaitlist.isPending && (
                      <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                    )}
                    {t('joinWaitlist')}
                    <ArrowRight className="w-4 h-4 inline ml-1" />
                  </MainButton>
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 sm:bottom-4 lg:right-6 lg:bottom-6 z-10">
            <DiscountBadge />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
