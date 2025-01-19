import { GoogleGenerativeAI } from '@google/generative-ai';
import { SurveyData, GiftRecommendation } from './types';
import { predefinedGifts } from './constants';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getGiftRecommendations(surveyData: SurveyData): Promise<GiftRecommendation> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Based on the following user profile and quiz answers, recommend 5 gifts from the predefined list:

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
    const validGifts = parsed.topGifts.filter(gift => 
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

interface Message {
  role: string;
  content: string;
}

export async function getGeminiResponse(messages: Message[], context: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are a gift recommendation assistant. Use this context for your responses:
  
Recipient Profile:
- Gender: ${context.surveyData.gender}
- Age: ${context.surveyData.ageRange}
- Relationship: ${context.surveyData.relationship}

Recommended Gifts:
${context.recommendations.topGifts.map(g => `- ${g.name} (${g.category}, ${g.priceRange})`).join('\n')}

Personality Insights:
${context.recommendations.personalityInsights}

Chat History:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}

Provide helpful gift advice based on this context. Keep responses concise and specific to the available gifts.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to get response');
  }
}