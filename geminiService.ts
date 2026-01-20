
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "./types";

// Always use process.env.API_KEY directly for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ITINERARY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    location: { type: Type.STRING },
    title: { type: Type.STRING },
    tags: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.NUMBER },
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                description: { type: Type.STRING },
                imageUrl: { type: Type.STRING },
                lat: { type: Type.NUMBER },
                lng: { type: Type.NUMBER },
                durationMinutes: { type: Type.NUMBER }
              },
              required: ["id", "type", "title", "time", "description", "imageUrl", "lat", "lng", "durationMinutes"]
            }
          }
        },
        required: ["dayNumber", "title", "date", "activities"]
      }
    }
  },
  required: ["id", "location", "title", "days", "tags"]
};

export const parseTravelLink = async (url: string): Promise<Itinerary> => {
  // Simulating link parsing. In a real app, you might fetch page metadata first.
  const prompt = `You are a travel expert. Parse this travel link (simulated): ${url}. 
  If the link contains information about a specific city like Kyoto, Japan, generate a detailed 1-day itinerary.
  If the link is generic, create a dream itinerary for Kyoto, Japan.
  Focus on high-quality, authentic experiences.
  Return the itinerary in JSON format strictly following the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      // Using prompt directly as a string for clarity.
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ITINERARY_SCHEMA
      }
    });

    // Access the text property directly (not a method call).
    const data = JSON.parse(response.text || "{}");
    return data as Itinerary;
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw error;
  }
};
