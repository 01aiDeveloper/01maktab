'use client';

import { ArrowLeft, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventHeroProps {
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
  };
  onBack: () => void;
}

export function EventHero({ event, onBack }: EventHeroProps) {
  return (
    <section className="container mx-auto px-4 py-8 lg:py-12">
      <div
        className="relative rounded-[32px] overflow-hidden min-h-[500px] lg:min-h-[600px] flex flex-col justify-center p-8 lg:p-16"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #4a3f35 100%)',
        }}
      >
        {/* Background Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 lg:mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Orqaga</span>
          </button>

          {/* Center Content */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Date and Location Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-sm text-white">{event.date}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm text-white">{event.location}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8">
              {event.title}
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/80 mb-8 lg:mb-10 leading-relaxed">
              {event.description}
            </p>

            {/* CTA Button */}
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl px-8 py-6 h-auto text-base font-medium">
              Ishtirok etish
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
