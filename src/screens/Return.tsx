import { useEffect, useState } from 'preact/hooks';
import { HadithCard } from '../components/Cards';
import { Door } from '../components/Door';
import { ASTAGHFIRULLAH, SAYYID_ISTIGHFAR } from '../content/duas';
import { hadith, MERCY_HADITH } from '../content/hadith';
import { t, tl } from '../lib/i18n';
import { haptic } from '../lib/share';
import { state, update } from '../lib/store';

type Step = 'door' | 'breathe' | 'dua' | 'done';
const IN_MS = 4000;
const OUT_MS = 6000;
const CYCLES = 3;

export function Return() {
  const [step, setStep] = useState<Step>('door');

  const begin = () => {
    update((d) => {
      d.returns += 1;
    });
    haptic(30);
    setStep('breathe');
  };

  return (
    <div class={`screen return step-${step}`}>
      <section class="door-stage">
        <Door open={step !== 'door'} />
      </section>

      {step === 'door' && (
        <section class="block center">
          <h1 class="return-title">{t('doorOpen')}</h1>
          <p class="return-sub">{t('doorSub')}</p>
          <button class="btn-primary big glow" onClick={begin}>
            {t('imReturning')}
          </button>
        </section>
      )}

      {step === 'breathe' && <Breathe onDone={() => setStep('dua')} />}

      {step === 'dua' && (
        <section class="block">
          <div class="card dua-card">
            <div class="section-label">{t('masterDua')}</div>
            <p class="dua-sub">{t('masterDuaSub')}</p>
            <p class="dua-ar" lang="ar" dir="rtl">
              {SAYYID_ISTIGHFAR.ar}
            </p>
            <details class="dua-more">
              <summary>{t('transliteration')}</summary>
              <p class="dua-translit" dir="ltr" lang="ar-Latn">
                {SAYYID_ISTIGHFAR.translit}
              </p>
            </details>
            <h4 class="mini-label">{t('meaning')}</h4>
            <p class="dua-meaning">{tl(SAYYID_ISTIGHFAR.meaning)}</p>
            <details class="dua-more">
              <summary>{t('itsVirtue')}</summary>
              <p class="dua-meaning">{tl(SAYYID_ISTIGHFAR.virtue)}</p>
            </details>
            <p class="src">
              <bdi>{tl(SAYYID_ISTIGHFAR.source)}</bdi> · {t('fromSunnah')}
            </p>
          </div>
          <button
            class="btn-primary wide"
            onClick={() => {
              haptic(20);
              setStep('done');
            }}
          >
            {t('alhamdulillah')}
          </button>
        </section>
      )}

      {step === 'done' && (
        <section class="block center">
          <h1 class="return-title">{t('returnedTitle')}</h1>
          <p class="return-sub">{t('returnedCount', { n: state.value.returns })}</p>
          <HadithCard h={hadith(MERCY_HADITH[state.value.returns % MERCY_HADITH.length])} />
          <button class="btn-ghost" onClick={() => setStep('door')}>
            {t('returnAgain')}
          </button>
        </section>
      )}
    </div>
  );
}

function Breathe({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const ms = phase === 'in' ? IN_MS : OUT_MS;
    const id = window.setTimeout(() => {
      if (phase === 'in') setPhase('out');
      else if (cycle + 1 >= CYCLES) onDone();
      else {
        setCycle((c) => c + 1);
        setPhase('in');
      }
    }, ms);
    return () => clearTimeout(id);
  }, [phase, cycle]);

  return (
    <section class="block center breathe">
      <p class="return-sub">{t('breatheIntro')}</p>
      <div class={`breath ${phase}`} aria-live="polite">
        <span class="breath-ar" lang="ar" dir="rtl">
          {ASTAGHFIRULLAH}
        </span>
      </div>
      <p class="breath-label">{phase === 'in' ? t('breatheIn') : t('breatheOut')}</p>
      <div class="breath-dots" aria-hidden="true">
        {Array.from({ length: CYCLES }, (_, i) => (
          <i key={i} class={i < cycle || (i === cycle && phase === 'out') ? 'on' : ''} />
        ))}
      </div>
      <button class="btn-ghost" onClick={onDone}>
        {t('skip')}
      </button>
    </section>
  );
}
