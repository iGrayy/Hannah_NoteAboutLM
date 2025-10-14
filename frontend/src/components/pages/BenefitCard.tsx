import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LucideProps } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXVal = e.clientX - centerX;
    const mouseYVal = e.clientY - centerY;

    const rotateXValue = (mouseYVal / (rect.height / 2)) * -10;
    const rotateYValue = (mouseXVal / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
      className="relative p-8 rounded-xl text-center cursor-pointer overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content with 3D transform */}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
        <motion.div
          className="inline-block p-4 rounded-full mb-4 backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg"
          whileHover={{
            scale: 1.1,
            rotateY: 360,
          }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
          }}
        >
          <Icon className="text-white drop-shadow-lg" size={32} />
        </motion.div>
        <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{title}</h3>
        <p className="text-gray-200 drop-shadow-md">{description}</p>
      </div>
    </motion.div>
  );
};

export default BenefitCard;
