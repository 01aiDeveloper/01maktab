"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";

interface ImageGroupGalleryProps {
  images: string[];
}

export function ImageGroupGallery({ images }: ImageGroupGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  return (
    <>
      {/* Gallery Grid — alternating rows: odd [60/40], even [40/60] */}
      <div className="flex flex-col gap-3 lg:gap-4">
        {Array.from({ length: Math.ceil(images.length / 2) }).map((_, rowIndex) => {
          const i = rowIndex * 2;
          const isEvenRow = rowIndex % 2 === 0;
          const cols = isEvenRow ? "md:grid-cols-[1.5fr_1fr]" : "md:grid-cols-[1fr_1.5fr]";

          return (
            <div key={rowIndex} className={`grid grid-cols-1 ${cols} gap-3 lg:gap-4`}>
              {images[i] && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-[200px] lg:h-[300px] rounded-[20px] lg:rounded-[24px] overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    quality={95} src={getMediaUrl(images[i])}
                    alt={`Gallery image ${i + 1}`}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
              {images[i + 1] && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-[200px] lg:h-[300px] rounded-[20px] lg:rounded-[24px] overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openLightbox(i + 1)}
                >
                  <Image
                    quality={95} src={getMediaUrl(images[i + 1])}
                    alt={`Gallery image ${i + 2}`}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                quality={95} src={getMediaUrl(images[currentIndex])}
                alt={`Image ${currentIndex + 1}`}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
