import { useState } from 'preact/hooks';
import { Door } from '../components/Door';
import { Lantern } from '../components/Lantern';
import type { L, Lang } from '../content/types';
import { lang, t, tl } from '../lib/i18n';
import { update } from '../lib/store';

const SLIDES: { title: L; body: L }[] = [
  {
    title: { en: 'Welcome to Dar-e-Nijaat', ur: 'درِ نجات میں خوش آمدید' },
    body: {
      en: 'The door of return. A quiet place to walk back to Allah, one gentle step at a time.',
      ur: 'لوٹنے کا دروازہ۔ اللہ کی طرف واپسی کی ایک پُرسکون جگہ، ایک نرم قدم، ایک وقت میں۔',
    },
  },
  {
    title: { en: 'Nijaat isn’t a plot twist', ur: 'نجات کوئی کہانی کا موڑ نہیں' },
    body: {
      en: 'It’s a path: tawbah, salah, letting go, the Qur’an, and to keep walking. Five stations, lit one lantern at a time.',
      ur: 'یہ ایک راستہ ہے: توبہ، نماز، چھوڑ دینا، قرآن، اور چلتے رہنا۔ پانچ منزلیں، ایک ایک چراغ روشن کرتے ہوئے۔',
    },
  },
  {
    title: { en: 'No perfection required', ur: 'کامل ہونا ضروری نہیں' },
    body: {
      en: 'Just sincerity. No account, no tracking. Everything stays on your phone, between you and Allah.',
      ur: 'بس اخلاص۔ نہ اکاؤنٹ، نہ ٹریکنگ۔ سب کچھ آپ کے فون پر رہتا ہے، آپ اور اللہ کے درمیان۔',
    },
  },
];

export function Welcome() {
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const setLang = (l: Lang) => update((d) => void (d.lang = l));
  const finish = () => update((d) => void (d.onboarded = true));

  return (
    <div class="welcome">
      <div class="welcome-art" aria-hidden="true">
        {i === 0 && <p class="bismillah" lang="ar" dir="rtl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>}
        {i === 1 ? (
          <div class="welcome-lanterns">
            {[0, 1, 2, 3, 4].map((n) => (
              <Lantern key={n} lit={n < 3} size={n === 2 ? 64 : 48} delay={n * 300} />
            ))}
          </div>
        ) : (
          <div class="welcome-door">
            <Door open={i === 2} />
          </div>
        )}
      </div>

      <div class="welcome-copy" key={i}>
        <h1 class="welcome-title">{tl(SLIDES[i].title)}</h1>
        <p class="welcome-body">{tl(SLIDES[i].body)}</p>
      </div>

      {i === 0 && (
        <div class="welcome-lang">
          <span>{t('chooseLang')}</span>
          <div class="segmented">
            {(
              [
                ['en', 'English'],
                ['ur', 'اردو'],
              ] as const
            ).map(([code, label]) => (
              <button key={code} lang={code} class={lang.value === code ? 'on' : ''} aria-pressed={lang.value === code}
                onClick={() => setLang(code)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div class="welcome-foot">
        <div class="welcome-dots" aria-hidden="true">
          {SLIDES.map((_, n) => (
            <i key={n} class={n === i ? 'on' : ''} />
          ))}
        </div>
        <button class="btn-primary big" onClick={() => (last ? finish() : setI(i + 1))}>
          {last ? t('welcomeEnter') : t('welcomeNext')}
        </button>
      </div>
    </div>
  );
}
