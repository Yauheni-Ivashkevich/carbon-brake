# 🌱 CarbonBrake — Micro Eco-Actions (Микро-действие для снижения CO₂)

> **Multi-Language 1-Minute Micro-Habit App powered by Google Gemini 3.7 Flash & React + Tailwind CSS.**

---

## 🇷🇺 Описание проекта (Русский)

**CarbonBrake** — интерактивное веб-приложение для формирования ежедневных микро-привычек, направленных на мгновенное снижение углеродного следа, цифрового мусора и бытового энергопотребления.

### ⚡ Основные концепции:
- **1-Minute Action**: Конкретное действие, которое можно выполнить прямо сейчас ровно за 60 секунд (чистка спам-рассылок, отключение неиспользуемых зарядных устройств, дозирование воды в чайнике).
- **Impact Fact**: Вдохновляющий факт с расчётом эффекта для серверов, энергосетей и планеты.
- **Интерактивный 60-секундный таймер**: Визуальный круговой индикатор, звуковые эффекты (Web Audio API), чек-лист шагов и празднование завершения с конфетти.
- **Мультиязычность RU | EN | PL**: Моментальное переключение языка интерфейса и автоматическая адаптация запросов к AI-модели Gemini 3.7 Flash.
- **Темы оформления**: Тёмная неоновая тема по умолчанию (`zinc-950` / `emerald-400`) и элегантная светлая тема.
- **Эко-статистика**: Подсчёт сэкономленных граммов CO₂, Ватт-часов электроэнергии, литров воды, счётчик непрерывной серии дней (Streak) и история действий.

### 📂 Категории:
1. `[📧 Цифровой мусор]` — Удаление спама, очистка корзины, кэша и закрытие лишних вкладок.
2. `[🔌 Фантомная энергия]` — Отключение спящих приборов, сетевых фильтров и блоков питания из розеток.
3. `[🚰 Экономия воды]` — Умное дозирование воды для чайника, устранение микро-протечек и сохранение тепла.
4. `[✨ Свой AI запрос]` — Персональные 60-секундные рекомендации под текущую обстановку через Gemini 3.7 Flash.

---

## 🇬🇧 Project Overview (English)

**CarbonBrake** is an interactive micro-sustainability web app designed to build quick, daily 60-second habits that reduce carbon footprint, digital clutter, and household energy waste.

### ⚡ Key Features:
- **1-Minute Action**: Instant, highly specific tasks you can complete in 60 seconds (clearing spam newsletters, unplugging vampire power chargers, single-mug kettle metering).
- **Impact Fact**: Inspiring science-backed metric demonstrating tangible CO₂ savings.
- **Interactive 60s Sprint Timer**: Radial countdown circle, Web Audio sound effects, checklist of micro-steps, and celebration confetti.
- **Multi-Language RU | EN | PL**: Top navbar switcher with real-time UI localization and language-synchronized Gemini 3.7 Flash AI prompts.
- **Theme Switcher**: Default high-contrast dark neon theme (`zinc-950` / `emerald-400`) + clean light mode.
- **Impact Tracker**: Cumulative grams of CO₂, Watt-hours of power, liters of water saved, daily streak counter, and activity history log.

### 📂 Habit Categories:
1. `[📧 Digital Trash]` — Purge spam emails, clear cloud duplicates, empty trash, and manage heavy tabs.
2. `[🔌 Phantom Power]` — Unplug idle chargers, switch off standby power strips, and reduce vampire draw.
3. `[🚰 Water Saver]` — Single-mug kettle water metering, aerators, and heating energy preservation.
4. `[✨ Custom AI Action]` — Personalized 60-second eco-prompt tailored to your current scenario via Gemini 3.7 Flash.

---

## 🇵🇱 Opis Projektu (Polski)

**CarbonBrake** to interaktywna aplikacja do mikro-nawyków ekologicznych, pomagająca w ciągu 60 sekund ograniczyć ślad węglowy, cyfrowe śmieci i zużycie prądu w trybie czuwania.

### ⚡ Główne Funkcje:
- **1-Minute Action**: Natychmiastowe, precyzyjne zadanie do zrobienia w 60 sekund (usuwanie spamu, odłączanie nieużywanych ładowarek, gotowanie wody na 1 kubek).
- **Impact Fact**: Inspirujący fakt ekologiczny wyjaśniający realne oszczędności CO₂ i energii serwerów.
- **Interaktywny Minutnik 60s**: Kołowy wskaźnik postępu, syntezator dźwięków Web Audio API, lista mikro-kroków i konfetti po ukończeniu.
- **Wielojęzyczność RU | EN | PL**: Przełącznik języka w górnym menu z automatyczną synchronizacją promptów AI Gemini 3.7 Flash.
- **Ciemny / Jasny Motyw**: Domyślny ciemny neon (`zinc-950` / `emerald-400`) oraz czytelny jasny motyw.
- **Panel Eko-Statystyk**: Licznik zaoszczędzonych gramów CO₂, watogodzin (Wh), litrów wody, seria dni z rzędu (Streak) oraz historia akcji.

### 📂 Kategorie:
1. `[📧 Cyfrowe Śmieci]` — Opróżnianie kosza, usuwanie newsletterów, czyszczenie pamięci podręcznej.
2. `[🔌 Energia Fantomowa]` — Odłączanie ładowarek z gniazdek, wyłączanie listew zasilających i trybu standby.
3. `[🚰 Oszczędzanie Wody]` — Odmierzanie wody do czajnika na 1 kubek, inteligentne nawyki termiczne.
4. `[✨ Własne AI]` — Spersonalizowane mikro-zadanie wygenerowane przez model Gemini 3.7 Flash.

---

## 🛠️ Tech Stack / Стек технологий

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini 3.7 Flash (`@google/genai`)
- **Backend / API**: Node.js + Express (Full-stack API proxy with server-side secret management)
- **Icons & FX**: `lucide-react`, `canvas-confetti`, Web Audio API Synthesizer
- **Storage**: `localStorage` persistence for metrics, streak, theme, and language.
