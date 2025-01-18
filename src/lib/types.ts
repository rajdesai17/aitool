// src/lib/types.ts
export interface SurveyData {
    gender: 'male' | 'female' | 'other';
    answers: string[];
  }
  
  export interface Gift {
    name: string;
    price: number;
    category: string;
  }
  
  export interface GiftRecommendation {
    topGifts: Array<{
      name: string;
      reasoning: string;
    }>;
    personalityInsights: string;
  }