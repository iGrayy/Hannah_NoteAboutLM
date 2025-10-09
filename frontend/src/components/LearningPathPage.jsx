import React from 'react';
import { ArrowLeft } from 'lucide-react';

const LearningPathPage = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white">Learning Path</h2>
          </div>
        </div>
        <p className="text-sm text-gray-400">Chọn lộ trình học tập phù hợp với trình độ của bạn</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-20">
            <h3 className="text-2xl font-semibold text-white mb-4">Learning Path</h3>
            <p className="text-gray-400 mb-8">Chức năng đang được phát triển...</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
