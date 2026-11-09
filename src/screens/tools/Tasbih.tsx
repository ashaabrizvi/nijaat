import { useEffect, useState } from 'preact/hooks';
import { Icon } from '../../components/Icon';
import { PageHead } from '../../components/PageHead';
import { DHIKR, DHIKR_GROUPS, dhikrView } from '../../content/dhikr';
import { today } from '../../lib/clock';
import { lang, num, t, tl } from '../../lib/i18n';
import { haptic } from '../../lib/share';
import { state, update } from '../../lib/store';

const TARGETS = [33, 99, 100, 0];

function Picker({ current, onClose }: { current: string; onClose: () => void }) {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);
  const pick = (id: string) => {
    if (id !== current) update((s) => void ((s.tasbih.dhikr = id), (s.tasbih.count = 0)));
    haptic(10);
    onClose();
  };
  return (
    <div class="modal" role="dialog" aria-modal="true" aria-label={t('chooseDhikr')}
      onClick={(e) => e.target === e.currentTarget && onClose()} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <div class="modal-card">
        <header class="modal-head">
          <h2 class="card-title">{t('chooseDhikr')}</h2>
          <button class="icon-btn static" onClick={onClose} aria-label={t('close')}>
            <Icon name="close" size={18} />
          </button>
        </header>
        {DHIKR_GROUPS.map((g) => (
          <section key={g.id} class="dhikr-group">
            <div class="section-label">{tl(g.title)}</div>
            <ul class="card dhikr-list">
              {DHIKR.filter((d) => d.group === g.id).map((d) => {
                const v = dhikrView(d, lang.value);
                return (
                  <li key={d.id}>
                    <button class={d.id === current ? 'on' : ''} aria-pressed={d.id === current} onClick={() => pick(d.id)}>
                      <span class="dl-ar" lang="ar" dir="rtl">{v.ar}</span>
                      <span class="dl-tr" dir="ltr">{v.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Tasbih() {
  const ts = state.value.tasbih;
  const def = DHIKR.find((x) => x.id === ts.dhikr) ?? DHIKR[0];
  const d = dhikrView(def, lang.value);
  const [burst, setBurst] = useState(0);
  const [picking, setPicking] = useState(false);
  const reached = ts.target > 0 && ts.count > 0 && ts.count % ts.target === 0;
  const R = 46;
  const C = 2 * Math.PI * R;
  const frac = ts.target ? (ts.count % ts.target || (ts.count ? ts.target : 0)) / ts.target : 0;
  const long = d.ar.length > 40;

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

        <button class="card dhikr-pick" onClick={() => setPicking(true)}>
          <Icon name="beads" size={20} />
          <span dir="ltr">{d.label}</span>
          <span class="dhikr-pick-cta">{t('chooseDhikr')}</span>
          <Icon name="chevron" size={16} flip />
        </button>

        <div class="dhikr-now">
          <p class={`dhikr-ar ${long ? 'long' : ''}`} lang="ar" dir="rtl">{d.ar}</p>
          <p class="dhikr-tr" dir="ltr">{d.translit}</p>
          <p class="dhikr-mean">{d.meaning}</p>
          {d.source && <p class="dhikr-src"><bdi>{d.source}</bdi></p>}
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

        {d.virtue && (
          <div class="tip virtue">
            <Icon name="sparkle" size={18} />
            <span>{d.virtue}</span>
          </div>
        )}

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
      {picking && <Picker current={def.id} onClose={() => setPicking(false)} />}
    </div>
  );
}
