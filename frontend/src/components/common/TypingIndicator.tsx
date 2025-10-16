import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain } from 'lucide-react';

interface TypingIndicatorProps {
  message?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  message
}) => {
  const thinkingMessages = [
    "Hannah đang suy nghĩ...",
    "Đang phân tích câu hỏi của bạn...",
    "Đang tìm kiếm thông tin phù hợp...",
    "Đang xử lý và tổ chức câu trả lời...",
    "Đang chuẩn bị phản hồi chi tiết..."
  ];

  const [currentMessage, setCurrentMessage] = useState(message || thinkingMessages[0]);

  useEffect(() => {
    if (!message) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => {
          const currentIndex = thinkingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % thinkingMessages.length;
          return thinkingMessages[nextIndex];
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [message]);
  const dotVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-600/50 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {/* AI Avatar with thinking animation */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              {/* Thinking pulse effect */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain size={10} className="text-yellow-800" />
              </motion.div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-300 text-sm font-medium">{currentMessage}</span>
              </div>
              
              {/* Animated dots */}
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    variants={dotVariants}
                    animate="animate"
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          </div>

          {/* Subtle background animation */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
