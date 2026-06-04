'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryLightboxProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function ProductGalleryLightbox({
  open,
  onClose,
  images,
  initialIndex = 0,
}: ProductGalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setZoom(1);
    }
  }, [open, initialIndex]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
    setZoom(1);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, next, prev]);

  const current = images[index];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="!max-w-none w-screen h-screen p-0 m-0 rounded-none border-0 bg-black/60 sm:!max-w-none flex flex-col"
      >
        <DialogTitle className="sr-only">Gallereya ko&apos;rish</DialogTitle>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {/* Minimize button — top-right of image */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="absolute top-4 right-4 z-50 w-9 h-9 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>

          {/* Navigation arrows — outlined circles */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Oldingi"
                className="absolute left-4 z-40 w-11 h-11 rounded-full border border-white/30 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Keyingi"
                className="absolute right-4 z-40 w-11 h-11 rounded-full border border-white/30 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {current && (
            <div
              className="relative w-[60vw] h-[75vh] transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              <Image
                quality={90} src={current}
                alt={`Image ${index + 1}`}
                fill
                sizes="60vw"
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Zoom controls — bottom center of image */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 bg-white/20 backdrop-blur-md rounded-full p-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
              aria-label="Zoom in"
              className="w-9 h-9 rounded-full text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ZoomIn className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
              aria-label="Zoom out"
              className="w-9 h-9 rounded-full text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ZoomOut className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="relative z-40 px-4 pb-4 pt-2 flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => {
                setIndex(i);
                setZoom(1);
              }}
              className={cn(
                'relative w-[100px] h-[72px] rounded-xl overflow-hidden transition-all shrink-0',
                i === index
                  ? 'ring-2 ring-white'
                  : 'opacity-50 hover:opacity-80',
              )}
            >
              <Image quality={90} src={src} alt="" fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
