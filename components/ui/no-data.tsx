import { cn } from '@/lib/utils';

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function NoData({
  title = "Ma'lumot topilmadi",
  description,
  icon,
  className,
}: NoDataProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 text-center',
        className,
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl mb-1">
        {icon ?? '📭'}
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {description && (
        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">{description}</p>
      )}
    </div>
  );
}
