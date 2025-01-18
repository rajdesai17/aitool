import { Gift, Heart, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50"
    >
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="w-6 h-6 text-pink-500" />
          <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            GiftMatch
          </span>
        </div>
        
        <div className="flex gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Home className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-pink-500" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}; 