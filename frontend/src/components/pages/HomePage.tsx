import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, BrainCircuit, ShieldCheck } from 'lucide-react';
import FeatureSection from './FeatureSection';
import BenefitCard from './BenefitCard';
import HeroBackground from './HeroBackground';

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
      initial={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      }}
      animate={{
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  ));
  return <>{particles}</>;
};

// Animated geometric shapes
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large rotating circle */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 border border-blue-500/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Medium rotating square */}
      <motion.div
        className="absolute top-1/4 -left-20 w-40 h-40 border border-purple-500/10 rotate-45"
        animate={{ rotate: 405 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Small floating triangle */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-cyan-500/10"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hexagon */}
      <motion.div
        className="absolute top-3/4 left-1/4 w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 transform rotate-45 rounded-lg" />
      </motion.div>
    </div>
  );
};

// Animated gradient orbs
const GradientOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blue orb */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Medium purple orb */}
      <motion.div
        className="absolute top-1/3 -right-24 w-48 h-48 bg-gradient-to-r from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small cyan orb */}
      <motion.div
        className="absolute bottom-1/4 -left-16 w-32 h-32 bg-gradient-to-r from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

interface HomePageProps {
  onStartBlankConversation: () => void;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const Navbar: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className="absolute top-0 left-0 right-0 p-4 bg-transparent z-10"
  >
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-4xl font-bold">
        <span
          className="font-extrabold"
          style={{
            background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 25%, #f9a8d4 50%, #fda4af 75%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(165, 180, 252, 0.4)',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
            letterSpacing: '0.05em',
            transform: 'perspective(500px) rotateX(15deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          Hannah
        </span>
      </div>
      <motion.button
        onClick={onStart}
        className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
        <ArrowRight size={16} />
      </motion.button>
    </div>
  </motion.nav>
);

const HeroSection: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 animate-gradient-xy">
    <HeroBackground />
    {/* Gradient Overlay to highlight text content */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/80 z-10" />
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/50 z-10" />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-20 p-4" // Ensure content is above the background
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
        style={{ transform: 'translateZ(100px)' }}
        whileHover={{
          scale: 1.02,
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}
      >
        Unlock Your Learning Potential
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        style={{ transform: 'translateZ(75px)' }}
      >
        Hannah is your personal AI research assistant, designed to help you analyze documents, generate ideas, and master new topics faster than ever before.
      </motion.p>
      <motion.div
        variants={itemVariants}
        style={{ transform: 'translateZ(50px)' }}
      >
<motion.button
  onClick={onStart}
  className="relative text-lg font-bold py-4 px-10 rounded-full 
             bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
             text-white shadow-lg 
             hover:from-white hover:via-sky-100 hover:to-blue-200 
             hover:text-gray-900 hover:shadow-cyan-300/60 
             transition-all duration-300"
  whileHover={{ scale: 1.1, y: -5 }}
  whileTap={{ scale: 0.95 }}
  style={{
    transformStyle: 'preserve-3d',
    boxShadow:
      '0 10px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(59, 130, 246, 0.5)',
  }}
>
  <span className="relative z-10">Start a Conversation</span>
</motion.button>

      </motion.div>
    </motion.div>
  </section>
);

export const HomePage: React.FC<HomePageProps> = ({ onStartBlankConversation }) => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar onStart={onStartBlankConversation} />
      <HeroSection onStart={onStartBlankConversation} />

      <div id="features" className="bg-gray-800 py-1">
        <FeatureSection
          title="Intelligent Document Analysis"
          description="Upload your documents, PDFs, or even link to web pages. Hannah's AI will read and understand the content, preparing it for deep analysis and conversation."
          imageUrl="https://placehold.co/600x400/1e293b/a5b4fc"
          reverse={false}
        />
        <FeatureSection
          title="Conversational Learning"
          description="Chat with your documents as if you were talking to an expert. Ask complex questions, get summaries, and find key information in seconds. Learning has never been more interactive."
          imageUrl="https://placehold.co/600x400/1e293b/6ee7b7"
          reverse={true}
        />
        <FeatureSection
          title="Creative Studio Tools"
          description="Go beyond simple Q&A. Use the Studio to generate mind maps, create flashcards, build quizzes, and even draft reports based on your source materials. Transform information into knowledge."
          imageUrl="https://placehold.co/600x400/1e293b/fde047"
          reverse={false}
        />
      </div>

      <section id="benefits" className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background effects for benefits section */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-lg"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-10 w-6 h-6 bg-cyan-400/30 rounded-full"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-10 w-4 h-4 bg-yellow-400/30 rounded-full"
            animate={{
              y: [20, -20, 20],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hannah?</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">Move faster, learn deeper, and unlock new insights with a powerful AI assistant by your side.</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={Zap}
            title="Blazing Fast Insights"
            description="Get answers from your documents in seconds, not hours. Our AI processes information at lightning speed."
          />
          <BenefitCard
            icon={BrainCircuit}
            title="Deeper Understanding"
            description="Go beyond surface-level knowledge. Hannah helps you connect ideas, uncover hidden themes, and truly understand your subject matter."
          />
          <BenefitCard
            icon={ShieldCheck}
            title="Secure & Private"
            description="Your data is yours alone. All analysis is performed in a secure environment, ensuring your privacy and confidentiality."
          />
        </div>
      </section>

      <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of learners who are already using Hannah to unlock their potential and accelerate their research.
          </p>
<motion.button
  onClick={onStartBlankConversation}
  className="relative text-lg font-bold py-4 px-10 rounded-full 
             bg-gradient-to-r from-white via-gray-100 to-gray-300 
             text-gray-900 shadow-lg
             hover:from-gray-700 hover:via-gray-800 hover:to-black 
             hover:text-white hover:shadow-gray-500/60
             transition-all duration-300"
  whileHover={{ scale: 1.1, y: -5 }}
  whileTap={{ scale: 0.95 }}
  style={{
    transformStyle: 'preserve-3d',
    boxShadow:
      '0 10px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(255, 255, 255, 0.3)',
  }}
>
  <span className="relative z-10">Start Your Journey Today</span>
</motion.button>
        </motion.div>
      </section>
    </div>
  );
}
