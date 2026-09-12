import { CompletedActionLog, Language, UserStats } from '../types';

const STATS_KEY = 'carbonbrake_user_stats_v1';
const HISTORY_KEY = 'carbonbrake_history_v1';
const LANG_KEY = 'carbonbrake_lang_v1';

export const initialStats: UserStats = {
  totalCo2SavedGrams: 0,
  totalEnergySavedWh: 0,
  totalWaterSavedLiters: 0,
  totalActionsCompleted: 0,
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'ru' || saved === 'en' || saved === 'pl') {
    return saved;
  }
  return 'ru';
}

export function saveStoredLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
}

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') return initialStats;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return initialStats;
    const parsed = JSON.parse(raw);
    return {
      ...initialStats,
      ...parsed,
    };
  } catch {
    return initialStats;
  }
}

export function saveStoredStats(stats: UserStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
}

export function getStoredHistory(): CompletedActionLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredHistory(history: CompletedActionLog[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history to localStorage', e);
  }
}
