import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  SurveyData, 
  GiftRecommendation, 
  GiftItem,
  Message// Remove Message from here since it's not exported from types
} from './types';
import { predefinedGifts } from './constants';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getGiftRecommendations(surveyData: SurveyData): Promise<GiftRecommendation> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Based on the following user profile and quiz answers,You are a gift recommendation assistant. Use this context for your responses:

Profile:
- Gender: ${surveyData.gender}
- Age Range: ${surveyData.ageRange}
- Relationship: ${surveyData.relationship}
- Quiz Answers: ${JSON.stringify(surveyData.quizAnswers)}

Available Gifts: ${JSON.stringify(predefinedGifts)}

Provide recommendations in this exact JSON format:
{
  "topGifts": [
    {
      "name": "Gift Name (must match exactly with predefined gifts)",
      "reasoning": "Personalized explanation based on profile and quiz answers",
      "category": "matching category from predefined gifts",
      "priceRange": "matching price range from predefined gifts"
    }
  ],
  "personalityInsights": "Brief analysis of gift preferences based on quiz answers"
}

Choose only 5 most suitable gifts considering their personality traits shown in quiz answers.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```JSON|```/g, '').trim();
    const parsed = JSON.parse(text);

    // Validate response matches predefined gifts
    const validGifts = parsed.topGifts.filter((gift: GiftItem) => 
      predefinedGifts.some(pg => pg.name === gift.name)
    ).slice(0, 5);

    return {
      topGifts: validGifts,
      personalityInsights: parsed.personalityInsights
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    // Fallback to top 5 predefined gifts
    return {
      topGifts: predefinedGifts.slice(0, 5),
      personalityInsights: "Unable to generate personalized insights. Showing popular gift options."
    };
  }
}

export const getGeminiResponse = async (
  userMessage: string, 
  context: {
    recommendations: GiftRecommendation,
    surveyData: SurveyData,
    conversationHistory: Message[]
  }
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
    Context:
    - Gender: ${context.surveyData.gender}
    - Age Range: ${context.surveyData.ageRange}
    - Relationship: ${context.surveyData.relationship}
    - Recommended Gifts: ${JSON.stringify(context.recommendations.topGifts)}
    
    Previous Messages:
    ${context.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
    
    User Question: ${userMessage}
    
    You are a helpful gift recommendation assistant. Provide a natural and helpful response about the gift recommendations based on this context. Keep responses concise and focused on the gifts and user's preferences.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
};