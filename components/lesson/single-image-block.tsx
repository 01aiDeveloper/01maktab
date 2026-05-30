import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';

interface SingleImageBlockProps {
  url: string;
}

export function SingleImageBlock({ url }: SingleImageBlockProps) {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-sm">
      <Image
        quality={100} src={getMediaUrl(url)}
        alt="Lesson image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
      />
    </div>
  );
}
