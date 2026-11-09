import type { L } from './types';

/** UI copy for Phase 2 tools. Urdu stays gender-neutral (آپ + imperative / noun phrases). */
export const S_TOOLS = {
  // Hub
  toolsLabel: { en: 'Your companions', ur: 'آپ کے ساتھی' },
  toolsTitle: { en: 'Tools for the path', ur: 'راستے کے ساتھی' },
  settings: { en: 'Settings & about', ur: 'ترتیبات اور تعارف' },
  toolPrayer: { en: 'Prayer times', ur: 'نماز کے اوقات' },
  toolPrayerSub: { en: 'Calculated on your phone', ur: 'آپ کے فون پر حساب' },
  toolTasbih: { en: 'Tasbih', ur: 'تسبیح' },
  toolTasbihSub: { en: 'A gentle dhikr counter', ur: 'ذکر گننے کا نرم ساتھی' },
  toolDuas: { en: 'Duas', ur: 'دعائیں' },
  toolDuasSub: { en: 'From the Qur’an & Sunnah', ur: 'قرآن و سنت سے' },
  toolJournal: { en: 'Journal', ur: 'ڈائری' },
  toolJournalSub: { en: 'Private reflections', ur: 'نجی خیالات' },

  // Prayer
  nextPrayer: { en: 'Next prayer', ur: 'اگلی نماز' },
  inTime: { en: 'in {t}', ur: '{t} میں' },
  hoursMins: { en: '{h}h {m}m', ur: '{h} گھنٹے {m} منٹ' },
  mins: { en: '{m} min', ur: '{m} منٹ' },
  nowTime: { en: 'It’s time for {p}', ur: '{p} کا وقت ہو گیا' },
  setupPrayer: { en: 'Set up prayer times', ur: 'نماز کے اوقات ترتیب دیں' },
  setupPrayerSub: { en: 'Pick your city — your location never leaves your phone.', ur: 'اپنا شہر منتخب کریں — آپ کا مقام آپ کے فون سے باہر نہیں جاتا۔' },
  useMyLocation: { en: 'Use my location', ur: 'میرا مقام استعمال کریں' },
  myLocation: { en: 'My location', ur: 'میرا مقام' },
  locating: { en: 'Finding you…', ur: 'مقام معلوم ہو رہا ہے…' },
  locationDenied: { en: 'Couldn’t get your location. Please pick a city instead.', ur: 'مقام نہیں مل سکا۔ براہِ کرم شہر منتخب کریں۔' },
  orPickCity: { en: 'or pick a city', ur: 'یا شہر منتخب کریں' },
  searchCity: { en: 'Search city', ur: 'شہر تلاش کریں' },
  change: { en: 'Change', ur: 'تبدیل کریں' },
  todayTimes: { en: 'Today’s times', ur: 'آج کے اوقات' },
  qiblaDir: { en: 'Qibla: {d}° from North', ur: 'قبلہ: شمال سے {d}°' },
  method: { en: 'Calculation method', ur: 'حساب کا طریقہ' },
  asrMadhab: { en: 'Asr time', ur: 'وقتِ عصر' },
  hanafi: { en: 'Hanafi', ur: 'حنفی' },
  shafi: { en: 'Shafi‘i / others', ur: 'شافعی / دیگر' },
  prayerNote: {
    en: 'Times are calculated on your device. Always follow your local masjid if it differs.',
    ur: 'اوقات آپ کے فون پر حساب ہوتے ہیں۔ اگر فرق ہو تو اپنی مقامی مسجد کی پیروی کریں۔',
  },

  // Reminders
  reminders: { en: 'Gentle reminders', ur: 'نرم یاد دہانیاں' },
  remindPrayers: { en: 'Prayer times', ur: 'نماز کے اوقات' },
  remindNight: { en: 'Night istighfar (10 pm)', ur: 'رات کا استغفار (رات ۱۰ بجے)' },
  remindNote: {
    en: 'On the web, reminders arrive while Dar-e-Nijaat is open or installed and recently used. The app-store version will remind you anytime.',
    ur: 'ویب پر یاد دہانیاں تب آتی ہیں جب درِ نجات کھلی ہو یا انسٹال ہو کر حال ہی میں استعمال ہوئی ہو۔ ایپ اسٹور ورژن ہر وقت یاد دلائے گا۔',
  },
  remindBlocked: { en: 'Notifications are blocked in your browser settings.', ur: 'براؤزر کی ترتیبات میں نوٹیفکیشن بند ہیں۔' },
  notifPrayerTitle: { en: 'It’s time for {p}', ur: '{p} کا وقت ہو گیا' },
  notifPrayerBody: { en: 'The door is open. Come, let’s pray.', ur: 'دروازہ کھلا ہے۔ آئیے، نماز پڑھیں۔' },
  notifNightTitle: { en: 'Before you sleep', ur: 'سونے سے پہلے' },
  notifNightBody: { en: 'Astaghfirullah. End the day with Him.', ur: 'استغفراللہ۔ دن کا اختتام اُس کے ساتھ۔' },

  // Tasbih
  tapToCount: { en: 'Tap anywhere on the bead', ur: 'دانے پر کہیں بھی چھوئیں' },
  target: { en: 'Target', ur: 'ہدف' },
  noTarget: { en: '∞', ur: '∞' },
  resetCount: { en: 'Reset count', ur: 'گنتی صفر کریں' },
  targetReached: { en: 'MashaAllah — {n} complete', ur: 'ماشاءاللہ — {n} مکمل' },
  todayDhikr: { en: 'Today: {n}', ur: 'آج: {n}' },
  lifetimeDhikr: { en: 'All time: {n}', ur: 'کل: {n}' },

  // Duas
  duasSub: { en: 'Words the Prophets and the Prophet ﷺ used to call on Allah.', ur: 'وہ الفاظ جن سے انبیاء اور نبی ﷺ اللہ کو پکارتے تھے۔' },
  copyDua: { en: 'Copy', ur: 'کاپی' },
  copiedDua: { en: 'Copied', ur: 'کاپی ہو گئی' },

  // Journal
  journalSub: {
    en: 'Write to yourself, or to Allah. Nothing here ever leaves this phone unless you export it.',
    ur: 'اپنے لیے لکھیں، یا اللہ سے بات کریں۔ یہاں کچھ بھی اس فون سے باہر نہیں جاتا، جب تک آپ خود ایکسپورٹ نہ کریں۔',
  },
  newEntry: { en: 'New reflection', ur: 'نیا خیال' },
  promptLabel: { en: 'A prompt, if you need one', ur: 'اگر ضرورت ہو تو ایک سوال' },
  anotherPrompt: { en: 'Another', ur: 'دوسرا' },
  howFeeling: { en: 'How is your heart?', ur: 'دل کا حال کیسا ہے؟' },
  writeHere: { en: 'Write freely…', ur: 'کھل کر لکھیں…' },
  save: { en: 'Save', ur: 'محفوظ کریں' },
  cancel: { en: 'Cancel', ur: 'منسوخ' },
  edit: { en: 'Edit', ur: 'ترمیم' },
  delete: { en: 'Delete', ur: 'حذف' },
  deleteConfirm: { en: 'Delete this reflection?', ur: 'یہ خیال حذف کر دیں؟' },
  emptyJournal: { en: 'Your first page is waiting.', ur: 'آپ کا پہلا صفحہ منتظر ہے۔' },
  exportJournal: { en: 'Export as text', ur: 'متن کے طور پر ایکسپورٹ' },
  entries: { en: '{n} reflections', ur: '{n} خیالات' },

  // Quote card
  shareImage: { en: 'Share as image', ur: 'تصویر کے طور پر شیئر' },
  shareCardTitle: { en: 'Share the light', ur: 'روشنی بانٹیں' },
  story: { en: 'Story', ur: 'اسٹوری' },
  square: { en: 'Post', ur: 'پوسٹ' },
  saveImage: { en: 'Save image', ur: 'تصویر محفوظ کریں' },
  copyText: { en: 'Copy text', ur: 'متن کاپی کریں' },
  making: { en: 'Preparing…', ur: 'تیار ہو رہی ہے…' },
} satisfies Record<string, L>;

