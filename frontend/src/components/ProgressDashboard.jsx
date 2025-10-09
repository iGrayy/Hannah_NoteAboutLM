import React from 'react';
import { Trophy, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

const ProgressDashboard = () => {
  const stats = [
    { label: 'Khóa học hoàn thành', value: 4, icon: CheckCircle2 },
    { label: 'Sổ ghi chú đã tạo', value: 12, icon: BookOpen },
    { label: 'Kỹ năng cải thiện', value: 7, icon: Trophy },
    { label: 'Thời gian học (giờ)', value: 46, icon: Clock },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-white">Phân tích tiến độ</h3>
        <p className="text-xs text-gray-400">Thống kê học tập (mô phỏng)</p>
      </div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center gap-3">
            <s.icon className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-white text-lg font-semibold leading-none">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="text-sm text-white mb-2">Hoạt động hàng tuần</div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded flex items-end">
                <div className="w-full bg-blue-500 rounded" style={{ height: `${20 + (i*8)}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;


