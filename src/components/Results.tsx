// src/components/Results.tsx
import { useState, useEffect } from 'react';
import { SurveyData, GiftRecommendation } from '../lib/types';
import { getGiftRecommendations } from '../lib/gemini';

interface ResultsProps {
  surveyData: SurveyData;
}

export const Results = ({ surveyData }: ResultsProps) => {
  const [recommendations, setRecommendations] = useState<GiftRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const results = await getGiftRecommendations(surveyData);
      setRecommendations(results);
      setLoading(false);
    };

    fetchRecommendations();
  }, [surveyData]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (!recommendations) {
    return <div>Error getting recommendations. Please try again.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Gift Recommendations</h2>
      
      <div className="mb-6">
        <h3 className="text-xl mb-2">Personality Insights</h3>
        <p>{recommendations.personalityInsights}</p>
      </div>

      <div>
        <h3 className="text-xl mb-2">Top Gift Suggestions</h3>
        {recommendations.topGifts.map((gift, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h4 className="font-bold">{gift.name}</h4>
            <p>{gift.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};