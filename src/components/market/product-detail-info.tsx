'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSmartBack } from '@/hooks/use-smart-back';
import { ProductColorPicker } from './product-color-picker';
import { ProductSizePicker } from './product-size-picker';
import {
  ProductPaymentTabs,
  type PaymentMethod,
} from './product-payment-tabs';
import { cn } from '@/lib/utils';
import type { MarketProduct, ProductSize } from '@/types/market';

interface ProductDetailInfoProps {
  product: MarketProduct;
}

function formatSum(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const router = useRouter();
  const goBack = useSmartBack('/market');
  const sumAvailable = product.priceSum > 0;
  const coinAvailable = product.priceCoin > 0;
  const [colorId, setColorId] = useState<string | null>(
    product.colors[0]?.id ?? null,
  );
  const [size, setSize] = useState<ProductSize | null>(product.sizes[0] ?? null);
  const [payment, setPayment] = useState<PaymentMethod>(
    sumAvailable ? 'sum' : 'coin',
  );

  const canCheckout = useMemo(() => {
    if (!colorId || !size) return false;
    return true;
  }, [colorId, size]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6 lg:h-full">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-2 text-base text-neutral-700 hover:text-neutral-900 transition-colors w-fit font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Orqaga</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
          {product.title}
        </h1>
        <div className="mt-2 sm:mt-4 flex items-center gap-4 sm:gap-6 flex-wrap">
          {sumAvailable && (
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900">
              {formatSum(product.priceSum)} сум
            </span>
          )}
          {coinAvailable && (
            <span className="inline-flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900">
              {formatSum(product.priceCoin)}
              <Image quality={90} src="/images/market/VC.png" alt="VC" width={24} height={32} className="w-6 h-8 sm:w-7 sm:h-9" />
            </span>
          )}
        </div>
      </div>

      <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
        {product.description}
      </p>

      {product.colors.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-lg font-semibold text-neutral-900">Выберите цвет</h3>
          <ProductColorPicker
            colors={product.colors}
            value={colorId}
            onChange={setColorId}
          />
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-lg font-semibold text-neutral-900">Выберите размер</h3>
          <ProductSizePicker
            sizes={product.sizes}
            value={size}
            onChange={setSize}
          />
        </div>
      )}

      <ProductPaymentTabs
        value={payment}
        onChange={setPayment}
        sumAvailable={sumAvailable}
        coinAvailable={coinAvailable}
      />

      <button
        type="button"
        disabled={!canCheckout}
        onClick={() => {
          if (!canCheckout) return;
          const params = new URLSearchParams({
            step: '1',
            colorId: colorId ?? '',
            size: size ?? '',
            payment,
          });
          router.push(`/market/${product.id}/checkout?${params.toString()}`);
        }}
        className={cn(
          'w-full sm:w-fit sm:min-w-[260px] h-12 sm:h-14 px-6 sm:px-7 rounded-2xl text-sm sm:text-base font-semibold text-white inline-flex items-center justify-center gap-3 transition-all',
          canCheckout
            ? 'bg-[#3B5BFF] hover:bg-[#2A4AE5]'
            : 'bg-neutral-300 cursor-not-allowed',
        )}
      >
        Оформить заказ
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
