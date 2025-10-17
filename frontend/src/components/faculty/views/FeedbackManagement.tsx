import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Flag, Eye, Calendar, User, Clock, AlertTriangle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
}

interface Conversation {
  id: string;
  name: string;
  studentName: string;
  startDate: string;
  lastActivity: string;
  messageCount: number;
  status: 'active' | 'flagged' | 'reviewed' | 'closed';
  rating?: number;
  tags: string[];
}

const FeedbackManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'conversations'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample data
  const [faqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Làm thế nào để cài đặt Java Development Kit?',
      answer: 'Để cài đặt JDK, bạn cần: 1. Truy cập trang web Oracle, 2. Tải xuống phiên bản JDK phù hợp, 3. Chạy file cài đặt, 4. Cấu hình biến môi trường PATH.',
      category: 'Cài đặt',
      isActive: true,
      createdDate: '2024-01-15',
      updatedDate: '2024-01-20'
    },
    {
      id: '2',
      question: 'Sự khác biệt giữa JDK và JRE là gì?',
      answer: 'JDK (Java Development Kit) bao gồm các công cụ phát triển Java, trong khi JRE (Java Runtime Environment) chỉ chứa môi trường chạy ứng dụng Java.',
      category: 'Khái niệm',
      isActive: true,
      createdDate: '2024-01-10',
      updatedDate: '2024-01-18'
    }
  ]);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Hỏi về Exception Handling',
      studentName: 'Nguyễn Văn A',
      startDate: '2024-01-20',
      lastActivity: '2024-01-22',
      messageCount: 15,
      status: 'flagged',
      rating: 4,
      tags: ['java', 'exception', 'error-handling']
    },
    {
      id: '2',
      name: 'Thảo luận về OOP Concepts',
      studentName: 'Trần Thị B',
      startDate: '2024-01-18',
      lastActivity: '2024-01-21',
      messageCount: 23,
      status: 'active',
      rating: 5,
      tags: ['oop', 'inheritance', 'polymorphism']
    },
    {
      id: '3',
      name: 'Câu hỏi về Database Connection',
      studentName: 'Lê Văn C',
      startDate: '2024-01-15',
      lastActivity: '2024-01-19',
      messageCount: 8,
      status: 'reviewed',
      rating: 3,
      tags: ['database', 'jdbc', 'connection']
    }
  ]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    const matchesDateRange = !dateRange.start || !dateRange.end || 
                            (new Date(conv.startDate) >= new Date(dateRange.start) && 
                             new Date(conv.startDate) <= new Date(dateRange.end));
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const statusStyles: { [key: string]: { container: string; icon: string } } = {
    active: {
      container: 'bg-green-100 text-green-700',
      icon: 'text-green-500',
    },
    flagged: {
      container: 'bg-red-100 text-red-700',
      icon: 'text-red-500',
    },
    reviewed: {
      container: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-500',
    },
    closed: {
      container: 'bg-gray-100 text-gray-600',
      icon: 'text-gray-500',
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged': return <AlertTriangle className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'flagged': return 'Đã gắn cờ';
      case 'reviewed': return 'Đã xem lại';
      case 'closed': return 'Đã đóng';
      default: return status;
    }
  };

  return (
   <div className="min-h-screen bg-white p-6 text-black ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-1">
          Quản lý Phản hồi
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'faq'
              ? "text-black border border-gray-300 shadow-md"
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
        >
          <MessageSquare className="inline-block w-5 h-5 mr-2" />
          Tùy chỉnh Câu hỏi thường gặp
        </button>
        <button
          onClick={() => setActiveTab('conversations')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'conversations'
              ? "text-black border border-gray-300 shadow-md"
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
        >
          <Eye className="inline-block w-5 h-5 mr-2" />
          Giám sát Cuộc hội thoại
        </button>
      </div>

      {/* FAQ Management */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Câu trả lời chuẩn cho Câu hỏi thường gặp</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                <MessageSquare size={20} />
                Thêm câu hỏi mới
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                          {faq.category}
                        </span>
                        {faq.isActive && (
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-md text-sm">
                            Đang hoạt động
                          </span>
                        )}
                      </div>

                      <div className="bg-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Tạo: {new Date(faq.createdDate).toLocaleDateString('vi-VN')}</span>
                        <span>Cập nhật: {new Date(faq.updatedDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conversation Monitoring */}
      {activeTab === 'conversations' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bộ lọc & Tìm kiếm</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm cuộc hội thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="flagged">Đã gắn cờ</option>
                <option value="reviewed">Đã xem lại</option>
                <option value="closed">Đã đóng</option>
              </select>

              {/* Date Range */}
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lịch sử Cuộc hội thoại ({filteredConversations.length})
            </h2>

            <div className="space-y-4">
              {filteredConversations.map((conv) => (
                <div key={conv.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={statusStyles[conv.status]?.icon || statusStyles.closed.icon}>
                          {getStatusIcon(conv.status)}
                        </div>
                        <h3 className="font-semibold text-gray-800">{conv.name}</h3>
                        <span className={`px-2 py-1 rounded-md text-sm ${statusStyles[conv.status]?.container || statusStyles.closed.container}`}>
                          {translateStatus(conv.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{conv.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(conv.startDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(conv.lastActivity).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                          <span>{conv.messageCount} tin nhắn</span>
                        </div>
                      </div>




                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Flag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
