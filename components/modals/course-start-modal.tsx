'use client';

import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MainButton } from '@/components/ui/main-button';

interface CourseStartModalProps {
  open: boolean;
  onClose: () => void;
  onStartCourse: () => void;
  courseName?: string;
}

export function CourseStartModal({
  open,
  onClose,
  onStartCourse,
  courseName,
}: CourseStartModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-sm rounded-[28px] border-none shadow-xl flex flex-col items-center text-center gap-5 py-10 px-8"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#3B5BFF] flex items-center justify-center shadow-lg shadow-blue-500/25">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7L8 5z" fill="white" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Kurs boshlandi!
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          Endi o&apos;rganishni boshlashingiz mumkin
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full mt-2">
          <MainButton
            variant="gradient"
            size="md"
            className="rounded-xl w-full flex flex-row items-center justify-center"
            onClick={onStartCourse}
          >
            Kursni boshlash
            <ArrowRight className="w-4 h-4 ml-2" />
          </MainButton>
          <MainButton
            variant="outline"
            size="md"
            className="rounded-xl w-full border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300"
            onClick={onClose}
          >
            Keyinroq
          </MainButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
