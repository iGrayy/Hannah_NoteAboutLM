import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { MessageBubble, Message } from '../common/MessageBubble';

// This is the original ConversationPanel component using Tailwind CSS.

export const ConversationPanel: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! How can I help you with your software engineering project today?' },
    { id: '2', sender: 'user', text: 'I need to understand the difference between Agile and Scrum.' },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket('ws://localhost:8765');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages(prev => [...prev, receivedMessage]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup on component unmount
    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current?.readyState === WebSocket.OPEN) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage.trim(),
      };
      // Send message to WebSocket server
      ws.current.send(JSON.stringify(userMessage));

      // Add user message to the state to display it immediately
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col p-4">
      {/* Message Display Area */}
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <form onSubmit={handleSendMessage} className="relative">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask a follow-up..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        />
        <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
          <Paperclip size={20} />
        </button>
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
