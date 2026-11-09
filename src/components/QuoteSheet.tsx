import { signal } from '@preact/signals';
import { useEffect, useState } from 'preact/hooks';
import { t } from '../lib/i18n';
import { renderCard, type CardFormat, type CardTheme, type QuoteContent } from '../lib/quotecard';
import { appUrl, haptic, showToast } from '../lib/share';
import { theme } from '../lib/theme';
import { Icon } from './Icon';

/** Set this to open the share-as-image sheet from anywhere. */
export const quote = signal<QuoteContent | null>(null);

export function openQuote(c: QuoteContent) {
  quote.value = c;
}

function textOf(c: QuoteContent) {
  return `${c.ar ? `${c.ar}\n\n` : ''}${c.text}\n(${c.ref})\n\n${appUrl()}`;
}

export function QuoteSheet() {
  const c = quote.value;
  const [format, setFormat] = useState<CardFormat>('story');
  const [th, setTh] = useState<CardTheme>(theme.value);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!c) return;
    let alive = true;
    setBlob(null);
    renderCard(c, format, th).then((b) => {
      if (!alive) return;
      setBlob(b);
      setUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(b);
      });
    });
    return () => void (alive = false);
  }, [c, format, th]);

  useEffect(() => {
    if (!c) return;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [c]);

  if (!c) return null;
  const close = () => (quote.value = null);
  const fileName = `dar-e-nijaat-${format}.png`;

  const shareImage = async () => {
    if (!blob) return;
    haptic(15);
    const file = new File([blob], fileName, { type: 'image/png' });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: appUrl() });
        return;
      }
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
    }
    save();
  };

  const save = () => {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(textOf(c));
      showToast(t('copied'));
    } catch {
      /* ignore */
    }
  };

  return (
    <div class="modal" role="dialog" aria-modal="true" aria-label={t('shareCardTitle')} onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={(e) => e.key === 'Escape' && close()}>
      <div class="modal-card">
        <header class="modal-head">
          <h2 class="card-title">{t('shareCardTitle')}</h2>
          <button class="icon-btn static" onClick={close} aria-label={t('close')}>
            <Icon name="close" size={18} />
          </button>
        </header>
        <div class={`card-preview ${format}`}>
          {url && blob ? <img src={url} alt="" /> : <span class="making">{t('making')}</span>}
        </div>
        <div class="modal-opts">
          <div class="segmented">
            {(['story', 'square'] as const).map((f) => (
              <button key={f} class={format === f ? 'on' : ''} aria-pressed={format === f} onClick={() => setFormat(f)}>
                {t(f)}
              </button>
            ))}
          </div>
          <div class="segmented">
            {(['day', 'night'] as const).map((x) => (
              <button key={x} class={th === x ? 'on' : ''} aria-pressed={th === x} onClick={() => setTh(x)} aria-label={t(x === 'day' ? 'themeDay' : 'themeNight')}>
                <Icon name={x === 'day' ? 'sun' : 'moon'} size={17} />
              </button>
            ))}
          </div>
        </div>
        <button class="btn-primary wide" onClick={shareImage} disabled={!blob}>
          <Icon name="share" size={18} />
          {t('shareImage')}
        </button>
        <div class="modal-row">
          <button class="btn-ghost" onClick={save} disabled={!blob}>
            <Icon name="download" size={16} />
            {t('saveImage')}
          </button>
          <button class="btn-ghost" onClick={copy}>
            <Icon name="copy" size={16} />
            {t('copyText')}
          </button>
        </div>
      </div>
    </div>
  );
}
