import React from 'react';
import { Users, Server, Activity } from 'lucide-react';

// Stat Card Component
const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string; color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className={`bg-gray-800 p-6 rounded-lg border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <Icon className="text-gray-500" size={32} />
    </div>
  </div>
);

const AdminOverview: React.FC = () => {
  const stats = [
    { icon: Users, title: 'Tổng số người dùng', value: '1,280', color: 'border-blue-500' },
    { icon: Users, title: 'Faculty Accounts', value: '76', color: 'border-green-500' },
    { icon: Server, title: 'Tình trạng hệ thống', value: 'Online', color: 'border-purple-500' },
    { icon: Activity, title: 'Hiệu suất AI', value: '99.8%', color: 'border-red-500' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="text-3xl font-bold text-white">Tổng quan hệ thống</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      {/* Placeholder for charts and other info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Biểu đồ hoạt động người dùng (đang phát triển)</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Logs hệ thống (đang phát triển)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

