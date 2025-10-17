import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, BookOpen, MessageCircle, LogOut, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
// View Components
import KnowledgeManagement from './views/KnowledgeManagement';
import FeedbackManagement from './views/FeedbackManagement';
import OverviewDashboard from './views/OverviewDashboard';

type View = 'knowledge' | 'feedback' | 'dashboard';

const FacultyDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <OverviewDashboard />;
      case 'knowledge': return <KnowledgeManagement />;
      case 'feedback': return <FeedbackManagement />;
      default: return <OverviewDashboard />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'knowledge', label: 'Quản lý cơ sở tri thức', icon: BookOpen },
    { id: 'feedback', label: 'Quản lý phản hồi', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-slate-100 flex">
      {/* Sidebar */}
      <aside className={`bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl transition-all duration-300 fixed h-full z-10 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className={`flex items-center justify-between p-6 border-b border-slate-700/50 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">Giảng viên</h1>
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
      <main className={`flex-1 p-3 overflow-y-auto bg-white transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        <div className="max-w-7xl mx-auto text-slate-800">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
