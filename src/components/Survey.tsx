import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveyData } from '../lib/types';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

const surveySchema = z.object({
  gender: z.enum(['male', 'female', 'other']),
  answers: z.array(z.string().min(1, "Please select an option")).length(5)
});

type SurveyFormData = z.infer<typeof surveySchema>;

const questions = [
  {
    question: "What type of activities do you enjoy most?",
    options: [
      "Technology and gadgets",
      "Sports and fitness",
      "Arts and creativity",
      "Reading and learning",
      "Outdoor adventures"
    ]
  },
  {
    question: "How would you describe your lifestyle?",
    options: [
      "Very active and energetic",
      "Relaxed and laid-back",
      "Busy and productive",
      "Social and outgoing",
      "Quiet and introspective"
    ]
  },
  {
    question: "What's your preferred way to spend free time?",
    options: [
      "Playing with tech gadgets",
      "Exercise and sports",
      "Creative hobbies",
      "Learning new skills",
      "Outdoor activities"
    ]
  },
  {
    question: "What's your budget preference for purchases?",
    options: [
      "Premium quality regardless of price",
      "Mid-range but good value",
      "Budget-friendly essentials",
      "Occasional luxury items",
      "Practical and durable items"
    ]
  },
  {
    question: "What matters most to you in a gift?",
    options: [
      "Latest technology",
      "Health and wellness",
      "Personal development",
      "Entertainment value",
      "Practical utility"
    ]
  }
];

export const Survey = ({ onComplete }: SurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      gender: 'male',
      answers: Array(questions.length).fill('')
    }
  });

  const answers = watch('answers');

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setValue('answers', newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const onSubmit = (data: SurveyFormData) => {
    onComplete(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentQuestion === 0 && (
            <div className="mb-4">
              <label className="block mb-2">Select Gender</label>
              <select
                {...register('gender')}
                className="w-full p-2 border rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-6"
          >
            <h3 className="text-xl font-medium mb-4 text-gray-800">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 text-left rounded-xl border transition-all ${
                    answers[currentQuestion] === option 
                      ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white border-transparent'
                      : 'bg-white hover:border-pink-200 border-gray-200'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-between">
            <motion.button
              type="button"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-500 text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>

            {currentQuestion < questions.length - 1 ? (
              <motion.button
                type="button"
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={!answers[currentQuestion]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white disabled:opacity-50"
              >
                Find Matches
                <Heart className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};