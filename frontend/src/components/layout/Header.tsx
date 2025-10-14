import React from 'react';
import { motion } from 'framer-motion';
import { Settings, PanelLeft, PanelRight, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { ProfileMenu } from '../common/ProfileMenu';

// This is the original Header component using Tailwind CSS and Framer Motion.

interface HeaderProps {
  onNavigateHome: () => void;
  isSourcesOpen: boolean;
  isStudioOpen: boolean;
  toggleSources: () => void;
  toggleStudio: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  isSourcesOpen,
  isStudioOpen,
  toggleSources,
  toggleStudio,
  isLoggedIn,
  onLogout,
  onLoginClick,
  onProfileClick
}) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-3 flex justify-between items-center z-20"
    >
      <div className="flex items-center gap-4">
        <motion.button 
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSources}
          title={isSourcesOpen ? "Close Sources Panel" : "Open Sources Panel"}
        >
          {isSourcesOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
        </motion.button>
        <div
          className="text-3xl font-bold cursor-pointer"
          onClick={onNavigateHome}
        >
          <span
            className="font-extrabold"
            style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 25%, #f9a8d4 50%, #fda4af 75%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 6px rgba(165, 180, 252, 0.3)',
              filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))',
              letterSpacing: '0.03em',
              transform: 'perspective(300px) rotateX(10deg)',
              transformStyle: 'preserve-3d',
              transition: 'all 0.3s ease'
            }}
          >
            Hannah
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <motion.button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={20} />
        </motion.button>

        {isLoggedIn ? (
          <ProfileMenu onLogout={onLogout} onProfileClick={onProfileClick} />
        ) : (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onLoginClick}
              className="font-semibold py-2 px-4 rounded-full text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={onLoginClick}
              className="bg-white text-gray-900 font-semibold py-2 px-4 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        )}

        <motion.button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleStudio}
          title={isStudioOpen ? "Close Studio Panel" : "Open Studio Panel"}
        >
          {isStudioOpen ? <PanelRightClose size={20} /> : <PanelRight size={20} />}
        </motion.button>
      </div>
    </motion.header>
  );
};
