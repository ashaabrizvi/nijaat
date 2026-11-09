import { useState } from 'preact/hooks';
import { AyahCard, SectionHead } from '../components/Cards';
import { CheckRow } from '../components/Check';
import { Icon } from '../components/Icon';
import { Lantern } from '../components/Lantern';
import { openQuote } from '../components/QuoteSheet';
import { ayah, ayahRef, DAILY_POOL } from '../content/ayat';
import { DAILY, REMEMBER } from '../content/daily';
import { today } from '../lib/clock';
import { dayNumber, formatDate, formatHijri } from '../lib/date';
import { lang, num, t, tl } from '../lib/i18n';
import { go } from '../lib/router';
import { haptic } from '../lib/share';
import { state, update } from '../lib/store';
import { computeStreak } from '../lib/streak';
import { theme } from '../lib/theme';
import { NextPrayerCard } from './tools/Prayer';

export function Today() {
  const day = today.value;
  const items = state.value.days[day] ?? DAILY.map(() => false);
  const litCount = items.filter(Boolean).length;
  const { streak, total } = computeStreak(state.value.days, day);
  const night = theme.value === 'night';

  const [offset, setOffset] = useState(0);
  const a = DAILY_POOL[(dayNumber(day) + offset) % DAILY_POOL.length];
  const hijri = formatHijri(lang.value);

  const toggle = (i: number) => {
    update((d) => {
      const arr = d.days[day] ?? DAILY.map(() => false);
      arr[i] = !arr[i];
      d.days[day] = arr;
    });
    haptic(items[i] ? 8 : 18);
  };

  return (
    <div class="screen today">
      <section class="hero arch">
        <div class="hero-sky" aria-hidden="true">
          {night ? (
            <>
              <span class="moon" />
              <span class="star s1" />
              <span class="star s2" />
              <span class="star s3" />
            </>
          ) : (
            <span class="sun" />
          )}
        </div>
        <p class="hero-salaam">{t('salaam')}</p>
        <h1 class="hero-title">{t('appName')}</h1>
        <p class="hero-greet">{night ? t('greetNight') : t('greetDay')}</p>
        <p class="hero-date">
          {formatDate(lang.value)}
          {hijri && (
            <>
              <span class="dot">·</span>
              <bdi>{hijri}</bdi>
            </>
          )}
        </p>

        <div class="lantern-string" aria-label={t('litOf', { n: litCount, t: DAILY.length })} role="img">
          {items.map((v, i) => (
            <Lantern key={i} lit={v} delay={i * 370} size={40} />
          ))}
        </div>
        <div class="hero-stats">
          <span class={`chip ${streak ? 'chip-gold' : ''}`}>
            <Icon name="sparkle" size={15} />
            {streak ? t('streakDays', { n: streak }) : t('streakStart')}
          </span>
          {total > 0 && <span class="chip">{t(total === 1 ? 'dayShownUp' : 'daysShownUp', { n: total })}</span>}
        </div>
      </section>

      <section class="block today-tools">
        <NextPrayerCard compact />
        <div class="quick-row">
          {(
            [
              ['tasbih', 'beads', 'toolTasbih'],
              ['duas', 'hands', 'toolDuas'],
              ['journal', 'pen', 'toolJournal'],
            ] as const
          ).map(([id, icon, label]) => (
            <button key={id} class="quick" onClick={() => go('more', id)}>
              <Icon name={icon} size={20} />
              {t(label)}
            </button>
          ))}
        </div>
      </section>

      <section class="block">
        <SectionHead label={t('ayahOfDay')} />
        <AyahCard a={a}>
          <div class="card-actions">
            <button class="btn-ghost" onClick={() => setOffset((o) => o + 1)}>
              <Icon name="refresh" size={17} />
              {t('anotherAyah')}
            </button>
            <button class="btn-ghost" onClick={() => openQuote({ ar: a.ar, text: lang.value === 'ur' ? a.ur : `“${a.en}”`, ref: ayahRef(a, lang.value), lang: lang.value })}>
              <Icon name="share" size={17} />
              {t('share')}
            </button>
          </div>
        </AyahCard>
      </section>

      <section class="block">
        <SectionHead label={t('checkInLabel')} title={t('checkInTitle')} sub={t('checkInSub')} />
        <div class="card list-card">
          <div class={`list-banner ${litCount === DAILY.length ? 'done' : ''}`}>
            {litCount === DAILY.length ? t('allLit') : t('litOf', { n: litCount, t: DAILY.length })}
          </div>
          {DAILY.map((d, i) => (
            <CheckRow key={d.id} checked={items[i]} onChange={() => toggle(i)} lead={<span class="num">{num(i + 1)}</span>}>
              <span class="row-title">{tl(d.title)}</span>
              <span class="row-sub">{tl(d.tagline)}</span>
            </CheckRow>
          ))}
        </div>
        <p class="note">{t('streakNote')}</p>
      </section>

      <section class="block">
        <div class="card remember">
          <h3 class="card-title">{t('remember')}</h3>
          <ul>
            {REMEMBER.map((r, i) => (
              <li key={i}>
                <Icon name={['heart', 'star', 'lantern', 'check'][i]} size={18} />
                {tl(r)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
    </div>
  );
}

export function Closing() {
  return (
    <footer class="closing">
      <AyahCard a={ayah('rahman-13')} compact />
      <p class="closing-line">{t('closingLine')}</p>
      <p class="closing-tag">{t('closingTag')}</p>
    </footer>
  );
}
