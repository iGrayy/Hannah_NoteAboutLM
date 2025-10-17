import React from 'react';
import { Users, TrendingUp, BarChart3 } from 'lucide-react';

// Stat Card Component
const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string; color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className={`bg-white p-6 rounded-lg border shadow-sm ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-black">{value}</p>
      </div>
      <Icon className="text-gray-400" size={32} />
    </div>
  </div>
);

const AdminOverview: React.FC = () => {
  const stats = [
    { icon: Users, title: 'Tổng số người dùng', value: '1,280', color: 'border-blue-500' },
    { icon: Users, title: 'Faculty Accounts', value: '76', color: 'border-green-500' },
    { icon: TrendingUp, title: 'Lượng truy cập hôm nay', value: '452', color: 'border-purple-500' },
    { icon: BarChart3, title: 'Tương tác mới', value: '89', color: 'border-red-500' },
  ];

  return (
    <div className="animate-fade-in space-y-8 bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-black">Tổng quan hệ thống</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      {/* Visitor Traffic Chart */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-black">Biểu đồ lượng người truy cập</h2>
        </div>

        {/* Chart Container */}
        <div className="h-80 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 pr-4">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-8 h-full relative bg-gray-50 rounded border border-gray-300">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-t border-gray-300 opacity-50"></div>
              ))}
            </div>

            {/* Sample data visualization */}
            <div className="absolute inset-0 p-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Sample line chart */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  points="0,150 50,120 100,80 150,100 200,60 250,90 300,40 350,70 400,30"
                />
                {/* Data points */}
                {[
                  { x: 0, y: 150 }, { x: 50, y: 120 }, { x: 100, y: 80 },
                  { x: 150, y: 100 }, { x: 200, y: 60 }, { x: 250, y: 90 },
                  { x: 300, y: 40 }, { x: 350, y: 70 }, { x: 400, y: 30 }
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#3B82F6"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="ml-8 mt-2 flex justify-between text-xs text-gray-600">
            <span>00:00</span>
            <span>03:00</span>
            <span>06:00</span>
            <span>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
            <span>21:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Chart legend */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Lượt truy cập theo giờ</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hôm nay:</span>
            <span className="text-sm font-semibold text-black">452 lượt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

