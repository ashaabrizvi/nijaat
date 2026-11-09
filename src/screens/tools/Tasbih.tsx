import { useState } from 'preact/hooks';
import { Icon } from '../../components/Icon';
import { PageHead } from '../../components/PageHead';
import { DHIKR } from '../../content/strings-tools';
import { today } from '../../lib/clock';
import { num, t, tl } from '../../lib/i18n';
import { haptic } from '../../lib/share';
import { state, update } from '../../lib/store';

const TARGETS = [33, 99, 100, 0];

export function Tasbih() {
  const ts = state.value.tasbih;
  const d = DHIKR.find((x) => x.id === ts.dhikr) ?? DHIKR[0];
  const [burst, setBurst] = useState(0);
  const reached = ts.target > 0 && ts.count > 0 && ts.count % ts.target === 0;
  const R = 46;
  const C = 2 * Math.PI * R;
  const frac = ts.target ? (ts.count % ts.target || (ts.count ? ts.target : 0)) / ts.target : 0;

  const tap = () => {
    const day = today.value;
    update((s) => {
      s.tasbih.count += 1;
      s.tasbih.total += 1;
      s.tasbih.days[day] = (s.tasbih.days[day] ?? 0) + 1;
    });
    const next = ts.count + 1;
    if (ts.target && next % ts.target === 0) {
      haptic(60);
      setBurst((b) => b + 1);
    } else haptic(8);
  };

  return (
    <div class="screen tool tasbih">
      <section class="block top">
        <PageHead label={t('toolsLabel')} title={t('toolTasbih')} />

        <div class="chip-scroll" role="radiogroup" aria-label={t('toolTasbih')}>
          {DHIKR.map((x) => (
            <button key={x.id} role="radio" aria-checked={x.id === d.id} class={`dhikr-chip ${x.id === d.id ? 'on' : ''}`}
              onClick={() => update((s) => void ((s.tasbih.dhikr = x.id), (s.tasbih.count = 0)))}>
              <span lang="ar" dir="rtl">{x.ar}</span>
            </button>
          ))}
        </div>

        <div class="dhikr-now">
          <p class="dhikr-ar" lang="ar" dir="rtl">{d.ar}</p>
          <p class="dhikr-tr" dir="ltr">{d.translit}</p>
          <p class="dhikr-mean">{tl(d.meaning)}</p>
        </div>

        <button class={`bead ${reached ? 'reached' : ''}`} onClick={tap} aria-label={`${d.translit}: ${ts.count}`}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={R} class="bead-track" />
            <circle cx="50" cy="50" r={R} class="bead-fill" stroke-dasharray={C} stroke-dashoffset={C - frac * C} transform="rotate(-90 50 50)" />
          </svg>
          <span class="bead-count" key={burst}>{num(ts.count)}</span>
          <span class="bead-target">{ts.target ? `/ ${num(ts.target)}` : '∞'}</span>
        </button>
        <p class="tap-hint">{reached ? t('targetReached', { n: ts.count }) : t('tapToCount')}</p>

        <div class="card setting">
          <div class="setting-head">
            <Icon name="beads" />
            <span>{t('target')}</span>
          </div>
          <div class="segmented">
            {TARGETS.map((n) => (
              <button key={n} class={ts.target === n ? 'on' : ''} aria-pressed={ts.target === n}
                onClick={() => update((s) => void (s.tasbih.target = n))}>
                {n ? num(n) : t('noTarget')}
              </button>
            ))}
          </div>
          <div class="tasbih-stats">
            <span class="chip">{t('todayDhikr', { n: ts.days[today.value] ?? 0 })}</span>
            <span class="chip">{t('lifetimeDhikr', { n: ts.total })}</span>
            <button class="btn-ghost" onClick={() => update((s) => void (s.tasbih.count = 0))}>
              <Icon name="refresh" size={16} />
              {t('resetCount')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
