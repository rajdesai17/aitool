import { motion } from 'framer-motion';
import { GiftItem } from '../lib/types';
import { giftImages } from '../lib/constants';

interface GiftCardProps {
  gift: GiftItem;
}

export const GiftCard = ({ gift }: GiftCardProps) => {
  const defaultImage = '/api/placeholder/500/300';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={giftImages[gift.name] || defaultImage}
        alt={gift.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{gift.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{gift.reasoning}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {gift.category}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            {gift.priceRange}
          </span>
        </div>
      </div>
    </motion.div>
  );
};