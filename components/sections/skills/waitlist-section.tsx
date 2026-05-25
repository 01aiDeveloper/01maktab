'use client';

import { ArrowRight, Users, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MainButton } from '@/components/ui/main-button';
import { useAuthStore } from '@/store/auth-store';
import { usePresale } from '@/hooks/use-presale';
import { useJoinWaitlist } from '@/hooks/use-waitlist';

interface WaitlistSectionProps {
  courseId?: number;
  enrollmentCount?: number;
  enabled?: boolean;
}

export function WaitlistSection({ courseId, enrollmentCount = 0, enabled }: WaitlistSectionProps) {
  const t = useTranslations('waitlist');
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: presale, isLoading: presaleLoading } = usePresale(enabled ? courseId : undefined);
  const joinWaitlist = useJoinWaitlist();

  if (!enabled) return null;
  if (presaleLoading || presale) return null;

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
          className="relative overflow-hidden rounded-[29px] lg:rounded-[40px] p-6 sm:pb-6 lg:p-8 lg:pr-56"
          style={{
            background: 'linear-gradient(135deg, #3B5BFF 0%, #2A51E6 100%)',
          }}
        >
          <div className="relative  z-10 space-y-3 flex flex-col items-center sm:items-start">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              {enrollmentCount > 0 && (
                <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-white text-sm font-medium">
                  <Users className="w-4 h-4" />
                  <span>{t('alreadyEnrolled', { count: enrollmentCount })}</span>
                </div>
              )}
              <div className="inline-flex items-center gap-1.5 bg-[#22c55e] rounded-full px-3 py-2 text-white text-sm font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{t('free')}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-2 text-white text-sm font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{t('notification')}</span>
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-white font-suisse text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {t('discountTitle')}
            </h3>

            {/* Button */}
            <div className="pt-2">
              <MainButton
                variant="white"
                size="md"
                className="rounded-xl flex flex-row items-center text-sm"
                onClick={handleWaitlist}
                disabled={joinWaitlist.isPending}
              >
                {joinWaitlist.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                )}
                {t('joinWaitlist')}
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </MainButton>
            </div>
          </div>

          {/* Discount badge image — bottom-right */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 lg:right-6 z-10">
            <Image
              quality={95} src="/images/skills/maxsusTaklif.png"
              alt="Chegirma"
              width={220}
              height={220}
              className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
