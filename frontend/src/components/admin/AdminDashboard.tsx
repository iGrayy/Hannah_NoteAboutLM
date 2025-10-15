import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, Map, Settings, LogOut, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import AdminOverview from './views/AdminOverview';
import UserManagement from './views/UserManagement';
import RoadmapManagement from './views/RoadmapManagement';
import SystemSettings from './views/SystemSettings';

type View = 'overview' | 'users' | 'roadmap' | 'settings';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<View>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview': return <AdminOverview />;
      case 'users': return <UserManagement />;
      case 'roadmap': return <RoadmapManagement />;
      case 'settings': return <SystemSettings />;
      default: return <AdminOverview />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
    { id: 'roadmap', label: 'Quản lý Course Roadmap', icon: Map },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-800 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between p-4 border-b border-gray-700 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {!isSidebarCollapsed && <h1 className="text-xl font-bold text-white">Admin</h1>}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-lg hover:bg-gray-700">
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex-grow p-2 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === item.id ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`}
              >
                <item.icon size={20} />
                {!isSidebarCollapsed && <span className="ml-4 font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                <UserIcon size={isSidebarCollapsed ? 24 : 40} className="rounded-full bg-gray-600 p-1" />
                {!isSidebarCollapsed && (
                    <div className="ml-3">
                        <p className="font-semibold text-sm text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                )}
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center mt-4 p-3 rounded-lg transition-colors text-red-400 hover:bg-red-500/20 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <LogOut size={20} />
              {!isSidebarCollapsed && <span className="ml-4 font-medium">Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
