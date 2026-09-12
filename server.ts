import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Google GenAI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not set. Fallback actions will be used if AI fails.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy-key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Category mappings & prompt instructions per language
const categoryNames: Record<string, Record<string, string>> = {
  digital_trash: {
    ru: "Цифровой мусор (Digital Trash: спам, вкладки, облачные дубликаты, кэш, видеостриминг в HD без необходимости)",
    en: "Digital Trash (unnecessary emails, cloud storage duplicates, browser tabs hoarding, heavy cache, video streaming settings)",
    pl: "Cyfrowe Śmieci (Digital Trash: spam, zbędne maile, duplikaty w chmurze, setki otwartych kart, pamięć podręczna)",
  },
  phantom_power: {
    ru: "Фантомная энергия / Вампирское потребление (Phantom Power: приборы в спящем режиме, зарядки в розетках, мониторы, сетевые удлинители)",
    en: "Phantom Power / Vampire Energy (standby electronics, plugged-in chargers, monitors, peripherals, power strips)",
    pl: "Energia Fantomowa / Pobór w trybie czuwania (Phantom Power: ładowarki w gniazdkach, tryb standby, listwy zasilające, monitory)",
  },
  water_saver: {
    ru: "Экономия воды и подогрева (Water Saver: кран при чистке зубов, аэраторы, микро-протечки, чайник ровно на 1 чашку, снижение температуры стирки)",
    en: "Water Saver & heating energy (tap during brushing, kettle water metering, aerators, fixing leaks, lowering wash temperature)",
    pl: "Oszczędzanie wody i energii grzewczej (Water Saver: kran podczas mycia zębów, czajnik na 1 kubek, aeratory, mikro-wycieki)",
  },
  custom: {
    ru: "Случайный экологический лайфхак на 1 минуту",
    en: "Random 1-minute eco lifestyle hack",
    pl: "Losowy 1-minutowy mikro-nawyk ekologiczny",
  },
};

const languageInstructions: Record<string, string> = {
  ru: "ОТВЕЧАЙ СТРОГО НА РУССКОМ ЯЗЫКЕ. Тон: ультра-современный, технологичный, мотивирующий, молодежный. Используй эмодзи ⚡, 📧, 🚰, 🌍, 💡, 🔋.",
  en: "REPLY STRICTLY IN ENGLISH. Tone: Tech-savvy, motivating, snappy, youth-friendly. Include modern tech and nature emojis ⚡, 📧, 🚰, 🌍, 💡, 🔋.",
  pl: "ODPOWIADAJ ŚCIŚLE W JĘZYKU POLSKIM. Styl: Nowoczesny, technologiczny, motywujący, przyjazny młodym ludziom. Używaj emoji ⚡, 📧, 🚰, 🌍, 💡, 🔋.",
};

// API Endpoints
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/generate-action", async (req, res) => {
  const { category = "digital_trash", language = "ru", customPrompt = "" } = req.body;
  const langKey = ["ru", "en", "pl"].includes(language) ? language : "ru";
  const catKey = ["digital_trash", "phantom_power", "water_saver", "custom"].includes(category)
    ? category
    : "digital_trash";

  const targetCategoryDesc = categoryNames[catKey][langKey] || categoryNames.digital_trash.ru;
  const langPromptInstruction = languageInstructions[langKey] || languageInstructions.ru;

  try {
    const ai = getGenAI();

    const prompt = `
Ты — AI-движок приложения «CarbonBrake» (Микро-действие для снижения CO₂).
Твоя задача — сгенерировать РОВНО ОДНО ультра-конкретное действие, которое пользователь может физически сделать ПРЯМО СЕЙЧАС ЗА 1 МИНУТУ (60 секунд).

Категория: ${targetCategoryDesc}.
${customPrompt ? `Дополнительный контекст/пожелание пользователя: "${customPrompt}"` : ""}

${langPromptInstruction}

КРИТИЧЕСКИЕ ТРЕБОВАНИЯ:
1. 1-Minute Action: Одно мгновенное четкое действие прямо сейчас (например: «Удали 30 старых рассылок в корзину почты» / «Выдерни зарядку ноутбука и блока питания из розетки» / «Налей в электрочайник ровно 250 мл воды на одну кружку вместо полного»).
2. Impact Fact: Краткий, вдохновляющий факт из 1 предложения с цифрами, почему это микро-действие реально снижает углеродный след / экономит энергию серверов или ТЭЦ.
3. Оценка спасенного CO₂ в граммах (число от 5 до 60), сэкономленная энергия в Ватт-часах (Wh, число от 0 до 50), сэкономленная вода в литрах (число от 0 до 20).
4. Шаги действия (actionSteps): 2-3 ультра-коротких шага-инструкции для 60-секундного таймера.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are CarbonBrake AI, an expert in micro-sustainability and habits that curb CO2, vampire energy, and digital waste. Keep it 100% actionable in 60 seconds. Output strictly valid JSON matching the schema.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Short catchy action title (3-6 words)",
            },
            category: {
              type: Type.STRING,
              description: "The category identifier (digital_trash, phantom_power, water_saver, custom)",
            },
            action: {
              type: Type.STRING,
              description: "1-Minute Action: exactly what to do in 60 seconds",
            },
            impactFact: {
              type: Type.STRING,
              description: "Concise, inspiring sentence on why this micro-action helps the planet",
            },
            co2SavedGrams: {
              type: Type.NUMBER,
              description: "Estimated CO2 saved in grams (e.g. 15)",
            },
            energySavedWh: {
              type: Type.NUMBER,
              description: "Estimated energy saved in Wh (e.g. 8)",
            },
            waterSavedLiters: {
              type: Type.NUMBER,
              description: "Estimated water saved in liters if applicable, else 0",
            },
            durationSeconds: {
              type: Type.NUMBER,
              description: "60",
            },
            emoji: {
              type: Type.STRING,
              description: "Relevant emoji for this action",
            },
            actionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 3 micro-steps to accomplish in 60 seconds",
            },
          },
          required: ["title", "action", "impactFact", "co2SavedGrams", "emoji", "actionSteps"],
        },
        temperature: 0.7,
      },
    });

    const text = response.text?.trim() || "{}";
    const data = JSON.parse(text);
    res.json({
      success: true,
      data: {
        ...data,
        category: data.category || catKey,
        durationSeconds: data.durationSeconds || 60,
      },
    });
  } catch (error: any) {
    console.error("Gemini API error:", error?.message || error);
    // Return gracefully so frontend never breaks
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate AI action",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarbonBrake server running on http://localhost:${PORT}`);
  });
}

startServer();
