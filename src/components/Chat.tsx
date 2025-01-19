// src/components/Chat.tsx
import { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { ChatContext } from '../lib/types';

interface Message {
  role: string;
  content: string;
}

export const Chat = ({ onClose, context }: { onClose: () => void; context: ChatContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await getGeminiResponse(context);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gift Assistant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
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
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage(input)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Ask about gift suggestions..."
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:shadow-lg transition-shadow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};