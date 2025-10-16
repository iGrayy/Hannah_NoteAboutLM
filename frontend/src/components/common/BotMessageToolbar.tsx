import React from 'react';
import { Sparkles, Search, Image } from 'lucide-react';

interface BotMessageToolbarProps {
  onAction: (action: 'simplify' | 'goDeeper' | 'getImages') => void;
}

export const BotMessageToolbar: React.FC<BotMessageToolbarProps> = ({ onAction }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
      <h4 className="font-semibold text-white mb-4">Khám phá nội dung liên quan</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => onAction('simplify')}
          className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg hover:bg-green-900/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h5 className="font-medium text-green-300">Đơn giản</h5>
            <p className="text-xs text-green-200/80">Tài liệu cơ bản và nguồn học thiết yếu</p>
          </div>
        </button>

        <button
          onClick={() => onAction('goDeeper')}
          className="flex items-center gap-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:bg-blue-900/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h5 className="font-medium text-blue-300">Tìm hiểu sâu hơn</h5>
            <p className="text-xs text-blue-200/80">Tài liệu chuyên sâu và FAQ chi tiết</p>
          </div>
        </button>

        <button
          onClick={() => onAction('getImages')}
          className="flex items-center gap-3 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h5 className="font-medium text-purple-300">Lấy hình ảnh</h5>
            <p className="text-xs text-purple-200/80">Hình ảnh và infographic minh họa</p>
          </div>
        </button>
      </div>
    </div>
  );
};
