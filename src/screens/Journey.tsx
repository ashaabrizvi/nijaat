import { useEffect, useRef } from 'preact/hooks';
import { AyahCard, HadithCard, SectionHead } from '../components/Cards';
import { CheckRow } from '../components/Check';
import { Icon } from '../components/Icon';
import { Lantern } from '../components/Lantern';
import { ayah } from '../content/ayat';
import { hadith } from '../content/hadith';
import { STATIONS } from '../content/stations';
import type { Station } from '../content/types';
import { num, t, tl } from '../lib/i18n';
import { back, go, route } from '../lib/router';
import { haptic } from '../lib/share';
import { state, update } from '../lib/store';

const lived = (id: string) => state.value.stations[id]?.every(Boolean) ?? false;

export function Journey() {
  const done = STATIONS.filter((s) => lived(s.id)).length;
  const pct = done / STATIONS.length;
  const C = 2 * Math.PI * 22;
  const headline = done === 0 ? t('pathBeginning') : done === STATIONS.length ? t('pathWalking') : t('pathOn');
  const open = STATIONS.find((s) => s.id === route.value.station);

  return (
    <div class="screen journey">
      <section class="block top">
        <SectionHead label={t('journeyLabel')} title={t('journeyTitle')} sub={t('journeySub')} />
        <div class="card progress-card">
          <svg class="ring" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="22" class="ring-track" />
            <circle
              cx="26"
              cy="26"
              r="22"
              class="ring-fill"
              stroke-dasharray={C}
              stroke-dashoffset={C - pct * C}
              transform="rotate(-90 26 26)"
            />
          </svg>
          <div>
            <div class="progress-big">{headline}</div>
            <div class="progress-small">{t('stationsLived', { n: done, t: STATIONS.length })}</div>
          </div>
        </div>
      </section>

      <ol class="path">
        {STATIONS.map((s, i) => {
          const ticks = state.value.stations[s.id] ?? [];
          const isDone = lived(s.id);
          return (
            <li key={s.id} class={`path-stop ${i % 2 ? 'alt' : ''} ${isDone ? 'done' : ''}`}>
              <div class="path-node" aria-hidden="true">
                <Lantern lit={isDone} size={44} delay={i * 500} />
              </div>
              <button class="card station-card" onClick={() => go('journey', s.id)}>
                <span class="station-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <span class="station-text">
                  <span class="station-num">{t('station', { n: i + 1 })}</span>
                  <span class="station-title">{tl(s.title)}</span>
                  <span class="station-tag">{tl(s.tagline)}</span>
                  <span class="dots" aria-hidden="true">
                    {ticks.map((v, j) => (
                      <i key={j} class={v ? 'on' : ''} />
                    ))}
                  </span>
                </span>
                <Icon name="chevron" size={18} flip />
              </button>
            </li>
          );
        })}
      </ol>

      {open && <StationSheet s={open} index={STATIONS.indexOf(open)} />}
    </div>
  );
}

function StationSheet({ s, index }: { s: Station; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const ticks = state.value.stations[s.id];

  useEffect(() => {
    document.body.classList.add('no-scroll');
    ref.current?.focus();
    return () => document.body.classList.remove('no-scroll');
  }, [s.id]);

  const toggle = (i: number) => {
    update((d) => {
      d.stations[s.id][i] = !d.stations[s.id][i];
    });
    haptic(ticks[i] ? 8 : 18);
  };

  return (
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabIndex={-1} ref={ref}
      onKeyDown={(e) => e.key === 'Escape' && back('journey')}>
      <div class="sheet-inner">
        <header class="sheet-head arch">
          <button class="icon-btn" onClick={() => back('journey')} aria-label={t('back')}>
            <Icon name="chevron" size={20} class="icon-back" flip />
          </button>
          <span class="station-icon big">
            <Icon name={s.icon} size={28} />
          </span>
          <div class="station-num">{t('station', { n: index + 1 })}</div>
          <h2 id="sheet-title" class="sheet-title">{tl(s.title)}</h2>
          <p class="sheet-tag">{tl(s.tagline)}</p>
        </header>

        <p class="reflection">{tl(s.reflection)}</p>

        <SectionHead label={t('practice')} />
        <div class="card list-card">
          {s.items.map((it, i) => (
            <CheckRow key={i} checked={ticks[i]} onChange={() => toggle(i)} lead={<span class="num">{num(i + 1)}</span>}>
              <span class="row-title">{tl(it)}</span>
            </CheckRow>
          ))}
        </div>
        <div class="tip">
          <Icon name="sparkle" size={18} />
          <span>{tl(s.tip)}</span>
        </div>

        <SectionHead label={t('fromQuran')} />
        <AyahCard a={ayah(s.ayahId)} />

        <SectionHead label={t('fromSunnah')} />
        <HadithCard h={hadith(s.hadithId)} />

        <button class="btn-primary wide" onClick={() => back('journey')}>
          {t('close')}
        </button>
      </div>
    </div>
  );
}
