import { render } from 'preact';
import { registerSW } from 'virtual:pwa-register';

// Self-hosted fonts: no requests to Google, works fully offline.
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/amiri-quran/400.css';
import '@fontsource/noto-nastaliq-urdu/400.css';
import '@fontsource/noto-nastaliq-urdu/600.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import './styles/tools.css';

import './lib/theme';
import './lib/i18n';
import './lib/install';
import './lib/reminders';
import { App } from './app';

render(<App />, document.getElementById('app')!);

registerSW({ immediate: true });
