import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, ArrowUp, Bot, User, Filter } from 'lucide-react';

const ConversationPanel = ({ source, conversations, onUpdateConversations }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    onUpdateConversations(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Dựa trên nguồn: "${source?.title || ''}" - ${source?.content || ''}\n\nCâu hỏi: ${inputValue}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.text,
        timestamp: new Date()
      };

      onUpdateConversations(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu. Vui lòng đảm bảo server backend đang chạy và API key đã được cấu hình.',
        timestamp: new Date()
      };
      onUpdateConversations(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!source) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Cuộc trò chuyện</h2>
            <button className="text-gray-400 hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ArrowUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium text-white mb-2">Thêm một nguồn để bắt đầu</h3>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Tải nguồn lên
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Tải một nguồn lên để bắt đầu"
              className="flex-1 notebook-input"
              disabled
            />
            <span className="text-sm text-gray-400">0 nguồn</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200" disabled>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Cuộc trò chuyện</h2>
            {source && (
              <p className="text-sm text-gray-400">Đang thảo luận về: {source.title}</p>
            )}
          </div>
          <button className="text-gray-400 hover:text-white">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Source Content Preview */}
      {source && (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h3 className="text-sm font-medium text-white mb-2">Nội dung nguồn:</h3>
          <div className="text-sm text-gray-300 max-h-32 overflow-y-auto">
            {source.content.length > 200
              ? source.content.substring(0, 200) + '...'
              : source.content
            }
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {conversations.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-white'
                  }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && (
                    <Bot className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User className="w-4 h-4 mt-0.5 text-blue-200 flex-shrink-0" />
                  )}
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                  {message.timestamp.toLocaleTimeString('vi-VN')}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-400 ml-2">AI đang suy nghĩ...</span>
              </div>
            </div>
          </motion.div>
        )}

        {conversations.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-300">Bắt đầu cuộc trò chuyện với AI</p>
            <p className="text-sm text-gray-400 mt-1">
              Đặt câu hỏi về nguồn của bạn hoặc sử dụng các công cụ Studio
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Đặt câu hỏi về nguồn của bạn..."
            className="flex-1 notebook-input"
            disabled={isLoading}
          />
          <span className="text-sm text-gray-400">1 nguồn</span>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
