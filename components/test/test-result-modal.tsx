'use client';

import Image from 'next/image';

interface TestResultModalProps {
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  isPassed: boolean;
  onContinue: () => void;
  onRetry: () => void;
}

export function TestResultModal({
  correctAnswers,
  totalQuestions,
  percentage,
  isPassed,
  onContinue,
  onRetry,
}: TestResultModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm text-center shadow-2xl mx-4">
        {isPassed ? (
          /* O'tgan: icon + ball yonma-yon */
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shrink-0">
              <Image src="/icons/confetti.svg" alt="" width={36} height={36} />
            </div>
            <div className="text-5xl font-bold text-blue-500">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>
        ) : (
          /* O'tmagan: icon ustida, ball katta */
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center">
                <Image src="/icons/sad.svg" alt="" width={36} height={36} />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              Balingiz: {correctAnswers}/{totalQuestions}
            </div>
          </>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {isPassed ? 'Tabriklaymiz!' : 'Qayta urinib ko\'ring'}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          {isPassed
            ? `Siz ${percentage}% to'pladingiz va testdan muvaffaqiyatli o'tdingiz.`
            : `Siz ${percentage}% to'pladingiz. O'tish uchun ko'proq kerak.`}
        </p>

        {isPassed ? (
          <button
            onClick={onContinue}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
          >
            Davom etish →
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
          >
            Boshlash →
          </button>
        )}
      </div>
    </div>
  );
}
