import React from 'react';
import { Sparkles } from 'lucide-react';

const nodes = [
  { id: 'root', label: 'Kỹ thuật phần mềm' },
  { id: 'req', label: 'Yêu cầu' },
  { id: 'design', label: 'Thiết kế' },
  { id: 'impl', label: 'Triển khai' },
  { id: 'test', label: 'Kiểm thử' },
  { id: 'deploy', label: 'Triển khai' },
];

const MindmapPanel = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Bản đồ tư duy & Khái niệm</h3>
          <p className="text-xs text-gray-400">Biểu đồ khái niệm tự động tạo (mô phỏng)</p>
        </div>
        <Sparkles className="w-4 h-4 text-blue-400" />
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="relative mx-auto max-w-xl">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 flex justify-center">
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm">{nodes[0].label}</div>
            </div>
            {nodes.slice(1).map((n) => (
              <div key={n.id} className="flex justify-center">
                <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-xs text-white">{n.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 240">
              <path d="M200 28 L66 100" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
              <path d="M200 28 L200 100" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
              <path d="M200 28 L334 100" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
              <path d="M200 28 L66 172" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
              <path d="M200 28 L334 172" stroke="#4B5563" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindmapPanel;


