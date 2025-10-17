import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialView?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialView = 'login' }) => {
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');

  useEffect(() => {
    if (isOpen) {
      setIsLoginView(initialView === 'login');
    }
  }, [isOpen, initialView]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: -50 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { scale: 0.9, opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(55, 65, 81, 0.3);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(156, 163, 175, 0.5);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(156, 163, 175, 0.8);
            }
          `}</style>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
          >
            <motion.div
              variants={modalVariants}
              exit="exit"
              className="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 pb-0 flex-shrink-0">
                <div className="flex justify-end">
                  <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className={`relative w-full overflow-y-auto flex-1 custom-scrollbar ${isLoginView ? "min-h-[24rem]" : "min-h-[28rem]"} max-h-[70vh]`} style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4B5563 #1F2937'
              }}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={isLoginView ? 'login' : 'signup'}
                    initial={{ x: isLoginView ? 0 : (initialView === 'login' ? '-100%' : '100%'), opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isLoginView ? '100%' : '-100%', opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0 px-8"
                  >
                    {isLoginView ? (
                      <LoginForm onLoginSuccess={onLoginSuccess} onSwitch={() => setIsLoginView(false)} />
                    ) : (
                      <SignUpForm onLoginSuccess={onLoginSuccess} onSwitch={() => setIsLoginView(true)} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const LoginForm: React.FC<{ onLoginSuccess: () => void; onSwitch: () => void; }> = ({ onLoginSuccess, onSwitch }) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onLoginSuccess();
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
      <p className="text-gray-400 text-center mb-6">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail size={16} />
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={16} />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="py-3 px-8 rounded-lg font-semibold
                     bg-blue-600 text-white
                     border border-blue-500
                     hover:bg-white hover:text-black hover:border-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 shadow-md"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>

      <p className="text-center mt-6 text-sm text-gray-400">
        Don't have an account? <button onClick={onSwitch} className="font-semibold text-blue-400 hover:underline">Sign Up</button>
      </p>
    </div>
  );
};

const SignUpForm: React.FC<{ onLoginSuccess: () => void; onSwitch: () => void; }> = ({ onLoginSuccess, onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-1">Create Account</h2>
      <p className="text-gray-400 text-center mb-6">Get started with Hannah</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User size={16} />
          </span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail size={16} />
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={16} />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="py-3 px-8 rounded-lg font-semibold
                       bg-blue-600 text-white
                       border border-blue-500
                       hover:bg-white hover:text-black hover:border-blue-700
                       transition-all duration-300 shadow-md"
          >
            Create Account
          </button>
        </div>
      </form>

      <p className="text-center mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-semibold text-blue-400 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};
