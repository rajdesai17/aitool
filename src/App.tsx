import { useState } from 'react';
import { Survey } from './components/Survey';
import { Results } from './components/Results';
import { QuizGenerator } from './components/QuizGenerator';
import { AddressForm } from './components/AddressForm';
import { SurveyData, AddressData, GiftRecommendation } from './lib/types';
import { Navbar } from './components/Navbar';
import { getGiftRecommendations } from './lib/gemini';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components/Landing';

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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/explore" 
            element={
              <div className="container mx-auto px-4 pt-20">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                  {step === 'survey' && (
                    <Survey onComplete={handleSurveyComplete} />
                  )}
                  {step === 'results' && surveyData && recommendations && (
                    <Results 
                      surveyData={surveyData} 
                      recommendations={recommendations} 
                    />
                  )}
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}