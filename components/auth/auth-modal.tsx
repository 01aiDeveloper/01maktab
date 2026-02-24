'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProfileSetup } from './profile-setup';
import { Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AuthModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<'INITIAL' | 'OTP' | 'PROFILE'>('INITIAL');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpSubmit = () => {
    setStep('PROFILE');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-8 md:p-12 rounded-[40px] border-none">
        {step === 'PROFILE' ? (
          <ProfileSetup isModal onBack={() => setStep('OTP')} onComplete={() => onOpenChange(false)} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">01AI</h1>
            </div>

            {step === 'INITIAL' ? (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-6 text-center w-full">
                  {method === 'phone' ? 'Telefon orqali kirish' : 'Pochta orqali kirish'}
                </h2>
                <div className="w-full bg-gray-100 rounded-xl p-1 flex mb-8">
                  <button
                    onClick={() => setMethod('phone')}
                    className={cn(
                      'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                      method === 'phone' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    )}
                  >
                    Telefon
                  </button>
                  <button
                    onClick={() => setMethod('email')}
                    className={cn(
                      'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                      method === 'email' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                    )}
                  >
                    Pochta
                  </button>
                </div>
                <Button
                  onClick={() => setStep('OTP')}
                  className="w-full bg-gray-200 text-gray-600 hover:bg-gray-300 py-6 rounded-2xl shadow-none"
                >
                  Kirish
                </Button>
                <div className="w-full mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Tez kirish</span>
                    <div className="h-px bg-gray-100 flex-1" />
                  </div>
                  <button className="w-full bg-[#54A9EB] text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-3">
                    <Send className="w-5 h-5 fill-current" />
                    Telegram bilan kirish
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Telefon raqamini tasdiqlang</h2>
                <div className="flex gap-2 mb-8 mt-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-12 border border-gray-200 rounded-xl flex items-center justify-center font-bold text-xl"
                    ></div>
                  ))}
                </div>
                <Button onClick={handleOtpSubmit} className="w-full py-6 rounded-2xl bg-gray-900 text-white flex gap-2">
                  Keyingisi <ArrowRight className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
