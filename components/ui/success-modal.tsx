'use client';

import { CheckIcon } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export function SuccessModal({ open, onClose, title, description }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={true}
        className="max-w-sm rounded-[20px] border-none shadow-xl flex flex-col items-center text-center gap-5 py-10 px-8"
      >
        <div className="w-14 h-14 rounded-full bg-[#3B5BFF] flex items-center justify-center">
          <CheckIcon className="w-7 h-7 text-white stroke-[2.5]" />
        </div>
        <p className="text-[28px] font-bold text-gray-900 leading-tight">{title}</p>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
