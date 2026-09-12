import React from 'react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { Mail, Zap, Droplets, Sparkles } from 'lucide-react';

interface CategorySelectorProps {
  currentLang: Language;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  isLoading: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  currentLang,
  selectedCategory,
  onSelectCategory,
  isLoading,
}) => {
  const t = translations[currentLang];

  const categoriesConfig: {
    id: CategoryId;
    icon: React.ReactNode;
    borderActive: string;
    glowColor: string;
  }[] = [
    {
      id: 'digital_trash',
      icon: <Mail className="w-5 h-5 text-sky-500 dark:text-sky-400 shrink-0" />,
      borderActive: 'border-sky-500 dark:border-sky-400 ring-1 ring-sky-500/30',
      glowColor: 'shadow-[0_0_16px_rgba(56,189,248,0.2)]',
    },
    {
      id: 'phantom_power',
      icon: <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />,
      borderActive: 'border-amber-500 dark:border-amber-400 ring-1 ring-amber-500/30',
      glowColor: 'shadow-[0_0_16px_rgba(251,191,36,0.2)]',
    },
    {
      id: 'water_saver',
      icon: <Droplets className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />,
      borderActive: 'border-emerald-500 dark:border-emerald-400 ring-1 ring-emerald-500/30',
      glowColor: 'shadow-[0_0_16px_rgba(52,211,153,0.25)]',
    },
    {
      id: 'custom',
      icon: <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 shrink-0" />,
      borderActive: 'border-purple-500 dark:border-purple-400 ring-1 ring-purple-500/30',
      glowColor: 'shadow-[0_0_16px_rgba(192,132,252,0.2)]',
    },
  ];

  return (
    <div className="w-full my-3 sm:my-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3" id="category-selector-grid">
        {categoriesConfig.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const catData = t.categories[cat.id];

          return (
            <button
              key={cat.id}
              id={`category-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              disabled={isLoading}
              className={`relative text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 border cursor-pointer select-none group flex flex-col justify-between ${
                isSelected
                  ? `bg-white dark:bg-zinc-900 ${cat.borderActive} ${cat.glowColor}`
                  : 'bg-zinc-100/80 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between mb-2.5 w-full">
                <div
                  className={`p-2 rounded-lg bg-zinc-200/70 dark:bg-zinc-950 border border-zinc-300/60 dark:border-zinc-800 transition-colors ${
                    isSelected ? 'border-zinc-400 dark:border-zinc-700' : 'group-hover:border-zinc-400 dark:group-hover:border-zinc-700'
                  }`}
                >
                  {cat.icon}
                </div>
                {isSelected && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>

              <div className="w-full">
                {/* Full name without truncation */}
                <h3
                  className={`text-sm sm:text-base font-bold leading-snug mb-1.5 break-words ${
                    isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white'
                  }`}
                >
                  {catData.name}
                </h3>
                {/* Full description without cut-off or ellipses */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed break-words">
                  {catData.shortDesc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
