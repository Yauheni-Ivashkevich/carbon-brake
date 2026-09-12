import React from 'react';
import { CompletedActionLog, Language } from '../types';
import { translations } from '../data/translations';
import { History, Trash2, Globe, Clock } from 'lucide-react';

interface HistoryLogProps {
  history: CompletedActionLog[];
  currentLang: Language;
  onClearHistory: () => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({
  history,
  currentLang,
  onClearHistory,
}) => {
  const t = translations[currentLang];

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return t.history.justNow;
      if (diffMins < 60) return `${diffMins} ${t.history.minutesAgo}`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} ${t.history.hoursAgo}`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ${t.history.daysAgo}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="w-full my-4 sm:my-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xs">
      {/* Title + Clear button */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.history.title}</span>
          <span className="text-xs font-normal text-zinc-500">({history.length})</span>
        </h3>
        {history.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={onClearHistory}
            className="text-xs text-zinc-500 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>{t.history.clearAll}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-6 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/40 text-xs sm:text-sm text-zinc-500">
          {t.history.empty}
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 select-none">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base sm:text-lg p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                  {item.emoji || '🌿'}
                </span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{item.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTimeAgo(item.completedAt)}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{item.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 px-2 py-1 rounded-lg">
                <Globe className="w-3 h-3" />
                <span>+{item.co2SavedGrams}g CO₂</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
