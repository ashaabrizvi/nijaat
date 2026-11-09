import { signal } from '@preact/signals';

export type Tab = 'today' | 'journey' | 'return' | 'nijaat' | 'more';
const TABS: Tab[] = ['today', 'journey', 'return', 'nijaat', 'more'];

export interface Route {
  tab: Tab;
  /** Sub-page: a station on the journey tab, a tool on the more tab. */
  sub?: string;
}

function parse(): Route {
  const [tab, sub] = location.hash.replace(/^#\/?/, '').split('/');
  return TABS.includes(tab as Tab) ? { tab: tab as Tab, sub: sub || undefined } : { tab: 'today' };
}

export const route = signal<Route>(parse());

function sync(scroll: boolean) {
  const prev = route.value;
  route.value = parse();
  const r = route.value;
  // Station sheets overlay the journey list, so keep its scroll; tool pages are full pages.
  if (scroll && (prev.tab !== r.tab || (r.tab === 'more' && prev.sub !== r.sub))) window.scrollTo({ top: 0 });
}

// Back/forward buttons (incl. Android back) and manual hash edits.
window.addEventListener('popstate', () => sync(true));
window.addEventListener('hashchange', () => sync(true));

/** Navigate inside the app. Entries we push are marked so `back` never leaves the app. */
export function go(tab: Tab, sub?: string) {
  const next = `#${tab}${sub ? `/${sub}` : ''}`;
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
