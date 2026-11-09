import { PageHead } from '../components/PageHead';
import { Icon } from '../components/Icon';
import type { Lang } from '../content/types';
import { lang, t } from '../lib/i18n';
import { installEvent, isStandalone, promptInstall } from '../lib/install';
import { share } from '../lib/share';
import { resetAll, state, update, type ThemePref } from '../lib/store';

export function Settings() {
  const s = state.value;
  const setLang = (l: Lang) => update((d) => void (d.lang = l));
  const setTheme = (th: ThemePref) => update((d) => void (d.theme = th));

  return (
    <div class="screen tool">
      <section class="block top">
        <PageHead label={t('appName')} title={t('moreTitle')} />

        <div class="card setting">
          <div class="setting-head">
            <Icon name="globe" />
            <span>{t('language')}</span>
          </div>
          <div class="segmented" role="radiogroup" aria-label={t('language')}>
            {(
              [
                ['en', 'English'],
                ['ur', 'اردو'],
              ] as const
            ).map(([code, label]) => (
              <button key={code} role="radio" aria-checked={lang.value === code} class={lang.value === code ? 'on' : ''}
                lang={code} onClick={() => setLang(code)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div class="card setting">
          <div class="setting-head">
            <Icon name={s.theme === 'night' ? 'moon' : 'sun'} />
            <span>{t('theme')}</span>
          </div>
          <div class="segmented" role="radiogroup" aria-label={t('theme')}>
            {(['auto', 'day', 'night'] as const).map((th) => (
              <button key={th} role="radio" aria-checked={s.theme === th} class={s.theme === th ? 'on' : ''} onClick={() => setTheme(th)}>
                {t(th === 'auto' ? 'themeAuto' : th === 'day' ? 'themeDay' : 'themeNight')}
              </button>
            ))}
          </div>
          <p class="setting-note">{t('themeAutoNote')}</p>
        </div>

        <div class="card info privacy">
          <Icon name="shield" size={24} />
          <div>
            <h3 class="card-title">{t('privacyTitle')}</h3>
            <p>{t('privacyBody')}</p>
          </div>
        </div>

        {!isStandalone() && (
          <div class="card info">
            <Icon name="download" size={24} />
            <div>
              <h3 class="card-title">{t('installTitle')}</h3>
              <p>{t('installBody')}</p>
              {installEvent.value && (
                <button class="btn-primary" onClick={promptInstall}>
                  {t('install')}
                </button>
              )}
            </div>
          </div>
        )}

        <div class="card info">
          <Icon name="heart" size={24} />
          <div>
            <h3 class="card-title">{t('shareApp')}</h3>
            <p>{t('sharePrompt')}</p>
            <button class="btn-primary" onClick={() => share(t('shareAppText'), t('copied'))}>
              <Icon name="share" size={17} />
              {t('share')}
            </button>
          </div>
        </div>

        <div class="card info">
          <Icon name="book" size={24} />
          <div>
            <h3 class="card-title">{t('sources')}</h3>
            <p>{t('sourcesBody')}</p>
          </div>
        </div>

        <div class="card info">
          <Icon name="refresh" size={24} />
          <div>
            <h3 class="card-title">{t('resetTitle')}</h3>
            <p>{t('resetBody')}</p>
            <button class="btn-quiet" onClick={() => confirm(t('resetConfirm')) && resetAll()}>
              {t('reset')}
            </button>
          </div>
        </div>

        <p class="fineprint">{t('disclaimer')}</p>
        <p class="fineprint made">
          {t('madeWith')} <span dir="ltr">v{__APP_VERSION__}</span>
        </p>
      </section>
    </div>
  );
}
