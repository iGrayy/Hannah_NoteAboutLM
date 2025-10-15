import React from 'react';
import { Users, HelpCircle, Target, Activity } from 'lucide-react';

// Stat Card Component
const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string; gradient: string; iconColor: string }> = ({ icon: Icon, title, value, gradient, iconColor }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-400 font-semibold mb-2">{title}</p>
        <p className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}>
        <Icon className="text-white" size={28} />
      </div>
    </div>
  </div>
);

const FacultyOverview: React.FC = () => {
  const stats = [
    { icon: Users, title: 'Tổng số sinh viên', value: '1,204', gradient: 'from-blue-400 to-blue-600', iconColor: 'bg-blue-500/80' },
    { icon: HelpCircle, title: 'Câu hỏi nổi bật', value: '287', gradient: 'from-green-400 to-green-600', iconColor: 'bg-green-500/80' },
    { icon: Target, title: 'Knowledge Gaps', value: '12', gradient: 'from-yellow-400 to-yellow-600', iconColor: 'bg-yellow-500/80' },
    { icon: Activity, title: 'Tình trạng học tập', value: 'Tốt', gradient: 'from-indigo-400 to-indigo-600', iconColor: 'bg-indigo-500/80' },
  ];

  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Tổng quan</h1>
        <p className="text-slate-400 mt-2">Theo dõi hoạt động giảng dạy và tương tác với sinh viên.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      {/* Placeholder for charts and other info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl h-96 flex items-center justify-center border border-slate-700/50">
            <p className="text-slate-500 font-medium">Biểu đồ hoạt động của sinh viên (đang phát triển)</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl h-96 flex items-center justify-center border border-slate-700/50">
            <p className="text-slate-500 font-medium">Danh sách câu hỏi phổ biến (đang phát triển)</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyOverview;

