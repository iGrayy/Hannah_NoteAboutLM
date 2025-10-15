import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, BookCopy, MessageSquare, BarChart3, LogOut, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import FacultyOverview from './views/FacultyOverview';
import ContentManagement from './views/ContentManagement';
import AIResponseManagement from './views/AIResponseManagement';
import AnalyticsAndInsights from './views/AnalyticsAndInsights';

type View = 'overview' | 'content' | 'response' | 'analytics';

const FacultyDashboard: React.FC = () => {
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
      case 'overview': return <FacultyOverview />;
      case 'content': return <ContentManagement />;
      case 'response': return <AIResponseManagement />;
      case 'analytics': return <AnalyticsAndInsights />;
      default: return <FacultyOverview />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'content', label: 'Quản lý nội dung', icon: BookCopy },
    { id: 'response', label: 'Quản lý phản hồi AI', icon: MessageSquare },
    { id: 'analytics', label: 'Phân tích & Thống kê', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className={`bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between p-6 border-b border-slate-700/50 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Faculty</h1>
              </div>
            )}
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors">
              {isSidebarCollapsed ? <ChevronRight size={20} className="text-slate-400" /> : <ChevronLeft size={20} className="text-slate-400" />}
            </button>
          </div>

          <nav className="flex-grow p-4 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${activeView === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
              >
                <item.icon size={22} />
                {!isSidebarCollapsed && <span className="ml-4 font-semibold">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-700/50">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} alt="User Avatar" className={`rounded-full ${isSidebarCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`} />
                {!isSidebarCollapsed && (
                    <div className="ml-4">
                        <p className="font-semibold text-base text-slate-100">{user?.name}</p>
                        <p className="text-sm text-slate-400">{user?.email}</p>
                    </div>
                )}
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center mt-6 p-3 rounded-xl transition-colors text-red-400 bg-slate-800/50 hover:bg-red-500/20 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <LogOut size={22} />
              {!isSidebarCollapsed && <span className="ml-4 font-semibold">Đăng xuất</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-50/5 to-slate-100/5">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
