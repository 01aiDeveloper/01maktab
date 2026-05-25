'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { StepIndicator } from '@/components/payment/step-indicator';
import { cn } from '@/lib/utils';
import type { MarketProduct, ProductColor } from '@/types/market';

interface CheckoutStepPaymentProps {
  product: MarketProduct;
  selectedColor?: ProductColor;
  selectedSize: string;
  payment: string;
  onNext: () => void;
  onBack: () => void;
}

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentProvider = 'click' | 'payme' | 'uzum';

function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function CheckoutStepPayment({
  product,
  selectedColor,
  selectedSize,
  payment,
  onNext,
  onBack,
}: CheckoutStepPaymentProps) {
  const [delivery, setDelivery] = useState<DeliveryMethod>('delivery');
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('click');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCoin = payment === 'coin';
  const price = isCoin ? product.priceCoin : product.priceSum;

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: integrate real market payment API
      onNext();
    } catch {
      setError("To'lov amalga oshmadi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = isCoin
    ? `Списать ${formatPrice(price)} «01»`
    : "To'lovga o'tish";

  return (
    <>
      <StepIndicator currentStep={2} />

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
        {isCoin
          ? "2-qadam: To\u2018lov yechib olinishi tasdiqlanishi"
          : "2-qadam: To\u2018lov usulini tanlang"}
      </h2>

      {/* Product Summary — flat layout (no border card) */}
      <div className="flex gap-5 mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            {isCoin ? (
              <Image quality={95} src="/images/market/VC.webp" alt="VC" width={18} height={24} className="w-5 h-6" />
            ) : (
              <span className="text-lg sm:text-xl font-bold text-gray-900">сум</span>
            )}
          </div>

          {/* Color & Size */}
          <div className="flex items-start gap-6 mt-4">
            {selectedColor && (
              <div>
                <span className="block text-sm text-gray-500 mb-1.5">Цвет</span>
                <span
                  className="block w-8 h-8 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedColor.hex }}
                />
              </div>
            )}
            {selectedSize && (
              <div>
                <span className="block text-sm text-gray-500 mb-1.5">Размер</span>
                <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-gray-100 text-sm font-medium text-gray-500">
                  {selectedSize}
                </span>
              </div>
            )}
          </div>

          {/* Delivery Method */}
          <div className="mt-5">
            <span className="block text-sm text-gray-500 mb-2">Способ получения</span>
            <div className="inline-flex gap-1 p-1 rounded-xl bg-neutral-100">
              {([
                { key: 'delivery' as DeliveryMethod, label: 'Доставка' },
                { key: 'pickup' as DeliveryMethod, label: 'Самовывоз' },
              ]).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDelivery(key)}
                  className={cn(
                    'h-9 px-4 rounded-lg text-sm font-medium transition-all',
                    delivery === key
                      ? 'bg-white text-gray-900 shadow-sm border border-neutral-200'
                      : 'text-gray-400 hover:text-gray-600',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Image — 244x238 per Figma */}
        {product.images[0] && (
          <div className="w-[122px] h-[119px] sm:w-[244px] sm:h-[238px] rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              quality={95} src={product.images[0]}
              alt={product.title}
              width={244}
              height={238}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Payment Providers — only for sum */}
      {!isCoin && (
        <>
          <h3 className="text-center text-base md:text-2xl font-bold text-gray-900 mb-3">To&apos;lov usuli</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {(['click', 'payme', 'uzum'] as PaymentProvider[]).map((provider) => (
              <button
                key={provider}
                onClick={() => setPaymentProvider(provider)}
                className={cn(
                  'flex items-center justify-center h-16 rounded-2xl border-2 transition-all',
                  paymentProvider === provider
                    ? 'border-[#3B5BFF] bg-blue-50/40 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200',
                )}
              >
                <Image
                  quality={95} src={`/icons/payment/${provider}.svg`}
                  alt={provider}
                  width={72}
                  height={28}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium text-sm transition-colors disabled:opacity-50"
        >
          Orqaga
        </button>
        <button
          onClick={handlePay}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Yuklanmoqda...
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </>
  );
}