export const JOURNAL_PROMPTS: L[] = [
  { en: 'What pulled me away from Allah today?', ur: 'آج کس چیز نے اللہ سے دور کیا؟' },
  { en: 'One thing I’m grateful for right now.', ur: 'اس وقت کس چیز پر دل شکر گزار ہے؟' },
  { en: 'What do I want to say to Allah tonight?', ur: 'آج رات اللہ سے کیا کہنے کو دل چاہتا ہے؟' },
  { en: 'Where did I see His mercy today?', ur: 'آج اُس کی رحمت کہاں نظر آئی؟' },
  { en: 'One small step for tomorrow.', ur: 'کل کے لیے ایک چھوٹا قدم۔' },
  { en: 'What am I ready to let go of?', ur: 'کس چیز کو چھوڑنے کا وقت آ گیا ہے؟' },
  { en: 'A dua I keep coming back to.', ur: 'ایک دعا جو بار بار لبوں پر آتی ہے۔' },
];

export const MOODS: { id: string; emoji: string; name: L }[] = [
  { id: 'grateful', emoji: '🤲', name: { en: 'Grateful', ur: 'شکر گزار' } },
  { id: 'hopeful', emoji: '🌱', name: { en: 'Hopeful', ur: 'پُرامید' } },
  { id: 'peaceful', emoji: '🕊️', name: { en: 'At peace', ur: 'پُرسکون' } },
  { id: 'heavy', emoji: '🌧️', name: { en: 'Heavy', ur: 'بوجھل' } },
  { id: 'struggling', emoji: '🌊', name: { en: 'Struggling', ur: 'مشکل میں' } },
];

export const DHIKR: { id: string; ar: string; translit: string; meaning: L }[] = [
  { id: 'subhanallah', ar: 'سُبْحَانَ اللَّهِ', translit: 'SubḥānAllāh', meaning: { en: 'Glory be to Allah', ur: 'اللہ پاک ہے' } },
  { id: 'alhamdulillah', ar: 'الْحَمْدُ لِلَّهِ', translit: 'Alḥamdulillāh', meaning: { en: 'All praise is for Allah', ur: 'تمام تعریفیں اللہ کے لیے ہیں' } },
  { id: 'allahuakbar', ar: 'اللَّهُ أَكْبَرُ', translit: 'Allāhu Akbar', meaning: { en: 'Allah is the Greatest', ur: 'اللہ سب سے بڑا ہے' } },
  { id: 'astaghfirullah', ar: 'أَسْتَغْفِرُ اللَّهَ', translit: 'Astaghfirullāh', meaning: { en: 'I seek Allah’s forgiveness', ur: 'میں اللہ سے بخشش مانگتا ہوں' } },
  { id: 'tahlil', ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', translit: 'Lā ilāha illallāh', meaning: { en: 'There is no god but Allah', ur: 'اللہ کے سوا کوئی معبود نہیں' } },
  { id: 'salawat', ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', translit: 'Allāhumma ṣalli ʿalā Muḥammad', meaning: { en: 'O Allah, send blessings upon Muhammad', ur: 'اے اللہ! محمد ﷺ پر رحمت نازل فرما' } },
];
