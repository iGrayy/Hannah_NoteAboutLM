import { useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketStatus, WebSocketState, WebSocketOutgoingEvent } from '../types';
import { getWebSocketService } from '../services';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  reconnectOnClose?: boolean;
}

interface UseWebSocketReturn {
  status: WebSocketStatus;
  error: Event | Error | null;
  send: (event: WebSocketOutgoingEvent) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback: (data: any) => void) => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}): UseWebSocketReturn => {
  const { url, autoConnect = false, reconnectOnClose = true } = options;
  const [state, setState] = useState<WebSocketState>({
    status: 'closed',
    error: null,
  });

  const wsServiceRef = useRef<ReturnType<typeof getWebSocketService> | null>(null);
  const listenersRef = useRef<Map<string, (data: any) => void>>(new Map());

  // Initialize WebSocket service
  useEffect(() => {
    if (url && !wsServiceRef.current) {
      try {
        wsServiceRef.current = getWebSocketService(url);
        
        // Set up status listener
        wsServiceRef.current.on('status', (status: WebSocketStatus) => {
          setState(prev => ({ ...prev, status }));
        });

        // Set up error listener
        wsServiceRef.current.on('error', (error: Event | Error) => {
          setState(prev => ({ ...prev, error }));
        });

        // Auto connect if enabled
        if (autoConnect) {
          wsServiceRef.current.connect().catch(console.error);
        }
      } catch (error) {
        console.error('Failed to initialize WebSocket service:', error);
        setState(prev => ({ 
          ...prev, 
          status: 'error', 
          error: error as Error 
        }));
      }
    }
  }, [url, autoConnect]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (wsServiceRef.current) {
        // Remove all listeners
        listenersRef.current.forEach((callback, event) => {
          wsServiceRef.current?.off(event, callback);
        });
        listenersRef.current.clear();
        
        // Disconnect if connected
        wsServiceRef.current.disconnect();
      }
    };
  }, []);

  const send = useCallback((event: WebSocketOutgoingEvent) => {
    if (wsServiceRef.current) {
      wsServiceRef.current.send(event);
    } else {
      console.warn('WebSocket service not initialized');
    }
  }, []);

  const connect = useCallback(async () => {
    if (wsServiceRef.current) {
      try {
        await wsServiceRef.current.connect();
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        setState(prev => ({ 
          ...prev, 
          status: 'error', 
          error: error as Error 
        }));
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsServiceRef.current) {
      wsServiceRef.current.disconnect();
    }
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (wsServiceRef.current) {
      wsServiceRef.current.on(event, callback);
      listenersRef.current.set(event, callback);
    }
  }, []);

  const off = useCallback((event: string, callback: (data: any) => void) => {
    if (wsServiceRef.current) {
      wsServiceRef.current.off(event, callback);
      listenersRef.current.delete(event);
    }
  }, []);

  return {
    status: state.status,
    error: state.error,
    send,
    connect,
    disconnect,
    on,
    off,
  };
};
