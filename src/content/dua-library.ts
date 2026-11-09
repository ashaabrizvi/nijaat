import { SAYYID_ISTIGHFAR } from './duas';
import type { L } from './types';

/**
 * Dua library.
 *  - Qur'anic duas reference generated ayat (Arabic, translations and
 *    transliteration all come from scripts/build-ayat.mjs).
 *  - Sunnah duas: Arabic copied from the sunnah.com dataset; references and
 *    gradings as shown there. Urdu meanings are ours: see README → Content review.
 */
export type DuaEntry =
  | { id: string; kind: 'quran'; ayahId: string; note?: L }
  | {
      id: string;
      kind: 'sunnah';
      ar: string;
      translit: string;
      meaning: L;
      source: L;
      grade: L;
      note?: L;
    };

export interface DuaCategory {
  id: string;
  icon: string;
  title: L;
  sub: L;
  duas: DuaEntry[];
}

const sahih: L = { en: 'Sahih', ur: 'صحیح' };

export const DUA_LIBRARY: DuaCategory[] = [
  {
    id: 'forgiveness',
    icon: 'heart',
    title: { en: 'Forgiveness', ur: 'مغفرت' },
    sub: { en: 'For when you want to come back', ur: 'جب لوٹنے کو دل چاہے' },
    duas: [
      {
        id: 'adam',
        kind: 'quran',
        ayahId: 'araf-23',
        note: { en: 'The dua of Adam and Hawwa (peace be upon them), the first tawbah.', ur: 'حضرت آدمؑ اور حضرت حواؑ کی دعا، پہلی توبہ۔' },
      },
      {
        id: 'sayyid',
        kind: 'sunnah',
        ar: SAYYID_ISTIGHFAR.ar,
        translit: SAYYID_ISTIGHFAR.translit,
        meaning: SAYYID_ISTIGHFAR.meaning,
        source: SAYYID_ISTIGHFAR.source,
        grade: sahih,
        note: { en: 'Sayyid al-Istighfar: the master of seeking forgiveness.', ur: 'سید الاستغفار: استغفار کا سردار۔' },
      },
      {
        id: 'atubu',
        kind: 'sunnah',
        ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
        translit: 'Astaghfirullāha wa atūbu ilayh.',
        meaning: { en: 'I seek Allah’s forgiveness and I turn to Him in repentance.', ur: 'میں اللہ سے بخشش مانگتا ہوں اور اسی کی طرف رجوع کرتا ہوں۔' },
        source: { en: 'Sahih al-Bukhari 6307', ur: 'صحیح بخاری ۶۳۰۷' },
        grade: sahih,
        note: {
          en: 'The Prophet ﷺ said he sought forgiveness and repented more than seventy times a day.',
          ur: 'نبی ﷺ نے فرمایا کہ میں دن میں ستر سے زیادہ مرتبہ اللہ سے بخشش مانگتا اور توبہ کرتا ہوں۔',
        },
      },
      {
        id: 'tawwab',
        kind: 'sunnah',
        ar: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَىَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
        translit: 'Rabbighfir lī wa tub ʿalayya, innaka antat-Tawwābur-Raḥīm.',
        meaning: {
          en: 'My Lord, forgive me and accept my repentance. Indeed, You are the Accepter of repentance, the Most Merciful.',
          ur: 'اے میرے رب! مجھے بخش دے اور میری توبہ قبول فرما، بے شک تو ہی توبہ قبول کرنے والا، نہایت رحم کرنے والا ہے۔',
        },
        source: { en: 'Sunan Abi Dawud 1516', ur: 'سنن ابی داؤد ۱۵۱۶' },
        grade: { en: 'Sahih (Al-Albani)', ur: 'صحیح (البانی)' },
        note: { en: 'Counted a hundred times in a single sitting of the Prophet ﷺ.', ur: 'نبی ﷺ کی ایک مجلس میں سو مرتبہ گنی گئی۔' },
      },
      {
        id: 'afuww',
        kind: 'sunnah',
        ar: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
        translit: 'Allāhumma innaka ʿAfuwwun tuḥibbul-ʿafwa faʿfu ʿannī.',
        meaning: { en: 'O Allah, You are the Pardoner and You love to pardon, so pardon me.', ur: 'اے اللہ! تو بہت معاف کرنے والا ہے، معاف کرنے کو پسند کرتا ہے، پس مجھے معاف فرما دے۔' },
        source: { en: 'Jami` at-Tirmidhi 3513', ur: 'جامع ترمذی ۳۵۱۳' },
        grade: { en: 'Sahih (Darussalam)', ur: 'صحیح (دارالسلام)' },
        note: { en: 'Taught to Aisha (RA) for Laylat al-Qadr.', ur: 'حضرت عائشہؓ کو لیلۃ القدر کے لیے سکھائی گئی۔' },
      },
      { id: 'musa', kind: 'quran', ayahId: 'qasas-16' },
      { id: 'best-merciful', kind: 'quran', ayahId: 'muminun-118' },
    ],
  },
  {
    id: 'heavy',
    icon: 'moon',
    title: { en: 'When the heart is heavy', ur: 'جب دل بوجھل ہو' },
    sub: { en: 'Worry, sadness, feeling stuck', ur: 'فکر، اداسی، بے بسی' },
    duas: [
      {
        id: 'hamm',
        kind: 'sunnah',
        ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
        translit:
          'Allāhumma innī aʿūdhu bika minal-hammi wal-ḥazan, wal-ʿajzi wal-kasal, wal-jubni wal-bukhl, wa ḍalaʿid-dayni wa ghalabatir-rijāl.',
        meaning: {
          en: 'O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and miserliness, from the burden of debt and from being overpowered by people.',
          ur: 'اے اللہ! میں تیری پناہ مانگتا ہوں فکر اور غم سے، بے بسی اور سستی سے، بزدلی اور کنجوسی سے، قرض کے بوجھ سے اور لوگوں کے غلبے سے۔',
        },
        source: { en: 'Sahih al-Bukhari 6369', ur: 'صحیح بخاری ۶۳۶۹' },
        grade: sahih,
      },
      {
        id: 'yunus',
        kind: 'quran',
        ayahId: 'anbiya-87-88',
        note: { en: 'The dua of Yunus (AS) from the darkness, and Allah’s promise right after it.', ur: 'اندھیروں سے حضرت یونسؑ کی دعا، اور اس کے فوراً بعد اللہ کا وعدہ۔' },
      },
      {
        id: 'sadri',
        kind: 'quran',
        ayahId: 'taha-25-28',
        note: { en: 'Musa (AS) before facing Pharaoh, for courage and ease.', ur: 'فرعون کا سامنا کرنے سے پہلے حضرت موسیٰؑ کی دعا، ہمت اور آسانی کے لیے۔' },
      },
      {
        id: 'faqir',
        kind: 'quran',
        ayahId: 'qasas-24',
        note: {
          en: 'Musa (AS), alone and far from home in Madyan: “My Lord, I am in need of whatever good You send me.”',
          ur: 'حضرت موسیٰؑ، مدین میں تنہا اور گھر سے دور: ”اے رب! جو خیر بھی تو مجھ پر نازل کرے، میں اس کا محتاج ہوں۔“',
        },
      },
      {
        id: 'hawla',
        kind: 'sunnah',
        ar: 'لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
        translit: 'Lā ḥawla wa lā quwwata illā billāh.',
        meaning: { en: 'There is no power and no strength except with Allah.', ur: 'اللہ کے سوا نہ کوئی طاقت ہے نہ کوئی قوت۔' },
        source: { en: 'Sahih al-Bukhari 6384', ur: 'صحیح بخاری ۶۳۸۴' },
        grade: sahih,
        note: { en: '“A treasure from the treasures of Paradise.”', ur: '”جنت کے خزانوں میں سے ایک خزانہ۔“' },
      },
    ],
  },
  {
    id: 'steadfast',
    icon: 'lantern',
    title: { en: 'Guidance & steadfastness', ur: 'ہدایت اور ثابت قدمی' },
    sub: { en: 'To stay on the path', ur: 'راستے پر قائم رہنے کے لیے' },
    duas: [
      {
        id: 'muqallib',
        kind: 'sunnah',
        ar: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
        translit: 'Yā Muqallibal-qulūb, thabbit qalbī ʿalā dīnik.',
        meaning: { en: 'O Turner of hearts, make my heart firm upon Your religion.', ur: 'اے دلوں کو پھیرنے والے! میرے دل کو اپنے دین پر ثابت رکھ۔' },
        source: { en: 'Jami` at-Tirmidhi 2140', ur: 'جامع ترمذی ۲۱۴۰' },
        grade: { en: 'Hasan (at-Tirmidhi)', ur: 'حسن (ترمذی)' },
        note: { en: 'The dua the Prophet ﷺ said most often.', ur: 'وہ دعا جو نبی ﷺ کثرت سے پڑھتے تھے۔' },
      },
      { id: 'la-tuzigh', kind: 'quran', ayahId: 'imran-8' },
      {
        id: 'huda',
        kind: 'sunnah',
        ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
        translit: 'Allāhumma innī as’alukal-hudā wat-tuqā wal-ʿafāfa wal-ghinā.',
        meaning: { en: 'O Allah, I ask You for guidance, piety, chastity and freedom from need.', ur: 'اے اللہ! میں تجھ سے ہدایت، تقویٰ، پاکدامنی اور بے نیازی کا سوال کرتا ہوں۔' },
        source: { en: 'Sahih Muslim 2721a', ur: 'صحیح مسلم ۲۷۲۱' },
        grade: sahih,
      },
      {
        id: 'taqwaha',
        kind: 'sunnah',
        ar: 'اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا أَنْتَ وَلِيُّهَا وَمَوْلاَهَا',
        translit: 'Allāhumma āti nafsī taqwāhā, wa zakkihā anta khayru man zakkāhā, anta waliyyuhā wa mawlāhā.',
        meaning: {
          en: 'O Allah, grant my soul its piety and purify it. You are the best to purify it. You are its Protector and Guardian.',
          ur: 'اے اللہ! میرے نفس کو اس کا تقویٰ عطا فرما اور اسے پاک کر دے، تو ہی اسے سب سے بہتر پاک کرنے والا ہے، تو ہی اس کا کارساز اور مولا ہے۔',
        },
        source: { en: 'Sahih Muslim 2722 (part)', ur: 'صحیح مسلم ۲۷۲۲ (حصہ)' },
        grade: sahih,
      },
      { id: 'cave', kind: 'quran', ayahId: 'kahf-10' },
    ],
  },
  {
    id: 'life',
    icon: 'sun',
    title: { en: 'This life & the next', ur: 'دنیا اور آخرت' },
    sub: { en: 'For yourself and those you love', ur: 'اپنے اور اپنے پیاروں کے لیے' },
    duas: [
      { id: 'hasanah', kind: 'quran', ayahId: 'baqarah-201' },
      { id: 'family', kind: 'quran', ayahId: 'furqan-74' },
      { id: 'parents', kind: 'quran', ayahId: 'ibrahim-41' },
    ],
  },
];
