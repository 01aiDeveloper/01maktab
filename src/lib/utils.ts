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

export const baseMediaUrl =
  process.env.NEXT_PUBLIC_UPLOAD_URL ||
  process.env.REACT_APP_UPLOAD_URL ||
  'https://maktab01-dev-files.s3.eu-north-1.amazonaws.com';

// Joriy locale'ni NEXT_LOCALE cookie'dan o'qish (client). Default: 'uz'.
export const getClientLocale = (): string => {
  if (typeof document === 'undefined') return 'uz';
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : 'uz';
};

export const getMediaUrl = (path?: string): string => {
  if (path && !path.startsWith('http')) {
    return `${baseMediaUrl}/${path}`;
  } else if (path) {
    return path;
  }
  return '';
};
