import { effect } from '@preact/signals';
import { today } from './clock';
import { t, tl } from './i18n';
import { PRAYER_NAMES, timesFor, type PrayerName } from './prayer';
import { state, update } from './store';

/*
 * Gentle reminders, web edition.
 * Browsers can't schedule notifications for a closed web app, so we schedule
 * timers while the app (or its installed window) is alive. The Capacitor app
 * in Phase 3 swaps this for native local notifications using the same settings.
 */

export const notificationsSupported = () => typeof window !== 'undefined' && 'Notification' in window;

/** Ask permission (if needed) and switch a reminder on. Returns false if blocked. */
export async function enableReminder(kind: 'prayers' | 'night'): Promise<boolean> {
  if (!notificationsSupported()) return false;
  let p = Notification.permission;
  if (p === 'default') p = await Notification.requestPermission();
  if (p !== 'granted') return false;
  update((d) => void (d.reminders[kind] = true));
  return true;
}

export function disableReminder(kind: 'prayers' | 'night') {
  update((d) => void (d.reminders[kind] = false));
}

async function notify(title: string, body: string, tag: string) {
  if (!notificationsSupported() || Notification.permission !== 'granted') return;
  const opts: NotificationOptions = { body, tag, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png' };
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) return void (await reg.showNotification(title, opts));
  } catch {
    /* fall through */
  }
  try {
    new Notification(title, opts);
  } catch {
    /* unsupported in this context */
  }
}

let timers: number[] = [];
const MAX_DELAY = 26 * 60 * 60 * 1000;

function at(when: Date, fn: () => void) {
  const ms = when.getTime() - Date.now();
  if (ms > 0 && ms < MAX_DELAY) timers.push(window.setTimeout(fn, ms));
}

effect(() => {
  const { reminders, prayer } = state.value;
  void today.value; // reschedule at midnight
  timers.forEach(clearTimeout);
  timers = [];

  if (reminders.prayers && prayer.loc) {
    const loc = prayer.loc;
    const days = [timesFor(prayer, loc, new Date()), timesFor(prayer, loc, new Date(), 1)];
    for (const day of days) {
      for (const name of ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as PrayerName[]) {
        at(day[name], () => {
          const p = tl(PRAYER_NAMES[name]);
          notify(t('notifPrayerTitle', { p }), t('notifPrayerBody'), `prayer-${name}`);
        });
      }
    }
  }

  if (reminders.night) {
    const n = new Date();
    n.setHours(22, 0, 0, 0);
    if (n.getTime() <= Date.now()) n.setDate(n.getDate() + 1);
    at(n, () => notify(t('notifNightTitle'), t('notifNightBody'), 'night'));
  }
});
