import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Link } from 'lucide-react';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DocumentFormData {
  name: string;
  version: string;
  semester: string;
  timeAllocation: string;
  description: string;
  studentTask: string;
  subject: string;
  topic: string;
  week: number;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose }) => {
  const [contentType, setContentType] = useState<'upload' | 'link'>('upload');
  const [formData, setFormData] = useState<DocumentFormData>({
    name: '',
    version: '1.0',
    semester: '',
    timeAllocation: '',
    description: '',
    studentTask: '',
    subject: '',
    topic: '',
    week: 1
  });

  const handleInputChange = (field: keyof DocumentFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
          <motion.div
            variants={modalVariants}
            className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
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
            <div className="p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937'
            }}>
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
              <div className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tên tài liệu"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <input
                    type="text"
                    placeholder="Phiên bản (v1.0)"
                    value={formData.version}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Chọn môn học</option>
                    <option value="CS101">Lập trình Java</option>
                    <option value="AI202">Trí tuệ nhân tạo</option>
                    <option value="DB301">Cơ sở dữ liệu</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Chủ đề"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    placeholder="Tuần"
                    min="1"
                    max="16"
                    value={formData.week}
                    onChange={(e) => handleInputChange('week', parseInt(e.target.value) || 1)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Semester and Time Allocation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={formData.semester}
                    onChange={(e) => handleInputChange('semester', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Chọn kì học</option>
                    <option value="HK1 2024">HK1 2024</option>
                    <option value="HK2 2024">HK2 2024</option>
                    <option value="HK3 2024">HK3 2024</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Thời lượng (VD: 45 giờ)"
                    value={formData.timeAllocation}
                    onChange={(e) => handleInputChange('timeAllocation', e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả tài liệu</label>
                  <textarea
                    placeholder="Mô tả chi tiết về nội dung tài liệu..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  />
                </div>

                {/* Student Task */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nhiệm vụ sinh viên</label>
                  <textarea
                    placeholder="Mô tả các nhiệm vụ, bài tập mà sinh viên cần hoàn thành..."
                    value={formData.studentTask}
                    onChange={(e) => handleInputChange('studentTask', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  />
                </div>
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
        </>
      )}
    </AnimatePresence>
  );
};

export default AddContentModal;

