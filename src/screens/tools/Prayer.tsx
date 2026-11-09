import { useState } from 'preact/hooks';
import { Icon } from '../../components/Icon';
import { PageHead } from '../../components/PageHead';
import { CITIES, cityById } from '../../content/cities';
import { now } from '../../lib/clock';
import { lang, num, t, tl } from '../../lib/i18n';
import {
  defaultsForTz,
  formatTime,
  METHODS,
  nextPrayer,
  PRAYER_NAMES,
  PRAYER_ORDER,
  qibla,
  timesFor,
} from '../../lib/prayer';
import { go } from '../../lib/router';
import { disableReminder, enableReminder, notificationsSupported } from '../../lib/reminders';
import { state, update, type CalcMethod, type PrayerLocation } from '../../lib/store';

export function locLabel(loc: PrayerLocation): string {
  if (loc.id === 'gps') return t('myLocation');
  const c = cityById(loc.id);
  return c ? tl(c.name) : t('myLocation');
}

function countdown(at: Date, from: Date): string {
  const mins = Math.max(0, Math.round((at.getTime() - from.getTime()) / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return t('inTime', { t: h ? t('hoursMins', { h, m }) : t('mins', { m }) });
}

/** Next-prayer card, used on Today (compact) and on the prayer page. */
export function NextPrayerCard({ compact }: { compact?: boolean }) {
  const { prayer } = state.value;
  if (!prayer.loc) {
    return compact ? (
      <button class="card next-prayer setup" onClick={() => go('more', 'prayer')}>
        <span class="np-icon">
          <Icon name="mosque" size={22} />
        </span>
        <span class="np-text">
          <span class="np-name">{t('setupPrayer')}</span>
          <span class="np-sub">{t('setupPrayerSub')}</span>
        </span>
        <Icon name="chevron" size={18} flip />
      </button>
    ) : null;
  }
  const loc = prayer.loc;
  const n = nextPrayer(prayer, loc, now.value);
  const Tag = compact ? 'button' : 'div';
  return (
    <Tag class={`card next-prayer ${compact ? 'compact' : 'big'}`} onClick={compact ? () => go('more', 'prayer') : undefined}>
      <span class="np-icon">
        <Icon name="mosque" size={compact ? 22 : 28} />
      </span>
      <span class="np-text">
        <span class="np-label">{t('nextPrayer')}</span>
        <span class="np-name">
          {tl(PRAYER_NAMES[n.name])} <span class="np-time">{formatTime(n.at, loc.tz, lang.value)}</span>
        </span>
        <span class="np-sub">
          {countdown(n.at, now.value)} · {locLabel(loc)}
        </span>
      </span>
      {compact && <Icon name="chevron" size={18} flip />}
    </Tag>
  );
}

function LocationPicker({ onDone }: { onDone: () => void }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'idle' | 'busy' | 'denied'>('idle');

  const pickCity = (id: string) => {
    const c = cityById(id)!;
    update((d) => {
      d.prayer = { loc: { id: c.id, lat: c.lat, lng: c.lng, tz: c.tz }, method: c.method, madhab: c.madhab };
    });
    onDone();
  };

  const useGps = () => {
    if (!navigator.geolocation) return setStatus('denied');
    setStatus('busy');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Rounded to ~1 km: plenty for prayer times, and it's never sent anywhere.
        const lat = Math.round(pos.coords.latitude * 100) / 100;
        const lng = Math.round(pos.coords.longitude * 100) / 100;
        update((d) => {
          d.prayer = { loc: { id: 'gps', lat, lng, tz }, ...defaultsForTz(tz) };
        });
        onDone();
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 3600_000 },
    );
  };

  const needle = q.trim().toLowerCase();
  const list = CITIES.filter(
    (c) => !needle || c.name.en.toLowerCase().includes(needle) || c.name.ur.includes(q.trim()) || c.country.en.toLowerCase().includes(needle),
  );

  return (
    <div class="loc-picker">
      <div class="card info privacy">
        <Icon name="shield" size={24} />
        <p>{t('setupPrayerSub')}</p>
      </div>
      <button class="btn-primary wide" onClick={useGps} disabled={status === 'busy'}>
        <Icon name="pin" size={18} />
        {status === 'busy' ? t('locating') : t('useMyLocation')}
      </button>
      {status === 'denied' && <p class="note warn">{t('locationDenied')}</p>}
      <div class="or">{t('orPickCity')}</div>
      <input class="input" type="search" placeholder={t('searchCity')} value={q} onInput={(e) => setQ(e.currentTarget.value)} />
      <ul class="card city-list">
        {list.map((c) => (
          <li key={c.id}>
            <button onClick={() => pickCity(c.id)}>
              <span class="city-name">{tl(c.name)}</span>
              <span class="city-country">{tl(c.country)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label class="toggle-row">
      <span>{label}</span>
      <input type="checkbox" role="switch" class="sr-only" checked={on} onChange={(e) => onChange(e.currentTarget.checked)} />
      <span class={`switch ${on ? 'on' : ''}`} aria-hidden="true">
        <i />
      </span>
    </label>
  );
}

export function Prayer() {
  const { prayer, reminders } = state.value;
  const [picking, setPicking] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const loc = prayer.loc;

  const setReminder = async (kind: 'prayers' | 'night', on: boolean) => {
    if (!on) return disableReminder(kind);
    setBlocked(!(await enableReminder(kind)));
  };

  if (!loc || picking) {
    return (
      <div class="screen tool">
        <section class="block top">
          <PageHead label={t('toolsLabel')} title={t('toolPrayer')} />
          <LocationPicker onDone={() => setPicking(false)} />
        </section>
      </div>
    );
  }

  const times = timesFor(prayer, loc, now.value);
  const n = nextPrayer(prayer, loc, now.value);

  return (
    <div class="screen tool">
      <section class="block top">
        <PageHead label={t('toolsLabel')} title={t('toolPrayer')} />
        <NextPrayerCard />

        <div class="card times-card">
          <div class="times-head">
            <span>{t('todayTimes')}</span>
            <button class="link" onClick={() => setPicking(true)}>
              <Icon name="pin" size={15} />
              {locLabel(loc)} · {t('change')}
            </button>
          </div>
          {PRAYER_ORDER.map((p) => (
            <div key={p} class={`time-row ${p === n.current ? 'current' : ''} ${p === n.name ? 'next' : ''} ${p === 'sunrise' ? 'muted' : ''}`}>
              <span>{tl(PRAYER_NAMES[p])}</span>
              <span class="time">{formatTime(times[p], loc.tz, lang.value)}</span>
            </div>
          ))}
          <div class="qibla">
            <Icon name="compass" size={18} />
            {t('qiblaDir', { d: Math.round(qibla(loc)) })}
          </div>
        </div>

        <div class="card setting">
          <div class="setting-head">
            <Icon name="clock" />
            <span>{t('method')}</span>
          </div>
          <select
            class="input"
            value={prayer.method}
            onChange={(e) => update((d) => void (d.prayer.method = e.currentTarget.value as CalcMethod))}
          >
            {METHODS.map((m) => (
              <option key={m.id} value={m.id}>
                {tl(m.name)}
              </option>
            ))}
          </select>
          <div class="setting-head mt">
            <Icon name="sun" />
            <span>{t('asrMadhab')}</span>
          </div>
          <div class="segmented" role="radiogroup" aria-label={t('asrMadhab')}>
            {(['hanafi', 'shafi'] as const).map((m) => (
              <button key={m} role="radio" aria-checked={prayer.madhab === m} class={prayer.madhab === m ? 'on' : ''}
                onClick={() => update((d) => void (d.prayer.madhab = m))}>
                {t(m)}
              </button>
            ))}
          </div>
        </div>

        {notificationsSupported() && (
          <div class="card setting">
            <div class="setting-head">
              <Icon name="bell" />
              <span>{t('reminders')}</span>
            </div>
            <Toggle on={reminders.prayers} onChange={(v) => setReminder('prayers', v)} label={t('remindPrayers')} />
            <Toggle on={reminders.night} onChange={(v) => setReminder('night', v)} label={t('remindNight')} />
            {blocked && <p class="note warn">{t('remindBlocked')}</p>}
            <p class="setting-note">{t('remindNote')}</p>
          </div>
        )}

        <p class="note">{t('prayerNote')}</p>
        <p class="fineprint" dir="ltr">
          {num(loc.lat)}, {num(loc.lng)} · {loc.tz}
        </p>
      </section>
    </div>
  );
}
