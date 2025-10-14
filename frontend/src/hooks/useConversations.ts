import { useState, useEffect, useCallback } from 'react';
import { 
  Conversation, 
  Message, 
  LoadingState, 
  SendMessageRequest 
} from '../types';
import { apiService, storageService } from '../services';

interface UseConversationsReturn {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: Message[];
  loading: LoadingState;
  error: string | null;
  loadConversations: () => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (request: Omit<SendMessageRequest, 'conversationId'>) => Promise<void>;
  createConversation: (title: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
}

export const useConversations = (): UseConversationsReturn => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // Load conversations from storage on initial mount
  useEffect(() => {
    const savedConvs = storageService.getConversations();
    if (savedConvs && savedConvs.length > 0) {
      setConversations(savedConvs);
      if (!activeConversationId) {
        setActiveConversationId(savedConvs[0].id);
      }
    }
    // loadConversations(); // Fetch latest from API - Temporarily disabled
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversationId) {
      loadMessages(activeConversationId);
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  // Persist conversations to storage
  useEffect(() => {
    storageService.setConversations(conversations);
  }, [conversations]);

  // Persist messages to storage
  useEffect(() => {
    if (activeConversationId) {
      storageService.setConversationMessages(activeConversationId, messages);
    }
  }, [messages, activeConversationId]);

  const handleApiCall = async <T>(
    apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>
  ) => {
    setLoading('loading');
    setError(null);
    try {
      const response = await apiCall();
      if (response.success) {
        setLoading('success');
        return response.data;
      } else {
        setError(response.error || 'An unknown error occurred');
        setLoading('error');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setLoading('error');
    }
    return undefined;
  };

  const loadConversations = useCallback(async () => {
    const data = await handleApiCall(apiService.getConversations);
    if (data) {
      setConversations(data);
    }
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    const savedMessages = storageService.getConversationMessages(conversationId);
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    }

    const data = await handleApiCall(() => apiService.getMessages(conversationId));
    if (data) {
      setMessages(data);
    }
  }, []);

  const sendMessage = useCallback(async (request: Omit<SendMessageRequest, 'conversationId'>) => {
    if (!activeConversationId) return;
    
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId: activeConversationId,
      role: 'user',
      content: request.content,
      type: request.type || 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMessage]);

    const data = await handleApiCall(() => 
      apiService.sendMessage({ ...request, conversationId: activeConversationId })
    );

    if (data) {
      // Replace optimistic message with actual message from server
      setMessages(prev => prev.map(msg => msg.id === optimisticMessage.id ? data : msg));
    } else {
      // Remove optimistic message on failure
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
    }
  }, [activeConversationId]);

  const createConversation = useCallback(async (title: string) => {
    const data = await handleApiCall(() => apiService.createConversation({ title }));
    if (data) {
      setConversations(prev => [data, ...prev]);
      setActiveConversationId(data.id);
    }
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    const data = await handleApiCall(() => apiService.deleteConversation(id));
    if (data !== undefined) {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(conversations.length > 1 ? conversations[0].id : null);
      }
    }
  }, [activeConversationId, conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    messages,
    loading,
    error,
    loadConversations,
    loadMessages,
    sendMessage,
    createConversation,
    deleteConversation,
  };
};
