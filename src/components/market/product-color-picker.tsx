'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductColor } from '@/types/market';

interface ProductColorPickerProps {
  colors: ProductColor[];
  value: string | null;
  onChange: (id: string) => void;
}

function isLight(hex: string) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

export function ProductColorPicker({ colors, value, onChange }: ProductColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => {
        const selected = color.id === value;
        const light = isLight(color.hex);
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            aria-label={color.name}
            aria-pressed={selected}
            className={cn(
              'relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all',
              light && 'ring-1 ring-neutral-200',
            )}
            style={{ backgroundColor: color.hex }}
          >
            {selected && (
              <Check
                className={cn('w-4 h-4 sm:w-5 sm:h-5', light ? 'text-neutral-900' : 'text-white')}
                strokeWidth={3}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
