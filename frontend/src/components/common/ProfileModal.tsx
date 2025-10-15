import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, X, Mail, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuth();

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }, exit: { scale: 0.95, opacity: 0 } };

  if (!user) return null;

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;

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
            className="bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-gray-900/50 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Profile</h2>
                <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="p-8 flex-grow overflow-y-auto">
                <div className="text-center mb-8">
                    <img src={avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700" />
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center bg-gray-800/70 p-4 rounded-lg">
                        <Mail size={20} className="text-gray-400 mr-4" />
                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-800/70 p-4 rounded-lg">
                        <Shield size={20} className="text-gray-400 mr-4" />
                        <div>
                            <p className="text-sm text-gray-400">Role</p>
                            <p className="font-semibold capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-900/50 border-t border-gray-700">
                <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-3 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};





