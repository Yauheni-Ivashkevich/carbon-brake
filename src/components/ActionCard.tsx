import React, { useState, useEffect, useRef } from 'react';
import { EcoAction, Language } from '../types';
import { translations } from '../data/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Droplet,
  Globe,
  Bot,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

interface ActionCardProps {
  action: EcoAction;
  currentLang: Language;
  onCompleteAction: (action: EcoAction) => void;
  onGenerateNew: () => void;
  onOpenCustomModal: () => void;
  isLoadingAi: boolean;
  soundEnabled: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  action,
  currentLang,
  onCompleteAction,
  onGenerateNew,
  onOpenCustomModal,
  isLoadingAi,
  soundEnabled,
}) => {
  const t = translations[currentLang];
  const totalDuration = action.durationSeconds || 60;

  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer state whenever action changes
  useEffect(() => {
    setSecondsRemaining(action.durationSeconds || 60);
    setIsRunning(false);
    setIsCompleted(false);
    setCheckedSteps({});
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [action.id, action.action]);

  // Timer countdown loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setIsCompleted(true);
            if (soundEnabled) {
              sound.playSuccess();
            }
            return 0;
          }
          if (prev <= 4 && prev > 1 && soundEnabled) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, soundEnabled]);

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (secondsRemaining === 0) {
        setSecondsRemaining(totalDuration);
      }
      setIsRunning(true);
      if (soundEnabled) {
        sound.playStart();
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(totalDuration);
    setIsCompleted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleToggleStep = (index: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMarkDone = (e: React.MouseEvent) => {
    // Fire celebration confetti
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#34d399', '#10b981', '#059669', '#38bdf8', '#f59e0b'],
      });
    } catch {
      // Fallback
    }

    if (soundEnabled) {
      sound.playSuccess();
    }

    setIsCompleted(true);
    setIsRunning(false);
    onCompleteAction(action);
  };

  // Circular progress calculation
  const progressPercent = ((totalDuration - secondsRemaining) / totalDuration) * 100;
  const strokeDashoffset = 100 - progressPercent;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-5 sm:p-7">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Top Header: Badge, Emoji & Title */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl p-2 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner flex items-center justify-center shrink-0">
            {action.emoji || '⚡'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Clock className="w-3 h-3" />
                60s Eco-Sprint
              </span>
              {action.isAiGenerated ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  <Bot className="w-3 h-3 text-purple-400" />
                  {t.actions.aiBadge}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                  {t.actions.instantBadge}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {action.title}
            </h2>
          </div>
        </div>

        {/* Action Impact Chips */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>+{action.co2SavedGrams}g CO₂</span>
          </div>
          {action.energySavedWh > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-medium text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>+{action.energySavedWh} Wh</span>
            </div>
          )}
          {action.waterSavedLiters > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300 font-medium text-xs">
              <Droplet className="w-3.5 h-3.5 text-sky-400" />
              <span>+{action.waterSavedLiters} L</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid: Action details on left, Interactive 60s Timer on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 1-Minute Action & Impact Fact & Steps */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1-Minute Action Box */}
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 relative group">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <span>{t.actions.oneMinuteTask}</span>
            </div>
            <p className="text-zinc-100 font-medium text-base sm:text-lg leading-snug">
              {action.action}
            </p>
          </div>

          {/* Impact Fact Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-zinc-950/60 to-zinc-950/40 border border-emerald-500/20 text-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
              <span>{t.actions.impactFact}</span>
            </div>
            <p className="text-zinc-300 leading-relaxed font-normal">
              {action.impactFact}
            </p>
          </div>

          {/* 60-Second Micro-Steps Checklist */}
          {action.actionSteps && action.actionSteps.length > 0 && (
            <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60">
              <div className="text-xs font-semibold text-zinc-400 mb-2 flex items-center justify-between">
                <span>{t.actions.stepsTitle}</span>
                <span className="text-[11px] text-zinc-500">
                  {Object.values(checkedSteps).filter(Boolean).length}/{action.actionSteps.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {action.actionSteps.map((step, idx) => {
                  const isChecked = !!checkedSteps[idx];
                  return (
                    <button
                      key={idx}
                      id={`step-check-${idx}`}
                      onClick={() => handleToggleStep(idx)}
                      className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg text-xs sm:text-sm transition-all ${
                        isChecked
                          ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 line-through opacity-80'
                          : 'bg-zinc-900/40 text-zinc-300 hover:bg-zinc-900/80 border border-transparent'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-zinc-950'
                            : 'border-zinc-600 bg-zinc-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="flex-1">{step}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 60-Second Interactive Radial/Circular Timer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl bg-zinc-950/70 border border-zinc-800 text-center">
          {/* Radial Timer Graphic */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-zinc-800"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-emerald-400 transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                strokeWidth="7"
                strokeDasharray="264"
                strokeDashoffset={(264 * strokeDashoffset) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Timer text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                {String(Math.floor(secondsRemaining / 60)).padStart(2, '0')}:
                {String(secondsRemaining % 60).padStart(2, '0')}
              </span>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
                {secondsRemaining > 0 ? t.timer.secondsLeft : t.timer.finished}
              </span>
            </div>
          </div>

          {/* Timer status hint */}
          <p className="text-xs text-zinc-400 mb-4 h-5 truncate max-w-[260px]">
            {isRunning
              ? t.timer.running
              : secondsRemaining === totalDuration
              ? t.timer.ready
              : secondsRemaining === 0
              ? t.timer.finished
              : t.timer.paused}
          </p>

          {/* Timer Control Buttons */}
          <div className="flex items-center gap-2 w-full max-w-xs mb-3">
            <button
              id="timer-start-pause-btn"
              onClick={handleStartPause}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{t.timer.pause}</span>
                </>
              ) : secondsRemaining === totalDuration ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.timer.start}</span>
                </>
              ) : secondsRemaining === 0 ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.timer.reset}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.timer.resume}</span>
                </>
              )}
            </button>

            <button
              id="timer-reset-btn"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title={t.timer.reset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* "Done! / Сделано! / Zrobione!" Main Completion Button */}
          <button
            id="action-mark-done-btn"
            onClick={handleMarkDone}
            className={`w-full max-w-xs py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30'
                : 'bg-zinc-800 hover:bg-emerald-600 hover:text-white text-zinc-200 border border-zinc-700 shadow-md active:scale-[0.98]'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-teal-400' : 'text-emerald-400'}`} />
            <span>{isCompleted ? t.actions.doneCelebration : t.actions.markDone}</span>
          </button>
        </div>
      </div>

      {/* Bottom Action Triggers: Generate AI Action + Custom Prompt */}
      <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
        <button
          id="generate-new-ai-action-btn"
          onClick={onGenerateNew}
          disabled={isLoadingAi}
          className="py-2.5 px-4 rounded-xl bg-zinc-950 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 hover:bg-zinc-900 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 text-emerald-400 ${isLoadingAi ? 'animate-spin' : ''}`} />
          <span>{isLoadingAi ? t.actions.generating : t.actions.generateNew}</span>
        </button>

        <button
          id="custom-prompt-modal-open-btn"
          onClick={onOpenCustomModal}
          disabled={isLoadingAi}
          className="py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
          <span>{t.actions.customPromptBtn}</span>
        </button>
      </div>
    </div>
  );
};
