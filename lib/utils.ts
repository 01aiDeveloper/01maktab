import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
