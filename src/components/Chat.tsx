// src/components/Chat.tsx
import { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { ChatContext, Message } from '../lib/types';  // Import the Message type from types
import { MessageCircle, X } from 'lucide-react';

export const Chat = ({ context }: { context: ChatContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hi! Based on what I know about the recipient:
      - Gender: ${context.surveyData.gender}
      - Age Range: ${context.surveyData.ageRange}
      - Relationship: ${context.surveyData.relationship}

I've recommended some gifts based on their profile. Feel free to ask me:
• Why I suggested a specific gift
• Which gift best matches their preferences
• Price comparisons between gifts
• Alternative suggestions`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    setIsLoading(true);
    const newMessage: Message = {  // When creating new messages, ensure the role is strictly "user" or "assistant"
      content,
      role: "user"  // Must be exactly "user" or "assistant"
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');

    try {
      // Pass full context to get contextual responses
      const response = await getGeminiResponse(content, {
        recommendations: context.recommendations,
        surveyData: context.surveyData,
        conversationHistory: newMessages
      });
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
    <div className="fixed bottom-8 right-8 z-[9999]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-[380px] transition-all duration-300 ease-in-out">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Chat Assistant</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="h-[400px] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
              {messages.map((message, index) => (
                <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {message.content}
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
            
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage(input)}
                className="flex-1 p-2 border rounded-full focus:outline-none focus:border-blue-500"
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};