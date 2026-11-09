import { effect, signal } from '@preact/signals';
import { DAILY } from '../content/daily';
import { STATIONS } from '../content/stations';
import type { Lang } from '../content/types';
import { addDays, dateKey } from './date';

export type ThemePref = 'auto' | 'day' | 'night';

export interface AppState {
  v: 2;
  lang: Lang;
  theme: ThemePref;
  onboarded: boolean;
  /** station id → which practices are lived */
  stations: Record<string, boolean[]>;
  /** YYYY-MM-DD → which daily lanterns were lit */
  days: Record<string, boolean[]>;
  returns: number;
  prayer: PrayerSettings;
  tasbih: TasbihState;
  journal: JournalEntry[];
  reminders: { prayers: boolean; night: boolean };
}

export type CalcMethod =
  | 'Karachi'
  | 'MuslimWorldLeague'
  | 'NorthAmerica'
  | 'MoonsightingCommittee'
  | 'UmmAlQura'
  | 'Egyptian'
  | 'Dubai'
  | 'Qatar'
  | 'Kuwait'
  | 'Turkey'
  | 'Singapore';

export interface PrayerLocation {
  lat: number;
  lng: number;
  /** City id from the built-in list, or 'gps'. */
  id: string;
  /** IANA time zone the times are shown in. */
  tz: string;
}

export interface PrayerSettings {
  loc: PrayerLocation | null;
  method: CalcMethod;
  madhab: 'hanafi' | 'shafi';
}

export interface TasbihState {
  dhikr: string;
  count: number;
  /** 0 = no target */
  target: number;
  /** YYYY-MM-DD → total taps that day */
  days: Record<string, number>;
  total: number;
}

export interface JournalEntry {
  id: string;
  /** ISO timestamp */
  at: string;
  mood?: string;
  prompt?: string;
  text: string;
}

const KEY = 'dar-e-nijaat:v2';
const KEEP_DAYS = 400;

function fresh(): AppState {
  return {
    v: 2,
    lang: 'en',
    theme: 'auto',
    onboarded: false,
    stations: {},
    days: {},
    returns: 0,
    prayer: { loc: null, method: 'Karachi', madhab: 'hanafi' },
    tasbih: { dhikr: 'subhanallah', count: 0, target: 33, days: {}, total: 0 },
    journal: [],
    reminders: { prayers: false, night: false },
  };
}

function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Carry progress over from the original single-page version (v1 keys). */
function migrateV1(s: AppState): AppState {
  const st = read('dar-e-nijaat:stations-progress') as Record<string, boolean[]> | null;
  if (st && typeof st === 'object') s.stations = st;
  const daily = read('dar-e-nijaat:daily-log') as { date?: string; items?: boolean[] } | null;
  if (daily?.date && Array.isArray(daily.items)) {
    // v1 order: fajr, quran, prayers, dua, leave, istighfar
    const [fajr, quran, prayers, dua, leave, istighfar] = daily.items;
    s.days[daily.date] = [fajr, prayers, quran, dua, leave, istighfar].map(Boolean);
  }
  const ret = read('dar-e-nijaat:returns-count') as { count?: number } | null;
  if (ret && typeof ret.count === 'number') s.returns = ret.count;
  return s;
}

function normalise(s: AppState): AppState {
  for (const st of STATIONS) {
    const arr = Array.isArray(s.stations[st.id]) ? s.stations[st.id] : [];
    s.stations[st.id] = st.items.map((_, i) => !!arr[i]);
  }
  const cutoff = addDays(dateKey(), -KEEP_DAYS);
  for (const k of Object.keys(s.days)) {
    if (k < cutoff || !Array.isArray(s.days[k])) delete s.days[k];
    else s.days[k] = DAILY.map((_, i) => !!s.days[k][i]);
  }
  if (s.lang !== 'en' && s.lang !== 'ur') s.lang = 'en';
  if (!['auto', 'day', 'night'].includes(s.theme)) s.theme = 'auto';
  if (typeof s.returns !== 'number' || s.returns < 0) s.returns = 0;
  const f = fresh();
  s.prayer = { ...f.prayer, ...(s.prayer ?? {}) };
  s.tasbih = { ...f.tasbih, ...(s.tasbih ?? {}) };
  for (const k of Object.keys(s.tasbih.days)) if (k < cutoff) delete s.tasbih.days[k];
  s.journal = Array.isArray(s.journal) ? s.journal.filter((e) => e && typeof e.text === 'string') : [];
  s.reminders = { ...f.reminders, ...(s.reminders ?? {}) };
  return s;
}

function load(): AppState {
  const saved = read(KEY) as Partial<AppState> | null;
  if (saved && saved.v === 2) return normalise({ ...fresh(), ...saved, v: 2 });
  return normalise(migrateV1(fresh()));
}

export const state = signal<AppState>(load());

effect(() => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state.value));
  } catch {
    /* private mode / storage full: the app still works for this session */
  }
});

/** Immutable update helper: mutate a draft copy, then publish it. */
export function update(fn: (draft: AppState) => void) {
  const draft = structuredClone(state.value);
  fn(draft);
  state.value = draft;
}

export function todayItems(today = dateKey()): boolean[] {
  return state.value.days[today] ?? DAILY.map(() => false);
}

/** Clears progress (ticks, streak, returns, tasbih). Keeps settings and the journal. */
export function resetAll() {
  const { lang, theme, prayer, reminders, journal } = state.value;
  state.value = normalise({ ...fresh(), lang, theme, prayer, reminders, journal, onboarded: true });
}
