import { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftCard } from './GiftCard';
import { AddressForm } from './AddressForm';
import { predefinedGifts } from '../lib/constants';
import { SurveyData, GiftRecommendation, AddressData } from '../lib/types';

export const Results = ({ recommendations }: { 
  surveyData: SurveyData;
  recommendations: GiftRecommendation;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<string>('All');

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
    <div className="max-w-4xl mx-auto p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-pink-200"
      >
        {/* Personality Insights Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
          <h2 className="text-2xl font-bold mb-4 text-pink-800">Your Gift Profile</h2>
          <p className="text-gray-700 leading-relaxed">
            {recommendations.personalityInsights || 
            "Based on your answers, we've curated a selection of gifts that match your preferences."}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-pink-800">Recommended Gifts</h2>
        
        {/* Existing filters section */}
        <div className="flex gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-pink-200 rounded bg-white text-gray-800"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 border border-pink-200 rounded bg-white text-gray-800"
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

        {/* Shipping Details Section */}
        <div className="mt-8 pt-8 border-t border-pink-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-800">Shipping Details</h2>
            <AddressForm 
              onSubmit={async (addressData: AddressData) => {
                try {
                  console.log('Address submitted:', addressData);
                } catch (error) {
                  console.error('Error saving address:', error);
                }
              }} 
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};