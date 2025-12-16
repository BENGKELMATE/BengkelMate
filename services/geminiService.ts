import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, ToolCondition } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeToolImage = async (base64Image: string): Promise<AIAnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `Analyze this workshop tool image. 
            1. Identify the tool name. 
            2. Assess the condition (Good, Fair, or Poor). Look for rust, damage, or wear.
            3. Provide a short description of defects if any.
            4. Suggest maintenance action.
            5. Provide a confidence score (0-100).`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            toolName: { type: Type.STRING },
            condition: { type: Type.STRING, enum: [ToolCondition.GOOD, ToolCondition.FAIR, ToolCondition.POOR] },
            description: { type: Type.STRING },
            maintenanceSuggestion: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
          },
          required: ["toolName", "condition", "description", "maintenanceSuggestion", "confidenceScore"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AIAnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback mock response for demo purposes if API key is missing or fails
    return {
      toolName: "Unknown Tool (AI Error)",
      condition: ToolCondition.FAIR,
      description: "Could not analyze image. Please try again.",
      maintenanceSuggestion: "Check manually.",
      confidenceScore: 0,
    };
  }
};