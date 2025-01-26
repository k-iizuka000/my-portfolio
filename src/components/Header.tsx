import { motion } from 'framer-motion';
import { HeaderProps } from '../types';

export const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  return (
    <header className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto px-4">
          フルスタック開発者として、革新的なウェブソリューションを提供しています
        </p>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
        >
          詳しく見る
        </motion.a>
      </motion.div>
    </header>
  );
};
