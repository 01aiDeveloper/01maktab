import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';

interface SingleImageBlockProps {
  url: string;
}

export function SingleImageBlock({ url }: SingleImageBlockProps) {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm">
      <Image src={getMediaUrl(url)} alt="Lesson image" fill className="object-cover" />
    </div>
  );
}
