import { CategoryId, EcoAction, Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  categories: Record<CategoryId, { name: string; icon: string; shortDesc: string }>;
  timer: {
    ready: string;
    running: string;
    paused: string;
    finished: string;
    start: string;
    pause: string;
    resume: string;
    reset: string;
    secondsLeft: string;
  };
  actions: {
    oneMinuteTask: string;
    impactFact: string;
    stepsTitle: string;
    markDone: string;
    doneCelebration: string;
    generateNew: string;
    generating: string;
    customPromptBtn: string;
    customPromptTitle: string;
    customPromptPlaceholder: string;
    customPromptSubmit: string;
    cancel: string;
    aiBadge: string;
    instantBadge: string;
  };
  metrics: {
    co2Saved: string;
    energySaved: string;
    waterSaved: string;
    grams: string;
    wattHours: string;
    liters: string;
    kg: string;
    kwh: string;
  };
  stats: {
    title: string;
    actionsDone: string;
    streakDays: string;
    level: string;
    levelBeginner: string;
    levelEcoWarrior: string;
    levelClimateHero: string;
    streakActive: string;
    ecoScore: string;
  };
  history: {
    title: string;
    empty: string;
    clearAll: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  footer: {
    poweredBy: string;
    microActionInfo: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ru: {
    appName: "CarbonBrake",
    appTagline: "Микро-действие для снижения CO₂",
    categories: {
      digital_trash: {
        name: "Цифровой мусор",
        icon: "Mail",
        shortDesc: "Спам, ненужные вкладки, дубликаты в облаке и кэш",
      },
      phantom_power: {
        name: "Фантомная энергия",
        icon: "Zap",
        shortDesc: "Спящий режим, блоки питания и фоновые приборы",
      },
      water_saver: {
        name: "Экономия воды",
        icon: "Droplets",
        shortDesc: "Умное водопотребление и сбережение тепла",
      },
      custom: {
        name: "Свой AI запрос",
        icon: "Sparkles",
        shortDesc: "Персональное микро-действие от Gemini 3.7",
      },
    },
    timer: {
      ready: "Готов к 60-секундному эко-спринту?",
      running: "Фокусируйся! Выполняй действие прямо сейчас",
      paused: "Таймер на паузе",
      finished: "Отличная работа! Минута прошла 🎉",
      start: "Старт 60 сек",
      pause: "Пауза",
      resume: "Продолжить",
      reset: "Сбросить",
      secondsLeft: "сек осталось",
    },
    actions: {
      oneMinuteTask: "⚡ 1-Minute Action (Действие на 1 минуту)",
      impactFact: "🌍 Impact Fact (Экологический эффект)",
      stepsTitle: "План за 60 секунд:",
      markDone: "Сделано! Засчитать CO₂",
      doneCelebration: "Отлично! Углеродный след снижен 🌿",
      generateNew: "⚡ Сгенерировать новое действие (AI)",
      generating: "Gemini генерирует действие...",
      customPromptBtn: "💡 Запросить под свою ситуацию",
      customPromptTitle: "Персональный AI эко-запрос",
      customPromptPlaceholder: "Например: «я сижу за ноутбуком в офисе» или «я на кухне перед сном»...",
      customPromptSubmit: "Сгенерировать действие",
      cancel: "Отмена",
      aiBadge: "Gemini 3.7 Flash",
      instantBadge: "Мгновенное",
    },
    metrics: {
      co2Saved: "Сэкономлено CO₂",
      energySaved: "Энергия",
      waterSaved: "Вода",
      grams: "г CO₂",
      wattHours: "Вт·ч",
      liters: "л",
      kg: "кг",
      kwh: "кВт·ч",
    },
    stats: {
      title: "Твой эко-прогресс",
      actionsDone: "Действий выполнено",
      streakDays: "Дней подряд",
      level: "Эко-статус",
      levelBeginner: "Эко-Стажер 🌱",
      levelEcoWarrior: "Carbon Breaker ⚡",
      levelClimateHero: "Климатический Страж 🌍",
      streakActive: "Серия активна!",
      ecoScore: "Эко-рейтинг",
    },
    history: {
      title: "Журнал микро-действий",
      empty: "Ты пока не завершил ни одного действия. Выбери категорию выше и нажми «Старт»!",
      clearAll: "Очистить историю",
      justNow: "Только что",
      minutesAgo: "мин. назад",
      hoursAgo: "ч. назад",
      daysAgo: "дн. назад",
    },
    footer: {
      poweredBy: "Работает на базе Gemini 3.7 Flash API • Micro-Sustainability Engine",
      microActionInfo: "Каждое маленькое действие на 60 секунд снижает нагрузку на серверы, сеть и электростанции.",
    },
  },

  en: {
    appName: "CarbonBrake",
    appTagline: "Micro-Actions to Slash CO₂",
    categories: {
      digital_trash: {
        name: "Digital Trash",
        icon: "Mail",
        shortDesc: "Spam newsletters, unused tabs, cloud clutter & cache",
      },
      phantom_power: {
        name: "Phantom Power",
        icon: "Zap",
        shortDesc: "Vampire draw, idle chargers & standby electronics",
      },
      water_saver: {
        name: "Water Saver",
        icon: "Droplets",
        shortDesc: "Smart water habits and heating energy preservation",
      },
      custom: {
        name: "Custom AI Action",
        icon: "Sparkles",
        shortDesc: "Personalized 1-minute prompt powered by Gemini 3.7",
      },
    },
    timer: {
      ready: "Ready for your 60-second eco sprint?",
      running: "Focus! Take this micro-action right now",
      paused: "Timer paused",
      finished: "Awesome job! Sprint complete 🎉",
      start: "Start 60s",
      pause: "Pause",
      resume: "Resume",
      reset: "Reset",
      secondsLeft: "sec left",
    },
    actions: {
      oneMinuteTask: "⚡ 1-Minute Action",
      impactFact: "🌍 Impact Fact",
      stepsTitle: "60-Second Micro-Steps:",
      markDone: "Done! Log CO₂ Saved",
      doneCelebration: "Great job! Carbon footprint reduced 🌿",
      generateNew: "⚡ Generate New AI Action",
      generating: "Gemini is generating...",
      customPromptBtn: "💡 Tailor to My Situation",
      customPromptTitle: "Custom AI Eco-Prompt",
      customPromptPlaceholder: "e.g. 'I am at my desk with dual monitors' or 'in the kitchen making coffee'...",
      customPromptSubmit: "Generate Micro-Action",
      cancel: "Cancel",
      aiBadge: "Gemini 3.7 Flash",
      instantBadge: "Instant",
    },
    metrics: {
      co2Saved: "CO₂ Saved",
      energySaved: "Energy",
      waterSaved: "Water",
      grams: "g CO₂",
      wattHours: "Wh",
      liters: "L",
      kg: "kg",
      kwh: "kWh",
    },
    stats: {
      title: "Your Eco Impact",
      actionsDone: "Actions Completed",
      streakDays: "Day Streak",
      level: "Eco Rank",
      levelBeginner: "Eco Starter 🌱",
      levelEcoWarrior: "Carbon Breaker ⚡",
      levelClimateHero: "Climate Hero 🌍",
      streakActive: "Streak active!",
      ecoScore: "Eco Score",
    },
    history: {
      title: "Micro-Action History",
      empty: "No micro-actions logged yet. Pick a category above and tap Start!",
      clearAll: "Clear Log",
      justNow: "Just now",
      minutesAgo: "m ago",
      hoursAgo: "h ago",
      daysAgo: "d ago",
    },
    footer: {
      poweredBy: "Powered by Gemini 3.7 Flash API • Micro-Sustainability Engine",
      microActionInfo: "Every 60-second habit lightens the load on global data centers, power grids, and reservoirs.",
    },
  },

  pl: {
    appName: "CarbonBrake",
    appTagline: "Mikro-działania redukujące CO₂",
    categories: {
      digital_trash: {
        name: "Cyfrowe Śmieci",
        icon: "Mail",
        shortDesc: "Spam, niepotrzebne karty, duplikaty w chmurze i pamięć cache",
      },
      phantom_power: {
        name: "Energia Fantomowa",
        icon: "Zap",
        shortDesc: "Pobór w trybie czuwania, ładowarki i uśpiony sprzęt",
      },
      water_saver: {
        name: "Oszczędzanie Wody",
        icon: "Droplets",
        shortDesc: "Inteligentne zużycie wody i ograniczenie strat ciepła",
      },
      custom: {
        name: "Własne AI",
        icon: "Sparkles",
        shortDesc: "Spersonalizowane mikro-zadanie od Gemini 3.7",
      },
    },
    timer: {
      ready: "Gotowy na 60-sekundowy eko-sprint?",
      running: "Skup się! Zrób to mikro-działanie właśnie teraz",
      paused: "Minutnik wstrzymany",
      finished: "Świetna robota! Minuta minęła 🎉",
      start: "Start 60 sek",
      pause: "Pauza",
      resume: "Wznów",
      reset: "Zresetuj",
      secondsLeft: "sek zostało",
    },
    actions: {
      oneMinuteTask: "⚡ 1-Minute Action (1-Minutowe Działanie)",
      impactFact: "🌍 Impact Fact (Wpływ na Planetę)",
      stepsTitle: "Kroki na 60 sekund:",
      markDone: "Zrobione! Zapisz CO₂",
      doneCelebration: "Super! Twój ślad węglowy zmalał 🌿",
      generateNew: "⚡ Wygeneruj nowe działanie (AI)",
      generating: "Gemini generuje...",
      customPromptBtn: "💡 Dopasuj do mojej sytuacji",
      customPromptTitle: "Spersonalizowany prompt AI",
      customPromptPlaceholder: "Np. «pracuję przy laptopie w biurze» lub «jestem w kuchni parząc herbatę»...",
      customPromptSubmit: "Generuj mikro-działanie",
      cancel: "Anuluj",
      aiBadge: "Gemini 3.7 Flash",
      instantBadge: "Błyskawiczne",
    },
    metrics: {
      co2Saved: "Zaoszczędzone CO₂",
      energySaved: "Energia",
      waterSaved: "Woda",
      grams: "g CO₂",
      wattHours: "Wh",
      liters: "l",
      kg: "kg",
      kwh: "kWh",
    },
    stats: {
      title: "Twój Eko-Wpływ",
      actionsDone: "Ukończone akcje",
      streakDays: "Dni z rzędu",
      level: "Status Eko",
      levelBeginner: "Eko Nowicjusz 🌱",
      levelEcoWarrior: "Carbon Breaker ⚡",
      levelClimateHero: "Bohater Klimatu 🌍",
      streakActive: "Seria aktywna!",
      ecoScore: "Wynik Eko",
    },
    history: {
      title: "Dziennik mikro-działań",
      empty: "Brak zapisanych akcji. Wybierz kategorię powyżej i kliknij Start!",
      clearAll: "Wyczyść historię",
      justNow: "Przed chwilą",
      minutesAgo: "min temu",
      hoursAgo: "godz. temu",
      daysAgo: "dni temu",
    },
    footer: {
      poweredBy: "Napędzane przez Gemini 3.7 Flash API • Micro-Sustainability Engine",
      microActionInfo: "Każdy 60-sekundowy nawyk odciąża serwerownie, sieć energetyczną i zasoby planety.",
    },
  },
};

export const defaultActions: Record<Language, Record<CategoryId, EcoAction>> = {
  ru: {
    digital_trash: {
      id: "ru_dt_1",
      title: "Очистка корзины и спам-рассылок",
      category: "digital_trash",
      action: "Удали 30 старых промо-писем или очисти корзину почтового ящика прямо сейчас.",
      impactFact: "Хранение и синхронизация 1 электронного письма генерирует около 0.3-4 г CO₂ в год за счет энергии серверов дата-центров.",
      co2SavedGrams: 25,
      energySavedWh: 8,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: [
        "Открой вкладку «Промоакции» или «Спам» в почтовом клиенте",
        "Выдели пачку старых уведомлений и нажми «Удалить»",
        "Загляни в «Корзину» и нажми «Очистить навсегда»",
      ],
    },
    phantom_power: {
      id: "ru_pp_1",
      title: "Отключение вампирских зарядок",
      category: "phantom_power",
      action: "Выдерни из розеток все зарядные устройства смартфонов и ноутбуков, к которым сейчас не подключены гаджеты.",
      impactFact: "Оставленные в розетках адаптеры потребляют до 0.5-2 Вт холостого хода (Vampire Draw), что в масштабах квартиры тратит до 10-15% электроэнергии впустую.",
      co2SavedGrams: 30,
      energySavedWh: 15,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: [
        "Осмотри розетки вокруг рабочего стола и прикроватных тумбочек",
        "Выдерни пустые зарядные блоки питания",
        "Щелкни кнопкой на сетевом фильтре, если закончил работу",
      ],
    },
    water_saver: {
      id: "ru_ws_1",
      title: "Эко-дозирование воды для чайника",
      category: "water_saver",
      action: "Если греешь воду, налей в чайник ровно одну кружку (250-300 мл), а не полный резервуар.",
      impactFact: "Кипячение лишнего литра воды в электрочайнике тратит около 100 Вт·ч энергии — столько же, сколько часовая работа мощного компьютера.",
      co2SavedGrams: 40,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: [
        "Возьми свою кружку и отмерь ровно 1 порцию воды",
        "Залей отмеренную воду в чайник",
        "Вскипяти за 40 секунд вместо 3 минут ожидания",
      ],
    },
    custom: {
      id: "ru_custom_1",
      title: "Снижение разрешения видеострима",
      category: "custom",
      action: "Переключи фоновое видео или музыку на YouTube/Twitch с 1080p/4K на 480p или режим аудио.",
      impactFact: "Передача потокового 4K видео требует в 4-6 раз больше мощности серверов и сетевого оборудования, чем стандартное разрешение 480p.",
      co2SavedGrams: 20,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "⚡",
      actionSteps: [
        "Открой плеер YouTube или музыки",
        "Нажми на значок шестеренки «Качество»",
        "Выбери 480p или включи режим экономии трафика",
      ],
    },
  },

  en: {
    digital_trash: {
      id: "en_dt_1",
      title: "Purge 30 Old Promo Emails",
      category: "digital_trash",
      action: "Delete 30 old newsletter emails or empty your mailbox trash folder right now.",
      impactFact: "Storing and syncing 1 unread email generates roughly 0.3g to 4g of CO₂ annually from data center cooling and storage drives.",
      co2SavedGrams: 25,
      energySavedWh: 8,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: [
        "Open your Promotions or Spam folder in your email app",
        "Select a batch of outdated newsletters and hit Delete",
        "Open Trash/Bin and click 'Empty Trash Now'",
      ],
    },
    phantom_power: {
      id: "en_pp_1",
      title: "Unplug Idle Phone & Laptop Chargers",
      category: "phantom_power",
      action: "Unplug all chargers and power bricks from wall sockets that are not currently connected to any device.",
      impactFact: "Idle chargers continuously draw 0.5-2 Watts of vampire energy, accumulating to ~10-15% of an average home electricity waste.",
      co2SavedGrams: 30,
      energySavedWh: 15,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: [
        "Scan the wall sockets around your desk and bedside table",
        "Unplug any empty charging adapters",
        "Flip the switch on your power strip if peripherals are not in use",
      ],
    },
    water_saver: {
      id: "en_ws_1",
      title: "Single-Mug Kettle Metering",
      category: "water_saver",
      action: "When making tea or coffee, pour only one measured mug of water (250-300ml) into your electric kettle instead of filling it up.",
      impactFact: "Boiling extra water wastes up to 100 Wh of electricity per boil — equivalent to running a desktop PC for an entire hour.",
      co2SavedGrams: 40,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: [
        "Use your favorite mug to measure exactly 1 serving of water",
        "Pour only that measured amount into the kettle",
        "Boil in 40 seconds flat instead of waiting 3 minutes",
      ],
    },
    custom: {
      id: "en_custom_1",
      title: "Background Video Downscaling",
      category: "custom",
      action: "Switch background YouTube/Twitch streams or music tabs from 1080p/4K to 480p or audio-only mode.",
      impactFact: "Streaming 4K video consumes up to 5x more data center and network routing energy compared to standard 480p definition.",
      co2SavedGrams: 20,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "⚡",
      actionSteps: [
        "Click the video player running in your background tab",
        "Tap the gear icon and select 'Quality'",
        "Drop resolution to 480p or enable data-saver mode",
      ],
    },
  },

  pl: {
    digital_trash: {
      id: "pl_dt_1",
      title: "Usunięcie 30 starych newsletterów",
      category: "digital_trash",
      action: "Usuń 30 starych wiadomości ze spamu lub opróżnij kosz pocztowy właśnie teraz.",
      impactFact: "Przechowywanie i synchronizacja pojedynczego maila generuje około 0.3-4 g CO₂ rocznie z powodu zasilania i chłodzenia serwerów.",
      co2SavedGrams: 25,
      energySavedWh: 8,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "📧",
      actionSteps: [
        "Otwórz zakładkę Oferty lub Spam w swojej poczcie",
        "Zaznacz partię starych powiadomień i kliknij Usuń",
        "Wejdź do Kosza i wybierz «Opróżnij kosz»",
      ],
    },
    phantom_power: {
      id: "pl_pp_1",
      title: "Odłączenie bezczynnych ładowarek",
      category: "phantom_power",
      action: "Wyciągnij z gniazdek wszystkie ładowarki do telefonów i laptopów, które nie są podłączone do żadnego sprzętu.",
      impactFact: "Ładowarki pozostawione w gniazdku pobierają 0.5-2 W energii fantomowej (vampire draw), co stanowi do 10-15% marnowanego prądu w domu.",
      co2SavedGrams: 30,
      energySavedWh: 15,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "🔌",
      actionSteps: [
        "Sprawdź gniazdka przy biurku i łóżku",
        "Wyciągnij bezczynne kostki ładowarek",
        "Wyłącz przycisk na listwie zasilającej, jeśli nie używasz sprzętu",
      ],
    },
    water_saver: {
      id: "pl_ws_1",
      title: "Odmierzanie wody do czajnika na 1 kubek",
      category: "water_saver",
      action: "Gdy gotujesz wodę na herbatę, wlej do czajnika dokładnie jeden kubek (250-300 ml) zamiast pełnego zbiornika.",
      impactFact: "Gotowanie nadmiaru wody marnuje do 100 Wh energii na cykl — tyle, ile zużywa komputer stacjonarny przez godzinę.",
      co2SavedGrams: 40,
      energySavedWh: 25,
      waterSavedLiters: 1,
      durationSeconds: 60,
      emoji: "🚰",
      actionSteps: [
        "Użyj swojego kubka, aby odmierzyć dokładnie 1 porcję wody",
        "Wlej odmierzoną wodę do czajnika elektrycznego",
        "Zagotuj wodę w 40 sekund zamiast czekać 3 minuty",
      ],
    },
    custom: {
      id: "pl_custom_1",
      title: "Obniżenie jakości wideo w tle",
      category: "custom",
      action: "Zmień jakość wideo na YouTube/Twitch działającego w tle z 1080p/4K na 480p lub tryb oszczędzania danych.",
      impactFact: "Strumieniowanie wideo 4K wymaga 5-krotnie więcej energii serwerów i węzłów sieciowych niż rozdzielczość 480p.",
      co2SavedGrams: 20,
      energySavedWh: 12,
      waterSavedLiters: 0,
      durationSeconds: 60,
      emoji: "⚡",
      actionSteps: [
        "Przejdź do karty z odtwarzanym wideo",
        "Kliknij ikonę koła zębatego i wybierz «Jakość»",
        "Wybierz 480p lub włącz tryb oszczędzania danych",
      ],
    },
  },
};
