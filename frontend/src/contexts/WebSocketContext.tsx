import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useWebSocket } from '../hooks';
import { WebSocketStatus } from '../types';

interface WebSocketContextType {
  status: WebSocketStatus;
  error: Event | Error | null;
  send: (event: any) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
  url?: string;
  autoConnect?: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  url = 'ws://localhost:8000/ws',
  autoConnect = true,
}) => {
  const webSocket = useWebSocket({ url, autoConnect });

  const value: WebSocketContextType = {
    status: webSocket.status,
    error: webSocket.error,
    send: webSocket.send,
    connect: webSocket.connect,
    disconnect: webSocket.disconnect,
    on: webSocket.on,
    off: webSocket.off,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};
