import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 opacity-50">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
          animate={{
            x: ['0%', '25%', '0%'],
            y: ['0%', '25%', '0%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"
          animate={{
            x: ['0%', '-25%', '0%'],
            y: ['0%', '-25%', '0%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
         <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl"
           animate={{
            x: ['-50%', '0%', '-50%'],
            y: ['-50%', '0%', '-50%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

export default AuroraBackground;

