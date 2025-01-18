// src/components/Chat.tsx
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const Chat = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: messages
      });
      
      const result = await chat.sendMessage(input);
      const response = await result.response;
      
      setMessages(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: response.text() }
      ]);
      setInput('');
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask about gift suggestions..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};