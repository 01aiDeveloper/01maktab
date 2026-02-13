import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';

interface ImageGroupBlockProps {
  images: string[];
}

export function ImageGroupBlock({ images }: ImageGroupBlockProps) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image src={getMediaUrl(images[0])} alt="Lesson image" fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-full aspect-video rounded-2xl overflow-hidden">
          <Image src={getMediaUrl(image)} alt={`Lesson image ${index + 1}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
