import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown } from 'lucide-react';

interface ProfileMenuProps {
  onLogout: () => void;
  onProfileClick: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout, onProfileClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src={`https://api.dicebear.com/7.x/initials/svg?seed=User`} 
          alt="User Avatar"
          className="w-8 h-8 rounded-full border-2 border-gray-600"
        />
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30"
          >
            <ul className="p-2">
              <li onClick={onProfileClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer">
                <User size={16} />
                <span>Profile</span>
              </li>
              <li onClick={onLogout} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer text-red-400">
                <LogOut size={16} />
                <span>Logout</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
