"use client";

import DOMPurify from "isomorphic-dompurify";

interface HtmlBlockProps {
  html: string;
}

export function HtmlBlock({ html }: HtmlBlockProps) {
  const sanitized = DOMPurify.sanitize(html);

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
