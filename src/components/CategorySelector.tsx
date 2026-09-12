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
    accentColor: string;
    borderActive: string;
    glowColor: string;
  }[] = [
    {
      id: 'digital_trash',
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />,
      accentColor: 'from-sky-500/20 to-indigo-500/10',
      borderActive: 'border-sky-400',
      glowColor: 'shadow-[0_0_16px_rgba(56,189,248,0.25)]',
    },
    {
      id: 'phantom_power',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-orange-500/10',
      borderActive: 'border-amber-400',
      glowColor: 'shadow-[0_0_16px_rgba(251,191,36,0.25)]',
    },
    {
      id: 'water_saver',
      icon: <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-teal-500/10',
      borderActive: 'border-emerald-400',
      glowColor: 'shadow-[0_0_16px_rgba(52,211,153,0.3)]',
    },
    {
      id: 'custom',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
      accentColor: 'from-purple-500/20 to-pink-500/10',
      borderActive: 'border-purple-400',
      glowColor: 'shadow-[0_0_16px_rgba(192,132,252,0.25)]',
    },
  ];

  return (
    <div className="w-full my-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3" id="category-selector-grid">
        {categoriesConfig.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const catData = t.categories[cat.id];

          return (
            <button
              key={cat.id}
              id={`category-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              disabled={isLoading}
              className={`relative text-left p-3 sm:p-4 rounded-xl transition-all duration-200 border cursor-pointer select-none group flex flex-col justify-between ${
                isSelected
                  ? `bg-zinc-900 ${cat.borderActive} ${cat.glowColor} ring-1 ${cat.borderActive}`
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/90 text-zinc-400 hover:text-zinc-200'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between mb-2 w-full">
                <div
                  className={`p-2 rounded-lg bg-zinc-950 border border-zinc-800 transition-colors ${
                    isSelected ? 'border-zinc-700' : 'group-hover:border-zinc-700'
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

              <div>
                <h3
                  className={`text-sm sm:text-base font-bold leading-tight mb-1 truncate ${
                    isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}
                >
                  {catData.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 leading-relaxed">
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
