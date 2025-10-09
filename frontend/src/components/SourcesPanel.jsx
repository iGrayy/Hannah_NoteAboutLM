import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Plus, Search, Upload, FileText, ChevronDown, X, Sparkles } from 'lucide-react';

const SourcesPanel = ({
  sources,
  activeSourceId,
  onSelectSource,
  onDeleteSource,
  onAddSource,
  searchQuery,
  onSearchChange,
  onTogglePanel,
  onNavigateToSubjects
}) => {
  const [showExplore, setShowExplore] = useState(false);
  const [exploreQuery, setExploreQuery] = useState('');
  const [sourceType, setSourceType] = useState('web');


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
          <h2 className="text-lg font-semibold text-white">Tài liệu</h2>
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
            onClick={onNavigateToSubjects}
            className="flex-1 notebook-button flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tài liệu
          </button>
          <button
            onClick={() => setShowExplore(true)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Khám phá
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {sources.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-300 mb-2">Các tài liệu đã lưu sẽ xuất hiện ở đây.</p>
            <p className="text-sm text-gray-400 mb-4">
              Nhấp vào 'Chọn tài liệu' ở trên để thêm tệp PDF, trang web, văn bản, video hoặc tệp âm thanh.
              Hoặc nhập một tệp trực tiếp từ Google Drive.
            </p>
            <button
              onClick={handleAddSource}
              className="notebook-button flex items-center gap-2 mx-auto"
            >
              <Upload className="w-4 h-4" />
              Chọn tài liệu
            </button>
          </div>
        ) : (
          <div className="p-2">
            {sources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`source-item ${activeSourceId === source.id ? 'active' : ''}`}
                onClick={() => onSelectSource(source.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {source.title || 'Tài liệu không có tiêu đề'}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {getPreview(source.content)}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(source.updatedAt)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSource(source.id);
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
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
              className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Khám phá các nguồn</h2>
                <button
                  onClick={() => setShowExplore(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-400" />
                  <Sparkles className="w-4 h-4 text-yellow-400 -ml-2 -mt-2" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Bạn quan tâm đến những chủ đề nào?
                </h3>
              </div>

              {/* Text Area */}
              <div className="mb-6">
                <textarea
                  value={exploreQuery}
                  onChange={(e) => setExploreQuery(e.target.value)}
                  placeholder="Mô tả nội dung bạn muốn tìm hiểu hoặc nhấp vào 'Thử khám phá' để khám phá một chủ đề mới."
                  className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Source Type Selection */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Tìm các nguồn từ:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sourceType"
                      value="web"
                      checked={sourceType === 'web'}
                      onChange={(e) => setSourceType(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Web</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sourceType"
                      value="google-drive"
                      checked={sourceType === 'google-drive'}
                      onChange={(e) => setSourceType(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Google Drive</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Random exploration functionality
                    const randomTopics = [
                      "Công nghệ AI và Machine Learning",
                      "Lịch sử thế giới cổ đại",
                      "Khoa học vũ trụ và thiên văn học",
                      "Nghệ thuật và văn hóa",
                      "Y học và sức khỏe",
                      "Kinh tế và tài chính"
                    ];
                    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
                    setExploreQuery(randomTopic);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <Sparkles className="w-4 h-4" />
                  <span>Xem thông tin thú vị ngẫu nhiên</span>
                </button>
                <button
                  onClick={() => {
                    if (exploreQuery.trim()) {
                      // Handle explore submission
                      console.log('Exploring:', exploreQuery, 'from:', sourceType);
                      setShowExplore(false);
                    }
                  }}
                  disabled={!exploreQuery.trim()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Gửi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourcesPanel;
