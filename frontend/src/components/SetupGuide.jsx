import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Copy, Check } from 'lucide-react';

const SetupGuide = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Hướng dẫn thiết lập API Key</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4 text-sm text-gray-300">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Bước 1: Lấy API Key từ Google AI Studio</h3>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Truy cập <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                    Google AI Studio <ExternalLink className="w-3 h-3" />
                                </a></li>
                                <li>Đăng nhập bằng tài khoản Google của bạn</li>
                                <li>Nhấp vào "Create API Key"</li>
                                <li>Sao chép API key được tạo</li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Bước 2: Cấu hình API Key</h3>
                            <p className="mb-2">Mở file <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">.env</code> trong thư mục gốc và thêm:</p>
                            <div className="bg-gray-900 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <code className="text-green-400">GOOGLE_AI_API_KEY=your_api_key_here</code>
                                    <button
                                        onClick={() => copyToClipboard('GOOGLE_AI_API_KEY=your_api_key_here')}
                                        className="ml-2 p-1 text-gray-400 hover:text-white"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Bước 3: Khởi động lại server</h3>
                            <p>Dừng server backend (Ctrl+C) và chạy lại:</p>
                            <div className="bg-gray-900 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <code className="text-blue-400">npm run server</code>
                                    <button
                                        onClick={() => copyToClipboard('npm run server')}
                                        className="ml-2 p-1 text-gray-400 hover:text-white"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
                            <h4 className="text-blue-300 font-medium mb-2">💡 Lưu ý quan trọng:</h4>
                            <ul className="space-y-1 text-blue-200">
                                <li>• API key được lưu trữ an toàn trên server, không bao giờ được gửi đến frontend</li>
                                <li>• Đảm bảo file .env không được commit vào Git</li>
                                <li>• API key có giới hạn sử dụng, kiểm tra quota trong Google AI Studio</li>
                            </ul>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SetupGuide;
