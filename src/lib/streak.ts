import { addDays } from './date';

export interface StreakInfo {
  /** Consecutive "lit" days, forgiving single missed days. */
  streak: number;
  /** Every day with at least one lantern lit. */
  total: number;
}

const lit = (day: boolean[] | undefined) => !!day && day.some(Boolean);

/**
 * A merciful streak: a day counts when at least one lantern is lit, and a
 * single missed day never breaks the path: only two missed days in a row do.
 * Today is still "open", so an unlit today doesn't count as missed.
 */
export function computeStreak(days: Record<string, boolean[]>, today: string): StreakInfo {
  const total = Object.values(days).filter(lit).length;
  let streak = 0;
  let misses = 0;
  let cursor = lit(days[today]) ? today : addDays(today, -1);
  for (let i = 0; i < 800; i++) {
    if (lit(days[cursor])) {
      streak++;
      misses = 0;
    } else if (++misses >= 2) {
      break;
    }
    cursor = addDays(cursor, -1);
  }
  return { streak, total };
}
