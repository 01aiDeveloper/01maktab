import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventBenefitsProps {
  benefits: string[];
}

export function EventBenefits({ benefits }: EventBenefitsProps) {
  return (
    <section className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-3xl p-8 lg:p-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
        Что получат участники
      </h2>

      <ul className="space-y-3 mb-8">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3 text-white/70">
            <span className="text-[#3B82F6] mt-1">•</span>
            <span className="text-base lg:text-lg leading-relaxed">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl px-8 h-12"
        >
          Участвовать
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
