import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SourcesPanel } from '../panels/SourcesPanel';
import { ConversationPanel } from '../panels/ConversationPanel';
import { StudioPanel } from '../panels/StudioPanel';

// This is the original MainPage component using Tailwind CSS and Framer Motion.

interface MainPageProps {
  isSourcesOpen: boolean;
  isStudioOpen: boolean;
}

export const MainPage: React.FC<MainPageProps> = ({ isSourcesOpen, isStudioOpen }) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Sources */}
      <AnimatePresence>
        {isSourcesOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col"
          >
            <SourcesPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Panel - Conversation */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="flex-1 flex flex-col bg-gray-900"
      >
        <ConversationPanel />
      </motion.div>

      {/* Right Panel - Studio */}
      <AnimatePresence>
        {isStudioOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col"
          >
            <StudioPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
