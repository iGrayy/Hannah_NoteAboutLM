import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Link, FileText, Book } from 'lucide-react';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose }) => {
  const [contentType, setContentType] = useState<'upload' | 'link'>('upload');

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } };

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
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Thêm tài liệu mới</h2>
              <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Main Content */}
            <div className="p-8 space-y-6">
              {/* Content Type Tabs */}
              <div className="flex bg-gray-700/50 p-1 rounded-lg">
                <button 
                  onClick={() => setContentType('upload')}
                  className={`w-1/2 p-2 rounded-md text-sm font-medium transition-colors ${contentType === 'upload' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                  Tải lên File
                </button>
                <button 
                  onClick={() => setContentType('link')}
                  className={`w-1/2 p-2 rounded-md text-sm font-medium transition-colors ${contentType === 'link' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                  Thêm liên kết
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Tên tài liệu" className="w-full p-2 bg-gray-700 rounded-md" />
                <select className="w-full p-2 bg-gray-700 rounded-md">
                  <option>Chọn môn học</option>
                  <option>CS101</option>
                  <option>AI202</option>
                </select>
                <input type="text" placeholder="Chủ đề" className="w-full p-2 bg-gray-700 rounded-md" />
                <input type="number" placeholder="Tuần" className="w-full p-2 bg-gray-700 rounded-md" />
              </div>

              {/* Dynamic Content Area */}
              {contentType === 'upload' ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700/50 transition-colors">
                  <UploadCloud size={48} className="mx-auto text-gray-500 mb-4" />
                  <p className="font-semibold text-white">Kéo và thả file vào đây</p>
                  <p className="text-sm text-gray-400">hoặc <span className="text-blue-400">chọn file</span></p>
                  <p className="text-xs text-gray-500 mt-2">Hỗ trợ: PDF, DOCX, MP4, v.v.</p>
                </div>
              ) : (
                <div className="relative">
                  <Link size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="url" placeholder="https://..." className="w-full p-3 pl-10 bg-gray-700 rounded-md" />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 p-6 bg-gray-900/50 border-t border-gray-700">
              <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 font-semibold">Hủy</button>
              <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold">Thêm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddContentModal;

