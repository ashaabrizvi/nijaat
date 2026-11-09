import { AyahCard, HadithCard, SectionHead } from '../components/Cards';
import { Icon } from '../components/Icon';
import { Lantern } from '../components/Lantern';
import { ayah } from '../content/ayat';
import { ESSENCE as E } from '../content/essence';
import { hadith } from '../content/hadith';
import { t, tl } from '../lib/i18n';
import { go } from '../lib/router';

/** "What is Nijaat?": the meaning behind the trend. */
export function Nijaat() {
  return (
    <div class="screen nijaat">
      <section class="hero arch essence-hero">
        <div class="essence-lanterns" aria-hidden="true">
          <Lantern lit size={46} />
          <Lantern lit size={60} delay={400} />
          <Lantern lit size={46} delay={800} />
        </div>
        <div class="section-label">{t('essenceLabel')}</div>
        <h1 class="hero-title">{t('essenceTitle')}</h1>
        <p class="hero-greet">{tl(E.intro)}</p>
        <p class="essence-word" lang="ur" dir="rtl">
          درِ نجات
        </p>
      </section>

      <section class="block">
        <SectionHead label="01" title={tl(E.wordTitle)} />
        <p class="prose">{tl(E.word)}</p>
      </section>

      <section class="block">
        <SectionHead label="02" title={tl(E.inviteTitle)} />
        <AyahCard a={ayah('ghafir-41')} />
        <p class="prose">{tl(E.invite)}</p>
      </section>

      <section class="block">
        <SectionHead label="03" title={tl(E.darkTitle)} />
        <AyahCard a={ayah('anbiya-87-88')} />
        <p class="prose">{tl(E.dark)}</p>
      </section>

      <section class="block">
        <SectionHead label="04" title={tl(E.screenTitle)} />
        <div class="card screen-card">
          <Icon name="sparkle" size={22} />
          <p class="prose">{tl(E.screen)}</p>
        </div>
      </section>

      <section class="block">
        <SectionHead label="05" title={tl(E.notTitle)} />
        <ul class="not-list">
          {E.nots.map((n, i) => (
            <li key={i}>
              <Icon name="close" size={16} />
              {tl(n)}
            </li>
          ))}
        </ul>
        <p class="prose strong">{tl(E.is)}</p>
      </section>

      <section class="block">
        <SectionHead label="06" title={tl(E.runningTitle)} />
        <HadithCard h={hadith('running')} />
        <button class="btn-primary wide" onClick={() => go('journey')}>
          {t('beginPath')}
        </button>
      </section>
    </div>
  );
}
