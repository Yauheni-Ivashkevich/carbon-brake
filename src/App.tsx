import { FALLBACK_ACTIONS } from './data/fallbackData';
import { useState, useEffect, useCallback } from 'react';
import { CategoryId, CompletedActionLog, EcoAction, Language, UserStats } from './types';
import { Theme, getStoredTheme, saveStoredTheme, applyThemeToDocument } from './utils/theme';
import { translations, defaultActions } from './data/translations';
import {
  getStoredHistory,
  getStoredLanguage,
  getStoredStats,
  saveStoredHistory,
  saveStoredLanguage,
  saveStoredStats,
} from './utils/storage';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { ActionCard } from './components/ActionCard';
import { StatsOverview } from './components/StatsOverview';
import { HistoryLog } from './components/HistoryLog';
import { CustomPromptModal } from './components/CustomPromptModal';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  // State initialization
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [currentLang, setCurrentLang] = useState<Language>(getStoredLanguage);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('digital_trash');
  const [currentAction, setCurrentAction] = useState<EcoAction>(
    () => defaultActions[getStoredLanguage()]['digital_trash']
  );
  const [stats, setStats] = useState<UserStats>(getStoredStats);
  const [history, setHistory] = useState<CompletedActionLog[]>(getStoredHistory);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = translations[currentLang];

  // Initialize theme on document on mount
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Toggle Theme
  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveStoredTheme(nextTheme);
  };

  // Save language changes
  const handleSelectLang = (lang: Language) => {
    setCurrentLang(lang);
    saveStoredLanguage(lang);

    // If current action was the default one, automatically switch action content to the new language
    if (!currentAction.isAiGenerated) {
      const updatedDefault = defaultActions[lang][selectedCategory];
      if (updatedDefault) {
        setCurrentAction(updatedDefault);
      }
    }
  };

  // Switch category
  const handleSelectCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setErrorMessage(null);
    if (cat === 'custom') {
      setIsCustomModalOpen(true);
    } else {
      const defaultForCat = defaultActions[currentLang][cat];
      if (defaultForCat) {
        setCurrentAction(defaultForCat);
      }
    }
  };

