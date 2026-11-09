export type Lang = 'en' | 'ur';
/** A piece of text in every supported language. */
export type L = Record<Lang, string>;

export interface Ayah {
  id: string;
  surah: number;
  from: number;
  to: number;
  surahName: { en: string; ar: string };
  ar: string;
  en: string;
  ur: string;
  tags: string[];
}

export interface Hadith {
  id: string;
  text: L;
  /** Collection + number, sunnah.com numbering. */
  source: L;
  /** Grading as given on sunnah.com. */
  grade: L;
}

export interface Station {
  id: string;
  icon: string;
  title: L;
  tagline: L;
  reflection: L;
  items: L[];
  tip: L;
  ayahId: string;
  hadithId: string;
}

export interface DailyItem {
  id: string;
  title: L;
  tagline: L;
}
