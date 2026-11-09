import type { CalcMethod } from '../lib/store';
import type { L } from './types';

export interface City {
  id: string;
  name: L;
  country: L;
  lat: number;
  lng: number;
  tz: string;
  method: CalcMethod;
  madhab: 'hanafi' | 'shafi';
}

const pk = { en: 'Pakistan', ur: 'پاکستان' };
const ind = { en: 'India', ur: 'بھارت' };
const sa = { en: 'Saudi Arabia', ur: 'سعودی عرب' };
const uk = { en: 'United Kingdom', ur: 'برطانیہ' };
const us = { en: 'USA', ur: 'امریکہ' };
const K = 'Asia/Karachi';
const I = 'Asia/Kolkata';

const c = (
  id: string, en: string, ur: string, country: L, lat: number, lng: number, tz: string, method: CalcMethod, madhab: 'hanafi' | 'shafi',
): City => ({ id, name: { en, ur }, country, lat, lng, tz, method, madhab });

/** Major cities, so prayer times work without sharing your location. */
export const CITIES: City[] = [
  c('karachi', 'Karachi', 'کراچی', pk, 24.8607, 67.0011, K, 'Karachi', 'hanafi'),
  c('lahore', 'Lahore', 'لاہور', pk, 31.5204, 74.3587, K, 'Karachi', 'hanafi'),
  c('islamabad', 'Islamabad', 'اسلام آباد', pk, 33.6844, 73.0479, K, 'Karachi', 'hanafi'),
  c('rawalpindi', 'Rawalpindi', 'راولپنڈی', pk, 33.5651, 73.0169, K, 'Karachi', 'hanafi'),
  c('faisalabad', 'Faisalabad', 'فیصل آباد', pk, 31.4504, 73.135, K, 'Karachi', 'hanafi'),
  c('multan', 'Multan', 'ملتان', pk, 30.1575, 71.5249, K, 'Karachi', 'hanafi'),
  c('peshawar', 'Peshawar', 'پشاور', pk, 34.0151, 71.5249, K, 'Karachi', 'hanafi'),
  c('quetta', 'Quetta', 'کوئٹہ', pk, 30.1798, 66.975, K, 'Karachi', 'hanafi'),
  c('hyderabad-pk', 'Hyderabad (Sindh)', 'حیدرآباد (سندھ)', pk, 25.396, 68.3578, K, 'Karachi', 'hanafi'),
  c('sialkot', 'Sialkot', 'سیالکوٹ', pk, 32.4945, 74.5229, K, 'Karachi', 'hanafi'),
  c('delhi', 'Delhi', 'دہلی', ind, 28.6139, 77.209, I, 'Karachi', 'hanafi'),
  c('mumbai', 'Mumbai', 'ممبئی', ind, 19.076, 72.8777, I, 'Karachi', 'hanafi'),
  c('hyderabad-in', 'Hyderabad (Deccan)', 'حیدرآباد (دکن)', ind, 17.385, 78.4867, I, 'Karachi', 'hanafi'),
  c('lucknow', 'Lucknow', 'لکھنؤ', ind, 26.8467, 80.9462, I, 'Karachi', 'hanafi'),
  c('bengaluru', 'Bengaluru', 'بنگلور', ind, 12.9716, 77.5946, I, 'Karachi', 'hanafi'),
  c('kolkata', 'Kolkata', 'کولکتہ', ind, 22.5726, 88.3639, I, 'Karachi', 'hanafi'),
  c('dhaka', 'Dhaka', 'ڈھاکہ', { en: 'Bangladesh', ur: 'بنگلہ دیش' }, 23.8103, 90.4125, 'Asia/Dhaka', 'Karachi', 'hanafi'),
  c('makkah', 'Makkah', 'مکہ مکرمہ', sa, 21.3891, 39.8579, 'Asia/Riyadh', 'UmmAlQura', 'shafi'),
  c('madinah', 'Madinah', 'مدینہ منورہ', sa, 24.5247, 39.5692, 'Asia/Riyadh', 'UmmAlQura', 'shafi'),
  c('riyadh', 'Riyadh', 'ریاض', sa, 24.7136, 46.6753, 'Asia/Riyadh', 'UmmAlQura', 'shafi'),
  c('jeddah', 'Jeddah', 'جدہ', sa, 21.4858, 39.1925, 'Asia/Riyadh', 'UmmAlQura', 'shafi'),
  c('dubai', 'Dubai', 'دبئی', { en: 'UAE', ur: 'متحدہ عرب امارات' }, 25.2048, 55.2708, 'Asia/Dubai', 'Dubai', 'shafi'),
  c('abudhabi', 'Abu Dhabi', 'ابوظہبی', { en: 'UAE', ur: 'متحدہ عرب امارات' }, 24.4539, 54.3773, 'Asia/Dubai', 'Dubai', 'shafi'),
  c('doha', 'Doha', 'دوحہ', { en: 'Qatar', ur: 'قطر' }, 25.2854, 51.531, 'Asia/Qatar', 'Qatar', 'shafi'),
  c('kuwait', 'Kuwait City', 'کویت', { en: 'Kuwait', ur: 'کویت' }, 29.3759, 47.9774, 'Asia/Kuwait', 'Kuwait', 'shafi'),
  c('muscat', 'Muscat', 'مسقط', { en: 'Oman', ur: 'عمان' }, 23.588, 58.3829, 'Asia/Muscat', 'MuslimWorldLeague', 'shafi'),
  c('istanbul', 'Istanbul', 'استنبول', { en: 'Türkiye', ur: 'ترکی' }, 41.0082, 28.9784, 'Europe/Istanbul', 'Turkey', 'hanafi'),
  c('cairo', 'Cairo', 'قاہرہ', { en: 'Egypt', ur: 'مصر' }, 30.0444, 31.2357, 'Africa/Cairo', 'Egyptian', 'shafi'),
  c('kualalumpur', 'Kuala Lumpur', 'کوالالمپور', { en: 'Malaysia', ur: 'ملائیشیا' }, 3.139, 101.6869, 'Asia/Kuala_Lumpur', 'Singapore', 'shafi'),
  c('london', 'London', 'لندن', uk, 51.5072, -0.1276, 'Europe/London', 'MoonsightingCommittee', 'hanafi'),
  c('birmingham', 'Birmingham', 'برمنگھم', uk, 52.4862, -1.8904, 'Europe/London', 'MoonsightingCommittee', 'hanafi'),
  c('manchester', 'Manchester', 'مانچسٹر', uk, 53.4808, -2.2426, 'Europe/London', 'MoonsightingCommittee', 'hanafi'),
  c('bradford', 'Bradford', 'بریڈفورڈ', uk, 53.795, -1.7594, 'Europe/London', 'MoonsightingCommittee', 'hanafi'),
  c('toronto', 'Toronto', 'ٹورنٹو', { en: 'Canada', ur: 'کینیڈا' }, 43.6532, -79.3832, 'America/Toronto', 'NorthAmerica', 'hanafi'),
  c('newyork', 'New York', 'نیویارک', us, 40.7128, -74.006, 'America/New_York', 'NorthAmerica', 'hanafi'),
  c('chicago', 'Chicago', 'شکاگو', us, 41.8781, -87.6298, 'America/Chicago', 'NorthAmerica', 'hanafi'),
  c('houston', 'Houston', 'ہیوسٹن', us, 29.7604, -95.3698, 'America/Chicago', 'NorthAmerica', 'hanafi'),
  c('sydney', 'Sydney', 'سڈنی', { en: 'Australia', ur: 'آسٹریلیا' }, -33.8688, 151.2093, 'Australia/Sydney', 'MuslimWorldLeague', 'hanafi'),
];

export const cityById = (id: string) => CITIES.find((x) => x.id === id);
