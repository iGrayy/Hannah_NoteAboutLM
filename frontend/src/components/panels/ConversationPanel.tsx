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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage.trim()
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Simulate assistant response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Agile is a project management philosophy, while Scrum is a specific Agile framework to implement it. Think of Agile as the diet plan and Scrum as one of the recipes.'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
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
