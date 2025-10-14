import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onLogout }) => {

  const user = {
    name: 'Gray',
    email: 'gray@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Gray',
    stats: {
      conversations: 28,
      documents: 12,
      insights: 153,
    },
    plan: 'Pro Plan',
  };



  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }, exit: { scale: 0.95, opacity: 0 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Sidebar */}
            <div className="w-1/3 bg-gray-900/50 p-6 flex flex-col space-y-6 border-r border-gray-700">
              <div className="text-center">
                <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700" />
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <div className="bg-gray-800/70 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-center">Statistics</h3>
                <div className="flex justify-around text-center">
                  <div><p className="text-2xl font-bold">{user.stats.conversations}</p><p className="text-xs text-gray-400">Chats</p></div>
                  <div><p className="text-2xl font-bold">{user.stats.documents}</p><p className="text-xs text-gray-400">Docs</p></div>
                  <div><p className="text-2xl font-bold">{user.stats.insights}</p><p className="text-xs text-gray-400">Insights</p></div>
                </div>
              </div>
              <div className="flex-grow"></div>
              <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>

            {/* Right Content */}
            <div className="w-2/3 p-8 overflow-y-auto relative">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <AccountSettings />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AccountSettings = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-xl font-semibold">Account Settings</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
        <input type="text" defaultValue="Gray" className="w-full p-2 bg-gray-700 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
        <input type="email" defaultValue="gray@example.com" className="w-full p-2 bg-gray-700 rounded-md" />
      </div>
    </div>
    <div className="pt-4 border-t border-gray-700">
       <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold">Save Changes</button>
    </div>
     <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <div className="space-y-4">
            <input type="password" placeholder="Current Password" className="w-full p-2 bg-gray-700 rounded-md" />
            <input type="password" placeholder="New Password" className="w-full p-2 bg-gray-700 rounded-md" />
        </div>
         <button className="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md font-semibold">Update Password</button>
    </div>
  </div>
);



