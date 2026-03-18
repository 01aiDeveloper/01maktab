'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'Code' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 bg-[#252525] border-b border-[#3a3a3a]">
        <span className="text-sm text-white/60 font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Nusxalandi
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Kodni nusxalash
            </>
          )}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto">
        <code className="text-sm text-white/90 font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
