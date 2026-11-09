import type { Lang } from '../content/types';

/** Local calendar date as YYYY-MM-DD. */
export function dateKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + delta));
}

/** Days since a fixed epoch: used to rotate the ayah of the day. */
export function dayNumber(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

const locale = (lang: Lang) => (lang === 'ur' ? 'ur-PK' : 'en-GB');

export function formatDate(lang: Lang, d = new Date()): string {
  return d.toLocaleDateString(locale(lang), { weekday: 'long', day: 'numeric', month: 'long' });
}

/** Hijri date (Umm al-Qura). Returns '' where the calendar isn't supported. */
export function formatHijri(lang: Lang, d = new Date()): string {
  try {
    return new Intl.DateTimeFormat(`${locale(lang)}-u-ca-islamic-umalqura`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return '';
  }
}
