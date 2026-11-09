import { t } from '../lib/i18n';
import { back, type Tab } from '../lib/router';
import { Icon } from './Icon';

/** Header for a sub-page: back button, label, title, optional intro. */
export function PageHead({ label, title, sub, from = 'more' }: { label?: string; title: string; sub?: string; from?: Tab }) {
  return (
    <header class="page-head">
      <button class="icon-btn static" onClick={() => back(from)} aria-label={t('back')}>
        <Icon name="chevron" size={20} class="icon-back" flip />
      </button>
      <div>
        {label && <div class="section-label">{label}</div>}
        <h1 class="section-title">{title}</h1>
        {sub && <p class="section-sub">{sub}</p>}
      </div>
    </header>
  );
}
