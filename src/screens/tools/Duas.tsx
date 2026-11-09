import { useState } from 'preact/hooks';
import { Icon } from '../../components/Icon';
import { PageHead } from '../../components/PageHead';
import { openQuote } from '../../components/QuoteSheet';
import { ayah, ayahRef } from '../../content/ayat';
import { DUA_LIBRARY, type DuaEntry } from '../../content/dua-library';
import { lang, t, tl } from '../../lib/i18n';
import { showToast } from '../../lib/share';

interface View {
  ar: string;
  translit: string;
  meaning: string;
  source: string;
  grade?: string;
  note?: string;
}

function view(d: DuaEntry): View {
  const l = lang.value;
  if (d.kind === 'quran') {
    const a = ayah(d.ayahId);
    return { ar: a.ar, translit: a.translit, meaning: a[l], source: ayahRef(a, l), note: d.note && tl(d.note) };
  }
  return { ar: d.ar, translit: d.translit, meaning: tl(d.meaning), source: tl(d.source), grade: tl(d.grade), note: d.note && tl(d.note) };
}

function DuaCard({ d }: { d: DuaEntry }) {
  const v = view(d);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${v.ar}\n\n${v.translit}\n\n${v.meaning}\n(${v.source})`);
      showToast(t('copiedDua'));
    } catch {
      /* ignore */
    }
  };
  return (
    <article class="card dua-item">
      {v.note && <p class="dua-note">{v.note}</p>}
      <p class="dua-ar" lang="ar" dir="rtl">
        {v.ar}
      </p>
      <details class="dua-more">
        <summary>{t('transliteration')}</summary>
        <p class="dua-translit" dir="ltr">
          {v.translit}
        </p>
      </details>
      <p class="dua-meaning">{v.meaning}</p>
      <div class="dua-foot">
        <span class="src">
          <bdi>{v.source}</bdi>
          {v.grade && <span class="grade">{v.grade}</span>}
        </span>
        <span class="dua-actions">
          <button class="icon-btn static sm" onClick={copy} aria-label={t('copyDua')}>
            <Icon name="copy" size={16} />
          </button>
          <button class="icon-btn static sm" aria-label={t('shareImage')}
            onClick={() => openQuote({ ar: v.ar, text: v.meaning, ref: v.source, lang: lang.value })}>
            <Icon name="image" size={16} />
          </button>
        </span>
      </div>
    </article>
  );
}

export function Duas() {
  const [cat, setCat] = useState<string | null>(null);
  const cats = cat ? DUA_LIBRARY.filter((c) => c.id === cat) : DUA_LIBRARY;
  return (
    <div class="screen tool">
      <section class="block top">
        <PageHead label={t('toolsLabel')} title={t('toolDuas')} sub={t('duasSub')} />
        <div class="chip-scroll">
          {DUA_LIBRARY.map((c) => (
            <button key={c.id} class={`cat-chip ${cat === c.id ? 'on' : ''}`} aria-pressed={cat === c.id}
              onClick={() => setCat(cat === c.id ? null : c.id)}>
              <Icon name={c.icon} size={16} />
              {tl(c.title)}
            </button>
          ))}
        </div>
        {cats.map((c) => (
          <section key={c.id} class="dua-cat">
            <h2 class="section-title sm">{tl(c.title)}</h2>
            <p class="section-sub">{tl(c.sub)}</p>
            {c.duas.map((d) => (
              <DuaCard key={d.id} d={d} />
            ))}
          </section>
        ))}
      </section>
    </div>
  );
}
