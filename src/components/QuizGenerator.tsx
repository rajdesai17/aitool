// src/components/QuizGenerator.tsx
import { useState } from 'react';
import { z } from 'zod';

const emailSchema = z.string().email();

export const QuizGenerator = () => {
  const [email, setEmail] = useState('');
  const [quizLink, setQuizLink] = useState('');
  const [error, setError] = useState('');

  const generateQuizLink = () => {
    try {
      emailSchema.parse(email);
      const quizId = crypto.randomUUID();
      const link = `${window.location.origin}/quiz/${quizId}`;
      setQuizLink(link);
      setError('');
      
      // Store quiz data in localStorage
      localStorage.setItem(quizId, JSON.stringify({
        recipientEmail: email,
        created: new Date().toISOString(),
        completed: false
      }));
    } catch (err) {
      setError('Please enter a valid email address');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Recipient's Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <button
        onClick={generateQuizLink}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Generate Quiz Link
      </button>

      {quizLink && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="mb-2">Share this link with the recipient:</p>
          <input
            type="text"
            value={quizLink}
            readOnly
            className="w-full p-2 border rounded bg-white"
            onClick={(e) => e.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
};