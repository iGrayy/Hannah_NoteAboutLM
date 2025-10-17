import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Settings,
    Link,
    Database,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
    User as UserIcon,
    LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserManagement from './admin/views/UserManagement';
import SystemSettings from './admin/views/SystemSettings';
import AdminOverview from './admin/views/AdminOverview';
import KnowledgeManagement from './admin/views/KnowledgeManagement';
import { DataTrainingManagement } from './admin/views/TrainingManagement';

interface AdminPageProps {
    onClose: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onClose }) => {
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        onClose();
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Bảng điều khiển',
            icon: LayoutDashboard,
            active: true
        },
        {
            id: 'users',
            label: 'Quản lý người dùng',
            icon: Users,
            active: false
        },
        {
            id: 'system',
            label: 'Cấu hình hệ thống',
            icon: Settings,
            active: false
        },
        {
            id: 'knowledge',
            label: 'Quản lý kho tri thức',
            icon: Database,
            active: false
        },
        {
            id: 'training',
            label: 'Quản lý Huấn luyện Dữ liệu',
            icon: GraduationCap,
            active: false
        }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <AdminOverview />;
            case 'users':
                return <UserManagement />;
            case 'knowledge':
                return <KnowledgeManagement />;
            case 'system':
                return <SystemSettings />;
            case 'training':
                return <DataTrainingManagement/>
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex">
            {/* Sidebar */}
            <div className={`bg-gray-800 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    {!sidebarCollapsed && (
                        <h2 className="text-white font-semibold">Admin Panel</h2>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="text-gray-400 hover:text-white p-1 rounded"
                    >
                        {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
                
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive 
                                                ? 'bg-blue-600 text-white' 
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        {!sidebarCollapsed && (
                                            <span className="text-sm">{item.label}</span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                
                <div className="p-4 border-t border-gray-700">
                    <div className={`flex items-center mb-4 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                        <UserIcon size={sidebarCollapsed ? 24 : 40} className="rounded-full bg-gray-600 p-1" />
                        {!sidebarCollapsed && (
                            <div className="ml-3">
                                <p className="font-semibold text-sm text-white">{user?.name}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center mb-2 px-3 py-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors text-sm ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut className="w-4 h-4" />
                        {!sidebarCollapsed && <span className="ml-2">Đăng xuất</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;
