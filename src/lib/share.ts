import { signal } from '@preact/signals';

export const toast = signal<string | null>(null);
let timer: number | undefined;

export function showToast(msg: string) {
  toast.value = msg;
  clearTimeout(timer);
  timer = window.setTimeout(() => (toast.value = null), 2600);
}

export const appUrl = () => new URL('./', location.href).href;

/** Native share sheet where available, clipboard otherwise. */
export async function share(text: string, copiedMsg: string): Promise<void> {
  const url = appUrl();
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Dar-e-Nijaat', text, url });
      return;
    }
  } catch (e) {
    if ((e as DOMException)?.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(`${text}\n\n${url}`);
    showToast(copiedMsg);
  } catch {
    /* nothing more we can do */
  }
}

/** A tiny, gentle tap on devices that support it. */
export function haptic(ms = 12) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* unsupported */
  }
}
