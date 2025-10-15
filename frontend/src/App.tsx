import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import MainPageWrapper from './components/pages/MainPageWrapper';
import AdminDashboard from './components/admin/AdminDashboard';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import { AuthModal } from './components/common/AuthModal';
import { ProfileModal } from './components/common/ProfileModal';
import BackToTop from './components/ui/BackToTop';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; roles: string[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'signup'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

    const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'faculty') {
        navigate('/faculty');
      }
      // Student will stay on the current page after login
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthAction = (view: 'login' | 'signup' = 'login') => {
    if (isAuthenticated) {
      navigate('/main');
    } else {
      setInitialAuthView(view);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage onLoginClick={() => handleAuthAction('login')} onSignUpClick={() => handleAuthAction('signup')} onDefaultActionClick={() => handleAuthAction()} isLoggedIn={isAuthenticated} onLogout={handleLogout} onProfileClick={handleOpenProfile} />} />
                <Route path="/main" element={<ProtectedRoute roles={['student', 'faculty', 'admin']}><MainPageWrapper /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/faculty" element={<ProtectedRoute roles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialView={initialAuthView}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={handleLogout}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default App;
