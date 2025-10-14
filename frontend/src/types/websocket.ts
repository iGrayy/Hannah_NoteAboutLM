import { Message } from './conversation';

export type WebSocketStatus = 'connecting' | 'open' | 'closing' | 'closed' | 'error';

export interface WebSocketState {
  status: WebSocketStatus;
  error?: Event | Error;
}

export type WebSocketEvent = 'message' | 'open' | 'close' | 'error';

export interface WebSocketMessage<T = any> {
  event: string;
  payload: T;
  timestamp: string;
}

export interface WebSocketSendMessage extends WebSocketMessage<Message> {
  event: 'sendMessage';
}

export interface WebSocketReceiveMessage extends WebSocketMessage<Message> {
  event: 'receiveMessage';
}

export interface WebSocketTypingIndicator {
  userId: string;
  isTyping: boolean;
}

export interface WebSocketTypingEvent extends WebSocketMessage<WebSocketTypingIndicator> {
  event: 'typing';
}

export interface WebSocketErrorEvent extends WebSocketMessage<string> {
  event: 'error';
}

export type WebSocketIncomingEvent = WebSocketReceiveMessage | WebSocketTypingEvent | WebSocketErrorEvent;

export type WebSocketOutgoingEvent = WebSocketSendMessage | WebSocketTypingEvent;

