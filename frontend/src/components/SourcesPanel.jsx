import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Plus, Search, Upload, FileText, ChevronDown, X, Sparkles, Bot, Link as LinkIcon, Youtube, Clipboard, Folder } from 'lucide-react';

const SourcesPanel = ({
  sources,
  activeSourceId,
  onSelectSource,
  onDeleteSource,
  onAddSource,
  searchQuery,
  onSearchChange,
  onTogglePanel,
  conversationsMeta = [],
  activeConversationId,
  onSelectConversation,
  onDeleteConversation
}) => {
  const [showExplore, setShowExplore] = useState(false);
  const [exploreQuery, setExploreQuery] = useState('');
  const [sourceType, setSourceType] = useState('web');
  const fileInputRef = useRef(null);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hôm nay';
    if (diffDays === 2) return 'Hôm qua';
    if (diffDays <= 7) return `${diffDays - 1} ngày trước`;

    return date.toLocaleDateString('vi-VN');
  };

  const getPreview = (content) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  const handleAddSource = () => {
    const title = prompt('Nhập tiêu đề tài liệu:');
    if (title) {
      const content = prompt('Nhập nội dung tài liệu:');
      const newSource = {
        title: title,
        content: content || 'Nội dung trống',
        type: 'text'
      };
      onAddSource(newSource);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const newSource = {
          title: file.name,
          content: content,
          type: file.type.includes('image') ? 'image' : 'file'
        };
        onAddSource(newSource);
      };
      reader.readAsText(file);
    }
  };


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">{conversationsMeta.length > 0 ? 'Cuộc trò chuyện' : 'Tài liệu'}</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white">
              <ChevronDown className="w-4 h-4" />
            </button>
            <button onClick={onTogglePanel} className="text-gray-400 hover:text-white">
              {/* simple X icon using SVG to avoid new imports */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowExplore(true)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Cuộc trò chuyện mới
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {conversationsMeta.length === 0 ? (
          <div className="p-6 text-center">
            <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-300 mb-2">Bắt đầu cuộc trò chuyện với AI</p>
            <p className="text-sm text-gray-400 mb-4">
              Đặt câu hỏi về kiến thức bạn quan tâm hoặc khám phá tệp tư liệu để trò chuyện sâu hơn.
            </p>
            <button
              onClick={() => setShowExplore(true)}
              className="notebook-button flex items-center gap-2 mx-auto"
              title="Cuộc trò chuyện mới"
            >
              <Plus className="w-4 h-4" />
              Cuộc trò chuyện mới
            </button>
          </div>
        ) : (
          <div className="p-2">
            {conversationsMeta.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`source-item ${activeConversationId === conv.id ? 'active' : ''}`}
                onClick={() => onSelectConversation && onSelectConversation(conv.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {conv.title || 'Cuộc trò chuyện'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(conv.createdAt)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation && onDeleteConversation(conv.id);
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                    title="Xóa cuộc trò chuyện"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Sources Modal */}
      <AnimatePresence>
        {showExplore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowExplore(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-8 w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-lg">Tải tệp lên</span>
                </div>
                <button onClick={() => setShowExplore(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dropzone */}
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-14 text-center mb-8 bg-gray-900/40">
                <div className="w-16 h-16 mx-auto mb-5 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-white font-medium text-lg">Tải tệp lên</div>
                <div className="text-gray-400 mt-2">Kéo và thả hoặc <button onClick={() => fileInputRef.current?.click()} className="text-blue-400 hover:text-blue-300 underline">chọn tệp</button> để tải lên</div>
                <div className="text-xs text-gray-500 mt-4">Các loại tệp được hỗ trợ: PDF, .txt, Markdown, Âm thanh (ví dụ: mp3)</div>
                <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md,.mp3,.wav,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              </div>

              {/* Source options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Google Workspace */}
                <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-300 font-medium mb-3">Google Workspace</div>
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">
                    <Folder className="w-4 h-4" />
                    Google Drive
                  </button>
                </div>
                {/* Links */}
                <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-300 font-medium mb-3">Liên kết</div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setExploreQuery('https://')} className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">
                      <LinkIcon className="w-4 h-4" />
                      Trang web
                    </button>
                    <button onClick={() => setExploreQuery('https://youtube.com/')} className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </button>
                  </div>
                </div>
                {/* Paste text */}
                <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-300 font-medium mb-3">Dán văn bản</div>
                  <button onClick={() => setSourceType('paste')} className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg">
                    <Clipboard className="w-4 h-4" />
                    Văn bản đã sao chép
                  </button>
                </div>
              </div>

              {/* Paste area when selected */}
              {sourceType === 'paste' && (
                <div className="mb-6">
                  <textarea value={exploreQuery} onChange={(e) => setExploreQuery(e.target.value)} placeholder="Dán nội dung văn bản của bạn vào đây" className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
              )}

              {/* Footer actions and quota */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">Giới hạn tệp</span>
                  <div className="w-56 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-6 bg-blue-500" />
                  </div>
                  <span className="text-gray-400 text-sm">1/50</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowExplore(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">Hủy</button>
                  <button onClick={() => setShowExplore(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Xong</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourcesPanel;
