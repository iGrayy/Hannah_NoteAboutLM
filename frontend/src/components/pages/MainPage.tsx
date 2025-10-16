import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationHistorySidebar from '../sidebars/ConversationHistorySidebar';
import ConversationPanel from '../panels/ConversationPanel';
import { StudioPanel } from '../panels/StudioPanel';

// This is the original MainPage component using Tailwind CSS and Framer Motion.

interface Conversation {
  id: string;
  title?: string;
  createdAt: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface MainPageProps {
  isHistoryOpen: boolean;
  isStudioOpen: boolean;
  onCloseHistory: () => void;
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => Promise<void>;
  onStartNewConversation: () => Promise<void>;
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
}

export const MainPage: React.FC<MainPageProps> = ({
  isHistoryOpen,
  isStudioOpen,
  onCloseHistory,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onStartNewConversation,
  messages,
  onSendMessage,
}) => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel - Conversation History */}
      <ConversationHistorySidebar
        isOpen={isHistoryOpen}
        onClose={onCloseHistory}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
        onStartNewConversation={onStartNewConversation}
      />

      {/* Center Panel - Conversation */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="flex-1 flex flex-col bg-gray-900"
      >
        <ConversationPanel
          messages={messages}
          currentConversation={conversations.find(c => c.id === activeConversationId)}
          onSendMessage={onSendMessage}
        />
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
