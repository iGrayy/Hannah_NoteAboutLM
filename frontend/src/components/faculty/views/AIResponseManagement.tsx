import React from 'react';
import { Flag, Edit, CheckCircle, PlusCircle, Search } from 'lucide-react';

const AIResponseManagement: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Quản lý phản hồi AI</h1>
          <p className="text-slate-400 mt-2">Review, chỉnh sửa và cải thiện các câu trả lời của AI.</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
          <PlusCircle size={20} />
          <span>Thêm phản hồi tùy chỉnh</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select className="bg-slate-700/80 p-2 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Tất cả trạng thái</option>
            <option>Cần review</option>
            <option>Đã duyệt</option>
          </select>
        </div>
        <div className="relative">
          <input type="text" placeholder="Tìm kiếm hội thoại..." className="bg-slate-700/80 p-2 pl-10 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-6">
        {/* Mock Data */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400">Sinh viên: Nguyễn Văn A</p>
              <p className="font-semibold text-lg text-slate-100 mt-1">Câu hỏi: "Sự khác biệt giữa `let`, `const`, và `var` trong JavaScript?"</p>
            </div>
            <span className="flex items-center gap-2 text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full text-sm font-medium"><Flag size={16} /> Cần review</span>
          </div>
          <div className="mt-4 p-4 bg-slate-700/30 rounded-xl">
            <p className="text-sm text-slate-300 font-medium mb-2">Phản hồi của AI:</p>
            <p className="text-slate-200 leading-relaxed">`var` có scope toàn cục hoặc hàm, trong khi `let` và `const` có scope khối. `let` có thể được gán lại giá trị, còn `const` thì không...</p>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg hover:bg-green-500/20 transition-colors"><CheckCircle size={18} /> Duyệt</button>
            <button className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors"><Edit size={18} /> Chỉnh sửa & Duyệt</button>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400">Sinh viên: Trần Thị B</p>
              <p className="font-semibold text-lg text-slate-100 mt-1">Câu hỏi: "React Hook là gì?"</p>
            </div>
            <span className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium"><CheckCircle size={16} /> Đã duyệt</span>
          </div>
          <div className="mt-4 p-4 bg-slate-700/30 rounded-xl">
            <p className="text-sm text-slate-300 font-medium mb-2">Phản hồi của AI:</p>
            <p className="text-slate-200 leading-relaxed">React Hook là các hàm cho phép bạn "móc" vào state và các tính năng lifecycle của React từ các function component.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResponseManagement;

