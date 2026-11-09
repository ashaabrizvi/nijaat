import { Icon } from './components/Icon';
import { QuoteSheet } from './components/QuoteSheet';
import { t } from './lib/i18n';
import { go, route, type Tab } from './lib/router';
import { toast } from './lib/share';
import { state } from './lib/store';
import { Journey } from './screens/Journey';
import { More } from './screens/More';
import { Nijaat } from './screens/Nijaat';
import { Return } from './screens/Return';
import { Today } from './screens/Today';
import { Welcome } from './screens/Welcome';
import { theme } from './lib/theme';

const NAV: { tab: Tab; icon: string; label: Parameters<typeof t>[0] }[] = [
  { tab: 'today', icon: 'sun', label: 'navToday' },
  { tab: 'journey', icon: 'path', label: 'navJourney' },
  { tab: 'return', icon: 'door', label: 'navReturn' },
  { tab: 'nijaat', icon: 'lantern', label: 'navNijaat' },
  { tab: 'more', icon: 'more', label: 'navMore' },
];

export function App() {
  if (!state.value.onboarded) return <Welcome />;

  const tab = route.value.tab;
  return (
    <div class="shell">
      <main class="main" id="main">
        {tab === 'today' && <Today />}
        {tab === 'journey' && <Journey />}
        {tab === 'return' && <Return />}
        {tab === 'nijaat' && <Nijaat />}
        {tab === 'more' && <More />}
      </main>

      <nav class="nav" aria-label="Main">
        {NAV.map((n) => (
          <button
            key={n.tab}
            class={`nav-item ${n.tab === 'return' ? 'nav-door' : ''} ${tab === n.tab ? 'on' : ''}`}
            aria-current={tab === n.tab ? 'page' : undefined}
            onClick={() => go(n.tab)}
          >
            <span class="nav-icon">
              <Icon name={n.tab === 'today' && theme.value === 'night' ? 'moon' : n.icon} size={n.tab === 'return' ? 26 : 22} />
            </span>
            <span class="nav-label">{t(n.label)}</span>
          </button>
        ))}
      </nav>

      <QuoteSheet />
      {toast.value && (
        <div class="toast" role="status">
          {toast.value}
        </div>
      )}
    </div>
  );
}
