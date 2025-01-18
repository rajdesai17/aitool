import { GoogleGenerativeAI } from '@google/generative-ai';
import { SurveyData, Gift, GiftRecommendation } from './types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const predefinedGifts: Gift[] = [
  { name: "Wireless Earbuds", price: 79.99, category: "Tech" },
  { name: "Fitness Tracker", price: 89.99, category: "Health" },
  { name: "Wireless Earbuds", price: 79.99, category: "Tech" },
  { name: "Fitness Tracker", price: 89.99, category: "Health" },
  { name: "Premium Coffee Maker", price: 149.99, category: "Home" },
  { name: "Yoga Mat Set", price: 49.99, category: "Health" },
  { name: "Professional Camera", price: 599.99, category: "Tech" },
  { name: "Smart Watch", price: 199.99, category: "Tech" },
  { name: "Leather Wallet", price: 59.99, category: "Fashion" },
  { name: "Board Game Collection", price: 89.99, category: "Entertainment" },
  { name: "Cooking Class Subscription", price: 199.99, category: "Experience" },
  { name: "Premium Headphones", price: 299.99, category: "Tech" },
  { name: "Art Supply Set", price: 79.99, category: "Creative" },
  { name: "Hiking Backpack", price: 129.99, category: "Outdoor" },
  { name: "Wine Tasting Set", price: 149.99, category: "Entertainment" },
  { name: "Smart Home Starter Kit", price: 249.99, category: "Tech" },
  { name: "Premium Skincare Set", price: 199.99, category: "Beauty" },
  { name: "Cookbook Collection", price: 89.99, category: "Books" },
  { name: "Gaming Console", price: 399.99, category: "Entertainment" },
  { name: "Plant Care Kit", price: 69.99, category: "Home" },
  { name: "Language Learning Subscription", price: 159.99, category: "Education" },
  { name: "Meditation App Premium", price: 79.99, category: "Health" }
];

export async function getGiftRecommendations(surveyData: SurveyData): Promise<GiftRecommendation | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Based on these survey responses for a ${surveyData.gender} person:
      ${surveyData.answers.join(', ')}
      
      Please analyze their personality and preferences to rank these gifts:
      ${JSON.stringify(predefinedGifts)}
      
      Return the response in this JSON format:
      {
        "topGifts": [{"name": "string", "reasoning": "string"}],
        "personalityInsights": "string"
      }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return null;
  }
}