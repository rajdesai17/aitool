import { Gift, Heart, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-pink-200 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Gift className="w-6 h-6 text-pink-500" />
          </motion.div>
          <motion.span 
            className="font-bold text-xl bg-gradient-to-r from-pink-500 to-pink-600 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
          >
            GiftMatch
          </motion.span>
        </Link>
        
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Home className="w-5 h-5 text-gray-300 group-hover:text-pink-400" />
            </motion.div>
          </Link>
          <Link 
            to="/explore" 
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Heart className="w-5 h-5 text-pink-500 group-hover:text-pink-400" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};