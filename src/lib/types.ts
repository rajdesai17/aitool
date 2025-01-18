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

  export interface AddressData {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }

  export interface QuizData {
    id: string;
    recipientEmail: string;
    created: string;
    completed: boolean;
    surveyData?: SurveyData;
    recommendations?: GiftRecommendation;
  }