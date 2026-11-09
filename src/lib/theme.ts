import { computed, effect } from '@preact/signals';
import { hour } from './clock';
import { state } from './store';

/** Night after dark (7pm–5am) unless the user picked a theme. */
export const theme = computed<'day' | 'night'>(() => {
  const pref = state.value.theme;
  if (pref !== 'auto') return pref;
  return hour.value >= 19 || hour.value < 5 ? 'night' : 'day';
});

effect(() => {
  document.documentElement.dataset.theme = theme.value;
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute('content', theme.value === 'night' ? '#0E1628' : '#FBF4E8');
});
