# Dar-e-Nijaat · درِ نجات

**The door of return.** A gentle, private companion for walking back to Allah. It covers tawbah, salah, letting go, the Qur'an, and keeping on walking. It is available in English and Urdu.

The word *nijaat* is trending because of a popular drama. This app is about what the word actually means: rescue and deliverance, and the door you walk through to come back to Allah.

🌐 **Live:** https://ashaabrizvi.github.io/nijaat/

## What's inside

| Screen | What it does |
|---|---|
| **Welcome** | Three warm intro slides and a language choice (English / اردو). |
| **Today** | Greeting with the Gregorian and Hijri date, the ayah of the day (share it, or see another), and a 6-item daily check-in where each tick lights a lantern. The streak is forgiving: one missed day never breaks it. |
| **Journey** | Five stations on a lantern-lit path. Each one has a reflection, practices to tick, an ayah, a hadith and a tip. |
| **Return** | The door of tawbah. Tapping *I'm returning* opens the door, leads a short guided breath with *Astaghfirullah*, then shows Sayyid al-Istighfar (Arabic, transliteration, meaning, virtue). It ends with a narration about mercy. |
| **Nijaat** | "What is Nijaat?" covers the word, the Qur'anic invitation to *an-najāh* (40:41), Yunus (AS) in the darkness (21:87–88), what nijaat is *not*, and "He comes running". |
| **More** | Language, day/night/auto theme, privacy, install, share, sources and reset. |

### Principles

- **Mercy first.** No shaming. Streaks forgive, and falling is part of the path.
- **Private by design.** No account, no analytics, no ads, and no requests to third parties (fonts are self-hosted). Everything is stored in `localStorage` on the device.
- **Sourced content.** Qur'anic text is generated from a dataset and never typed by hand. Every hadith is cited with its grading.
- **Works offline.** It's an installable PWA, and the whole app is precached.

## Tech

Vite + Preact + TypeScript + Preact Signals, with vite-plugin-pwa (Workbox). The same build serves the web today and is ready to wrap with Capacitor for Play Store / App Store in Phase 3.

```
src/
  content/   ayat (generated), hadith, stations, daily items, duas, essence, UI strings (en/ur)
  screens/   Welcome, Today, Journey, Return, Nijaat, More
  components/ Lantern, Door, Icon, cards, check rows
  lib/       store (localStorage + v1 migration), streak, i18n, theme, router, share, install
  styles/    tokens (day/night palettes), base, app
scripts/     build-ayat.mjs (Qur'an content), make-icons.mjs (PWA/store icons)
assets/      icon source + store icons
```

```bash
npm install
npm run dev          # local dev server
npm run build        # typecheck + production build → dist/
npm run content:ayat # regenerate src/content/ayat.generated.json
npm run icons        # re-render icons from assets/icon.svg
```

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy-pages.yml`).

## Content sources

- **Qur'an (Arabic):** Uthmani text from The Noble Qur'an Encyclopedia (quranenc.com), via the [`quran-json`](https://github.com/risan/quran-json) package (CC BY-SA 4.0).
- **English translation:** Saheeh International (tanzil.net).
- **Urdu translation:** Sayyid Abul A'la Maududi (tanzil.net).
- **Hadith:** references and gradings checked against the sunnah.com dataset. English is abridged from the sunnah.com translations.

To add or change an ayah, edit `SELECTION` in `scripts/build-ayat.mjs` and run `npm run content:ayat`.

### Content review (before major releases)

The Urdu renderings of the hadith, the dua's meaning, and all reflective copy were written for this app. They should be reviewed by a qualified scholar and a native Urdu editor before the store launch. When choosing hadith we prefer *sahih*, or *hasan* per the Darussalam grading. For example, Tirmidhi 2499 is graded *da'if* there, so the same meaning is cited from Ibn Majah 4251 (*hasan*).

## Roadmap

- **Phase 1 (this release):** redesign, restructure, bilingual, sourced content, offline PWA.
- **Phase 2:** prayer times (calculated on device), tasbih counter, dua library, a private journal, shareable quote-card images, gentle reminders.
- **Phase 3:** Capacitor apps for Play Store and App Store with local notifications, haptics and a widget.

---

Dar-e-Nijaat is an independent, non-profit project. It is not affiliated with any TV drama, channel or production house.
