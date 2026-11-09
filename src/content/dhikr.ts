import { ayahRef } from './ayat';
import { DUA_LIBRARY } from './dua-library';
import excerpts from './excerpts.generated.json';
import type { L, Lang } from './types';

/*
 * Tasbih adhkar.
 *  - 'quran': the phrase is cut from the verified verse text by
 *    scripts/build-ayat.mjs (excerpts.generated.json), never retyped.
 *  - 'dua':   reuses a Sunnah dua from the dua library (Arabic from sunnah.com).
 *  - 'text':  short adhkar; their virtue notes cite sunnah.com references.
 */

interface Excerpt {
  id: string;
  surah: number;
  from: number;
  to: number;
  surahName: { en: string; ar: string };
  ar: string;
  en: string;
  ur: string;
}
const EX = new Map((excerpts as Excerpt[]).map((x) => [x.id, x]));

type Base = { id: string; group: GroupId; label: string; translit: string; virtue?: L };
export type DhikrDef = Base &
  ({ kind: 'quran'; excerptId: string } | { kind: 'dua'; duaId: string } | { kind: 'text'; ar: string; meaning: L; source?: L });

export type GroupId = 'daily' | 'forgive' | 'asking';
export const DHIKR_GROUPS: { id: GroupId; title: L }[] = [
  { id: 'daily', title: { en: 'Daily remembrance', ur: 'روزانہ کا ذکر' } },
  { id: 'forgive', title: { en: 'Seeking forgiveness', ur: 'استغفار' } },
  { id: 'asking', title: { en: 'Asking Allah', ur: 'اللہ سے مانگنا' } },
];

const afterSalah: L = {
  en: 'After every prayer: 33 of each, then complete 100 with Lā ilāha illallāhu waḥdahu… (Sahih Muslim 597)',
  ur: 'ہر نماز کے بعد: ہر ایک ۳۳ بار، پھر لا الٰہ الا اللہ وحدہ… سے سو پورے کریں۔ (صحیح مسلم ۵۹۷)',
};

