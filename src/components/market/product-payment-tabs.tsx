'use client';

import { cn } from '@/lib/utils';

export type PaymentMethod = 'sum' | 'coin';

interface ProductPaymentTabsProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  sumAvailable: boolean;
  coinAvailable: boolean;
}

export function ProductPaymentTabs({
  value,
  onChange,
  sumAvailable,
  coinAvailable,
}: ProductPaymentTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-neutral-100 w-fit">
      <button
        type="button"
        disabled={!sumAvailable}
        onClick={() => onChange('sum')}
        className={cn(
          'h-11 sm:h-14 px-5 sm:px-8 rounded-xl text-sm sm:text-base font-medium transition-all',
          value === 'sum'
            ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
            : 'text-neutral-400 hover:text-neutral-700',
          !sumAvailable && 'opacity-40 cursor-not-allowed',
        )}
      >
        Оплатить сумами
      </button>
      <button
        type="button"
        disabled={!coinAvailable}
        onClick={() => onChange('coin')}
        className={cn(
          'h-11 sm:h-14 px-5 sm:px-8 rounded-xl text-sm sm:text-base font-medium transition-all inline-flex items-center justify-center gap-1.5',
          value === 'coin'
            ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
            : 'text-neutral-400 hover:text-neutral-700',
          !coinAvailable && 'opacity-40 cursor-not-allowed',
        )}
      >
        Оплатить VC&apos;ами
      </button>
    </div>
  );
}
