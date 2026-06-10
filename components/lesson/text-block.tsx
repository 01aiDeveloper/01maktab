import DOMPurify from 'isomorphic-dompurify';
import { stripInlineFont } from '@/lib/utils';

interface TextBlockProps {
  html: string;
}

export function TextBlock({ html }: TextBlockProps) {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100">
      <div
        className="max-w-none text-[#18181A] [&_*]:text-[16px]! [&_*]:font-normal! [&_*]:leading-[21px]! [&_*]:tracking-[-0.8px]! [&_*]:text-[#18181A]! [&_strong]:font-semibold! [&_b]:font-semibold! [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: stripInlineFont(DOMPurify.sanitize(html)) }}
      />
    </div>
  );
}
