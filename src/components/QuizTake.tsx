import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Survey } from './Survey';
import { SurveyData } from '../lib/types';

export const QuizTake = () => {
  const { quizId } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<any>(null);

  useState(() => {
    try {
      const data = localStorage.getItem(quizId || '');
      if (!data) {
        setError('Quiz not found');
        return;
      }
      setQuizData(JSON.parse(data));
    } catch (err) {
      setError('Invalid quiz data');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const handleQuizSubmit = (data: SurveyData) => {
    if (!quizId) {
      setError('Quiz ID is required');
      return;
    }

    try {
      localStorage.setItem(`${quizId}-response`, JSON.stringify({
        answers: data,
        completedAt: new Date().toISOString()
      }));
    } catch (err) {
      setError('Failed to save response');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Survey onComplete={handleQuizSubmit} initialData={quizData} />
      )}
    </div>
  );
};