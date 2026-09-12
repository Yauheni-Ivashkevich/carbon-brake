import React from 'react';
import { Language } from '../types';
import { Theme } from '../utils/theme';
import { translations } from '../data/translations';
import { Leaf, Volume2, VolumeX, Flame, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  totalCo2SavedGrams: number;
  currentStreak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  totalCo2SavedGrams,
  currentStreak,
}) => {
  const t = translations[currentLang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'pl', label: 'PL', flag: '🇵🇱' },
  ];

  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800/80 px-3.5 py-3 sm:px-6 sm:py-3.5 shadow-xs">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Top / Left Block: Logo, App Name, 1-MIN ECO Badge & Tagline */}
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            {/* Logo Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0 mt-0.5 sm:mt-0">
              <Leaf className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-zinc-950 shadow-[0_0_8px_#34d399]" />
            </div>

            {/* Title, Badge & Tagline */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
                  <span>Carbon</span>
                  <span className="text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">Brake</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 tracking-wide uppercase">
                  1-MIN ECO
                </span>
              </div>
              {/* Tagline is visible on both mobile and desktop */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-0.5 leading-snug">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Mobile Streak Pill (visible only on mobile next to brand) */}
          <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span className="font-bold">{currentStreak}d</span>
          </div>
        </div>

        {/* Right Controls Block: Desktop Stats + Theme Toggle + Sound Toggle + Language Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto pt-1 md:pt-0 border-t border-zinc-100 dark:border-zinc-900 md:border-t-0">
          {/* Desktop Streak & CO2 Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5" />
              {currentStreak}d
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {totalCo2SavedGrams >= 1000
                ? `${(totalCo2SavedGrams / 1000).toFixed(2)} kg`
                : `${totalCo2SavedGrams} g`} CO₂
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle (Light / Dark) */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border transition-all cursor-pointer bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              aria-label="Toggle Sound"
              className={`p-2 rounded-xl border transition-all cursor-pointer shadow-xs ${
                soundEnabled
                  ? 'bg-zinc-100 dark:bg-zinc-900 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                  : 'bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-400'
              }`}
              title={soundEnabled ? 'Sound On' : 'Sound Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Fixed Multi-Language RU | EN | PL Switcher */}
            <div
              className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner"
              id="language-switcher"
            >
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-btn-${lang.code}`}
                    onClick={() => onSelectLang(lang.code)}
                    className={`relative px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_10px_rgba(16,185,129,0.35)] font-extrabold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span className="text-xs">{lang.flag}</span>
                    <span className="text-xs">{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
