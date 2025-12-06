const STREAK_KEY = 'worddee-day-streak';
const DEFAULT_STREAK = 1;

const isBrowser = () => typeof window !== 'undefined';

export function getStreak(): number {
  if (!isBrowser()) return DEFAULT_STREAK;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    const parsed = raw ? Number(raw) : NaN;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_STREAK;
  } catch {
    return DEFAULT_STREAK;
  }
}

export function incrementStreak(): number {
  if (!isBrowser()) return DEFAULT_STREAK;
  const next = getStreak() + 1;
  try {
    localStorage.setItem(STREAK_KEY, String(next));
  } catch {
    // ignore write errors
  }
  return next;
}
