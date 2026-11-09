import { signal } from '@preact/signals';

export type Tab = 'today' | 'journey' | 'return' | 'nijaat' | 'more';
const TABS: Tab[] = ['today', 'journey', 'return', 'nijaat', 'more'];

export interface Route {
  tab: Tab;
  /** Open station on the journey tab. */
  station?: string;
}

function parse(): Route {
  const [tab, station] = location.hash.replace(/^#\/?/, '').split('/');
  return TABS.includes(tab as Tab) ? { tab: tab as Tab, station: station || undefined } : { tab: 'today' };
}

export const route = signal<Route>(parse());

function sync(scroll: boolean) {
  const prev = route.value;
  route.value = parse();
  if (scroll && prev.tab !== route.value.tab) window.scrollTo({ top: 0 });
}

// Back/forward buttons (incl. Android back) and manual hash edits.
window.addEventListener('popstate', () => sync(true));
window.addEventListener('hashchange', () => sync(true));

/** Navigate inside the app. Entries we push are marked so `back` never leaves the app. */
export function go(tab: Tab, station?: string) {
  const next = `#${tab}${station ? `/${station}` : ''}`;
  if (location.hash === next) return;
  history.pushState({ app: true }, '', next);
  sync(true);
}

export function back(fallback: Tab) {
  if ((history.state as { app?: boolean } | null)?.app) {
    history.back();
  } else {
    history.replaceState(null, '', `#${fallback}`);
    sync(false);
  }
}
