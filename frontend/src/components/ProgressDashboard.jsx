import React from 'react';
import { Trophy, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

const ProgressDashboard = () => {
  const stats = [
    { label: 'Courses Completed', value: 4, icon: CheckCircle2 },
    { label: 'Notebooks Created', value: 12, icon: BookOpen },
    { label: 'Skills Improved', value: 7, icon: Trophy },
    { label: 'Time Spent (hrs)', value: 46, icon: Clock },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-white">Progress Analytics</h3>
        <p className="text-xs text-gray-400">Learning metrics (mock)</p>
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
          <div className="text-sm text-white mb-2">Weekly Activity</div>
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


