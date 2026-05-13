'use server';

import { cookies } from 'next/headers';

export type Locale = 'uz' | 'ru';
export const locales: Locale[] = ['uz', 'ru'];
export const defaultLocale: Locale = 'uz';
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return (locales.includes(value as Locale) ? value : defaultLocale) as Locale;
}

export async function setUserLocale(locale: Locale) {
  if (!locales.includes(locale)) return;
  const store = await cookies();
  store.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
