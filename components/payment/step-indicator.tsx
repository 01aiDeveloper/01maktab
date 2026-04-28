import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 2 }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#3B5BFF] text-white shadow-lg shadow-blue-500/30'
                  : isCompleted
                    ? 'bg-[#3B5BFF] text-white'
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" strokeWidth={3} /> : step}
            </div>

            {/* Connector Dots */}
            {step < totalSteps && (
              <div className="flex items-center gap-[5px] mx-2">
                <div className={`w-[5px] h-[5px] rounded-full ${step < currentStep ? 'bg-[#3B5BFF]/40' : 'bg-gray-200'}`} />
                <div className={`w-[5px] h-[5px] rounded-full ${step < currentStep ? 'bg-[#3B5BFF]/40' : 'bg-gray-200'}`} />
                <div className={`w-[5px] h-[5px] rounded-full ${step < currentStep ? 'bg-[#3B5BFF]/40' : 'bg-gray-200'}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
