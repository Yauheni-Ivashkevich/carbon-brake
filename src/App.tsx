import { useState, useEffect, useCallback } from 'react';
import { CategoryId, CompletedActionLog, EcoAction, Language, UserStats } from './types';
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

  // Generate new action via Gemini API
  const handleGenerateAiAction = useCallback(
    async (customPromptText?: string) => {
      setIsLoadingAi(true);
      setErrorMessage(null);

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
        console.warn('AI generation error, using curated fallback:', err);
        // Fallback to default curated action for category
        const fallback = defaultActions[currentLang][selectedCategory] || defaultActions[currentLang].digital_trash;
        setCurrentAction({
          ...fallback,
          id: `fb_${Date.now()}`,
        });
        setErrorMessage(
          currentLang === 'ru'
            ? 'Использовано базовое действие (Gemini API ответит при следующем запросе).'
            : currentLang === 'pl'
            ? 'Użyto podstawowego zadania ekologicznego.'
            : 'Loaded curated action from local library.'
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Header with Multi-Language Switcher (RU | EN | PL) */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        totalCo2SavedGrams={stats.totalCo2SavedGrams}
        currentStreak={stats.currentStreak}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:px-6 flex flex-col">
        {/* Error / Alert banner if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-400 hover:text-amber-300 font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Category Selector Tabs */}
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
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="flex items-center justify-center gap-1.5 text-zinc-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.footer.poweredBy}</span>
          </p>
          <p className="text-[11px] text-zinc-600 max-w-xl mx-auto">
            {t.footer.microActionInfo}
          </p>
        </div>
      </footer>
    </div>
  );
}
