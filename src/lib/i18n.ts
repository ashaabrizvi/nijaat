import { computed, effect } from '@preact/signals';
import { urDigits } from '../content/ayat';
import { S, type StringKey } from '../content/strings';
import type { L } from '../content/types';
import { state } from './store';

export const lang = computed(() => state.value.lang);
export const isRtl = computed(() => lang.value === 'ur');

/** Translate a UI string, filling {placeholders}. Numbers use Urdu digits in Urdu. */
export function t(key: StringKey, vars?: Record<string, string | number>): string {
  let s = S[key][lang.value];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, typeof v === 'number' && lang.value === 'ur' ? urDigits(v) : String(v));
    }
  }
  return s;
}

/** Pick the current language from a content object. */
export const tl = (l: L) => l[lang.value];

export const num = (n: number) => (lang.value === 'ur' ? urDigits(n) : String(n));

effect(() => {
  const el = document.documentElement;
  el.lang = lang.value;
  el.dir = isRtl.value ? 'rtl' : 'ltr';
});
