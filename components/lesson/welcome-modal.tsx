'use client';

import { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenLessonWelcome');

    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenLessonWelcome', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">
            Поздравляем!
          </h2>

          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            Для вас открыта возможность просмотра бесплатных пробных уроков
          </p>

          <Button
            size="lg"
            onClick={handleClose}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            Начать
          </Button>
        </div>
      </div>
    </div>
  );
}
