"use client";

import DOMPurify from "isomorphic-dompurify";

interface HtmlBlockProps {
  html: string;
}

export function HtmlBlock({ html }: HtmlBlockProps) {
  const sanitized = DOMPurify.sanitize(html);

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-suisse prose-headings:font-bold prose-headings:text-[#18181A] prose-headings:text-xl prose-headings:lg:text-2xl prose-headings:leading-tight prose-headings:tracking-[-0.02em] prose-headings:mb-4 prose-p:text-gray-600 prose-p:text-base prose-p:lg:text-lg prose-p:leading-relaxed prose-strong:text-[#18181A] prose-strong:font-semibold"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
