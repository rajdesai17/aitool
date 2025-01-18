import { useState } from 'react';
import { Survey } from './components/Survey';
import { Results } from './components/Results';
import { QuizGenerator } from './components/QuizGenerator';
import { AddressForm } from './components/AddressForm';
import { SurveyData } from './lib/types';

export default function App() {
  const [step, setStep] = useState<'survey' | 'results' | 'quiz' | 'address'>('survey');
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const handleSurveyComplete = async (data: SurveyData) => {
    setSurveyData(data);
    setStep('results');
  };

  const handleAddressSubmit = async (addressData: any) => {
    try {
      // Handle address submission
      console.log('Address saved:', addressData);
      // Return to survey after address submission
      setStep('survey');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Gift Recommendation App
        </h1>

        {step === 'survey' && (
          <Survey onComplete={handleSurveyComplete} />
        )}

        {step === 'results' && surveyData && (
          <>
            <Results surveyData={surveyData} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setStep('address')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                className="text-blue-500 underline"
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
              className="text-blue-500 underline"
            >
              {step === 'quiz' ? 'Take Survey' : 'Create Quiz for Someone'}
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <QuizGenerator />
        )}
      </div>
    </div>
  );
}