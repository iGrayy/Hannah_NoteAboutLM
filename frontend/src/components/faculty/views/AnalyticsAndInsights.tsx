import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';

const AnalyticsAndInsights: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Phân tích & Thống kê</h1>
        <p className="text-slate-400 mt-2">Theo dõi hiệu suất giảng dạy và xu hướng học tập của sinh viên.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Questions */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20">
              <BarChart size={24} className="text-blue-400" />
            </div>
            Câu hỏi phổ biến nhất
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-slate-700/30 rounded-xl">
              <p className="text-slate-200 font-medium">1. Sự khác biệt giữa `let`, `const`, và `var`?</p>
              <p className="text-blue-400 text-sm mt-1">120 lượt hỏi</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-xl">
              <p className="text-slate-200 font-medium">2. React Hook là gì?</p>
              <p className="text-blue-400 text-sm mt-1">98 lượt hỏi</p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded-xl">
              <p className="text-slate-200 font-medium">3. Làm thế nào để deploy một trang web React?</p>
              <p className="text-blue-400 text-sm mt-1">75 lượt hỏi</p>
            </div>
          </div>
        </div>

        {/* Knowledge Gaps */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-500/20">
              <TrendingUp size={24} className="text-yellow-400" />
            </div>
            Knowledge Gaps nổi bật
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <p className="text-yellow-400 font-medium">Concurrency trong Python</p>
              <p className="text-slate-400 text-sm mt-1">Tỷ lệ trả lời sai cao</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <p className="text-yellow-400 font-medium">Quản lý state trong React</p>
              <p className="text-slate-400 text-sm mt-1">Nhiều câu hỏi lặp lại</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <p className="text-yellow-400 font-medium">Môn học: CS101</p>
              <p className="text-slate-400 text-sm mt-1">Tỷ lệ hoàn thành quiz thấp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-slate-800/50 p-6 rounded-2xl h-96 flex items-center justify-center border border-slate-700/50 shadow-xl">
        <div className="text-center text-slate-500">
          <div className="p-4 rounded-xl bg-indigo-500/20 inline-block mb-4">
            <PieChart size={48} className="text-indigo-400" />
          </div>
          <p className="font-semibold text-lg">Biểu đồ tỷ lệ tham gia</p>
          <p className="text-sm">(Quiz/Flashcard/Mindmap)</p>
          <p className="text-xs mt-2 text-slate-600">(Đang phát triển)</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndInsights;

