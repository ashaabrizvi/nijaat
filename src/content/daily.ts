import type { DailyItem, L } from './types';

export const DAILY: DailyItem[] = [
  { id: 'fajr', title: { en: 'Fajr', ur: 'فجر' }, tagline: { en: 'Begin the day with Allah.', ur: 'دن کا آغاز اللہ کے ساتھ۔' } },
  { id: 'prayers', title: { en: 'The five prayers', ur: 'پانچوں نمازیں' }, tagline: { en: 'Guard your connection.', ur: 'اپنا تعلق قائم رکھیں۔' } },
  { id: 'quran', title: { en: 'Qur’an, 5–10 minutes', ur: 'قرآن، ۵–۱۰ منٹ' }, tagline: { en: 'Nourish your heart with His words.', ur: 'اُس کے کلام سے دل کو غذا دیں۔' } },
  { id: 'dua', title: { en: 'One sincere dua', ur: 'ایک سچی دعا' }, tagline: { en: 'Tell Him what’s in your heart.', ur: 'دل کی بات اُس سے کہیں۔' } },
  { id: 'leave', title: { en: 'One habit, left today', ur: 'ایک عادت سے آج دوری' }, tagline: { en: 'Just one thing. Just today.', ur: 'بس ایک چیز۔ بس آج۔' } },
  { id: 'istighfar', title: { en: 'Sleep with istighfar', ur: 'استغفار کے ساتھ سونا' }, tagline: { en: 'End the day in peace.', ur: 'دن کا اختتام سکون سے۔' } },
];

export const REMEMBER: L[] = [
  { en: 'Allah’s mercy is endless.', ur: 'اللہ کی رحمت کی کوئی حد نہیں۔' },
  { en: 'Small, steady steps lead to lasting change.', ur: 'چھوٹے مگر مسلسل قدم دیرپا تبدیلی لاتے ہیں۔' },
  { en: 'Make dua — Allah guides whom He wills.', ur: 'دعا کریں — اللہ جسے چاہے ہدایت دیتا ہے۔' },
  { en: 'You don’t have to be perfect, just sincere.', ur: 'کامل ہونا ضروری نہیں، بس مخلص ہونا ضروری ہے۔' },
];
