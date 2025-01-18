import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveyData } from '../lib/types';

// Add prop type definition
interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

const surveySchema = z.object({
  gender: z.enum(['male', 'female', 'other']),
  answers: z.array(
    z.string()
      .min(1, "Answer cannot be empty")
      .max(200, "Answer too long")
      .trim()
  ).length(25)
});

const questions = [
  "What hobbies do you enjoy most?",
  "How do you usually spend your weekends?",
  "What's your favorite type of music?",
  // ... Add all 25 questions
];

export const Survey = ({ onComplete }: SurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(surveySchema)
  });

  const sanitizeInput = (input: string) => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove HTML tags
      .slice(0, 200); // Limit length
  };

  const onSubmit = (data: z.infer<typeof surveySchema>) => {
    const sanitizedData = {
      ...data,
      answers: data.answers.map(sanitizeInput)
    };
    onComplete(sanitizedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
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

        <div className="mb-4">
          <h3 className="text-lg mb-2">{questions[currentQuestion]}</h3>
          <input
            type="text"
            {...register(`answers.${currentQuestion}`)}
            className="w-full p-2 border rounded"
            maxLength={200}
          />
          {errors.answers?.[currentQuestion] && (
            <p className="text-red-500 text-sm mt-1">
              {errors.answers[currentQuestion]?.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          {currentQuestion > 0 && (
            <button
              type="button"
              onClick={() => setCurrentQuestion(c => c - 1)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentQuestion(c => c + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Get Recommendations
            </button>
          )}
        </div>
      </form>
    </div>
  );
};