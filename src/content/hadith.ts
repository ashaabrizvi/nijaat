import type { Hadith } from './types';

// Every hadith below was checked against the sunnah.com dataset (numbering
// and grading as shown there). English is abridged from the sunnah.com
// translation; the Urdu renderings are ours and should be reviewed by a
// qualified scholar before major releases (see README → Content review).

const sahih = { en: 'Sahih', ur: 'صحیح' };
const hasan = { en: 'Hasan (Darussalam)', ur: 'حسن (دارالسلام)' };
const sahihD = { en: 'Sahih (Darussalam)', ur: 'صحیح (دارالسلام)' };

export const HADITH: Hadith[] = [
  {
    id: 'camel',
    text: {
      en: 'Allah is more pleased with the repentance of His servant than any one of you would be on finding the camel he had lost in the desert.',
      ur: 'اللہ اپنے بندے کی توبہ پر اُس شخص سے بھی زیادہ خوش ہوتا ہے جسے صحرا میں کھویا ہوا اپنا اونٹ مل جائے۔',
    },
    source: { en: 'Sahih al-Bukhari 6309', ur: 'صحیح بخاری ۶۳۰۹' },
    grade: sahih,
  },
  {
    id: 'hand',
    text: {
      en: 'Allah stretches out His Hand by night so that the one who sinned by day may repent, and He stretches out His Hand by day so that the one who sinned by night may repent — until the sun rises from the west.',
      ur: 'اللہ رات کو اپنا ہاتھ پھیلاتا ہے تاکہ دن میں گناہ کرنے والا توبہ کر لے، اور دن کو اپنا ہاتھ پھیلاتا ہے تاکہ رات میں گناہ کرنے والا توبہ کر لے — یہاں تک کہ سورج مغرب سے طلوع ہو۔',
    },
    source: { en: 'Sahih Muslim 2759', ur: 'صحیح مسلم ۲۷۵۹' },
    grade: sahih,
  },
  {
    id: 'running',
    text: {
      en: 'Allah says: “I am as My servant thinks I am, and I am with him when he remembers Me… If he comes one span nearer to Me, I come a cubit nearer to him. And if he comes to Me walking, I go to him running.”',
      ur: 'اللہ فرماتا ہے: ”میں اپنے بندے کے گمان کے مطابق ہوں، اور جب وہ مجھے یاد کرتا ہے تو میں اس کے ساتھ ہوتا ہوں… اگر وہ ایک بالشت میرے قریب آئے تو میں ایک ہاتھ اس کے قریب ہوتا ہوں، اور اگر وہ میری طرف چل کر آئے تو میں اس کی طرف دوڑ کر آتا ہوں۔“',
    },
    source: { en: 'Sahih al-Bukhari 7405', ur: 'صحیح بخاری ۷۴۰۵' },
    grade: sahih,
  },
  {
    id: 'clouds',
    text: {
      en: 'Allah said: “O son of Adam! Were your sins to reach the clouds of the sky, and then you sought My forgiveness, I would forgive you — and I would not mind.”',
      ur: 'اللہ نے فرمایا: ”اے ابنِ آدم! اگر تیرے گناہ آسمان کے بادلوں تک پہنچ جائیں، پھر تو مجھ سے بخشش مانگے، تو میں تجھے بخش دوں گا اور مجھے کوئی پروا نہیں۔“',
    },
    source: { en: 'Jami` at-Tirmidhi 3540', ur: 'جامع ترمذی ۳۵۴۰' },
    grade: hasan,
  },
  {
    id: 'best-sinners',
    text: {
      en: 'Every son of Adam commits sin, and the best of those who commit sin are those who repent.',
      ur: 'ہر ابنِ آدم خطا کرتا ہے، اور خطا کرنے والوں میں سب سے بہتر وہ ہیں جو توبہ کرتے ہیں۔',
    },
    source: { en: 'Sunan Ibn Majah 4251', ur: 'سنن ابن ماجہ ۴۲۵۱' },
    grade: hasan,
  },
  {
    id: 'river',
    text: {
      en: 'If there was a river at the door of one of you and he bathed in it five times a day, would any dirt remain on him? … That is the example of the five prayers: with them Allah wipes away sins.',
      ur: 'اگر تم میں سے کسی کے دروازے پر نہر ہو اور وہ روزانہ پانچ بار اس میں نہائے، تو کیا اس پر کوئی میل باقی رہے گا؟ … یہی مثال پانچ نمازوں کی ہے، ان کے ذریعے اللہ گناہوں کو مٹا دیتا ہے۔',
    },
    source: { en: 'Sahih al-Bukhari 528', ur: 'صحیح بخاری ۵۲۸' },
    grade: sahih,
  },
  {
    id: 'doubt',
    text: {
      en: 'Leave what makes you doubt for what does not make you doubt. Truth brings tranquillity, while falsehood brings doubt.',
      ur: 'جو چیز آپ کو شک میں ڈالے اسے چھوڑ کر وہ اختیار کریں جو شک میں نہ ڈالے۔ سچائی سکون ہے اور جھوٹ بے چینی۔',
    },
    source: { en: 'Jami` at-Tirmidhi 2518', ur: 'جامع ترمذی ۲۵۱۸' },
    grade: sahihD,
  },
  {
    id: 'intercessor',
    text: {
      en: 'Recite the Qur’an, for on the Day of Resurrection it will come as an intercessor for those who recite it.',
      ur: 'قرآن پڑھا کرو، کیونکہ قیامت کے دن یہ اپنے پڑھنے والوں کے لیے سفارشی بن کر آئے گا۔',
    },
    source: { en: 'Sahih Muslim 804a', ur: 'صحیح مسلم ۸۰۴' },
    grade: sahih,
  },
  {
    id: 'consistent',
    text: {
      en: 'The most beloved deed to Allah is the most regular and constant, even if it is little.',
      ur: 'اللہ کو سب سے محبوب عمل وہ ہے جو پابندی سے کیا جائے، چاہے تھوڑا ہی ہو۔',
    },
    source: { en: 'Sahih al-Bukhari 6464', ur: 'صحیح بخاری ۶۴۶۴' },
    grade: sahih,
  },
];

const byId = new Map(HADITH.map((h) => [h.id, h]));
export const hadith = (id: string): Hadith => {
  const h = byId.get(id);
  if (!h) throw new Error(`Unknown hadith ${id}`);
  return h;
};

/** Shown after "I'm returning" — the mercy narrations. */
export const MERCY_HADITH = ['camel', 'hand', 'running', 'clouds', 'best-sinners'];
