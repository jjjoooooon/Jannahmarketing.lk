import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export const generateMarketingCopy = async (flavor: string): Promise<string> => {
  if (!apiKey) {
    return `Experience the refreshing taste of ${flavor}. It's simply the best choice for a sunny day.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';

    const prompt = `Write a short, punchy, 2-sentence marketing slogan for a soft drink flavor called "${flavor}". The brand is "Sunstar", styled as futuristic, neon, and high-energy.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || `Taste the future with ${flavor}.`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Unleash the power of ${flavor}. Refreshment redefined.`;
  }
};

export const generateBlogTopics = async (): Promise<any[]> => {
  if (!apiKey) {
    return [
      { title: "The Future of Fizz", excerpt: "How carbonation technology is changing." },
      { title: "Summer Mixology 2025", excerpt: "Top cocktails using Sunstar Orange." },
      { title: "Sustainable Sipping", excerpt: "Our journey to 100% recycled bottles." }
    ];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';

    const prompt = `Generate 3 blog post ideas for a futuristic soda brand "Sunstar". Return ONLY a JSON array with objects containing "title" and "excerpt" keys.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    // Basic cleanup just in case markdown blocks are included
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [
      { title: "Neon Nights & Cold Drinks", excerpt: "Why Sunstar is the choice of the cyberpunk generation." },
      { title: "Flavor Profile: Midnight Cola", excerpt: "Deep dive into our most mysterious flavor." },
      { title: "Sunstar X Music Festivals", excerpt: "Where to find us this summer season." }
    ];
  }
};