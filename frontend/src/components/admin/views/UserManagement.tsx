import React from 'react';
import { UserPlus, Search, Edit, Trash2, Lock, Unlock } from 'lucide-react';

const UserManagement: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Quản lý người dùng</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
          <UserPlus size={20} />
          <span>Thêm người dùng</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select className="bg-gray-700 p-2 rounded-md">
            <option>Tất cả vai trò</option>
            <option>Student</option>
            <option>Faculty</option>
            <option>Admin</option>
          </select>
          <select className="bg-gray-700 p-2 rounded-md">
            <option>Tất cả trạng thái</option>
            <option>Hoạt động</option>
            <option>Bị khóa</option>
          </select>
        </div>
        <div className="relative">
          <input type="text" placeholder="Tìm kiếm người dùng..." className="bg-gray-700 p-2 pl-10 rounded-md" />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4">Tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vai trò</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Ngày tạo</th>
              <th className="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* Mock Data */}
            <tr className="border-b border-gray-700 hover:bg-gray-700/30">
              <td className="p-4">Nguyễn Văn A</td>
              <td className="p-4">student1@example.com</td>
              <td className="p-4"><span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">Student</span></td>
              <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">Hoạt động</span></td>
              <td className="p-4">10/10/2023</td>
              <td className="p-4 flex gap-2">
                <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                <button className="text-yellow-400 hover:text-yellow-300"><Lock size={16} /></button>
                <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700/30">
              <td className="p-4">Trần Thị B</td>
              <td className="p-4">faculty1@example.com</td>
              <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">Faculty</span></td>
              <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">Hoạt động</span></td>
              <td className="p-4">11/10/2023</td>
              <td className="p-4 flex gap-2">
                <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                <button className="text-yellow-400 hover:text-yellow-300"><Lock size={16} /></button>
                <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </td>
            </tr>
            <tr className="hover:bg-gray-700/30">
              <td className="p-4">Lê Văn C</td>
              <td className="p-4">admin1@example.com</td>
              <td className="p-4"><span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">Admin</span></td>
              <td className="p-4"><span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">Bị khóa</span></td>
              <td className="p-4">12/10/2023</td>
              <td className="p-4 flex gap-2">
                <button className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                <button className="text-green-400 hover:text-green-300"><Unlock size={16} /></button>
                <button className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
