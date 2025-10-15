import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { DocumentAnalysisIcon, ConversationIcon, CreativeStudioIcon } from './AnimatedSVG';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  iconType?: 'document' | 'conversation' | 'creative';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, imageUrl, reverse = false, iconType = 'document' }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'document':
        return <DocumentAnalysisIcon />;
      case 'conversation':
        return <ConversationIcon />;
      case 'creative':
        return <CreativeStudioIcon />;
      default:
        return <DocumentAnalysisIcon />;
    }
  };
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const card = imageRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -25;
    const rotateYValue = (mouseX / (rect.width / 2)) * 25;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleImageMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className={`container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
        <motion.div
          style={{ y: yText }}
          variants={textVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`text-left ${reverse ? 'md:order-2' : ''}`}>
          <div className="mb-6 flex justify-start">
            {getIcon()}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-gray-400">
            {description}
          </p>
        </motion.div>
        <motion.div
          ref={imageRef}
          style={{ y: yImage }}
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 35px 70px -12px rgba(0, 0, 0, 0.4)',
            rotateZ: [0, -2, 2, -1, 1, 0],
            transition: {
              rotateZ: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }
          }}
          className={`flex justify-center items-center ${reverse ? 'md:order-1' : ''} cursor-pointer`}>
          <div
            style={{
              transform: `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg shadow-2xl max-w-lg w-full h-auto transition-all duration-500 hover:shadow-blue-500/20"
            />
            {/* 3D Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
