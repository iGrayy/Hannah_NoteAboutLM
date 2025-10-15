import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../types/auth';

const LoginPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !password) {
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: selectedUser, password });
      // Navigation will be handled by App.tsx RoleBasedRedirect
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Đăng nhập</h1>
          <p className="text-gray-300">Chọn tài khoản để đăng nhập</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Selection */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Chọn tài khoản
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" className="bg-gray-800">Chọn tài khoản...</option>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.email} className="bg-gray-800">
                  {user.name} ({user.role === 'student' ? 'Sinh viên' : 
                              user.role === 'faculty' ? 'Giảng viên' : 'Quản trị viên'})
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !selectedUser || !password}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Test Accounts Info */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-white font-medium mb-2">Thông tin đăng nhập:</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div>
              <p className="font-medium text-blue-300">Sinh viên:</p>
              <p>Email: student@test.com</p>
              <p>Mật khẩu: student123</p>
            </div>
            <div>
              <p className="font-medium text-green-300">Giảng viên:</p>
              <p>Email: faculty@test.com</p>
              <p>Mật khẩu: faculty123</p>
            </div>
            <div>
              <p className="font-medium text-red-300">Quản trị viên:</p>
              <p>Email: admin@test.com</p>
              <p>Mật khẩu: admin123</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
