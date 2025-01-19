import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              y: ['0vh', '100vh'],
              x: Math.random() * 100 + 'vw'
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10
            }}
          >
            <Heart className="w-8 h-8 text-pink-900" />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-pink-600 text-transparent bg-clip-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Perfect Gift
          </motion.h1>
          <motion.p 
            className="text-xl font-bold md:text-2xl text-gray-500 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI-powered recommendations to express your love and care
          </motion.p>
          <motion.button 
            onClick={() => navigate('/explore')}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-xl hover:shadow-pink-200 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started →
          </motion.button>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Personalized Gifts",
              description: "Tailored suggestions based on personality"
            },
            {
              title: "AI-Powered Magic",
              description: "Smart recommendations that understand preferences"
            },
            {
              title: "Express Love",
              description: "Show how much you care with thoughtful choices"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-pink-200 hover:border-pink-300 transition-colors"
            >
              <h3 className="text-xl font-semibold text-pink-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};