import { signal } from '@preact/signals';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/** Android/desktop Chrome's install prompt, captured for our own button. */
export const installEvent = signal<BeforeInstallPromptEvent | null>(null);

export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installEvent.value = e as BeforeInstallPromptEvent;
});
window.addEventListener('appinstalled', () => (installEvent.value = null));

export async function promptInstall() {
  const e = installEvent.value;
  if (!e) return;
  await e.prompt();
  await e.userChoice;
  installEvent.value = null;
}
