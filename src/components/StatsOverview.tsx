import React from 'react';
import { Language, UserStats } from '../types';
import { translations } from '../data/translations';
import { Globe, Zap, Droplet, Flame, Trophy, Award, CheckCircle } from 'lucide-react';

interface StatsOverviewProps {
  stats: UserStats;
  currentLang: Language;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, currentLang }) => {
  const t = translations[currentLang];

  // Calculate Eco Rank Level
  const getRankInfo = () => {
    if (stats.totalActionsCompleted >= 15) {
      return {
        label: t.stats.levelClimateHero,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/30',
        badge: '👑 Master',
      };
    }
    if (stats.totalActionsCompleted >= 5) {
      return {
        label: t.stats.levelEcoWarrior,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        badge: '⚡ Pro',
      };
    }
    return {
      label: t.stats.levelBeginner,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/30',
      badge: '🌱 Novice',
    };
  };

  const rank = getRankInfo();

  // Impact Equivalents in human terms
  const phoneChargesSaved = Math.round(stats.totalEnergySavedWh / 12); // ~12 Wh per phone charge
  const ledHoursSaved = Math.round(stats.totalEnergySavedWh / 9); // ~9W LED bulb
  const co2KmCarEquivalent = (stats.totalCo2SavedGrams / 120).toFixed(1); // ~120g CO2 per km car drive

  return (
    <div className="w-full my-6">
      {/* Title & Rank Badge */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" />
          <span>{t.stats.title}</span>
        </h2>
        <div className={`px-2.5 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${rank.bg} ${rank.color}`}>
          <Award className="w-3.5 h-3.5" />
          <span>{rank.label}</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Metric 1: Total CO2 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 text-zinc-400 text-xs">
            <span>{t.metrics.co2Saved}</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Globe className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-white">
              {stats.totalCo2SavedGrams >= 1000
                ? (stats.totalCo2SavedGrams / 1000).toFixed(2)
                : stats.totalCo2SavedGrams}
            </span>
            <span className="text-xs font-bold text-emerald-400">
              {stats.totalCo2SavedGrams >= 1000 ? t.metrics.kg : t.metrics.grams}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">
            ≈ {co2KmCarEquivalent} km car driving
          </p>
        </div>

        {/* Metric 2: Total Energy */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 text-zinc-400 text-xs">
            <span>{t.metrics.energySaved}</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-white">
              {stats.totalEnergySavedWh >= 1000
                ? (stats.totalEnergySavedWh / 1000).toFixed(2)
                : stats.totalEnergySavedWh}
            </span>
            <span className="text-xs font-bold text-amber-400">
              {stats.totalEnergySavedWh >= 1000 ? t.metrics.kwh : t.metrics.wattHours}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">
            ≈ {phoneChargesSaved > 0 ? phoneChargesSaved : 0} smartphone charges
          </p>
        </div>

        {/* Metric 3: Water Saved */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 text-zinc-400 text-xs">
            <span>{t.metrics.waterSaved}</span>
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <Droplet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-white">
              {stats.totalWaterSavedLiters}
            </span>
            <span className="text-xs font-bold text-sky-400">
              {t.metrics.liters}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1">
            ≈ {stats.totalWaterSavedLiters * 4} glasses of drinking water
          </p>
        </div>

        {/* Metric 4: Streak & Count */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 text-zinc-400 text-xs">
            <span>{t.stats.actionsDone}</span>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              {stats.totalActionsCompleted}
            </span>
            <span className="text-xs font-semibold text-orange-400 flex items-center gap-0.5">
              <Flame className="w-3 h-3" />
              {stats.currentStreak}d streak
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>1-min daily habit builder</span>
          </p>
        </div>
      </div>
    </div>
  );
};