export const DHIKR: DhikrDef[] = [
  // Daily remembrance
  { id: 'subhanallah', group: 'daily', kind: 'text', label: 'SubḥānAllāh', translit: 'SubḥānAllāh', ar: 'سُبْحَانَ اللَّهِ',
    meaning: { en: 'Glory be to Allah', ur: 'اللہ پاک ہے' }, virtue: afterSalah },
  { id: 'alhamdulillah', group: 'daily', kind: 'text', label: 'Alḥamdulillāh', translit: 'Alḥamdulillāh', ar: 'الْحَمْدُ لِلَّهِ',
    meaning: { en: 'All praise is for Allah', ur: 'تمام تعریفیں اللہ کے لیے ہیں' }, virtue: afterSalah },
  { id: 'allahuakbar', group: 'daily', kind: 'text', label: 'Allāhu Akbar', translit: 'Allāhu Akbar', ar: 'اللَّهُ أَكْبَرُ',
    meaning: { en: 'Allah is the Greatest', ur: 'اللہ سب سے بڑا ہے' }, virtue: afterSalah },
  { id: 'tahlil', group: 'daily', kind: 'text', label: 'Lā ilāha illallāh', translit: 'Lā ilāha illallāh', ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    meaning: { en: 'There is no god but Allah', ur: 'اللہ کے سوا کوئی معبود نہیں' } },
  { id: 'tahlil-full', group: 'daily', kind: 'text', label: 'Lā ilāha illallāhu waḥdahu',
    translit: 'Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ʿalā kulli shay’in qadīr',
    ar: 'لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهْوَ عَلَى كُلِّ شَىْءٍ قَدِيرٌ',
    meaning: {
      en: 'There is no god but Allah, alone, without partner. His is the dominion and His is the praise, and He has power over all things.',
      ur: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ اسی کی بادشاہی ہے اور اسی کی تعریف ہے، اور وہ ہر چیز پر قادر ہے۔',
    },
    source: { en: 'Sahih al-Bukhari 6403', ur: 'صحیح بخاری ۶۴۰۳' },
    virtue: {
      en: 'Said 100 times in a day: like freeing ten slaves, 100 good deeds written, 100 sins erased, and a shield from Shaytan until evening.',
      ur: 'دن میں سو بار: دس غلام آزاد کرنے کے برابر، سو نیکیاں لکھی جاتی ہیں، سو گناہ مٹا دیے جاتے ہیں، اور شام تک شیطان سے حفاظت۔',
    } },
  { id: 'bihamdihi', group: 'daily', kind: 'text', label: 'SubḥānAllāhi wa biḥamdihī', translit: 'SubḥānAllāhi wa biḥamdihī',
    ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', meaning: { en: 'Glory be to Allah, and praise be to Him', ur: 'اللہ پاک ہے اپنی تعریف کے ساتھ' },
    source: { en: 'Sahih al-Bukhari 6405', ur: 'صحیح بخاری ۶۴۰۵' },
    virtue: { en: 'Said 100 times a day: sins are wiped away, even if they are like the foam of the sea.', ur: 'دن میں سو بار: گناہ مٹا دیے جاتے ہیں، چاہے سمندر کی جھاگ کے برابر ہوں۔' } },
  { id: 'kalimatan', group: 'daily', kind: 'text', label: 'SubḥānAllāhil-ʿAẓīm', translit: 'SubḥānAllāhil-ʿAẓīm, SubḥānAllāhi wa biḥamdihī',
    ar: 'سُبْحَانَ اللَّهِ الْعَظِيمِ، سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    meaning: { en: 'Glory be to Allah the Magnificent. Glory be to Allah, and praise be to Him.', ur: 'پاک ہے اللہ عظمت والا، پاک ہے اللہ اپنی تعریف کے ساتھ۔' },
    source: { en: 'Sahih al-Bukhari 6406', ur: 'صحیح بخاری ۶۴۰۶' },
    virtue: { en: 'Two phrases light on the tongue, heavy on the Scale, beloved to the Most Merciful.', ur: 'دو کلمے جو زبان پر ہلکے، میزان میں بھاری، اور رحمٰن کو محبوب ہیں۔' } },
  { id: 'hawqala', group: 'daily', kind: 'dua', duaId: 'hawla', label: 'Lā ḥawla wa lā quwwata', translit: 'Lā ḥawla wa lā quwwata illā billāh' },
  { id: 'salawat', group: 'daily', kind: 'text', label: 'Ṣalawāt', translit: 'Allāhumma ṣalli ʿalā Muḥammad', ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    meaning: { en: 'O Allah, send blessings upon Muhammad', ur: 'اے اللہ! محمد ﷺ پر رحمت نازل فرما' },
    virtue: { en: 'Whoever sends blessings on the Prophet ﷺ once, Allah blesses them ten times. (Sahih Muslim 408)', ur: 'جو نبی ﷺ پر ایک بار درود بھیجے، اللہ اس پر دس رحمتیں نازل فرماتا ہے۔ (صحیح مسلم ۴۰۸)' } },

  // Seeking forgiveness
  { id: 'astaghfirullah', group: 'forgive', kind: 'text', label: 'Astaghfirullāh', translit: 'Astaghfirullāh', ar: 'أَسْتَغْفِرُ اللَّهَ',
    meaning: { en: 'I seek Allah’s forgiveness', ur: 'میں اللہ سے بخشش مانگتا ہوں' } },
  { id: 'atubu', group: 'forgive', kind: 'dua', duaId: 'atubu', label: 'Astaghfirullāha wa atūbu ilayh', translit: 'Astaghfirullāha wa atūbu ilayh' },
  { id: 'tawwab', group: 'forgive', kind: 'dua', duaId: 'tawwab', label: 'Rabbighfir lī wa tub ʿalayya', translit: 'Rabbighfir lī wa tub ʿalayya, innaka antat-Tawwābur-Raḥīm' },
  { id: 'yunus', group: 'forgive', kind: 'quran', excerptId: 'yunus', label: 'Lā ilāha illā anta subḥānaka', translit: 'Lā ilāha illā anta subḥānaka innī kuntu minaẓ-ẓālimīn',
    virtue: { en: 'The dua of Yunus (AS) from the darkness. Allah answered: “thus do We save the believers.” (21:88)', ur: 'اندھیروں سے حضرت یونسؑ کی دعا۔ اللہ نے فرمایا: ”ہم مومنوں کو اسی طرح نجات دیتے ہیں۔“ (۲۱:۸۸)' } },
  { id: 'warham', group: 'forgive', kind: 'quran', excerptId: 'warham', label: 'Rabbighfir warḥam', translit: 'Rabbighfir warḥam wa anta khayrur-rāḥimīn' },
  { id: 'zalamna', group: 'forgive', kind: 'quran', excerptId: 'zalamna', label: 'Rabbanā ẓalamnā anfusanā',
    translit: 'Rabbanā ẓalamnā anfusanā wa il-lam taghfir lanā wa tarḥamnā lanakūnanna minal-khāsirīn' },

  // Asking Allah
  { id: 'musa-faqir', group: 'asking', kind: 'quran', excerptId: 'musa-faqir', label: 'Rabbi innī limā anzalta…', translit: 'Rabbi innī limā anzalta ilayya min khayrin faqīr',
    virtue: {
      en: 'Musa (AS) said this alone and far from home, after helping two women at the well of Madyan. Soon after, Allah opened a door of help for him.',
      ur: 'حضرت موسیٰؑ نے یہ دعا مدین کے کنویں پر دو خواتین کی مدد کے بعد، تنہا اور گھر سے دور مانگی۔ جلد ہی اللہ نے ان کے لیے مدد کا دروازہ کھول دیا۔',
    } },
  { id: 'hasbuna', group: 'asking', kind: 'quran', excerptId: 'hasbuna', label: 'Ḥasbunallāhu wa niʿmal-wakīl', translit: 'Ḥasbunallāhu wa niʿmal-wakīl' },
  { id: 'hasbiya', group: 'asking', kind: 'quran', excerptId: 'hasbiya', label: 'Ḥasbiyallāhu lā ilāha illā huwa',
    translit: 'Ḥasbiyallāhu lā ilāha illā huwa, ʿalayhi tawakkaltu wa huwa Rabbul-ʿArshil-ʿAẓīm' },
  { id: 'muqallib', group: 'asking', kind: 'dua', duaId: 'muqallib', label: 'Yā Muqallibal-qulūb', translit: 'Yā Muqallibal-qulūb, thabbit qalbī ʿalā dīnik' },
  { id: 'atina', group: 'asking', kind: 'quran', excerptId: 'atina', label: 'Rabbanā ātinā', translit: 'Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ʿadhāban-nār' },
  { id: 'zidni', group: 'asking', kind: 'quran', excerptId: 'zidni', label: 'Rabbi zidnī ʿilmā', translit: 'Rabbi zidnī ʿilmā' },
];

