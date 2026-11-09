import { signal } from '@preact/signals';
import { dateKey } from './date';

/** Live clock signals so the app rolls over at midnight / dusk / prayer times while open. */
export const now = signal(new Date());
export const hour = signal(new Date().getHours());
export const today = signal(dateKey());

function tick() {
  const d = new Date();
  now.value = d;
  if (hour.value !== d.getHours()) hour.value = d.getHours();
  const k = dateKey(d);
  if (today.value !== k) today.value = k;
}
setInterval(tick, 20_000);
document.addEventListener('visibilitychange', tick);
