import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';

interface ImageGroupBlockProps {
  images: string[];
}

export function ImageGroupBlock({ images }: ImageGroupBlockProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="w-full rounded-2xl overflow-hidden">
        <Image
          quality={100} src={getMediaUrl(images[0])}
          alt="Lesson image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="w-full rounded-2xl overflow-hidden">
          <Image
            quality={100} src={getMediaUrl(image)}
            alt={`Lesson image ${index + 1}`}
            width={0}
            height={0}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
