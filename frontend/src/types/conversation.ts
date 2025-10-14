import { BaseEntity } from './common';

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageType = 'text' | 'image' | 'file' | 'code' | 'artifact';

export interface Message extends BaseEntity {
  role: MessageRole;
  content: string;
  type: MessageType;
  attachments?: MessageAttachment[];
  metadata?: MessageMetadata;
  conversationId: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface MessageMetadata {
  tokens?: number;
  model?: string;
  temperature?: number;
  processingTime?: number;
  sources?: string[];
}

export interface Conversation extends BaseEntity {
  title: string;
  messages: Message[];
  metadata?: ConversationMetadata;
  isActive?: boolean;
}

export interface ConversationMetadata {
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  totalTokens?: number;
  messageCount?: number;
  lastActivity?: string;
}

export interface CreateConversationRequest {
  title: string;
  systemPrompt?: string;
  metadata?: Partial<ConversationMetadata>;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  type?: MessageType;
  attachments?: File[];
  metadata?: Partial<MessageMetadata>;
}

export interface ConversationSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}

export type ChatStyle = 'default' | 'creative' | 'precise' | 'balanced';
export type AnswerLength = 'short' | 'default' | 'long' | 'detailed';
