'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';

export type ResultMode = 'intermediate' | 'final-course' | 'skill';

interface TestResultModalProps {
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  isPassed: boolean;
  mode?: ResultMode;
  skillName?: string;
  skillIcon?: string;
  courseName?: string;
  claiming?: boolean;
  onContinue: () => void;
  onRetry: () => void;
  onClaim?: () => void;
}

export function TestResultModal({
  correctAnswers,
  totalQuestions,
  percentage,
  isPassed,
  mode = 'intermediate',
  skillName,
  skillIcon,
  courseName,
  claiming = false,
  onContinue,
  onRetry,
  onClaim,
}: TestResultModalProps) {
  // ─── SKILL — full blue card with badge ─────────────────────────
  if (isPassed && mode === 'skill') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-blue-600 rounded-3xl p-10 w-full max-w-sm text-center shadow-2xl text-white">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/40 backdrop-blur-sm flex items-center justify-center">
              {skillIcon ? (
                <Image src={getMediaUrl(skillIcon)} alt="" width={48} height={48} className="object-contain" />
              ) : (
                <Image src="/icons/confetti.svg" alt="" width={44} height={44} />
              )}
            </div>
          </div>

          {skillName && (
            <div className="text-2xl font-bold mb-3">{skillName}</div>
          )}

          <h2 className="text-2xl font-bold mb-2">Tabriklaymiz!</h2>
          <p className="text-sm text-white/80 mb-8 leading-relaxed">
            Siz skillni yakunladingiz va endi siz
            {skillName ? ` ${skillName}` : ''} ustasi. Iltimos, yutug'ingizni oching.
          </p>

          <button
            onClick={onClaim}
            disabled={claiming}
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-white text-gray-900 font-medium text-sm transition-colors hover:bg-gray-100 disabled:opacity-60"
          >
            {claiming ? 'Yuklanmoqda...' : 'Ochish'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ─── DEFAULT — white card (intermediate / final-course / failed) ─
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm text-center shadow-2xl">
        {isPassed ? (
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shrink-0">
              <Image src="/icons/confetti.svg" alt="" width={36} height={36} />
            </div>
            <div className="text-5xl font-bold text-blue-500">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center">
                <Image src="/icons/sad.svg" alt="" width={36} height={36} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              Balingiz: {correctAnswers}/{totalQuestions}
            </div>
          </>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {isPassed ? 'Tabriklaymiz!' : "Qayta urinib ko'ring"}
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          {!isPassed && `Siz ${percentage}% to'pladingiz. O'tish uchun ko'proq kerak. Iltimos testni qaytadan toping.`}
          {isPassed && mode === 'final-course' && (
            <>
              Siz yakuniy testdan o'tdingiz va
              {courseName ? ` ${courseName}` : ''} kursini yakunladingiz.
              Iltimos, professional sertifikatingizni oling.
            </>
          )}
          {isPassed && mode === 'intermediate' && (
            <>Siz {percentage}% to'pladingiz va testdan muvaffaqiyatli o'tdingiz. O'qishni davom ettirishingiz mumkin.</>
          )}
        </p>

        {!isPassed && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
          >
            Boshlash
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {isPassed && mode === 'intermediate' && (
          <button
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
          >
            Davom etish
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {isPassed && mode === 'final-course' && (
          <button
            onClick={onClaim}
            disabled={claiming}
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors disabled:opacity-60"
          >
            {claiming ? 'Yuklanmoqda...' : 'Olib ketish'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
