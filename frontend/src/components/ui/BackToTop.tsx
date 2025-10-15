import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Tính toán vị trí scroll
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Hiện nút khi scroll gần đến cuối trang (90% của trang)
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      setIsVisible(scrollPercentage > 0.9);
    };

    // Thêm event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0, 
            y: 20,
            transition: {
              duration: 0.2
            }
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5), 0 0 30px rgba(34, 211, 238, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm hover:border-white/40 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <motion.div
            animate={{ 
              y: [0, -2, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <ChevronUp className="w-6 h-6 group-hover:text-white transition-colors" />
          </motion.div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
