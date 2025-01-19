import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle as ChatIcon } from 'lucide-react';
import { Chat } from './Chat';
import { GiftCard } from './GiftCard';
import { predefinedGifts } from '../lib/constants';
import { SurveyData, GiftRecommendation } from '../lib/types';

export const Results = ({ surveyData, recommendations }: { 
  surveyData: SurveyData;
  recommendations: GiftRecommendation;
}) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<string>('All');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gifts = recommendations?.topGifts?.length > 0 
    ? recommendations.topGifts 
    : predefinedGifts;

  const categories = ['All', ...new Set(gifts.map(gift => gift.category))];
  const priceRanges = ['All', ...new Set(gifts.map(gift => gift.priceRange))];

  const filteredGifts = gifts.filter(gift => {
    const matchesCategory = selectedCategory === 'All' || gift.category === selectedCategory;
    const matchesPrice = priceFilter === 'All' || gift.priceRange === priceFilter;
    return matchesCategory && matchesPrice;
  });

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg"
        >
          {/* Personality Insights Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-violet-50 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Your Gift Profile</h2>
            <p className="text-gray-700 leading-relaxed">
              {recommendations.personalityInsights || 
              "Based on your answers, we've curated a selection of gifts that match your preferences."}
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Recommended Gifts</h2>
          
          {/* Existing filters section */}
          <div className="flex gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="p-2 border rounded"
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>

          {/* Gift Grid with Motion */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredGifts.length > 0 ? (
              filteredGifts.map((gift, index) => (
                <GiftCard key={`${gift.name}-${index}`} gift={gift} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No gifts match the selected filters
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setShowChat(true)}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all z-50"
            aria-label="Open chat"
          >
            <ChatIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4">
            <Chat 
              onClose={() => setShowChat(false)} 
              context={{ surveyData, recommendations }} 
            />
          </div>
        </div>
      )}
    </>
  );
};