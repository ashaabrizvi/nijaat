import { S_TOOLS } from './strings-tools';
import type { L } from './types';

/** UI copy. Urdu uses the respectful, gender-neutral آپ + imperative forms. */
const BASE = {
  appName: { en: 'Dar-e-Nijaat', ur: 'درِ نجات' },
  appTagline: { en: 'The door of return', ur: 'لوٹنے کا دروازہ' },
  salaam: { en: 'Assalamu alaikum', ur: 'السلام علیکم' },
  greetDay: { en: 'May your day be full of barakah.', ur: 'اللہ آپ کے دن میں برکت دے۔' },
  greetNight: { en: 'The night is a quiet door to Allah.', ur: 'رات اللہ کی طرف ایک خاموش دروازہ ہے۔' },

  // Nav
  navToday: { en: 'Today', ur: 'آج' },
  navJourney: { en: 'Journey', ur: 'سفر' },
  navReturn: { en: 'Return', ur: 'واپسی' },
  navNijaat: { en: 'Nijaat', ur: 'نجات' },
  navMore: { en: 'More', ur: 'مزید' },

  // Today
  ayahOfDay: { en: 'Ayah of the day', ur: 'آج کی آیت' },
  anotherAyah: { en: 'Another', ur: 'اگلی' },
  share: { en: 'Share', ur: 'شیئر' },
  copied: { en: 'Copied — share it with someone who needs it.', ur: 'کاپی ہو گیا — کسی ضرورت مند کو بھیج دیں۔' },
  checkInLabel: { en: 'Your check-in', ur: 'آپ کی حاضری' },
  checkInTitle: { en: 'Did you show up today?', ur: 'کیا آج آپ نے حاضری دی؟' },
  checkInSub: { en: 'Each step lights a lantern.', ur: 'ہر قدم ایک چراغ روشن کرتا ہے۔' },
  litOf: { en: '{n} of {t} lanterns lit', ur: '{t} میں سے {n} چراغ روشن' },
  allLit: { en: 'Every lantern is lit. May it be accepted.', ur: 'سارے چراغ روشن ہیں۔ اللہ قبول فرمائے۔' },
  streakDays: { en: '{n}-day path', ur: '{n} دن کا سفر' },
  streakStart: { en: 'Start today', ur: 'آج سے شروع کریں' },
  streakNote: {
    en: 'Missed a day? Your path stays lit — one missed day is forgiven. Just come back.',
    ur: 'ایک دن رہ گیا؟ آپ کا راستہ روشن رہے گا — ایک دن کی چھوٹ ہے۔ بس لوٹ آئیں۔',
  },
  daysShownUp: { en: '{n} days shown up', ur: '{n} دن حاضری' },
  dayShownUp: { en: '{n} day shown up', ur: '{n} دن حاضری' },
  remember: { en: 'Remember', ur: 'یاد رکھیں' },

  // Journey
  journeyLabel: { en: 'The way of return', ur: 'واپسی کا راستہ' },
  journeyTitle: { en: 'Five stations', ur: 'پانچ منزلیں' },
  journeySub: {
    en: 'Tap a station to open it. Tick what has truly become part of you — this isn’t a to-do list, it’s a mirror.',
    ur: 'کسی منزل کو کھولنے کے لیے چھوئیں۔ جو چیز واقعی آپ کی زندگی کا حصہ بن چکی ہو، اسے نشان زد کریں — یہ کاموں کی فہرست نہیں، آئینہ ہے۔',
  },
  stationsLived: { en: '{n} of {t} stations lived', ur: '{t} میں سے {n} منزلیں طے' },
  pathBeginning: { en: 'Beginning the path', ur: 'سفر کا آغاز' },
  pathOn: { en: 'On the path', ur: 'راستے پر' },
  pathWalking: { en: 'Walking Dar-e-Nijaat', ur: 'درِ نجات کی راہ پر' },
  station: { en: 'Station {n}', ur: 'منزل {n}' },
  practice: { en: 'The practice', ur: 'عمل' },
  fromQuran: { en: 'From the Qur’an', ur: 'قرآن سے' },
  fromSunnah: { en: 'From the Sunnah', ur: 'سنت سے' },
  close: { en: 'Close', ur: 'بند کریں' },
  back: { en: 'Back', ur: 'واپس' },

  // Return / Tawbah
  doorOpen: { en: 'The door of tawbah is open', ur: 'توبہ کا دروازہ کھلا ہے' },
  doorSub: {
    en: 'Falling isn’t leaving the path. Staying down is. Return — right now, in this moment.',
    ur: 'گرنا راستہ چھوڑنا نہیں، گرے رہنا ہے۔ لوٹ آئیں — ابھی، اسی لمحے۔',
  },
  imReturning: { en: 'I’m returning', ur: 'اب لوٹنا ہے' },
  breatheIn: { en: 'Breathe in…', ur: 'سانس اندر لیں…' },
  breatheOut: { en: 'Breathe out… Astaghfirullah', ur: 'سانس باہر… استغفراللہ' },
  breatheIntro: { en: 'Slow down. He is closer than you think.', ur: 'ذرا ٹھہریں۔ وہ آپ کے گمان سے زیادہ قریب ہے۔' },
  skip: { en: 'Skip', ur: 'آگے' },
  next: { en: 'Continue', ur: 'جاری رکھیں' },
  masterDua: { en: 'The master dua of forgiveness', ur: 'سید الاستغفار' },
  masterDuaSub: { en: 'Sayyid al-Istighfar — read it slowly, mean every word.', ur: 'آہستہ پڑھیں، ہر لفظ دل سے۔' },
  transliteration: { en: 'Transliteration', ur: 'تلفظ' },
  meaning: { en: 'Meaning', ur: 'ترجمہ' },
  itsVirtue: { en: 'Its virtue', ur: 'اس کی فضیلت' },
  alhamdulillah: { en: 'Alhamdulillah — done', ur: 'الحمدللہ — مکمل' },
  returnedTitle: { en: 'Welcome back.', ur: 'خوش آمدید۔' },
  returnedCount: {
    en: 'Times you’ve returned: {n}. That isn’t failure — that’s tawbah, alive.',
    ur: 'واپسی کی تعداد: {n}۔ یہ ناکامی نہیں — یہ زندہ توبہ ہے۔',
  },
  returnAgain: { en: 'Back to the door', ur: 'دروازے پر واپس' },

  // Nijaat (essence)
  essenceLabel: { en: 'Beyond the drama', ur: 'ڈرامے سے آگے' },
  essenceTitle: { en: 'What is Nijaat?', ur: 'نجات کیا ہے؟' },
  beginPath: { en: 'Begin the path', ur: 'سفر شروع کریں' },

  // More
  moreTitle: { en: 'Settings & about', ur: 'ترتیبات اور تعارف' },
  language: { en: 'Language', ur: 'زبان' },
  theme: { en: 'Appearance', ur: 'انداز' },
  themeAuto: { en: 'Auto', ur: 'خودکار' },
  themeDay: { en: 'Day', ur: 'دن' },
  themeNight: { en: 'Night', ur: 'رات' },
  themeAutoNote: { en: 'Auto switches to night mode after dark.', ur: 'خودکار انداز اندھیرا ہونے پر رات کا انداز اپنا لیتا ہے۔' },
  privacyTitle: { en: 'Your journey is private', ur: 'آپ کا سفر نجی ہے' },
  privacyBody: {
    en: 'No account. No tracking. No ads. Everything you tick stays on this device only — between you and Allah.',
    ur: 'نہ اکاؤنٹ، نہ ٹریکنگ، نہ اشتہار۔ آپ جو کچھ نشان زد کرتے ہیں وہ صرف اسی فون پر رہتا ہے — آپ اور اللہ کے درمیان۔',
  },
  shareApp: { en: 'Share Dar-e-Nijaat', ur: 'درِ نجات شیئر کریں' },
  shareAppText: {
    en: 'Beyond the drama — what nijaat really means. A gentle companion for returning to Allah:',
    ur: 'ڈرامے سے آگے — نجات کا اصل مطلب۔ اللہ کی طرف لوٹنے کا ایک نرم ساتھی:',
  },
  sharePrompt: { en: 'Know someone who’s searching? Send them the door.', ur: 'کوئی تلاش میں ہے؟ اسے یہ دروازہ دکھائیں۔' },
  sources: { en: 'Sources', ur: 'ماخذ' },
  sourcesBody: {
    en: 'Qur’an: Uthmani text from The Noble Qur’an Encyclopedia (quranenc.com). English: Saheeh International. Urdu: Abul A’la Maududi (via tanzil.net). Hadith: references and gradings as on sunnah.com.',
    ur: 'قرآن: عثمانی متن، دی نوبل قرآن انسائیکلوپیڈیا (quranenc.com)۔ انگریزی ترجمہ: صحیح انٹرنیشنل۔ اردو ترجمہ: سید ابو الاعلیٰ مودودی (tanzil.net)۔ احادیث: حوالہ جات اور درجات sunnah.com کے مطابق۔',
  },
  disclaimer: {
    en: 'Dar-e-Nijaat is an independent, non-profit project and is not affiliated with any TV drama, channel or production house.',
    ur: 'درِ نجات ایک آزاد اور غیر منافع بخش منصوبہ ہے، اس کا کسی ٹی وی ڈرامے، چینل یا پروڈکشن ہاؤس سے کوئی تعلق نہیں۔',
  },
  installTitle: { en: 'Add to your home screen', ur: 'ہوم اسکرین پر شامل کریں' },
  installBody: {
    en: 'Use it like an app — it works offline too. On iPhone: Share → “Add to Home Screen”.',
    ur: 'اسے ایپ کی طرح استعمال کریں — بغیر انٹرنیٹ بھی چلتی ہے۔ آئی فون پر: Share ← ”Add to Home Screen“۔',
  },
  install: { en: 'Install', ur: 'انسٹال کریں' },
  resetTitle: { en: 'Start fresh', ur: 'نئے سرے سے شروع کریں' },
  resetBody: { en: 'Clears your ticks, streak, returns and tasbih counts on this device. Your journal and settings stay.', ur: 'اس فون سے آپ کے نشانات، سفر، واپسی اور تسبیح کی گنتی مٹا دیتا ہے۔ آپ کی ڈائری اور ترتیبات محفوظ رہیں گی۔' },
  resetConfirm: { en: 'Clear everything on this device? This can’t be undone.', ur: 'اس فون سے سب کچھ مٹا دیں؟ یہ واپس نہیں ہو سکے گا۔' },
  reset: { en: 'Reset', ur: 'مٹا دیں' },
  madeWith: { en: 'Made with love, for the sake of Allah.', ur: 'محبت کے ساتھ، اللہ کی رضا کے لیے۔' },
  closingTag: { en: 'Keep returning. Never give up.', ur: 'لوٹتے رہیں۔ کبھی ہمت نہ ہاریں۔' },
  closingLine: {
    en: 'The search for Dar-e-Nijaat is itself a sign that Allah is calling you back.',
    ur: 'درِ نجات کی تلاش خود اس بات کی نشانی ہے کہ اللہ آپ کو واپس بلا رہا ہے۔',
  },

  // Welcome
  welcomeEnter: { en: 'Enter', ur: 'داخل ہوں' },
  welcomeNext: { en: 'Next', ur: 'اگلا' },
  chooseLang: { en: 'Choose your language', ur: 'اپنی زبان منتخب کریں' },
} satisfies Record<string, L>;

export const S = { ...BASE, ...S_TOOLS };

export type StringKey = keyof typeof S;
