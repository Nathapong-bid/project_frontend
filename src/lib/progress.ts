export type ScoreEntry = {
  word: string;
  score: number;
  timestamp: string; // ISO string
};

const SCORE_STORAGE_KEY = 'worddee-score-history';
const MAX_ENTRIES = 20;

export function getScoreHistory(): ScoreEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SCORE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScoreEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addScoreEntry(word: string, score: number): void {
  if (typeof window === 'undefined') return;
  const entry: ScoreEntry = {
    word: word || 'Word',
    score,
    timestamp: new Date().toISOString()
  };

  const history = [entry, ...getScoreHistory()].slice(0, MAX_ENTRIES);
  localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(history));
}
