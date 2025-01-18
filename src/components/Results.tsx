// src/components/Results.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Chat } from './Chat';
import { SurveyData, GiftRecommendation } from '../lib/types';

const giftImages: Record<string, string> = {
  "Smart Watch": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
  "Premium Wireless Earbuds": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
  "Fitness Tracker": "https://images.unsplash.com/photo-1557858310-9052820906f7?w=500",
  "Yoga Mat Set": "https://images.unsplash.com/photo-1601925260368-ae2f83cf1b1f?w=500",
  "Digital Drawing Tablet": "https://images.unsplash.com/photo-1561886318-56cb73f7c6a9?w=500",
  "Professional Camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
  "Online Course Subscription": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500",
  "Gaming Console": "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500",
  "Hiking Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  "Premium Coffee Maker": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
  "Smart Home Starter Kit": "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
  "Premium Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  "E-reader": "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=500",
  "Meditation App Subscription": "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500",
  "Language Learning Subscription": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500"
};

export const Results = ({ 
  surveyData, 
  recommendations 
}: { 
  surveyData: SurveyData;
  recommendations: GiftRecommendation;
}) => {
  const [showChat, setShowChat] = useState(false);

  if (!recommendations) {
    return (
      <div className="text-center text-gray-600">
        No recommendations available. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
          Your Perfect Match
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {recommendations.personalityInsights}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.topGifts.map((gift, index) => (
          <motion.div
            key={gift.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src={giftImages[gift.name] || 'https://via.placeholder.com/400x300'}
                alt={gift.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                {gift.name}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 leading-relaxed">{gift.reasoning}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chatbot Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Dialog */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-pink-500 to-violet-500">
                <h3 className="text-white font-semibold">Need Help Deciding?</h3>
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-white hover:bg-white/20 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Chat surveyData={surveyData} recommendations={recommendations} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};