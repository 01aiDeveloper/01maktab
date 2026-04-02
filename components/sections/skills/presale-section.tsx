'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MainButton } from '@/components/ui/main-button';
import { useAuthStore } from '@/store/auth-store';
import api from '@/lib/api';

interface PresaleSectionProps {
  variant?: 'light' | 'dark';
  isPurchased?: boolean;
  courseId?: number;
  promocodeId?: number;
  onCabinetClick?: () => void;
}

const SPOTS_LEFT = 50;
const ORIGINAL_PRICE = 5_000_000;
const PRESALE_PRICE = 2_500_000;

function formatPrice(price: number) {
  return price.toLocaleString('uz-UZ').replace(/,/g, ' ');
}

interface ClickResponse {
  statusCode: number;
  data: { link: string };
}

export function PresaleSection({ variant = 'light', isPurchased = false, courseId, promocodeId, onCabinetClick }: PresaleSectionProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

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

      const res = await api.post<ClickResponse>('/click/course', body);
      const link = res.data.data.link;
      window.open(link, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback to payment page
      router.push(`/payment/${courseId}?courseType=course`);
    } finally {
      setLoading(false);
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
          className="relative overflow-hidden rounded-[29px] lg:rounded-[40px] p-6 pb-28 sm:pb-6 lg:p-8 lg:pr-48"
          style={{ background: 'linear-gradient(93.13deg, #CAE25B -36.46%, #00DB30 102.2%)' }}
        >
          {/* Content */}
          <div className="relative z-10 space-y-3 flex flex-col items-center sm:items-start">
            {/* Spots badge */}
            <div className="inline-flex items-center gap-2 bg-white/100 backdrop-blur-sm rounded-full px-4 py-2 text-black/100 text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>{SPOTS_LEFT} kishi allaqachon yozilgan</span>
            </div>

            {/* Price row */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 flex-wrap">
              <span className="text-white/100 line-through decoration-red-500 decoration-2 text-lg lg:text-2xl font-bold italic">
                {formatPrice(ORIGINAL_PRICE)} so&apos;m
              </span>
              <span className="text-white text-2xl sm:hidden">↓</span>
              <span className="text-white hidden sm:inline text-4xl">⟶</span>
              <span className="bg-[#FFE500] text-black font-suisse text-3xl lg:text-5xl font-bold tracking-tight rounded-full px-6 py-1 lg:px-8 lg:py-2">
                {formatPrice(PRESALE_PRICE)} so&apos;m
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
              {isPurchased ? (
                <>
                  <MainButton
                    variant="gradient"
                    size="md"
                    className="rounded-xl flex flex-row items-center text-sm opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Sotib olingan
                  </MainButton>
                  <MainButton
                    variant="outline-white"
                    size="md"
                    className="rounded-xl text-sm border-white hover:bg-white hover:text-green-600"
                    onClick={onCabinetClick}
                  >
                    Kabinetga o&apos;tish
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
                    {loading ? 'Yuklanmoqda...' : `Oldindan yozilish – ${formatPrice(PRESALE_PRICE)} so'm`}
                    {!loading && <ArrowRight className="w-4 h-4 inline ml-1" />}
                  </MainButton>
                  <MainButton
                    variant="outline-white"
                    size="md"
                    className="rounded-xl text-sm border-white hover:bg-white hover:text-green-600"
                  >
                    Kutish ro&apos;yxatiga kirish
                    <ArrowRight className="w-4 h-4 inline ml-1" />
                  </MainButton>
                </>
              )}
            </div>
          </div>

          {/* Presale badge image — right corner */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 sm:bottom-[-20px] lg:bottom-[-53px] w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 z-10">
            <Image
              src="/images/presale-badge.png"
              alt="Chegirma -50%"
              width={176}
              height={176}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}