import { CalculationMethod, Coordinates, HighLatitudeRule, Madhab, PrayerTimes, Qibla } from 'adhan';
import { urDigits } from '../content/ayat';
import type { L } from '../content/types';
import type { CalcMethod, PrayerLocation, PrayerSettings } from './store';

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export const PRAYER_ORDER: PrayerName[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

export const PRAYER_NAMES: Record<PrayerName, L> = {
  fajr: { en: 'Fajr', ur: 'فجر' },
  sunrise: { en: 'Sunrise', ur: 'طلوعِ آفتاب' },
  dhuhr: { en: 'Dhuhr', ur: 'ظہر' },
  asr: { en: 'Asr', ur: 'عصر' },
  maghrib: { en: 'Maghrib', ur: 'مغرب' },
  isha: { en: 'Isha', ur: 'عشاء' },
};

export const METHODS: { id: CalcMethod; name: L }[] = [
  { id: 'Karachi', name: { en: 'Karachi (University of Islamic Sciences)', ur: 'کراچی (جامعہ علوم اسلامیہ)' } },
  { id: 'MuslimWorldLeague', name: { en: 'Muslim World League', ur: 'رابطہ عالم اسلامی' } },
  { id: 'UmmAlQura', name: { en: 'Umm al-Qura (Makkah)', ur: 'ام القریٰ (مکہ)' } },
  { id: 'NorthAmerica', name: { en: 'ISNA (North America)', ur: 'اسنا (شمالی امریکہ)' } },
  { id: 'MoonsightingCommittee', name: { en: 'Moonsighting Committee (UK)', ur: 'مون سائٹنگ کمیٹی (برطانیہ)' } },
  { id: 'Egyptian', name: { en: 'Egyptian General Authority', ur: 'مصری جنرل اتھارٹی' } },
  { id: 'Dubai', name: { en: 'Dubai', ur: 'دبئی' } },
  { id: 'Qatar', name: { en: 'Qatar', ur: 'قطر' } },
  { id: 'Kuwait', name: { en: 'Kuwait', ur: 'کویت' } },
  { id: 'Turkey', name: { en: 'Diyanet (Türkiye)', ur: 'دیانت (ترکی)' } },
  { id: 'Singapore', name: { en: 'Singapore / Malaysia', ur: 'سنگاپور / ملائیشیا' } },
];

export type DayTimes = Record<PrayerName, Date>;

function params(s: PrayerSettings, coords: Coordinates) {
  const p = CalculationMethod[s.method]();
  p.madhab = s.madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  p.highLatitudeRule = HighLatitudeRule.recommended(coords);
  return p;
}

/** The calendar date (y, m, d) "now" in the location's time zone. */
function ymdIn(tz: string, d: Date): [number, number, number] {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  const [y, m, day] = parts.split('-').map(Number);
  return [y, m, day];
}

/** Prayer times for the location's calendar day containing `at`, offset by `dayOffset`. */
export function timesFor(s: PrayerSettings, loc: PrayerLocation, at = new Date(), dayOffset = 0): DayTimes {
  const coords = new Coordinates(loc.lat, loc.lng);
  const [y, m, d] = ymdIn(loc.tz, at);
  // adhan reads the local Y/M/D of this Date, so build it from the location's date.
  const pt = new PrayerTimes(coords, new Date(y, m - 1, d + dayOffset), params(s, coords));
  return { fajr: pt.fajr, sunrise: pt.sunrise, dhuhr: pt.dhuhr, asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha };
}

export interface NextPrayer {
  name: PrayerName;
  at: Date;
  /** The prayer whose time we are currently in (null before Fajr). */
  current: PrayerName | null;
}

/** Next of the five prayers (sunrise is skipped as a "next" target). */
export function nextPrayer(s: PrayerSettings, loc: PrayerLocation, now = new Date()): NextPrayer {
  const today = timesFor(s, loc, now);
  let current: PrayerName | null = null;
  for (const name of PRAYER_ORDER) if (today[name] <= now) current = name;
  for (const name of PRAYER_ORDER) {
    if (name === 'sunrise') continue;
    if (today[name] > now) return { name, at: today[name], current };
  }
  return { name: 'fajr', at: timesFor(s, loc, now, 1).fajr, current };
}

export const qibla = (loc: PrayerLocation) => Qibla(new Coordinates(loc.lat, loc.lng));

/** "4:11 pm" in English; "۴:۱۱ شام" in Urdu (time of day words read naturally in RTL). */
export function formatTime(d: Date, tz: string, lang: 'en' | 'ur'): string {
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(d);
  }
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: 'numeric', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
  const h24 = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const min = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const h12 = h24 % 12 || 12;
  const period = h24 >= 4 && h24 < 12 ? 'صبح' : h24 < 16 && h24 >= 12 ? 'دوپہر' : h24 >= 16 && h24 < 19 ? 'شام' : 'رات';
  return `${urDigits(`${h12}:${min}`)} ${period}`;
}

/** Best-guess method and madhab for a time zone (used for "use my location"). */
export function defaultsForTz(tz: string): Pick<PrayerSettings, 'method' | 'madhab'> {
  const southAsia = ['Asia/Karachi', 'Asia/Kolkata', 'Asia/Calcutta', 'Asia/Dhaka', 'Asia/Kathmandu', 'Asia/Kabul'];
  if (southAsia.includes(tz)) return { method: 'Karachi', madhab: 'hanafi' };
  if (tz === 'Asia/Riyadh' || tz === 'Asia/Aden') return { method: 'UmmAlQura', madhab: 'shafi' };
  if (tz === 'Asia/Dubai') return { method: 'Dubai', madhab: 'shafi' };
  if (tz === 'Asia/Qatar') return { method: 'Qatar', madhab: 'shafi' };
  if (tz === 'Asia/Kuwait') return { method: 'Kuwait', madhab: 'shafi' };
  if (tz === 'Europe/Istanbul') return { method: 'Turkey', madhab: 'hanafi' };
  if (tz === 'Africa/Cairo') return { method: 'Egyptian', madhab: 'shafi' };
  if (tz === 'Asia/Kuala_Lumpur' || tz === 'Asia/Singapore' || tz === 'Asia/Jakarta') return { method: 'Singapore', madhab: 'shafi' };
  if (tz === 'Europe/London' || tz === 'Europe/Dublin') return { method: 'MoonsightingCommittee', madhab: 'hanafi' };
  if (tz.startsWith('America/')) return { method: 'NorthAmerica', madhab: 'hanafi' };
  return { method: 'MuslimWorldLeague', madhab: 'shafi' };
}
