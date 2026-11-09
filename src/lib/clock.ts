import { signal } from '@preact/signals';
import { dateKey } from './date';

/** Live clock signals so the app rolls over at midnight / dusk while open. */
export const hour = signal(new Date().getHours());
export const today = signal(dateKey());

function tick() {
  const now = new Date();
  hour.value = now.getHours();
  today.value = dateKey(now);
}
setInterval(tick, 60_000);
document.addEventListener('visibilitychange', tick);
