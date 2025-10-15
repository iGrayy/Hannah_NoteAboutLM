import React from 'react';
import { Map, PlusCircle, Edit, Trash2 } from 'lucide-react';

const RoadmapManagement: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Quản lý Course Roadmap</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle size={20} />
          <span>Tạo Roadmap mới</span>
        </button>
      </div>

      {/* Roadmaps List */}
      <div className="space-y-6">
        {/* Mock Data */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Chuyên ngành Kỹ thuật phần mềm - Học kỳ 1</h2>
              <p className="text-gray-400">Gồm 5 môn học - Áp dụng cho lớp SE1701</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /> Chỉnh sửa</button>
              <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /> Xóa</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Chuyên ngành An toàn thông tin - Học kỳ 1</h2>
              <p className="text-gray-400">Gồm 6 môn học - Áp dụng cho lớp AT1701</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /> Chỉnh sửa</button>
              <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /> Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapManagement;

