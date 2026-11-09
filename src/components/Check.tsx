import type { ComponentChildren } from 'preact';
import { Icon } from './Icon';

interface Props {
  checked: boolean;
  onChange: () => void;
  children: ComponentChildren;
  /** Leading badge (number / lantern). */
  lead?: ComponentChildren;
  class?: string;
}

/** A large, friendly tick row. The native checkbox stays for accessibility. */
export function CheckRow({ checked, onChange, children, lead, class: cls = '' }: Props) {
  return (
    <label class={`check-row ${checked ? 'checked' : ''} ${cls}`}>
      {lead && <span class="check-lead">{lead}</span>}
      <span class="check-text">{children}</span>
      <input type="checkbox" class="sr-only" checked={checked} onChange={onChange} />
      <span class="check-box" aria-hidden="true">
        <Icon name="check" size={16} />
      </span>
    </label>
  );
}
