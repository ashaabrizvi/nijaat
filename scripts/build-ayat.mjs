// Generates src/content/ayat.generated.json from the `quran-json` package.
//
// Every ayah in the app comes from this file: Qur'anic text is never typed
// by hand. Sources (see README):
//   Arabic : Uthmani text, The Noble Qur'an Encyclopedia (quranenc.com)
//   English: Saheeh International (tanzil.net)
//   Urdu   : Abul A'la Maududi (tanzil.net)
//
// Run: npm run content:ayat

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve('quran-json/package.json'));
const here = dirname(fileURLToPath(import.meta.url));

const en = JSON.parse(readFileSync(join(pkgDir, 'dist/quran_en.json'), 'utf8'));
const ur = JSON.parse(readFileSync(join(pkgDir, 'dist/quran_ur.json'), 'utf8'));
const tr = JSON.parse(readFileSync(join(pkgDir, 'dist/quran_transliteration.json'), 'utf8'));

// id: stable key used by the app. ref: "surah:from[-to]". tags: where it is used.
const SELECTION = [
  // Mercy & return: the daily pool
  { id: 'zumar-53', ref: '39:53', tags: ['daily', 'hero'] },
  { id: 'baqarah-186', ref: '2:186', tags: ['daily'] },
  { id: 'hijr-49', ref: '15:49', tags: ['daily'] },
  { id: 'imran-135', ref: '3:135', tags: ['daily'] },
  { id: 'nisa-110', ref: '4:110', tags: ['daily', 'tawbah'] },
  { id: 'furqan-70', ref: '25:70', tags: ['daily'] },
  { id: 'nisa-27', ref: '4:27', tags: ['daily'] },
  { id: 'nisa-28', ref: '4:28', tags: ['daily'] },
  { id: 'ghafir-60', ref: '40:60', tags: ['daily'] },
  { id: 'rad-28', ref: '13:28', tags: ['daily'] },
  { id: 'sharh-5-6', ref: '94:5-6', tags: ['daily'] },
  { id: 'qaf-16', ref: '50:16', tags: ['daily'] },
  { id: 'baqarah-152', ref: '2:152', tags: ['daily'] },
  { id: 'imran-31', ref: '3:31', tags: ['daily'] },
  { id: 'taha-82', ref: '20:82', tags: ['daily'] },
  { id: 'shura-25', ref: '42:25', tags: ['daily'] },
  { id: 'yusuf-87', ref: '12:87', tags: ['daily'] },
  { id: 'ankabut-69', ref: '29:69', tags: ['daily', 'walk'] },
  { id: 'duha-3', ref: '93:3', tags: ['daily'] },
  { id: 'baqarah-153', ref: '2:153', tags: ['daily'] },
  { id: 'nahl-97', ref: '16:97', tags: ['daily'] },
  { id: 'araf-23', ref: '7:23', tags: ['daily', 'dua'] },
  { id: 'anbiya-87-88', ref: '21:87-88', tags: ['daily', 'dua', 'essence'] },
  { id: 'qasas-16', ref: '28:16', tags: ['daily', 'dua'] },
  { id: 'hud-114', ref: '11:114', tags: ['daily'] },
  { id: 'qamar-17', ref: '54:17', tags: ['daily'] },
  { id: 'isra-82', ref: '17:82', tags: ['daily', 'quran'] },
  { id: 'yunus-57', ref: '10:57', tags: ['daily'] },
  { id: 'baqarah-45', ref: '2:45', tags: ['daily'] },
  // Station & essence verses
  { id: 'taha-14', ref: '20:14', tags: ['salah'] },
  { id: 'shams-9-10', ref: '91:9-10', tags: ['leave'] },
  { id: 'ghafir-41', ref: '40:41', q: true, tags: ['essence'] },
  { id: 'rahman-13', ref: '55:13', q: true, tags: ['closing'] },
  // Qur'anic duas for the dua library (Phase 2)
  { id: 'imran-8', ref: '3:8', tags: ['dua'] },
  { id: 'baqarah-201', ref: '2:201', tags: ['dua'] },
  { id: 'taha-25-28', ref: '20:25-28', tags: ['dua'] },
  { id: 'furqan-74', ref: '25:74', tags: ['dua'] },
  { id: 'muminun-118', ref: '23:118', tags: ['dua'] },
  { id: 'kahf-10', ref: '18:10', tags: ['dua'] },
  { id: 'ibrahim-41', ref: '14:41', tags: ['dua'] },
  { id: 'qasas-24', ref: '28:24', tags: ['dua'] },
];

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const toArabicDigits = (n) => String(n).replace(/\d/g, (d) => AR_DIGITS[+d]);
// Strip pause/section ornaments that don't belong mid-card (rub el hizb, sajdah mark).
const clean = (s) => s.replace(/[۞۩]/g, '').replace(/\s+/g, ' ').trim();
// The QuranEnc text follows the King Fahd (KFGQPC) font encoding, which uses
// U+0657 / U+065E / U+0656 for the *open* tanween marks (fathatan /
// dammatan / kasratan). Standard Unicode has dedicated characters for these
// (U+08F0 / U+08F1 / U+08F2); map them so any Qur'an font (Amiri Quran here)
// draws the right mark instead of an inverted damma / subscript alef / tofu.
const OPEN_TANWEEN = { '\u0657': '\u08F0', '\u065E': '\u08F1', '\u0656': '\u08F2' };
const arabic = (s) => clean(s).replace(/[\u0656\u0657\u065E]/g, (c) => OPEN_TANWEEN[c]);
// Source translations omit the closing full stop; add one so joined ranges read well.
const sentence = (s, stop) => (/[.!?"'”’)۔؟]$/.test(s) ? s : s + stop);

const out = [];
for (const sel of SELECTION) {
  const [s, range] = sel.ref.split(':');
  const [from, to = from] = range.split('-').map(Number);
  const surahEn = en[Number(s) - 1];
  const surahUr = ur[Number(s) - 1];
  const ar = [], tEn = [], tUr = [], tTr = [];
  for (let v = from; v <= to; v++) {
    const ve = surahEn.verses[v - 1];
    const vu = surahUr.verses[v - 1];
    if (!ve || ve.id !== v || vu.id !== v) throw new Error(`Missing ${s}:${v}`);
    ar.push(`${arabic(ve.text)}\u00A0﴿${toArabicDigits(v)}﴾`);
    tEn.push(sentence(clean(ve.translation), sel.q && v === to ? '?' : '.'));
    tTr.push(tr[Number(s) - 1].verses[v - 1].transliteration.trim().replace(/AA/g, 'ʿ')); // Tanzil writes ʿayn as AA
    tUr.push(sentence(clean(vu.translation), sel.q && v === to ? '؟' : '۔'));
  }
  out.push({
    id: sel.id,
    surah: Number(s),
    from,
    to,
    surahName: { en: surahEn.transliteration, ar: surahEn.name },
    ar: ar.join(' '),
    en: tEn.join(' '),
    ur: tUr.join(' '),
    translit: tTr.join(' … '),
    tags: sel.tags,
  });
}

const target = join(here, '../src/content/ayat.generated.json');
writeFileSync(target, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${out.length} ayat → ${target}`);
for (const a of out) console.log(`${a.surah}:${a.from}${a.to !== a.from ? '-' + a.to : ''}`.padEnd(9), String(a.en.length).padStart(4), a.en.slice(0, 90));

// ---------------------------------------------------------------------------
// Excerpts: the dua/dhikr phrase inside a longer verse (used by the tasbih).
// Each piece is cut from the source text at a start marker, so nothing is
// retyped. `ar` keeps the marker; `en`/`ur` start right after their marker.
const EXCERPTS = [
  { id: 'musa-faqir', ref: '28:24', ar: 'رَبِّ إِنِّي', en: '"', ur: '"' },
  { id: 'yunus', ref: '21:87', ar: 'لَّآ إِلَٰهَ', en: '"', ur: '"' },
  { id: 'hasbuna', ref: '3:173', ar: 'حَسۡبُنَا', en: 'they said, "', ur: 'جواب دیا کہ ' },
  { id: 'hasbiya', ref: '9:129', ar: 'حَسۡبِيَ', en: 'say, "', ur: '"' },
  { id: 'atina', ref: '2:201', ar: 'رَبَّنَآ', en: '"', ur: 'کہتا ہے کہ ' },
  { id: 'warham', ref: '23:118', ar: 'رَّبِّ', en: '"', ur: '"' },
  { id: 'zidni', ref: '20:114', ar: 'رَّبِّ زِدۡنِي', en: 'say, "', ur: 'دُعا کرو کہ ' },
  { id: 'zalamna', ref: '7:23', ar: 'رَبَّنَا', en: '"', ur: '"' },
];

// Compare in NFC so diacritic order (e.g. shadda + kasra) can't break a match;
// NFC is canonically equivalent, so the rendered text is identical.
const cut = (raw, rawMarker, keep, id) => {
  const text = raw.normalize('NFC');
  const marker = rawMarker.normalize('NFC');
  const i = text.indexOf(marker);
  if (i < 0) throw new Error(`Marker not found for ${id}: ${marker}`);
  return text.slice(keep ? i : i + marker.length).trim();
};

const excerpts = EXCERPTS.map((x) => {
  const [s, v] = x.ref.split(':').map(Number);
  const ve = en[s - 1].verses[v - 1];
  const vu = ur[s - 1].verses[v - 1];
  return {
    id: x.id,
    surah: s,
    from: v,
    to: v,
    surahName: { en: en[s - 1].transliteration, ar: en[s - 1].name },
    ar: cut(arabic(ve.text), x.ar, true, x.id),
    en: sentence(cut(clean(ve.translation), x.en, false, x.id), '.'),
    ur: sentence(cut(clean(vu.translation), x.ur, false, x.id), '۔'),
  };
});
const exTarget = join(here, '../src/content/excerpts.generated.json');
writeFileSync(exTarget, JSON.stringify(excerpts, null, 2) + '\n');
console.log(`Wrote ${excerpts.length} excerpts → ${exTarget}`);
for (const x of excerpts) console.log(x.id.padEnd(11), x.ar, '|', x.en, '|', x.ur);
