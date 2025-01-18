// src/components/Chat.tsx
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SurveyData, GiftRecommendation } from '../lib/types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface ChatProps {
  surveyData: SurveyData;
  recommendations: GiftRecommendation;
}

export const Chat = ({ surveyData, recommendations }: ChatProps) => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create initial context as a system prompt
      const systemPrompt = `You are a gift recommendation expert. Here's the context:

Based on the user's survey responses, these gifts were recommended:
${recommendations.topGifts.map(gift => `- ${gift.name}: ${gift.reasoning}`).join('\n')}

Their personality insights: ${recommendations.personalityInsights}

The user's preferences:
- Gender: ${surveyData.gender}
- Activity Preference: ${surveyData.answers[0]}
- Lifestyle: ${surveyData.answers[1]}
- Free Time: ${surveyData.answers[2]}
- Budget Preference: ${surveyData.answers[3]}
- Gift Priority: ${surveyData.answers[4]}

Keep your responses focused on gift recommendations and explanations based on this context.`;

      // Start a new chat for each message to maintain context
      const prompt = messages.length === 0 
        ? `${systemPrompt}\n\nUser: ${input}`
        : `${systemPrompt}\n\n${messages.map(msg => 
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
          ).join('\n')}\n\nUser: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      setMessages(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: response.text() }
      ]);
      setInput('');
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: "I apologize, but I'm having trouble processing your request. Please try asking your question again." }
      ]);
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 h-96 overflow-y-auto bg-white rounded-lg shadow p-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center p-4">
            <p>👋 Hi! I can help you decide between the recommended gifts or suggest alternatives.</p>
            <p className="text-sm mt-2">Try asking:</p>
            <ul className="text-sm mt-1 space-y-1">
              <li>• "Which gift would be best for everyday use?"</li>
              <li>• "Are there any cheaper alternatives to [gift name]?"</li>
              <li>• "Why did you recommend [gift name]?"</li>
            </ul>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white' 
                : 'bg-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            <div className="typing-indicator space-x-1">
              <span className="dot animate-bounce">•</span>
              <span className="dot animate-bounce delay-100">•</span>
              <span className="dot animate-bounce delay-200">•</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-pink-500"
          placeholder="Ask about gift suggestions..."
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:shadow-lg transition-shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};