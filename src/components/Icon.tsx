const PATHS: Record<string, string> = {
  heart: 'M12 20.5s-7-4.4-9.3-8.6C1 8.4 2.7 5 6.2 5c2 0 3.4 1.1 4.3 2.4.5.7 2.5.7 3 0C14.4 6.1 15.8 5 17.8 5c3.5 0 5.2 3.4 3.5 6.9C19 16.1 12 20.5 12 20.5z',
  mosque: 'M3 21h18M6 21v-7a6 6 0 0112 0v7M12 3.5v2.5M10 21v-3a2 2 0 014 0v3M12 6c-1 .9-1.5 1.6-1.5 2.2',
  leaf: 'M12 21.5c5-3 7.5-6.5 7.5-11.5a7.5 7.5 0 00-15 0c0 5 2.5 8.5 7.5 11.5zM12 15V7.5M12 11.5l2.5-2M12 13.5l-2.5-2',
  book: 'M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 001.5-1.5v-13z',
  path: 'M5 20c0-4 4-4 7-6s3-6 7-6M5 20h.01M19 8h.01M10 5.5l2-2 2 2M12 3.5V9',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z',
  door: 'M5 21V10a7 7 0 0114 0v11M3 21h18M14.5 14v1.5',
  lantern: 'M12 2v2M9 6.5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5M7.5 6.5h9l-1 12h-7l-1-12zM9.5 18.5L10 21h4l.5-2.5M12 10c-1 1.2-1.5 2.3-1.5 3.2a1.5 1.5 0 003 0c0-.9-.5-2-1.5-3.2z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  share: 'M12 15V3.5M8 7l4-4 4 4M5 12v7.5A1.5 1.5 0 006.5 21h11a1.5 1.5 0 001.5-1.5V12',
  chevron: 'M9 6l6 6-6 6',
  check: 'M20 6L9 17l-5-5',
  close: 'M6 6l12 12M18 6L6 18',
  refresh: 'M20 11a8 8 0 10-2.3 5.7M20 4v7h-7',
  star: 'M12 2.5l2.6 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.6 1.6-6.7-5.2-4.5 6.9-.6z',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  shield: 'M12 21s-7.5-3-7.5-9.5V5.5L12 3l7.5 2.5v6C19.5 18 12 21 12 21z',
  download: 'M12 3.5V15M8 11l4 4 4-4M5 19.5h14',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z',
};

interface Props {
  name: keyof typeof PATHS | string;
  size?: number;
  class?: string;
  /** Mirror directional icons in RTL. */
  flip?: boolean;
}

export function Icon({ name, size = 22, class: cls = '', flip }: Props) {
  return (
    <svg
      class={`icon ${flip ? 'icon-flip' : ''} ${cls}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name] ?? PATHS.star} />
    </svg>
  );
}
