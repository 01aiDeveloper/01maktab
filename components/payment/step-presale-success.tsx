'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StepPresaleSuccessProps {
  courseName?: string;
}

export function StepPresaleSuccess({ courseName = 'Kurs' }: StepPresaleSuccessProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      {/* Checkmark icon */}
      <div className="w-16 h-16 bg-[#3B5BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
        <Check className="w-8 h-8 text-white" strokeWidth={3} />
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {courseName} kursi kabinetingizga qo&apos;shildi
      </h2>

      {/* Info badge */}
      <div className="bg-gray-100 rounded-2xl px-5 py-3 text-sm text-gray-600 leading-relaxed max-w-xs">
        Telegram bot 01AI va emailni ga kurs statusi haqida sizga xabar keladi
      </div>

      {/* CTA button */}
      <button
        onClick={() => router.push('/classroom')}
        className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors w-full justify-center"
      >
        Kabinetga o&apos;tish
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
