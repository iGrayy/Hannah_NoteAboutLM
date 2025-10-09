import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Target, Clock, CheckCircle, Play, Star, Users, Award } from 'lucide-react';

const LearningPathPage = ({ onBack }) => {
  const [selectedPath, setSelectedPath] = useState(null);

  const learningPaths = [
    {
      id: 'beginner',
      title: 'Lộ trình cho người mới bắt đầu',
      description: 'Khám phá các khái niệm cơ bản và xây dựng nền tảng vững chắc',
      duration: '4-6 tuần',
      difficulty: 'Cơ bản',
      topics: ['Giới thiệu tổng quan', 'Khái niệm cơ bản', 'Thực hành cơ bản', 'Đánh giá kiến thức'],
      color: 'from-green-500 to-emerald-600',
      icon: BookOpen,
      students: 1250,
      rating: 4.8
    },
    {
      id: 'intermediate',
      title: 'Lộ trình trung cấp',
      description: 'Nâng cao kỹ năng và hiểu sâu hơn về các chủ đề chuyên sâu',
      duration: '6-8 tuần',
      difficulty: 'Trung cấp',
      topics: ['Chuyên sâu lý thuyết', 'Thực hành nâng cao', 'Dự án thực tế', 'Phân tích chuyên sâu'],
      color: 'from-blue-500 to-cyan-600',
      icon: Target,
      students: 890,
      rating: 4.9
    },
    {
      id: 'advanced',
      title: 'Lộ trình nâng cao',
      description: 'Trở thành chuyên gia với các kỹ năng và kiến thức chuyên sâu nhất',
      duration: '8-12 tuần',
      difficulty: 'Nâng cao',
      topics: ['Nghiên cứu chuyên sâu', 'Dự án phức tạp', 'Mentoring', 'Chứng chỉ chuyên gia'],
      color: 'from-purple-500 to-pink-600',
      icon: Award,
      students: 456,
      rating: 4.9
    }
  ];

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    // Có thể thêm logic để bắt đầu lộ trình học
    console.log('Selected path:', path.title);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white">Learning Path</h2>
          </div>
        </div>
        <p className="text-sm text-gray-400">Chọn lộ trình học tập phù hợp với trình độ của bạn</p>
      </div>

      {/* Learning Paths */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-700 transition-all duration-300 border-2 ${
                selectedPath?.id === path.id ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => handlePathSelect(path)}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <path.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                      <p className="text-gray-300 mb-4">{path.description}</p>
                    </div>
                    {selectedPath?.id === path.id && (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{path.students.toLocaleString()} học viên</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{path.rating}</span>
                    </div>
                    <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                      {path.difficulty}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Nội dung chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-3">
                    <button
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        selectedPath?.id === path.id
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePathSelect(path);
                      }}
                    >
                      {selectedPath?.id === path.id ? 'Đã chọn' : 'Chọn lộ trình'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Xem trước</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      {selectedPath && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-gray-700 bg-gray-800"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Đã chọn: {selectedPath.title}</h3>
              <p className="text-sm text-gray-400">Sẵn sàng bắt đầu hành trình học tập của bạn</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Bắt đầu học ngay
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LearningPathPage;
