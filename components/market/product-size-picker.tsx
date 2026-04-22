'use client';

import { cn } from '@/lib/utils';
import type { ProductSize } from '@/types/market';

interface ProductSizePickerProps {
  sizes: ProductSize[];
  value: ProductSize | null;
  onChange: (size: ProductSize) => void;
}

export function ProductSizePicker({ sizes, value, onChange }: ProductSizePickerProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {sizes.map((size) => {
        const selected = size === value;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={selected}
            className={cn(
              'min-w-[48px] sm:min-w-[72px] h-9 sm:h-12 px-3 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-base font-semibold transition-all',
              selected
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700',
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
