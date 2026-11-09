import { SectionHead } from '../components/Cards';
import { Icon } from '../components/Icon';
import { t } from '../lib/i18n';
import { go, route } from '../lib/router';
import { Duas } from './tools/Duas';
import { Journal } from './tools/Journal';
import { NextPrayerCard, Prayer } from './tools/Prayer';
import { Tasbih } from './tools/Tasbih';
import { Settings } from './Settings';

const TOOLS = [
  { id: 'prayer', icon: 'mosque', title: 'toolPrayer', sub: 'toolPrayerSub', tone: 'sage' },
  { id: 'tasbih', icon: 'beads', title: 'toolTasbih', sub: 'toolTasbihSub', tone: 'gold' },
  { id: 'duas', icon: 'hands', title: 'toolDuas', sub: 'toolDuasSub', tone: 'rose' },
  { id: 'journal', icon: 'pen', title: 'toolJournal', sub: 'toolJournalSub', tone: 'sky' },
] as const;

/** The "More" tab: a hub of companions, plus settings. */
export function More() {
  switch (route.value.sub) {
    case 'prayer':
      return <Prayer />;
    case 'tasbih':
      return <Tasbih />;
    case 'duas':
      return <Duas />;
    case 'journal':
      return <Journal />;
    case 'settings':
      return <Settings />;
  }

  return (
    <div class="screen more-hub">
      <section class="block top">
        <SectionHead label={t('toolsLabel')} title={t('toolsTitle')} />
        <div class="tool-grid">
          {TOOLS.map((x) => (
            <button key={x.id} class={`card tool-tile tone-${x.tone}`} onClick={() => go('more', x.id)}>
              <span class="tool-icon">
                <Icon name={x.icon} size={26} />
              </span>
              <span class="tool-title">{t(x.title)}</span>
              <span class="tool-sub">{t(x.sub)}</span>
            </button>
          ))}
        </div>

        <div class="hub-gap" />
        <NextPrayerCard compact />

        <button class="card row-link" onClick={() => go('more', 'settings')}>
          <Icon name="gear" size={22} />
          <span>{t('settings')}</span>
          <Icon name="chevron" size={18} flip />
        </button>
        <p class="fineprint">
          <Icon name="shield" size={14} /> {t('privacyBody')}
        </p>
      </section>
    </div>
  );
}
