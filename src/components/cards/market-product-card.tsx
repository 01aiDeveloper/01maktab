'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/common/use-auth';
import type { MarketProduct, ProductStatus } from '@/types/market';

interface MarketProductCardProps {
  product: MarketProduct;
}

const statusClass: Record<ProductStatus, string> = {
  IN_STOCK: 'bg-[#1EBB4A] text-white',
  OUT_OF_STOCK: 'bg-neutral-200 text-neutral-600',
  COIN_ONLY: 'bg-neutral-900 text-white',
  SOON: 'bg-[#3B5BFF] text-white',
};

function formatSum(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

const CoinIcon = ({ className }: { className?: string }) => (
  <Image
    quality={90} src="/images/market/VC.png"
    alt="VC"
    width={30}
    height={40}
    className={cn('inline-block', className)}
  />
);

export function MarketProductCard({ product }: MarketProductCardProps) {
  const { user } = useAuth();
  const userCoins = user?.coins ?? 0;
  const isCoinOnly = product.status === 'COIN_ONLY';
  const insufficient = isCoinOnly && userCoins < product.priceCoin;
  const cover = product.images[0] ?? '/placeholder.svg';

  const statusLabel: Record<ProductStatus, React.ReactNode> = {
    IN_STOCK: 'В наличии',
    OUT_OF_STOCK: 'Нет в наличии',
    COIN_ONLY: (
      <span className="inline-flex items-center gap-1">
        Только за <CoinIcon className="w-4 h-5 sm:w-5 sm:h-7" />
      </span>
    ),
    SOON: 'Скоро',
  };

  return (
    <Link href={`/market/${product.id}`} className="block">
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="group relative overflow-hidden rounded-[20px] bg-neutral-100 aspect-[425/512] flex flex-col"
      >
        {/* Image fill */}
        <div className="absolute inset-0">
          <Image
            quality={90} src={cover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Top-left status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full sm:rounded-[12px] px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-[20px] font-semibold',
              statusClass[product.status],
            )}
          >
            {statusLabel[product.status]}
          </span>
        </div>

        {/* Top-right insufficient badge */}
        {insufficient && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full sm:rounded-[12px] bg-neutral-200/90 backdrop-blur px-2.5 sm:px-4 py-0.5 sm:py-1 text-[11px] sm:text-[20px] font-semibold text-neutral-600">
              Недостаточно <CoinIcon className="w-4 h-5 sm:w-5 sm:h-7" />
            </span>
          </div>
        )}

        {/* Bottom info panel */}
        <div className={cn(
          'mt-auto relative z-10 rounded-t-[25px] rounded-b-[20px] px-4 sm:px-5 py-4 sm:py-5 -mb-[4px] flex flex-col justify-between gap-2 min-h-[110px] sm:min-h-[131px]',
          isCoinOnly ? 'bg-neutral-900' : 'bg-white',
        )}>
          <div className="flex items-start justify-between gap-3">
            <h3 className={cn('text-base sm:text-2xl font-semibold truncate flex-1', isCoinOnly ? 'text-white' : 'text-neutral-900')}>
              {product.title}
            </h3>
            <ArrowUpRight className={cn('shrink-0 w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5', isCoinOnly ? 'text-neutral-400' : 'text-gray-400')} strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {product.priceSum > 0 && (
              <span className="text-neutral-400 text-lg sm:text-xl tracking-[-5%]">
                {formatSum(product.priceSum)} сум
              </span>
            )}
            {product.priceCoin > 0 && (
              <span className="inline-flex items-center gap-1.5 text-lg sm:text-xl text-neutral-400">
                {formatSum(product.priceCoin)}
                <CoinIcon className="w-6 h-8 sm:w-7 sm:h-9" />
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
