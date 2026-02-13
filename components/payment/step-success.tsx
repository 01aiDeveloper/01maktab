import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { StepIndicator } from './step-indicator';

interface StepSuccessProps {
  courseId: string;
}

export function StepSuccess({ courseId }: StepSuccessProps) {
  return (
    <>
      <StepIndicator currentStep={3} />

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#3B5BFF] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-3">
        To&apos;lov muvaffaqiyatli!
      </h2>

      <p className="text-gray-500 text-sm text-center mb-8 max-w-xs mx-auto leading-relaxed">
        Siz endi to&apos;liq kursga kirishingiz mumkin. Barcha darslar va materiallar ochiq
      </p>

      <div className="flex justify-center">
        <Link
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#3B5BFF] hover:bg-[#2d4ae6] text-white font-medium text-sm transition-colors"
        >
          Kursni boshlash
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