// Generate new action via Gemini API with LocalStorage Caching & Fallback
  const handleGenerateAiAction = useCallback(
    async (customPromptText?: string) => {
      setIsLoadingAi(true);
      setErrorMessage(null);

      // Формируем уникальный ключ кэша для комбинации категории и языка
      const cacheKey = `carbon_brake_cache_${selectedCategory}_${currentLang}`;

      try {
        const response = await fetch('/api/generate-action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: selectedCategory,
            language: currentLang,
            customPrompt: customPromptText || '',
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const resData = await response.json();
        if (resData.success && resData.data) {
          const aiData = resData.data;

          // Сохраняем свежий успешный ответ от Gemini в кэш браузера
          if (!customPromptText) {
            localStorage.setItem(cacheKey, JSON.stringify(aiData));
          }

          const newAction: EcoAction = {
            id: `ai_${Date.now()}`,
            title: aiData.title || t.categories[selectedCategory].name,
            category: selectedCategory,
            action: aiData.action,
            impactFact: aiData.impactFact,
            co2SavedGrams: Number(aiData.co2SavedGrams) || 20,
            energySavedWh: Number(aiData.energySavedWh) || 10,
            waterSavedLiters: Number(aiData.waterSavedLiters) || 0,
            durationSeconds: Number(aiData.durationSeconds) || 60,
            emoji: aiData.emoji || (selectedCategory === 'water_saver' ? '🚰' : selectedCategory === 'phantom_power' ? '🔌' : '📧'),
            actionSteps: Array.isArray(aiData.actionSteps) && aiData.actionSteps.length > 0
              ? aiData.actionSteps
              : [aiData.action],
            isAiGenerated: true,
          };
          setCurrentAction(newAction);
          if (customPromptText) {
            setIsCustomModalOpen(false);
          }
        } else {
          throw new Error(resData.error || 'Failed to parse AI action');
        }
      } catch (err: any) {
        console.warn('AI generation error, checking cache or using fallback:', err);

        let fallbackData: any = null;

        // 1. Пытаемся достать ранее закэшированный ответ для этой категории из localStorage
        const cachedStr = localStorage.getItem(cacheKey);
        if (cachedStr) {
          try {
            fallbackData = JSON.parse(cachedStr);
          } catch (e) {
            console.error('Error parsing cache', e);
          }
        }

        // 2. Если кэша нет, берём статический ответ из src/data/fallbackData.ts
        if (!fallbackData) {
          const catKey = FALLBACK_ACTIONS[selectedCategory] ? selectedCategory : 'digital_trash';
          fallbackData = FALLBACK_ACTIONS[catKey]?.[currentLang] || FALLBACK_ACTIONS.digital_trash.ru;
        }

        const fallbackAction: EcoAction = {
          id: `fb_${Date.now()}`,
          title: fallbackData.title || t.categories[selectedCategory]?.name || 'Eco Action',
          category: selectedCategory,
          action: fallbackData.action,
          impactFact: fallbackData.impactFact,
          co2SavedGrams: Number(fallbackData.co2SavedGrams) || 15,
          energySavedWh: Number(fallbackData.energySavedWh) || 10,
          waterSavedLiters: Number(fallbackData.waterSavedLiters) || 0,
          durationSeconds: Number(fallbackData.durationSeconds) || 60,
          emoji: fallbackData.emoji || '🌿',
          actionSteps: fallbackData.actionSteps || [fallbackData.action],
          isAiGenerated: false,
        };

        setCurrentAction(fallbackAction);

        setErrorMessage(
          currentLang === 'ru'
            ? 'Офлайн-режим: загружено сохраненное действие из кэша.'
            : currentLang === 'pl'
            ? 'Tryb offline: wczytano zadanie z pamięci podręcznej.'
            : 'Offline mode: loaded cached action.'
        );
        setTimeout(() => setErrorMessage(null), 5000);
      } finally {
        setIsLoadingAi(false);
      }
    },
    [currentLang, selectedCategory, t.categories]
  );

  // Complete action & log stats
  const handleCompleteAction = (action: EcoAction) => {
    const todayStr = new Date().toISOString().split('T')[0];

    // Calculate streak
    let newStreak = stats.currentStreak;
    if (stats.lastActiveDate) {
      const lastDate = new Date(stats.lastActiveDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const updatedStats: UserStats = {
      totalCo2SavedGrams: stats.totalCo2SavedGrams + (action.co2SavedGrams || 20),
      totalEnergySavedWh: stats.totalEnergySavedWh + (action.energySavedWh || 0),
      totalWaterSavedLiters: stats.totalWaterSavedLiters + (action.waterSavedLiters || 0),
      totalActionsCompleted: stats.totalActionsCompleted + 1,
      currentStreak: newStreak,
      lastActiveDate: todayStr,
    };

    const newLogItem: CompletedActionLog = {
      id: `log_${Date.now()}`,
      actionId: action.id,
      title: action.title,
      category: action.category,
      co2SavedGrams: action.co2SavedGrams || 20,
      energySavedWh: action.energySavedWh || 0,
      waterSavedLiters: action.waterSavedLiters || 0,
      completedAt: new Date().toISOString(),
      emoji: action.emoji || '🌿',
    };

    const updatedHistory = [newLogItem, ...history].slice(0, 30);

    setStats(updatedStats);
    setHistory(updatedHistory);
    saveStoredStats(updatedStats);
    saveStoredHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveStoredHistory([]);
  };

  // Sync language with default action on mount or when category changes
  useEffect(() => {
    if (!currentAction.isAiGenerated) {
      const def = defaultActions[currentLang][selectedCategory];
      if (def) {
        setCurrentAction(def);
      }
    }
  }, [currentLang, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      {/* Sticky Header with Multi-Language Switcher (RU | EN | PL), Theme toggle & Sound */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        totalCo2SavedGrams={stats.totalCo2SavedGrams}
        currentStreak={stats.currentStreak}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 py-4 sm:px-6 sm:py-6 flex flex-col">
        {/* Error / Alert banner if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-600 dark:text-amber-400 hover:opacity-80 font-bold px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Category Selector Tabs with Full Uncut Text */}
        <CategorySelector
          currentLang={currentLang}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          isLoading={isLoadingAi}
        />

        {/* Primary Interactive 1-Minute Action Card */}
        <div className="w-full my-2">
          <ActionCard
            action={currentAction}
            currentLang={currentLang}
            onCompleteAction={handleCompleteAction}
            onGenerateNew={() => handleGenerateAiAction()}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
            isLoadingAi={isLoadingAi}
            soundEnabled={soundEnabled}
          />
        </div>

        {/* Eco Stats Overview */}
        <StatsOverview stats={stats} currentLang={currentLang} />

        {/* Completed Activity Timeline Log */}
        <HistoryLog
          history={history}
          currentLang={currentLang}
          onClearHistory={handleClearHistory}
        />

        {/* Custom Prompt Modal */}
        <CustomPromptModal
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          onSubmit={(promptText) => handleGenerateAiAction(promptText)}
          currentLang={currentLang}
          isLoading={isLoadingAi}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950 py-5 px-4 text-center text-xs text-zinc-500 transition-colors">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="flex items-center justify-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>{t.footer.poweredBy}</span>
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 max-w-xl mx-auto">
            {t.footer.microActionInfo}
          </p>
        </div>
      </footer>
    </div>
  );
}
