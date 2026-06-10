import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Inline font-weight/font-family/font-size HTML ichida `!important` bilan kelsa,
// CSS class yenga olmaydi — shu yerda olib tashlaymiz, dizayn stillari qo'llanishi uchun.
export function stripInlineFont(html?: string): string {
  if (!html) return '';
  return html.replace(/font-(weight|family|size)\s*:\s*[^;"']*;?/gi, '');
}

export const baseMediaUrl = 'https://maktab01-dev-files.s3.eu-north-1.amazonaws.com';

export const getMediaUrl = (path?: string): string => {
  if (path && !path.startsWith('http')) {
    return `${baseMediaUrl}/${path}`;
  } else if (path) {
    return path;
  }
  return '';
};
