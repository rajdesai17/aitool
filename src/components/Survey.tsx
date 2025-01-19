import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveyData, surveySchema } from '../lib/types';
import { questions } from '../lib/surveyQuestions';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Survey = ({ onComplete }: { onComplete: (data: SurveyData) => void }) => {
  const [step, setStep] = useState<'demographics' | 'quiz'>('demographics');
  const [demographicData, setDemographicData] = useState<SurveyData>({
    gender: '',
    ageRange: '',
    relationship: '',
    recipientName: '', // Add missing required field
    quizAnswers: [],
    personality: '' // Add optional field
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema)
  });

  const handleDemographicSubmit = (data: SurveyData) => {
    console.log("Demographics submitted:", data); // Debug log
    setDemographicData(data);
    setStep('quiz');
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Instead of calling onComplete directly, set answers and show button
      setQuizAnswers(newAnswers);
      setShowRecommendations(true);
    }
  };

  const handleGetRecommendations = async () => {
    setIsGenerating(true);
    try {
      await onComplete({
        ...demographicData!,
        quizAnswers: quizAnswers
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (step === 'demographics') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleSubmit(handleDemographicSubmit)} className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-800 mb-1">
                Recipient's Name
              </label>
              <input
                id="recipientName"
                {...register('recipientName')}
                placeholder="Recipient's Name"
                className="mt-1 block w-full rounded-md border border-pink-200 bg-white text-gray-800 p-2 focus:border-pink-500 focus:ring-pink-500"
                aria-describedby={errors.recipientName ? "recipientName-error" : undefined}
              />
              {errors.recipientName && (
                <p id="recipientName-error" className="mt-1 text-sm text-red-400">
                  Please enter the recipient's name
                </p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-800 mb-1">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender')}
                className="mt-1 block w-full rounded-md border border-pink-200 bg-white text-gray-800 p-2 focus:border-pink-500 focus:ring-pink-500"
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="" className="bg-white">Select gender</option>
                <option value="male" className="bg-white">Male</option>
                <option value="female" className="bg-white">Female</option>
                <option value="other" className="bg-white">Other</option>
              </select>
              {errors.gender && (
                <p id="gender-error" className="mt-1 text-sm text-red-400">
                  Please select a gender
                </p>
              )}
            </div>

            <div className="space-y-6">
              {/* Age Range Select */}
              <div>
                <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">
                  Age Range
                </label>
                <select
                  id="ageRange"
                  {...register('ageRange')}
                  className="mt-1 block w-full rounded-md border border-pink-200 bg-white text-gray-800 p-2 focus:border-pink-500 focus:ring-pink-500"
                  aria-describedby={errors.ageRange ? "ageRange-error" : undefined}
                >
                  <option value="" className="bg-white">Select age range</option>
                  <option value="18-24" className="bg-white">18-24</option>
                  <option value="25-34" className="bg-white">25-34</option>
                  <option value="35-44" className="bg-white">35-44</option>
                  <option value="45-54" className="bg-white">45-54</option>
                  <option value="55-64" className="bg-white">55-64</option>
                  <option value="65+" className="bg-white">65+</option>
                </select>
                {errors.ageRange && (
                  <p id="ageRange-error" className="mt-1 text-sm text-red-400">
                    Please select an age range
                  </p>
                )}
              </div>

              {/* Relationship Select */}
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                  Relationship to Recipient
                </label>
                <select
                  id="relationship"
                  {...register('relationship')}
                  className="mt-1 block w-full rounded-md border border-pink-200 bg-white text-gray-800 p-2 focus:border-pink-500 focus:ring-pink-500"
                  aria-describedby={errors.relationship ? "relationship-error" : undefined}
                >
                  <option value="" className="bg-white">Select relationship</option>
                  <option value="parent" className="bg-white">Parent</option>
                  <option value="sibling" className="bg-white">Sibling</option>
                  <option value="friend" className="bg-white">Friend</option>
                  <option value="spouse/partner" className="bg-white">Spouse/Partner</option>
                  <option value="child" className="bg-white">Child</option>
                  <option value="other" className="bg-white">Other</option>
                </select>
                {errors.relationship && (
                  <p id="relationship-error" className="mt-1 text-sm text-red-400">
                    Please select your relationship
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-md hover:shadow-lg transition-all duration-200"
            aria-label="Continue to quiz"
          >
            Continue to Quiz
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {questions[currentQuestion].question}
        </h2>
        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizAnswer(option.text)}
              className="p-4 border border-pink-200 rounded-lg bg-white text-gray-800 hover:bg-pink-50 hover:border-pink-300 hover:shadow-md transition-all duration-200"
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {showRecommendations && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          {isGenerating ? (
            <div className="loading-container">
              <div className="text-center">
                <Heart className="w-12 h-12 loading-heart mx-auto mb-4" />
                <div className="text-xl font-semibold text-pink-600 mb-2">
                  Finding Your Perfect Gift Match
                </div>
                <div className="text-pink-500">
                  Analyzing your personality and preferences...
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGetRecommendations}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-xl hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-1"
            >
              Get Recommendations
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};