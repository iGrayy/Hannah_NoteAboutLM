import React, { useState } from 'react';
import { Upload, FileText, Plus, Edit, Trash2, Eye, Clock, Target, BookOpen, Users, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  version: string;
  semester: string;
  timeAllocation: string;
  description: string;
  studentTask: string;
  uploadDate: string;
  type: 'pdf' | 'docx' | 'video' | 'other';
}

interface LearningPath {
  id: string;
  title: string;
  duration: string;
  clo: string[];
  description: string;
}

interface CommonChallenge {
  id: string;
  title: string;
  category: 'soft-skill' | 'technical' | 'communication';
  description: string;
  studentTasks: string[];
}

interface LearningOutcome {
  id: string;
  code: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
}

const KnowledgeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'structure'>('documents');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Sample data
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Lập trình Java cơ bản',
      version: '2.1',
      semester: 'HK1 2024',
      timeAllocation: '45 giờ',
      description: 'Tài liệu hướng dẫn lập trình Java từ cơ bản đến nâng cao',
      studentTask: 'Hoàn thành 5 bài tập thực hành và 1 project cuối kỳ',
      uploadDate: '2024-01-15',
      type: 'pdf'
    }
  ]);

  const [learningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'Java Programming Fundamentals',
      duration: '12 tuần',
      clo: ['CLO1: Hiểu cú pháp Java', 'CLO2: Áp dụng OOP', 'CLO3: Xây dựng ứng dụng'],
      description: 'Lộ trình học lập trình Java từ cơ bản đến nâng cao'
    }
  ]);

  const [commonChallenges] = useState<CommonChallenge[]>([
    {
      id: '1',
      title: 'Tư duy logic trong lập trình',
      category: 'soft-skill',
      description: 'Phát triển khả năng tư duy logic và giải quyết vấn đề',
      studentTasks: ['Phân tích bài toán', 'Thiết kế thuật toán', 'Debug code']
    }
  ]);

  const [learningOutcomes] = useState<LearningOutcome[]>([
    {
      id: '1',
      code: 'LO1',
      description: 'Sinh viên có thể viết chương trình Java cơ bản',
      level: 'basic'
    }
  ]);

  return (
    <div className="min-h-screen bg-white p-6 text-black ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-1">
          Quản lý Cơ sở Tri thức
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'documents'
              ? "text-black border border-gray-300 shadow-md"
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
        >
          <FileText className="inline-block w-5 h-5 mr-2" />
          Quản lý Tài liệu
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'structure'
              ? "text-black border border-gray-300 shadow-md"
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="inline-block w-5 h-5 mr-2" />
          Cấu trúc hóa Nội dung
        </button>
      </div>

      {/* Content */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Tài liệu học tập</h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Plus size={20} />
                Upload Tài liệu
              </button>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                          v{doc.version}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Kì: {doc.semester}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>Thời lượng: {doc.timeAllocation}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-2 text-sm">{doc.description}</p>

                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Student Task:</span>
                        </div>
                        <p className="text-sm text-gray-700">{doc.studentTask}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="space-y-6">
          {/* Learning Paths */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Learning Paths</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                <Plus size={20} />
                Thêm Learning Path
              </button>
            </div>
            
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">{path.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>Thời gian: {path.duration}</span>
                  </div>
                  <div className="space-y-1">
                    {path.clo.map((clo, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                        {clo}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Challenges */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Common Challenges</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors">
                <Plus size={20} />
                Thêm Challenge
              </button>
            </div>

            <div className="space-y-4">
              {commonChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-md text-xs">
                      {challenge.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  <div className="space-y-1">
                    {challenge.studentTasks.map((task, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-orange-50 px-3 py-1 rounded-md border border-orange-200">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Learning Outcomes</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                <Plus size={20} />
                Thêm Learning Outcome
              </button>
            </div>

            <div className="space-y-4">
              {learningOutcomes.map((outcome) => (
                <div key={outcome.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-sm font-semibold">
                      {outcome.code}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs ${
                      outcome.level === 'basic' ? 'bg-green-100 text-green-600' :
                      outcome.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {outcome.level}
                    </span>
                  </div>
                  <p className="text-gray-700">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeManagement;
