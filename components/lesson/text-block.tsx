import DOMPurify from 'isomorphic-dompurify';

interface TextBlockProps {
  html: string;
}

export function TextBlock({ html }: TextBlockProps) {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100">
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    </div>
  );
}
