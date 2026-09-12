export type Language = 'ru' | 'en' | 'pl';

export type CategoryId = 'digital_trash' | 'phantom_power' | 'water_saver' | 'custom';

export interface EcoAction {
  id: string;
  title: string;
  category: CategoryId;
  action: string;
  impactFact: string;
  co2SavedGrams: number;
  energySavedWh: number;
  waterSavedLiters: number;
  durationSeconds: number;
  emoji: string;
  actionSteps: string[];
  isAiGenerated?: boolean;
}

export interface CompletedActionLog {
  id: string;
  actionId: string;
  title: string;
  category: CategoryId;
  co2SavedGrams: number;
  energySavedWh: number;
  waterSavedLiters: number;
  completedAt: string;
  emoji: string;
}

export interface UserStats {
  totalCo2SavedGrams: number;
  totalEnergySavedWh: number;
  totalWaterSavedLiters: number;
  totalActionsCompleted: number;
  currentStreak: number;
  lastActiveDate: string | null;
}
