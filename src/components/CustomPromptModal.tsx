import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, X, Lightbulb } from 'lucide-react';

interface CustomPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  currentLang: Language;
  isLoading: boolean;
}

export const CustomPromptModal: React.FC<CustomPromptModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentLang,
  isLoading,
}) => {
  const t = translations[currentLang];
  const [promptText, setPromptText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onSubmit(promptText.trim());
  };

  const samplePrompts: Record<Language, string[]> = {
    ru: [
      '💻 Сижу за ноутбуком с 50 открытыми вкладками',
      '🍳 Нахожусь на кухне во время готовки еды',
      '📱 Пролистываю ленту соцсетей перед сном',
      '⚡ В комнате много мигающих приборов в розетках',
    ],
    en: [
      '💻 Working on laptop with 50 open Chrome tabs',
      '🍳 In the kitchen prepping a meal',
      '📱 Scrolling social media in bed before sleep',
      '⚡ Multiple electronics in sleep mode around my desk',
    ],
    pl: [
      '💻 Pracuję na laptopie z 50 otwartymi kartami',
      '🍳 Jestem w kuchni podczas gotowania posiłku',
      '📱 Przeglądam media społecznościowe przed snem',
      '⚡ Wiele urządzeń w trybie uśpienia wokół biurka',
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">{t.actions.customPromptTitle}</h3>
            <p className="text-xs text-zinc-400">Powered by Gemini 3.7 Flash</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              {t.actions.customPromptPlaceholder}
            </label>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder={t.actions.customPromptPlaceholder}
              rows={3}
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
            />
          </div>

          {/* Quick Click Samples */}
          <div>
            <div className="text-[11px] font-medium text-zinc-400 mb-2 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              <span>Quick presets:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts[currentLang]?.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptText(sample)}
                  className="text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg px-2.5 py-1 text-left transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              {t.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={!promptText.trim() || isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? t.actions.generating : t.actions.customPromptSubmit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