export interface DhikrView {
  id: string;
  label: string;
  ar: string;
  translit: string;
  meaning: string;
  source?: string;
  virtue?: string;
}

const SUNNAH = new Map(
  DUA_LIBRARY.flatMap((c) => c.duas).flatMap((d) => (d.kind === 'sunnah' ? [[d.id, d] as const] : [])),
);

/** Resolve a dhikr into display strings for the current language. */
export function dhikrView(d: DhikrDef, lang: Lang): DhikrView {
  const base = { id: d.id, label: d.label, translit: d.translit, virtue: d.virtue?.[lang] };
  if (d.kind === 'quran') {
    const x = EX.get(d.excerptId);
    if (!x) throw new Error(`Unknown excerpt ${d.excerptId}`);
    return { ...base, ar: x.ar, meaning: x[lang], source: ayahRef(x, lang) };
  }
  if (d.kind === 'dua') {
    const s = SUNNAH.get(d.duaId);
    if (!s || s.kind !== 'sunnah') throw new Error(`Unknown dua ${d.duaId}`);
    return { ...base, ar: s.ar, meaning: s.meaning[lang], source: s.source[lang], virtue: base.virtue ?? s.note?.[lang] };
  }
  return { ...base, ar: d.ar, meaning: d.meaning[lang], source: d.source?.[lang] };
}
