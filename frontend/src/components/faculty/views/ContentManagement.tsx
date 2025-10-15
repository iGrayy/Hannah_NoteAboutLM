import React, { useState } from 'react';
import { Upload, File, Video, Link as LinkIcon, PlusCircle, Search } from 'lucide-react';
import AddContentModal from '../modals/AddContentModal';

const ContentManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="animate-fade-in space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Quản lý nội dung</h1>
            <p className="text-slate-400 mt-2">Tổ chức, tải lên và chỉnh sửa tài liệu học tập.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
            <PlusCircle size={20} />
            <span>Thêm tài liệu</span>
          </button>
        </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select className="bg-slate-700/80 p-2 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Tất cả môn học</option>
            <option>CS101 - Intro to Programming</option>
            <option>AI202 - Machine Learning</option>
          </select>
          <select className="bg-slate-700/80 p-2 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Tất cả các tuần</option>
            <option>Tuần 1</option>
            <option>Tuần 2</option>
          </select>
        </div>
        <div className="relative">
          <input type="text" placeholder="Tìm kiếm tài liệu..." className="bg-slate-700/80 p-2 pl-10 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="p-4 font-semibold text-slate-300">Tên tài liệu</th>
              <th className="p-4 font-semibold text-slate-300">Loại</th>
              <th className="p-4 font-semibold text-slate-300">Môn học</th>
              <th className="p-4 font-semibold text-slate-300">Ngày tải lên</th>
              <th className="p-4 font-semibold text-slate-300">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {/* Mock Data */}
            <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="p-4 flex items-center gap-3 font-medium"><File size={20} className="text-blue-400" /><span>Bài giảng tuần 1.pdf</span></td>
              <td className="p-4 text-slate-400">PDF</td>
              <td className="p-4 text-slate-300">CS101</td>
              <td className="p-4 text-slate-400">10/10/2023</td>
              <td className="p-4"><button className="font-semibold text-blue-400 hover:text-blue-300">Chi tiết</button></td>
            </tr>
            <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="p-4 flex items-center gap-3 font-medium"><Video size={20} className="text-green-400" /><span>Video giới thiệu OOP</span></td>
              <td className="p-4 text-slate-400">Video</td>
              <td className="p-4 text-slate-300">CS101</td>
              <td className="p-4 text-slate-400">11/10/2023</td>
              <td className="p-4"><button className="font-semibold text-blue-400 hover:text-blue-300">Chi tiết</button></td>
            </tr>
             <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="p-4 flex items-center gap-3 font-medium"><LinkIcon size={20} className="text-yellow-400" /><span>Dataset cho bài tập lớn</span></td>
              <td className="p-4 text-slate-400">Link</td>
              <td className="p-4 text-slate-300">AI202</td>
              <td className="p-4 text-slate-400">12/10/2023</td>
              <td className="p-4"><button className="font-semibold text-blue-400 hover:text-blue-300">Chi tiết</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AddContentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ContentManagement;

