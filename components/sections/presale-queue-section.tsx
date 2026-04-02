'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Bell, Clock, BarChart3, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ModuleAccordion } from '@/components/shared/module-accordion';
import type { ModuleItem } from '@/components/shared/module-accordion';

interface PresaleQueueSectionProps {
  /** Queue position number */
  queueNumber?: number;
  /** Course title */
  title?: string;
  /** Course image URL */
  courseImage?: string;
  /** Course duration label */
  duration?: string;
  /** Course price label */
  price?: string;
  /** Course difficulty level */
  level?: string;
  /** Partner name */
  partnerName?: string;
  /** Partner logo URL */
  partnerLogo?: string;
  /** Course modules for accordion */
  modules?: ModuleItem[];
  /** Back link href */
  backHref?: string;
}

export function PresaleQueueSection({
  queueNumber = 12,
  title = 'SQL: Ma\'lumotlar bazasi asoslari',
  courseImage = '',
  duration = '8 Soat',
  price = 'Bepul',
  level = 'Boshlang\'ich',
  partnerName = 'TBC BANK',
  partnerLogo = '',
  modules = [],
  backHref = '/classroom',
}: PresaleQueueSectionProps) {
  return (
    <div className="space-y-6">
      {/* Hero: two-column layout */}
      <section className="w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Queue info card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[29px] lg:rounded-[40px] p-6 lg:p-8 flex flex-col justify-between min-h-[300px] lg:min-h-[400px]"
              style={{ background: 'linear-gradient(93.13deg, #CAE25B -36.46%, #00DB30 102.2%)' }}
            >
              {/* Back link */}
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors w-fit mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Orqaga</span>
              </Link>

              {/* Title */}
              <h1 className="font-suisse text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                Siz kutish ro&apos;yxatidasiz
              </h1>

              <div className="space-y-3 mt-auto">
                {/* Queue number badge */}
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2.5 text-sm font-medium text-black">
                  <Users className="w-4 h-4" />
                  <span>Sizning kutish raqamingiz: {queueNumber}</span>
                </div>

                {/* Notification info */}
                <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-white">
                  <Bell className="w-4 h-4 shrink-0" />
                  <span>Telegram bot 01AI va email ga kurs statusi haqida sizga xabar keladi</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Course image card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="bg-gradient-to-br from-[#5d7bf5] via-[#5b6ef5] to-[#7c71f4] rounded-[29px] lg:rounded-[40px] overflow-hidden relative min-h-[300px] lg:min-h-[400px]"
            >
              {courseImage && (
                <Image
                  src={courseImage}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              )}

              {/* Top badges */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  Davomiylik: {duration}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <Banknote className="w-3.5 h-3.5 shrink-0" />
                  Narxi: {price}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-[119px]">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  Daraja: {level}
                </Badge>
              </div>

              {/* Bottom partner info */}
              {partnerName && (
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 z-10">
                  <span className="text-white/70 text-xs">Hamkorlikda yaratilgan:</span>
                  <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2">
                    {partnerLogo ? (
                      <Image src={partnerLogo} alt={partnerName} width={20} height={20} className="object-contain" />
                    ) : null}
                    <span className="text-black text-xs font-bold">{partnerName}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Module accordion */}
      {modules.length > 0 && (
        <section className="w-full">
          <div className="container mx-auto px-4">
            <ModuleAccordion
              variant="light"
              modules={modules}
              value=""
              onValueChange={() => {}}
            />
          </div>
        </section>
      )}
    </div>
  );
}
