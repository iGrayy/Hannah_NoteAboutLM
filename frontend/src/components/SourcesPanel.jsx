import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, Plus, Search, Upload, FileText, ChevronDown } from 'lucide-react';

const SourcesPanel = ({
  sources,
  activeSourceId,
  onSelectSource,
  onDeleteSource,
  onAddSource,
  searchQuery,
  onSearchChange,
  onTogglePanel
}) => {
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
    const title = prompt('Nhập tiêu đề nguồn:');
    if (title) {
      const content = prompt('Nhập nội dung nguồn:');
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
          <h2 className="text-lg font-semibold text-white">Nguồn</h2>
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
            onClick={handleAddSource}
            className="flex-1 notebook-button flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>
          <label className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Tải lên
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx,.md"
            />
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {sources.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-300 mb-2">Các nguồn đã lưu sẽ xuất hiện ở đây.</p>
            <p className="text-sm text-gray-400 mb-4">
              Nhấp vào 'Thêm nguồn' ở trên để thêm tệp PDF, trang web, văn bản, video hoặc tệp âm thanh.
              Hoặc nhập một tệp trực tiếp từ Google Drive.
            </p>
            <button
              onClick={handleAddSource}
              className="notebook-button flex items-center gap-2 mx-auto"
            >
              <Upload className="w-4 h-4" />
              Thêm nguồn
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
                      {source.title || 'Nguồn không có tiêu đề'}
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
    </div>
  );
};

export default SourcesPanel;
