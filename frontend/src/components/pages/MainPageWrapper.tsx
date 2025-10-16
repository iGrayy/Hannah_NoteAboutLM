import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../layout/Header';
import { MainPage } from './MainPage';
import { ProfileModal } from '../common/ProfileModal';
import { useAuth } from '../../contexts/AuthContext';

interface MainPageWrapperProps {
  conversations: any[];
  activeConversationId: string | undefined;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => Promise<void>;
  onStartNewConversation: (options?: { title?: string }) => Promise<any>;
  onSendMessage: (text: string, conversationIdOverride?: string) => Promise<void>;
}

const MainPageWrapper: React.FC<MainPageWrapperProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onStartNewConversation,
  onSendMessage,
}) => {
  const { isAuthenticated, logout } = useAuth();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hasCreatedConversation = useRef(false);

  // Find the active conversation's messages using useMemo to ensure proper re-rendering
  const activeConversationMessages = useMemo(() => {
    const messages = conversations.find(c => c.id === activeConversationId)?.messages || [];
    console.log('MainPageWrapper useMemo - activeConversationMessages:', {
      conversationsLength: conversations.length,
      activeConversationId,
      messagesLength: messages.length,
      conversations: conversations.map(c => ({ id: c.id, title: c.title, messagesCount: c.messages.length }))
    });
    return messages;
  }, [conversations, activeConversationId]);

  const handleNavigateHome = () => navigate('/');
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleOpenProfile = () => setIsProfileModalOpen(true);

  useEffect(() => {
    const handleCreateAndPrompt = async () => {
      if (location.state?.createNew && !hasCreatedConversation.current) {
        hasCreatedConversation.current = true; // Set flag immediately
        const prompt = location.state.prompt;

        // Create new conversation and get its data back
        const newConversation = await onStartNewConversation({ title: prompt });

        // If the conversation was created and there was a prompt, send it as the first message
        if (newConversation && prompt) {
          // Pass the new conversation's ID directly to ensure the message is sent to the correct place
          await onSendMessage(prompt, newConversation.id);
        }

        // Clear navigation state
        navigate(location.pathname, { replace: true, state: {} });
      }
    };

    handleCreateAndPrompt();
  }, [location.state, onStartNewConversation, onSendMessage, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Header
        onNavigateHome={handleNavigateHome}
        isHistoryOpen={isHistoryOpen}
        isStudioOpen={isStudioOpen}
        toggleHistory={() => setIsHistoryOpen(prev => !prev)}
        toggleStudio={() => setIsStudioOpen(prev => !prev)}
        isLoggedIn={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={() => {}}
        onProfileClick={handleOpenProfile}
      />
      <MainPage
        isHistoryOpen={isHistoryOpen}
        isStudioOpen={isStudioOpen}
        onCloseHistory={() => setIsHistoryOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
        onStartNewConversation={onStartNewConversation}
        messages={activeConversationMessages}
        onSendMessage={onSendMessage}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default MainPageWrapper;
