import type { ComponentChildren } from 'preact';
import { ayahRef } from '../content/ayat';
import type { Ayah, Hadith } from '../content/types';
import { lang, tl } from '../lib/i18n';

export function AyahCard({ a, children, compact }: { a: Ayah; children?: ComponentChildren; compact?: boolean }) {
  const l = lang.value;
  return (
    <figure class={`ayah-card ${compact ? 'compact' : ''}`}>
      <p class="ayah-ar" lang="ar" dir="rtl">
        {a.ar}
      </p>
      <blockquote class="ayah-tr" dir={l === 'ur' ? 'rtl' : 'ltr'}>
        {l === 'ur' ? a.ur : `“${a.en}”`}
      </blockquote>
      <figcaption class="ayah-ref">
        <bdi>{ayahRef(a, l)}</bdi>
      </figcaption>
      {children}
    </figure>
  );
}

export function HadithCard({ h }: { h: Hadith }) {
  return (
    <figure class="hadith-card">
      <blockquote>{tl(h.text)}</blockquote>
      <figcaption>
        <bdi>{tl(h.source)}</bdi>
        <span class="grade">{tl(h.grade)}</span>
      </figcaption>
    </figure>
  );
}

export function SectionHead({ label, title, sub }: { label?: string; title?: string; sub?: string }) {
  return (
    <header class="section-head">
      {label && <div class="section-label">{label}</div>}
      {title && <h2 class="section-title">{title}</h2>}
      {sub && <p class="section-sub">{sub}</p>}
    </header>
  );
}

/** The daily ayah text, formatted for sharing to WhatsApp / Instagram. */
export function ayahShareText(a: Ayah): string {
  const l = lang.value;
  return `${a.ar}\n\n${l === 'ur' ? a.ur : `“${a.en}”`}\n— ${ayahRef(a, l)}`;
}
