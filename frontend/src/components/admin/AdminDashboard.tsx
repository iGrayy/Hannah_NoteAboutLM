import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, LogOut, Home } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 w-full max-w-2xl text-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Shield className="text-red-400 mr-3" size={48} />
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl text-white mb-4">
            Chào mừng, {user?.name}!
          </h2>
          <p className="text-gray-300 text-lg">
            Bạn đã đăng nhập với quyền <span className="text-red-400 font-semibold">Quản trị viên</span>
          </p>
        </div>

        {/* Status */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-red-400 font-semibold text-xl mb-2">
            Trang Admin đang phát triển
          </h3>
          <p className="text-gray-300">
            UI dashboard cho Admin sẽ được hoàn thiện sau. 
            Hiện tại đây là trang placeholder để phân biệt role.
          </p>
        </div>

        {/* User Info */}
        <div className="bg-white/5 rounded-lg p-4 mb-8">
          <h4 className="text-white font-medium mb-2">Thông tin tài khoản:</h4>
          <div className="text-gray-300 space-y-1">
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>ID: {user?.id}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Home size={20} />
            <span>Về trang chủ</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
