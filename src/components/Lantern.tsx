interface Props {
  lit: boolean;
  size?: number;
  /** Stagger the flicker so a row of lanterns doesn't pulse in sync. */
  delay?: number;
}

/** A small fanoos (Ramadan-style lantern) that glows when lit. */
export function Lantern({ lit, size = 34, delay = 0 }: Props) {
  return (
    <svg
      class={`lantern ${lit ? 'lit' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      width={size * 0.66}
      height={size}
      viewBox="0 0 40 60"
      aria-hidden="true"
    >
      <circle class="lantern-halo" cx="20" cy="32" r="18" />
      <circle class="lantern-metal-stroke" cx="20" cy="4" r="2.6" fill="none" stroke-width="1.6" />
      <path class="lantern-metal" d="M11.5 15 Q20 5 28.5 15 Z" />
      <rect class="lantern-metal" x="10" y="14.5" width="20" height="3.5" rx="1.2" />
      <path class="lantern-glass" d="M11 18 L29 18 L27 44 L13 44 Z" />
      <path
        class="lantern-metal-stroke"
        d="M16.2 41 V28.5 a3.8 3.8 0 0 1 7.6 0 V41 M20 18 V22"
        fill="none"
        stroke-width="1.3"
      />
      <path class="lantern-flame" d="M20 28.5 c-2.6 3.4 -2.8 7 0 8.2 c2.8 -1.2 2.6 -4.8 0 -8.2 z" />
      <rect class="lantern-metal" x="12" y="44" width="16" height="3.5" rx="1.2" />
      <path class="lantern-metal" d="M15 47.5 L25 47.5 L22 53.5 L18 53.5 Z" />
      <circle class="lantern-metal" cx="20" cy="56" r="1.6" />
    </svg>
  );
}
