import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from './HeroSection';

export const Landing = () => {
  return (
    <main>
      <HeroSection />
    </main>
  );
};