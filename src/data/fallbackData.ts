// src/data/fallbackData.ts

export interface ActionData {
  title: string;
  category: string;
  action: string;
  impactFact: string;
  co2SavedGrams: number;
  energySavedWh: number;
  waterSavedLiters: number;
  durationSeconds: number;
  emoji: string;
  actionSteps: string[];
}

export const FALLBACK_ACTIONS: Record<string, Record<string, ActionData>> = {
  digital_trash: {
    ru: {
      title: "Очистка почтового спама",
      category: "digital_trash",
      action: "Удалите 30 старых промо-рассылок из корзины почты прямо сейчас.",
      impactFact: "Очистка 30 писем сэкономит энергию серверов, эквивалентную 10 граммам CO2.",
      co2SavedGrams: 10,
      energySavedWh: 5,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: ["Откройте папку «Промоакции»", "Выделите 30 старых писем", "Нажмите «Удалить»"]
    },
    en: {
      title: "Clean Email Spam",
      category: "digital_trash",
      action: "Delete 30 old promotional emails from your inbox right now.",
      impactFact: "Deleting 30 emails saves server energy equivalent to 10g of CO2.",
      co2SavedGrams: 10,
      energySavedWh: 5,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: ["Open Promotions tab", "Select 30 old emails", "Click Delete"]
    },
    pl: {
      title: "Czyszczenie spamu",
      category: "digital_trash",
      action: "Usuń 30 starych e-maili promocyjnych ze swojej skrzynki.",
      impactFact: "Usunięcie 30 e-maili oszczędza energię serwerów odpowiadającą 10g CO2.",
      co2SavedGrams: 10,
      energySavedWh: 5,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: ["Otwórz zakładkę Promocje", "Zaznacz 30 wiadomości", "Kliknij Usuń"]
    }
  },
  phantom_power: {
    ru: {
      title: "Отключение зарядок",
      category: "phantom_power",
      action: "Выньте из розеток все неиспользуемые зарядные устройства и блоки питания.",
      impactFact: "Зарядка в розетке потребляет до 1.5 Вт·ч «фантомной» энергии в день.",
      co2SavedGrams: 15,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: ["Осмотрите ближайшие розетки", "Извлеките сетевые адаптеры", "Выключите удлинитель"]
    },
    en: {
      title: "Unplug Chargers",
      category: "phantom_power",
      action: "Unplug all unused chargers and power adapters from the wall.",
      impactFact: "Idle chargers draw up to 1.5 Wh of phantom energy every day.",
      co2SavedGrams: 15,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: ["Check nearby wall sockets", "Unplug idle adapters", "Switch off power strip"]
    },
    pl: {
      title: "Odłącz ładowarki",
      category: "phantom_power",
      action: "Odłącz wszystkie nieużywane ładowarki i zasilacze z gniazdek.",
      impactFact: "Ładowarka w gniazdku zużywa do 1,5 Wh energii fantomowej dziennie.",
      co2SavedGrams: 15,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: ["Sprawdź pobliskie gniazdka", "Wyciągnij nieużywane zasilacze", "Wyłącz listwę"]
    }
  },
  water_saver: {
    ru: {
      title: "Точный объем чайника",
      category: "water_saver",
      action: "Налейте в чайник ровно столько воды, сколько нужно на одну кружку (250 мл).",
      impactFact: "Кипячение лишнего литра воды тратит в 4 раза больше электроэнергии.",
      co2SavedGrams: 20,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: ["Возьмите вашу кружку", "Налейте 1 объем воды в чайник", "Включите нагрев"]
    },
    en: {
      title: "Measure Kettle Water",
      category: "water_saver",
      action: "Fill the kettle with exactly one mug of water (250 ml).",
      impactFact: "Boiling extra water uses 4 times more electricity than needed.",
      co2SavedGrams: 20,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: ["Take your mug", "Fill exact volume into kettle", "Start boiling"]
    },
    pl: {
      title: "Odmierz wodę w czajniku",
      category: "water_saver",
      action: "Wlej do czajnika dokładnie tyle wody, ile potrzebujesz na jeden kubek (250 ml).",
      impactFact: "Gotowanie nadmiaru wody zużywa 4 razy więcej energii.",
      co2SavedGrams: 20,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: ["Weź swój kubek", "Wlej 1 porcję do czajnika", "Włącz gotowanie"]
    }
  }
};