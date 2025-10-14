import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedSVGProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({ children, className = "" }) => {
  const ref = useRef<SVGSVGElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  return (
    <motion.svg
      ref={ref}
      className={`w-32 h-32 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === 'path') {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              pathLength: scrollYProgress,
              ...child.props.style
            }
          });
        }
        return child;
      })}
    </motion.svg>
  );
};

// Document Analysis Icon
export const DocumentAnalysisIcon = () => (
  <AnimatedSVG className="text-blue-400">
    <motion.path
      d="M20 10 L80 10 L80 90 L20 90 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M30 25 L70 25"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
    />
    <motion.path
      d="M30 35 L65 35"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M30 45 L60 45"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
    />
    <motion.circle
      cx="65"
      cy="65"
      r="15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
    />
    <motion.path
      d="M75 75 L85 85"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
    />
  </AnimatedSVG>
);

// Conversational Learning Icon
export const ConversationIcon = () => (
  <AnimatedSVG className="text-green-400">
    <motion.path
      d="M15 20 Q15 15 20 15 L65 15 Q70 15 70 20 L70 45 Q70 50 65 50 L35 50 L20 65 L20 50 Q15 50 15 45 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M80 35 Q80 30 75 30 L30 30 Q25 30 25 35 L25 60 Q25 65 30 65 L60 65 L75 80 L75 65 Q80 65 80 60 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
    />
    <motion.circle
      cx="25"
      cy="25"
      r="2"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 1, ease: "easeOut" }}
    />
    <motion.circle
      cx="35"
      cy="25"
      r="2"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
    />
    <motion.circle
      cx="45"
      cy="25"
      r="2"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 1.4, ease: "easeOut" }}
    />
  </AnimatedSVG>
);

// Creative Studio Icon
export const CreativeStudioIcon = () => (
  <AnimatedSVG className="text-yellow-400">
    <motion.path
      d="M10 50 L50 10 L90 50 L50 90 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0, scale: 0 }}
      animate={{ pathLength: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M35 35 L65 65"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
    />
    <motion.path
      d="M65 35 L35 65"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="30"
      cy="30"
      r="3"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 1.8, ease: "easeOut" }}
    />
    <motion.circle
      cx="70"
      cy="30"
      r="3"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 2, ease: "easeOut" }}
    />
    <motion.circle
      cx="70"
      cy="70"
      r="3"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 2.2, ease: "easeOut" }}
    />
    <motion.circle
      cx="30"
      cy="70"
      r="3"
      fill="currentColor"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 2.4, ease: "easeOut" }}
    />
  </AnimatedSVG>
);

export default AnimatedSVG;
