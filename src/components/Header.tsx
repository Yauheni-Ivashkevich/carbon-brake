import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Leaf, Volume2, VolumeX, Flame } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalCo2SavedGrams: number;
  currentStreak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  soundEnabled,
  onToggleSound,
  totalCo2SavedGrams,
  currentStreak,
}) => {
  const t = translations[currentLang];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'pl', label: 'PL', flag: '🇵🇱' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
            <Leaf className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950 shadow-[0_0_8px_#34d399]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                <span>Carbon</span>
                <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">Brake</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                1-MIN ECO
              </span>
            </div>
            <p className="text-xs text-zinc-400 truncate max-w-[200px] sm:max-w-sm">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Right side: Quick stats + Sound toggle + Multi-Language RU | EN | PL Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Streak & CO2 Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5" />
              {currentStreak}d
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-emerald-400 font-bold">
              {totalCo2SavedGrams >= 1000
                ? `${(totalCo2SavedGrams / 1000).toFixed(2)} kg`
                : `${totalCo2SavedGrams} g`} CO₂
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-zinc-900 border-emerald-500/30 text-emerald-400 hover:bg-zinc-800'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-400'
            }`}
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fixed Multi-Language RU | EN | PL Switcher */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-zinc-800 shadow-inner" id="language-switcher">
            {languages.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-btn-${lang.code}`}
                  onClick={() => onSelectLang(lang.code)}
                  className={`relative px-2.5 py-1.5 sm:px-3 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.4)] font-extrabold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <span className="text-xs">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
