import React, { useState } from 'react';
import { HomePage } from './components/pages/HomePage';
import { MainPage } from './components/pages/MainPage';
import { Header } from './components/layout/Header';

// This is the original App component that works with the Tailwind CSS components.

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'main'>('home');
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);

  const handleNavigateToMain = () => {
    setCurrentPage('main');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {currentPage === 'home' ? (
        <HomePage
          onStartBlankConversation={handleNavigateToMain}
        />
      ) : (
        <div className="flex flex-col h-screen">
          <Header
            onNavigateHome={handleNavigateHome}
            isSourcesOpen={isSourcesOpen}
            isStudioOpen={isStudioOpen}
            toggleSources={() => setIsSourcesOpen(prev => !prev)}
            toggleStudio={() => setIsStudioOpen(prev => !prev)}
          />
          <MainPage
            isSourcesOpen={isSourcesOpen}
            isStudioOpen={isStudioOpen}
          />
        </div>
      )}
    </div>
  );
};

export default App;
