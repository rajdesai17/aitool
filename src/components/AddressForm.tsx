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
    // Handle address submission
    console.log('Address submitted:', addressData);
    // You can add API call here to save address
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
            <button
              onClick={() => setStep('address')}
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Continue to Shipping
            </button>
          </>
        )}

        {step === 'address' && (
          <AddressForm onSubmit={handleAddressSubmit} />
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