import type { Station } from './types';

export const STATIONS: Station[] = [
  {
    id: 'tawbah',
    icon: 'heart',
    title: { en: 'Tawbah', ur: 'توبہ' },
    tagline: { en: 'Return, don’t run away', ur: 'لوٹ آئیں، بھاگیں نہیں' },
    reflection: {
      en: 'Tawbah literally means “to return”. You are not starting over from nothing. You are coming back to the door of the One whose door never closes.',
      ur: 'توبہ کا لفظی مطلب ہے ”لوٹنا“۔ آپ صفر سے شروع نہیں کر رہے، آپ اُس کے دروازے پر لوٹ رہے ہیں جس کا دروازہ کبھی بند نہیں ہوتا۔',
    },
    items: [
      { en: 'Admit the mistake to yourself and to Allah.', ur: 'غلطی کو تسلیم کریں، اپنے آپ سے اور اللہ کے سامنے۔' },
      { en: 'Feel sincere regret. Let it soften you, not crush you.', ur: 'سچی ندامت محسوس کریں، جو دل کو نرم کرے، توڑے نہیں۔' },
      { en: 'Leave the sin today, not someday.', ur: 'گناہ کو چھوڑ دیں، آج ہی، کسی اور دن پر نہ ٹالیں۔' },
      { en: 'Firmly intend not to go back to it.', ur: 'پکا ارادہ کریں کہ دوبارہ اس کی طرف نہیں جائیں گے۔' },
      { en: 'If someone was wronged, make it right with them.', ur: 'اگر کسی کا حق مارا ہو تو اسے ادا کریں یا معافی مانگیں۔' },
    ],
    tip: { en: 'Your mistakes are not bigger than His mercy.', ur: 'آپ کی غلطیاں اُس کی رحمت سے بڑی نہیں۔' },
    ayahId: 'nisa-110',
    hadithId: 'camel',
  },
  {
    id: 'salah',
    icon: 'mosque',
    title: { en: 'Salah', ur: 'نماز' },
    tagline: { en: 'Keep the door open', ur: 'دروازہ کھلا رکھیں' },
    reflection: {
      en: 'Five times a day, the door opens. You don’t have to feel holy to walk through it. You walk through it to be healed.',
      ur: 'دن میں پانچ بار دروازہ کھلتا ہے۔ اس میں داخل ہونے کے لیے نیک محسوس کرنا ضروری نہیں، آپ اس لیے داخل ہوتے ہیں تاکہ شفا ملے۔',
    },
    items: [
      { en: 'Pray on time, as best you can.', ur: 'جتنا ہو سکے، نماز وقت پر پڑھیں۔' },
      { en: 'Pray even when you don’t feel like it.', ur: 'تب بھی پڑھیں جب دل نہ چاہے۔' },
      { en: 'Missed one? Make it up, and keep going.', ur: 'کوئی نماز چھوٹ گئی؟ قضا پڑھیں اور آگے بڑھیں۔' },
      { en: 'After salah, talk to Allah in your own words.', ur: 'نماز کے بعد اپنے الفاظ میں اللہ سے بات کریں۔' },
    ],
    tip: {
      en: 'Don’t wait to become better before you pray. Pray, so that you become better.',
      ur: 'نماز کے لیے بہتر بننے کا انتظار نہ کریں۔ نماز پڑھیں، تاکہ بہتر بن سکیں۔',
    },
    ayahId: 'taha-14',
    hadithId: 'river',
  },
  {
    id: 'leave',
    icon: 'leaf',
    title: { en: 'Let go', ur: 'چھوڑ دیں' },
    tagline: { en: 'Leave what takes you away', ur: 'جو اللہ سے دور کرے، اسے چھوڑ دیں' },
    reflection: {
      en: 'Sometimes nijaat isn’t adding something new. It’s putting down what has been weighing on your heart.',
      ur: 'کبھی نجات کچھ نیا شامل کرنے میں نہیں، بلکہ وہ بوجھ اتارنے میں ہوتی ہے جو دل پر رکھا ہے۔',
    },
    items: [
      { en: 'Name what pulls you away from Allah.', ur: 'اُس چیز کو پہچانیں جو آپ کو اللہ سے دور کرتی ہے۔' },
      { en: 'Let go of the habit, the place, or the influence.', ur: 'اُس عادت، جگہ یا صحبت کو چھوڑ دیں۔' },
      { en: 'Replace it with something good.', ur: 'اس کی جگہ کوئی اچھی چیز اپنائیں۔' },
      { en: 'Start small. Stay consistent.', ur: 'چھوٹے قدم سے شروع کریں، اور جمے رہیں۔' },
    ],
    tip: {
      en: 'Leaving something for the sake of Allah is itself an act of worship.',
      ur: 'اللہ کی خاطر کچھ چھوڑنا بذاتِ خود عبادت ہے۔',
    },
    ayahId: 'shams-9-10',
    hadithId: 'doubt',
  },
  {
    id: 'quran',
    icon: 'book',
    title: { en: 'The Qur’an', ur: 'قرآن' },
    tagline: { en: 'Let it change you', ur: 'اسے اپنے دل تک پہنچنے دیں' },
    reflection: {
      en: 'The Qur’an isn’t only to be finished. It’s to be felt. One ayah understood can do more than a page rushed.',
      ur: 'قرآن صرف ختم کرنے کے لیے نہیں، محسوس کرنے کے لیے ہے۔ سمجھ کر پڑھی گئی ایک آیت، جلدی میں پڑھے گئے پورے صفحے سے زیادہ اثر رکھتی ہے۔',
    },
    items: [
      { en: 'Read a little every day, even five minutes.', ur: 'روزانہ تھوڑا پڑھیں، چاہے پانچ منٹ ہی۔' },
      { en: 'Read the meaning in a language you understand.', ur: 'ترجمہ اُس زبان میں پڑھیں جو آپ سمجھتے ہیں۔' },
      { en: 'Pause on one ayah and ask: what is it telling me?', ur: 'ایک آیت پر رُک کر سوچیں: یہ مجھ سے کیا کہہ رہی ہے؟' },
      { en: 'Read for guidance, not just completion.', ur: 'ہدایت کے لیے پڑھیں، صرف ختم کرنے کے لیے نہیں۔' },
    ],
    tip: {
      en: 'Let the Qur’an change you, not just inform you.',
      ur: 'قرآن کو صرف معلومات نہیں، اپنی تبدیلی کا ذریعہ بننے دیں۔',
    },
    ayahId: 'isra-82',
    hadithId: 'intercessor',
  },
  {
    id: 'walk',
    icon: 'path',
    title: { en: 'Keep walking', ur: 'چلتے رہیں' },
    tagline: { en: 'Even when you don’t feel it', ur: 'تب بھی، جب دل نہ لگے' },
    reflection: {
      en: 'Nijaat isn’t one emotional moment. It’s a road. Some days you’ll run, some days you’ll crawl. Just don’t stop.',
      ur: 'نجات کوئی ایک جذباتی لمحہ نہیں، ایک راستہ ہے۔ کبھی دوڑیں گے، کبھی رینگیں گے، بس رُکنا نہیں۔',
    },
    items: [
      { en: 'Choose consistency over intensity.', ur: 'شدت کے بجائے تسلسل اپنائیں۔' },
      { en: 'Do one small good deed every day.', ur: 'روزانہ ایک چھوٹی نیکی کریں۔' },
      { en: 'Fall, return, keep going.', ur: 'گریں، لوٹیں، اور چلتے رہیں۔' },
      { en: 'Keep company that reminds you of Allah.', ur: 'ایسی صحبت رکھیں جو اللہ کی یاد دلائے۔' },
    ],
    tip: {
      en: 'Progress is measured by closeness to Allah, not by feelings.',
      ur: 'ترقی کا پیمانہ احساسات نہیں، اللہ سے قربت ہے۔',
    },
    ayahId: 'ankabut-69',
    hadithId: 'consistent',
  },
];
