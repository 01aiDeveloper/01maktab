import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PageErrorProps {
  title?: string;
  description?: string;
  /** Show a "Bosh sahifa" back link */
  showBack?: boolean;
  fullPage?: boolean;
  className?: string;
}

export function PageError({
  title = "Ma'lumot topilmadi",
  description = "Kechirasiz, bu sahifa mavjud emas yoki o'chirilgan.",
  showBack = true,
  fullPage = false,
  className,
}: PageErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 text-center',
        fullPage ? 'min-h-screen' : 'py-24',
        className,
      )}
    >
      {/* Illustration */}
      <div className="relative select-none">
        <span className="text-[96px] font-black text-gray-100 leading-none tracking-tighter">404</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="text-[40px]">🔍</span>
        </span>
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      {showBack && (
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B5BFF] text-white text-sm font-medium hover:bg-[#2f4de0] transition-colors"
        >
          Bosh sahifaga qaytish
        </Link>
      )}
    </div>
  );
}
