import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

// This is the original ConversationPanel component using Tailwind CSS.

export const ConversationPanel: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: 'Hello! How can I help you with your software engineering project today?' },
    { id: '2', role: 'user', content: 'I need to understand the difference between Agile and Scrum.' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: newMessage.trim()
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col p-4">
      {/* Message Display Area */}
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
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
