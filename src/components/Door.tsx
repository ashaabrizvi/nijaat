/** The arched door of tawbah. Its leaves swing open when `open` is set. */
export function Door({ open }: { open: boolean }) {
  return (
    <svg class={`door ${open ? 'open' : ''}`} viewBox="0 0 200 250" role="img" aria-label="An arched door">
      <defs>
        <radialGradient id="door-light" cx="50%" cy="62%" r="65%">
          <stop offset="0%" stop-color="#FFF6DD" />
          <stop offset="45%" stop-color="#FBDFA0" />
          <stop offset="100%" stop-color="#E9B866" />
        </radialGradient>
      </defs>
      {/* glow behind the frame */}
      <ellipse class="door-aura" cx="100" cy="140" rx="98" ry="110" />
      {/* frame */}
      <path class="door-frame" d="M18 244 V112 A82 82 0 0 1 182 112 V244 Z" />
      <path class="door-frame-inner" d="M28 244 V114 A72 72 0 0 1 172 114 V244 Z" />
      {/* light through the doorway */}
      <path d="M36 244 V116 A64 64 0 0 1 164 116 V244 Z" fill="url(#door-light)" />
      <g class="door-rays">
        <path d="M100 244 L60 120 M100 244 L100 70 M100 244 L140 120 M100 244 L40 180 M100 244 L160 180" />
      </g>
      {/* leaves */}
      <g class="door-leaf door-leaf-l">
        <path class="door-wood" d="M36 244 V116 A64 64 0 0 1 100 52 V244 Z" />
        <path class="door-carve" d="M48 232 V124 A52 52 0 0 1 88 70 V232 Z" />
        <path class="door-carve" d="M58 150 h20 M58 190 h20" />
        <circle class="door-knob" cx="91" cy="160" r="3.2" />
      </g>
      <g class="door-leaf door-leaf-r">
        <path class="door-wood" d="M164 244 V116 A64 64 0 0 0 100 52 V244 Z" />
        <path class="door-carve" d="M152 232 V124 A52 52 0 0 0 112 70 V232 Z" />
        <path class="door-carve" d="M122 150 h20 M122 190 h20" />
        <circle class="door-knob" cx="109" cy="160" r="3.2" />
      </g>
      {/* eight-point star crowning the arch */}
      <g class="door-star" transform="translate(100 26)">
        <rect x="-9" y="-9" width="18" height="18" rx="1.5" />
        <rect x="-9" y="-9" width="18" height="18" rx="1.5" transform="rotate(45)" />
        <circle r="3.4" class="door-star-core" />
      </g>
      {/* step */}
      <rect class="door-step" x="8" y="242" width="184" height="8" rx="4" />
    </svg>
  );
}
