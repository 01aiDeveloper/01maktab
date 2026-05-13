'use client';

import { X, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface LessonLockedModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function LessonLockedModal({
  open,
  onClose,
  title,
  description,
}: LessonLockedModalProps) {
  const t = useTranslations('lesson');
  if (!open) return null;
  const displayTitle = title ?? t('lockedTitle');
  const displayDescription = description ?? t('lockedDescription');

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={t('close')}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-3">{displayTitle}</h2>

          <p className="text-muted-foreground text-sm mb-7 leading-relaxed">{displayDescription}</p>

          <Button
            size="lg"
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t('lockedConfirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
