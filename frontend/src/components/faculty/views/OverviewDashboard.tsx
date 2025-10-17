import React, { useState } from 'react';
import { TrendingUp, Users, MessageCircle, Award, BarChart3, Calendar, Target, AlertCircle } from 'lucide-react';

interface StudentAssessment {
  id: string;
  name: string;
  quizScore: number;
  level: 'excellent' | 'good' | 'average' | 'needs_improvement';
  completedQuizzes: number;
  totalQuizzes: number;
  lastActivity: string;
}

interface TrendingTopic {
  id: string;
  topic: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  percentage: number;
}

interface FAQAnalytics {
  id: string;
  question: string;
  frequency: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
}

const OverviewDashboard: React.FC = () => {
  // Sample data
  const [studentAssessments] = useState<StudentAssessment[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      quizScore: 85,
      level: 'excellent',
      completedQuizzes: 8,
      totalQuizzes: 10,
      lastActivity: '2024-01-22'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      quizScore: 72,
      level: 'good',
      completedQuizzes: 7,
      totalQuizzes: 10,
      lastActivity: '2024-01-21'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      quizScore: 58,
      level: 'average',
      completedQuizzes: 6,
      totalQuizzes: 10,
      lastActivity: '2024-01-20'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      quizScore: 45,
      level: 'needs_improvement',
      completedQuizzes: 4,
      totalQuizzes: 10,
      lastActivity: '2024-01-19'
    }
  ]);

  const [trendingTopics] = useState<TrendingTopic[]>([
    {
      id: '1',
      topic: 'Exception Handling',
      count: 45,
      trend: 'up',
      category: 'Java Concepts',
      percentage: 25
    },
    {
      id: '2',
      topic: 'Object-Oriented Programming',
      count: 38,
      trend: 'stable',
      category: 'Programming Paradigms',
      percentage: 21
    },
    {
      id: '3',
      topic: 'Database Connection',
      count: 32,
      trend: 'up',
      category: 'Database',
      percentage: 18
    },
    {
      id: '4',
      topic: 'Array Operations',
      count: 28,
      trend: 'down',
      category: 'Data Structures',
      percentage: 16
    },
    {
      id: '5',
      topic: 'File I/O Operations',
      count: 18,
      trend: 'stable',
      category: 'System Programming',
      percentage: 10
    }
  ]);

  const [faqAnalytics] = useState<FAQAnalytics[]>([
    {
      id: '1',
      question: 'Làm thế nào để cài đặt JDK?',
      frequency: 23,
      category: 'Cài đặt',
      trend: 'up'
    },
    {
      id: '2',
      question: 'Sự khác biệt giữa JDK và JRE?',
      frequency: 19,
      trend: 'stable',
      category: 'Khái niệm'
    },
    {
      id: '3',
      question: 'Cách debug code Java?',
      frequency: 15,
      trend: 'up',
      category: 'Debugging'
    }
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-600/20 text-green-400';
      case 'good': return 'bg-blue-600/20 text-blue-400';
      case 'average': return 'bg-yellow-600/20 text-yellow-400';
      case 'needs_improvement': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const overallStats = {
    totalStudents: studentAssessments.length,
    averageScore: Math.round(studentAssessments.reduce((sum, student) => sum + student.quizScore, 0) / studentAssessments.length),
    completionRate: Math.round((studentAssessments.reduce((sum, student) => sum + student.completedQuizzes, 0) / (studentAssessments.length * 10)) * 100),
    totalQuestions: trendingTopics.reduce((sum, topic) => sum + topic.count, 0)
  };

  return (
    <div className="min-h-screen bg-white p-6 text-black ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-1">
          Tổng quan Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Cập nhật: {new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{overallStats.totalStudents}</p>
              <p className="text-sm text-gray-600">Tổng sinh viên</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{overallStats.averageScore}%</p>
              <p className="text-sm text-gray-600">Điểm trung bình</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{overallStats.completionRate}%</p>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{overallStats.totalQuestions}</p>
              <p className="text-sm text-gray-600">Tổng câu hỏi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Assessment */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Đánh giá mức độ Sinh viên</h2>
        </div>

        <div className="space-y-4">
          {studentAssessments.map((student) => (
            <div key={student.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2 py-1 rounded-md text-sm ${getLevelColor(student.level)}`}>
                        {student.level === 'excellent' ? 'Xuất sắc' :
                         student.level === 'good' ? 'Tốt' :
                         student.level === 'average' ? 'Trung bình' : 'Cần cải thiện'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Hoạt động cuối: {new Date(student.lastActivity).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{student.quizScore}%</div>
                  <div className="text-sm text-gray-500">
                    {student.completedQuizzes}/{student.totalQuizzes} quiz
                  </div>

                  {/* Progress bar */}
                  <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: `${(student.completedQuizzes / student.totalQuizzes) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Trending Topics</h2>
          </div>

          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{topic.topic}</h3>
                    <p className="text-sm text-gray-600">{topic.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getTrendIcon(topic.trend)}
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{topic.count}</div>
                    <div className="text-sm text-gray-600">{topic.percentage}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Analytics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-800">FAQ Phổ biến</h2>
          </div>

          <div className="space-y-4">
            {faqAnalytics.map((faq, index) => (
              <div key={faq.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                      {faq.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-3">
                    {getTrendIcon(faq.trend)}
                    <span className="font-semibold text-gray-800">{faq.frequency}</span>
                  </div>
                </div>

                {/* Frequency bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    style={{ width: `${(faq.frequency / Math.max(...faqAnalytics.map(f => f.frequency))) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
