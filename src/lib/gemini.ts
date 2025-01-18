import { GoogleGenerativeAI } from '@google/generative-ai';
import { SurveyData, Gift, GiftRecommendation } from './types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const predefinedGifts: Gift[] = [
  { name: "Smart Watch", price: 199.99, category: "Tech" },
  { name: "Premium Wireless Earbuds", price: 149.99, category: "Tech" },
  { name: "Fitness Tracker", price: 89.99, category: "Health" },
  { name: "Yoga Mat Set", price: 49.99, category: "Health" },
  { name: "Digital Drawing Tablet", price: 199.99, category: "Creative" },
  { name: "Professional Camera", price: 599.99, category: "Tech" },
  { name: "Online Course Subscription", price: 199.99, category: "Education" },
  { name: "Gaming Console", price: 399.99, category: "Entertainment" },
  { name: "Hiking Backpack", price: 129.99, category: "Outdoor" },
  { name: "Premium Coffee Maker", price: 149.99, category: "Home" },
  { name: "Smart Home Starter Kit", price: 249.99, category: "Tech" },
  { name: "Premium Headphones", price: 299.99, category: "Tech" },
  { name: "E-reader", price: 139.99, category: "Tech" },
  { name: "Meditation App Subscription", price: 79.99, category: "Health" },
  { name: "Language Learning Subscription", price: 159.99, category: "Education" }
];

export async function getGiftRecommendations(surveyData: SurveyData): Promise<GiftRecommendation | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `As a gift recommendation expert, analyze these survey responses for a ${surveyData.gender} person:

1. Activity Preference: ${surveyData.answers[0]}
2. Lifestyle: ${surveyData.answers[1]}
3. Free Time: ${surveyData.answers[2]}
4. Budget Preference: ${surveyData.answers[3]}
5. Gift Priority: ${surveyData.answers[4]}

Based on these specific answers, analyze their personality traits and preferences.
Then, rank the top 5 most suitable gifts from this list:
${JSON.stringify(predefinedGifts, null, 2)}

Consider:
1. Their activity preferences and lifestyle
2. Their budget preferences
3. What they value most in a gift
4. How they spend their free time

Return the response in this JSON format:
{
  "topGifts": [
    {
      "name": "string",
      "reasoning": "detailed explanation of why this gift matches their profile"
    }
  ],
  "personalityInsights": "detailed analysis of their personality and preferences"
}

Ensure each reasoning specifically references their survey answers.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return null;
  }
}