import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveyData, surveySchema } from '../lib/types';
import { questions } from '../lib/surveyQuestions';
import { motion } from 'framer-motion';

export const Survey = ({ onComplete }: { onComplete: (data: SurveyData) => void }) => {
  const [step, setStep] = useState<'demographics' | 'pre-quiz' | 'quiz'>('demographics');
  const [demographicData, setDemographicData] = useState<Partial<SurveyData>>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema)
  });

  const handleDemographicSubmit = (data: SurveyData) => {
    console.log("Demographics submitted:", data); // Debug log
    setDemographicData(data);
    setStep('pre-quiz');
  };

  const startQuiz = () => {
    console.log("Starting quiz with demographics:", demographicData); // Debug log
    setStep('quiz');
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete({
        ...demographicData!,
        quizAnswers: newAnswers
      });
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
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p id="gender-error" className="mt-1 text-sm text-red-600">
                  Please select a gender
                </p>
              )}
            </div>

            <div>
              <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">
                Age Range
              </label>
              <select
                id="ageRange"
                {...register('ageRange')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                aria-describedby={errors.ageRange ? "age-error" : undefined}
              >
                <option value="">Select age range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
              </select>
              {errors.ageRange && (
                <p id="age-error" className="mt-1 text-sm text-red-600">
                  Please select an age range
                </p>
              )}
            </div>

            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                Relationship to Recipient
              </label>
              <select
                id="relationship"
                {...register('relationship')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                aria-describedby={errors.relationship ? "relationship-error" : undefined}
              >
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="spouse/partner">Spouse/Partner</option>
                <option value="child">Child</option>
                <option value="other">Other</option>
              </select>
              {errors.relationship && (
                <p id="relationship-error" className="mt-1 text-sm text-red-600">
                  Please select your relationship
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            aria-label="Continue to quiz"
          >
            Continue to Quiz
          </button>
        </form>
      </motion.div>
    );
  }

  if (step === 'pre-quiz') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center space-y-6"
      >
        <h2 className="text-2xl font-bold">Ready to Find the Perfect Gift?</h2>
        <p className="text-gray-600">
          You'll answer 25 questions to help us understand preferences and personality.
          This will take about 5-10 minutes.
        </p>
        <button
          onClick={startQuiz}
          className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        >
          Start Quiz
        </button>
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
        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuizAnswer(option.text)}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};