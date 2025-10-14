import React, { useState } from 'react';
import { HomePage } from './components/pages/HomePage';
import { MainPage } from './components/pages/MainPage';
import { Header } from './components/layout/Header';
import { AuthModal } from './components/common/AuthModal';
import { ProfileModal } from './components/common/ProfileModal';


// This is the original App component that works with the Tailwind CSS components.

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'main'>('home');
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'signup'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    // Stay on the current page after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const handleAuthAction = (view: 'login' | 'signup' = 'login') => {
    if (isLoggedIn) {
      setCurrentPage('main');
    } else {
      setInitialAuthView(view);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };



  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {currentPage === 'home' ? (
        <HomePage
          onLoginClick={() => handleAuthAction('login')}
          onSignUpClick={() => handleAuthAction('signup')}
          onDefaultActionClick={() => handleAuthAction()}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onProfileClick={handleOpenProfile}
        />
      ) : (
        <div className="flex flex-col h-screen">
          <Header
            onNavigateHome={handleNavigateHome}
            isSourcesOpen={isSourcesOpen}
            isStudioOpen={isStudioOpen}
            toggleSources={() => setIsSourcesOpen(prev => !prev)}
            toggleStudio={() => setIsStudioOpen(prev => !prev)}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onLoginClick={() => handleAuthAction('login')}
            onProfileClick={handleOpenProfile}
          />
          <MainPage
            isSourcesOpen={isSourcesOpen}
            isStudioOpen={isStudioOpen}
          />
        </div>
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialView={initialAuthView}
      />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} onLogout={handleLogout} />
    </div>
  );
};

export default App;
