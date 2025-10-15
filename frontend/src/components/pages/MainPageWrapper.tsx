import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../layout/Header';
import { MainPage } from './MainPage';
import { ProfileModal } from '../common/ProfileModal';
import { useAuth } from '../../contexts/AuthContext';

const MainPageWrapper: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        onNavigateHome={handleNavigateHome}
        isSourcesOpen={isSourcesOpen}
        isStudioOpen={isStudioOpen}
        toggleSources={() => setIsSourcesOpen(prev => !prev)}
        toggleStudio={() => setIsStudioOpen(prev => !prev)}
        isLoggedIn={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={() => {}} // Not needed here since user is already logged in
        onProfileClick={handleOpenProfile}
      />
      <MainPage
        isSourcesOpen={isSourcesOpen}
        isStudioOpen={isStudioOpen}
      />
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default MainPageWrapper;
