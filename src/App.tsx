import { useState } from 'react';
import { Survey } from './components/Survey';
import { Results } from './components/Results';
import { QuizGenerator } from './components/QuizGenerator';
import { AddressForm } from './components/AddressForm';
import { SurveyData, AddressData, GiftRecommendation } from './lib/types';
import { Navbar } from './components/Navbar';
import { getGiftRecommendations } from './lib/gemini';

export default function App() {
  const [step, setStep] = useState<'survey' | 'results' | 'quiz' | 'address'>('survey');
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [recommendations, setRecommendations] = useState<GiftRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSurveyComplete = async (data: SurveyData) => {
    try {
      setLoading(true);
      setSurveyData(data);
      const results = await getGiftRecommendations(data);
      if (results) {
        setRecommendations(results);
        setStep('results');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (data: AddressData) => {
    try {
      console.log('Address saved:', data);
      setStep('survey');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-50">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Finding your perfect matches...</p>
            </div>
          </div>
        ) : (
          <>
            {step === 'survey' && (
              <Survey onComplete={handleSurveyComplete} />
            )}

            {step === 'results' && surveyData && recommendations && (
              <>
                <Results 
                  surveyData={surveyData} 
                  recommendations={recommendations}
                />
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setStep('address')}
                    className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </>
            )}

            {step === 'address' && (
              <>
                <AddressForm onSubmit={handleAddressSubmit} />
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setStep('results')}
                    className="text-pink-500 hover:text-pink-600 underline"
                  >
                    Back to Results
                  </button>
                </div>
              </>
            )}

            {step !== 'address' && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setStep(step === 'quiz' ? 'survey' : 'quiz')}
                  className="text-pink-500 hover:text-pink-600 underline"
                >
                  {step === 'quiz' ? 'Take Survey' : 'Create Quiz for Someone'}
                </button>
              </div>
            )}

            {step === 'quiz' && (
              <QuizGenerator />
            )}
          </>
        )}
      </div>
    </div>
  );
}