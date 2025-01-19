import { z } from 'zod';

export const surveySchema = z.object({
  gender: z.string().min(1, "Please select a gender"),
  ageRange: z.string().min(1, "Please select an age range"),
  relationship: z.string().min(1, "Please select a relationship"),
  quizAnswers: z.array(z.string()).optional()
});

export type SurveyData = z.infer<typeof surveySchema>;

export interface Gift {
  name: string;
  price: number;
  category: string;
}

export interface GiftItem {
  name: string;
  reasoning: string;
  category: string;
  priceRange: string;
}

export interface GiftRecommendation {
  topGifts: GiftItem[];
  personalityInsights: string;
}

export interface ChatContext {
  surveyData: SurveyData;
  recommendations: GiftRecommendation;
}

export interface GiftImages {
  [key: string]: string;
}