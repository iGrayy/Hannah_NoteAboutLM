import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import MainPageWrapper from './components/pages/MainPageWrapper';
import AdminDashboard from './components/admin/AdminDashboard';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import { AuthModal } from './components/common/AuthModal';
import { ProfileModal } from './components/common/ProfileModal';
import BackToTop from './components/ui/BackToTop';
import { useAuth } from './contexts/AuthContext';
import * as conversationApi from './services/conversationApi';
import * as faqApi from './services/faqApi';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; roles: string[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
  isUnifiedResponse?: boolean;
  isLearningPathResponse?: boolean;
  responseType?: string;
  actionType?: string;
  richContent?: any;
  faqData?: any;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

// Helper functions for AI response generation (adapted from src/components/ConversationPanel.jsx)
const generateUnifiedResponse = (content: any, responseType = 'general', sourceData: any = null, actionType: any = null): Message => {
    const topicName = content.topicName || sourceData?.category || 'Kỹ thuật phần mềm';

    const baseResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '', // This will be populated from richContent.introduction
        timestamp: new Date().toISOString(),
        isUnifiedResponse: true,
        responseType: responseType,
        actionType: actionType,
        richContent: {},
        faqData: sourceData
    };

    // Handle different action types
    if (actionType === "simplify") {
      // Case 1: Simplify button clicked
      baseResponse.richContent = {
        // Introduction section for Simplify
        introduction: `Hãy đơn giản hóa ${topicName}. ${
          content.answer ||
          content.mainContent ||
          `${topicName} là một lĩnh vực quan trọng trong công nghệ thông tin. Chúng ta sẽ tìm hiểu những điều cơ bản và quan trọng nhất để bạn có thể bắt đầu học một cách dễ dàng.`
        }`,

        // Interactive Timeline with slightly more detailed data
        interactiveTimeline: {
          title: `Lộ trình học ${topicName} đơn giản`,
          stages: [
            {
              id: 1,
              title: "Bước 1: Hiểu khái niệm cơ bản",
              description:
                "Tìm hiểu các thuật ngữ và khái niệm cơ bản nhất. Đây là nền tảng để bạn có thể tiếp tục học các chủ đề phức tạp hơn.",
              image:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
              duration: "2-3 tuần",
              keyPoints: [
                "Thuật ngữ cơ bản",
                "Nguyên lý hoạt động",
                "Ví dụ thực tế",
              ],
            },
            {
              id: 2,
              title: "Bước 2: Thực hành đơn giản",
              description:
                "Bắt đầu với các bài tập và dự án nhỏ để áp dụng kiến thức đã học. Tập trung vào việc hiểu rõ từng bước.",
              image:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
              duration: "3-4 tuần",
              keyPoints: ["Bài tập cơ bản", "Dự án nhỏ", "Thực hành hàng ngày"],
            },
            {
              id: 3,
              title: "Bước 3: Xây dựng dự án đầu tiên",
              description:
                "Tạo ra sản phẩm đầu tiên của bạn. Đây là cách tốt nhất để củng cố kiến thức và tạo động lực học tập.",
              image:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
              duration: "4-6 tuần",
              keyPoints: [
                "Dự án cá nhân",
                "Áp dụng kiến thức",
                "Tạo portfolio",
              ],
            },
          ],
        },

        // Related Videos component (replaces interactiveList)
        relatedVideos: {
          title: `Video học ${topicName} cơ bản`,
          videos: [
            {
              id: 1,
              title: `${topicName} cho người mới bắt đầu`,
              thumbnail:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
              duration: "15:30",
              channel: "Học Lập Trình",
              url: "https://youtube.com/watch?v=example1",
              description: "Video giới thiệu cơ bản về lĩnh vực này",
            },
            {
              id: 2,
              title: `Hướng dẫn thực hành ${topicName}`,
              thumbnail:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
              duration: "22:45",
              channel: "Code Dạo",
              url: "https://youtube.com/watch?v=example2",
              description: "Thực hành từng bước một cách chi tiết",
            },
            {
              id: 3,
              title: `Dự án đầu tiên với ${topicName}`,
              thumbnail:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
              duration: "35:20",
              channel: "Lập Trình Việt",
              url: "https://youtube.com/watch?v=example3",
              description: "Xây dựng dự án thực tế từ A đến Z",
            },
          ],
        },
      };

    } else if (actionType === "goDeeper") {
      // Case 2: Learn More button clicked
      baseResponse.richContent = {
        // Introduction section for Learn More
        introduction: `Hãy tìm hiểu sâu hơn về ${topicName}. ${
          content.answer ||
          content.mainContent ||
          `${topicName} có nhiều khía cạnh phức tạp và thú vị. Chúng ta sẽ khám phá các khái niệm nâng cao và ứng dụng thực tế trong ngành công nghiệp.`
        }`,

        // Terminology Table (replaces interactive timeline)
        terminologyTable: {
          title: `Thuật ngữ chuyên môn trong ${topicName}`,
          terms: [
            {
              term: "Waterfall",
              characteristics:
                "Các giai đoạn tuần tự (lấy yêu cầu, thiết kế, triển khai, kiểm thử, phát hành), mỗi giai đoạn phải hoàn thành trước khi giai đoạn tiếp theo bắt đầu.",
              focus: "Quy trình có cấu trúc, tuyến tính.",
            },
            {
              term: "Agile",
              characteristics:
                "Phát triển lặp lại và tăng trưởng, tập trung vào sự linh hoạt, hợp tác và phản hồi của khách hàng.",
              focus: "Khả năng thích ứng, tốc độ, sự hài lòng của khách hàng.",
            },
            {
              term: "DevOps",
              characteristics:
                "Kết hợp giữa phát triển phần mềm (Dev) và vận hành CNTT (Ops) để rút ngắn vòng đời phát triển hệ thống và cung cấp sản phẩm liên tục với chất lượng phần mềm cao.",
              focus: "Hợp tác, tự động hóa, phân phối liên tục.",
            },
            {
              term: "Microservices",
              characteristics:
                "Phương pháp kiến trúc cấu trúc một ứng dụng thành một tập hợp các dịch vụ được kết nối lỏng lẻo.",
              focus: "Khả năng mở rộng, khả năng bảo trì, đa dạng công nghệ.",
            },
            {
              term: "API",
              characteristics:
                "Giao diện lập trình ứng dụng - tập hợp các giao thức và công cụ để xây dựng các ứng dụng phần mềm.",
              focus: "Tích hợp, mô-đun hóa, khả năng tái sử dụng.",
            },
          ],
        },

        // Related Videos component (replaces interactiveList)
        relatedVideos: {
          title: `Video chuyên sâu về ${topicName}`,
          videos: [
            {
              id: 1,
              title: `Kiến trúc ${topicName} nâng cao`,
              thumbnail:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
              duration: "45:30",
              channel: "Tech Expert",
              url: "https://youtube.com/watch?v=advanced1",
              description: "Phân tích kiến trúc và design patterns",
            },
            {
              id: 2,
              title: `Best Practices trong ${topicName}`,
              thumbnail:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
              duration: "38:15",
              channel: "Pro Developer",
              url: "https://youtube.com/watch?v=advanced2",
              description: "Các phương pháp tốt nhất từ chuyên gia",
            },
            {
              id: 3,
              title: `Case Study: ${topicName} trong doanh nghiệp`,
              thumbnail:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
              duration: "52:40",
              channel: "Enterprise Tech",
              url: "https://youtube.com/watch?v=advanced3",
              description: "Ứng dụng thực tế trong các công ty lớn",
            },
          ],
        },
      };
    } else if (actionType === "getImages") {
      // Case 3: Get Images button clicked
      baseResponse.richContent = {
        // Introduction for Get Images
        introduction: `Đây là một số hình ảnh minh họa và video liên quan đến ${topicName} để giúp bạn hiểu rõ hơn.`,

        // Image Gallery component
        imageGallery: {
          title: `Hình ảnh minh họa cho ${topicName}`,
          images: [
            {
              id: 1,
              src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
              caption: "Sơ đồ tổng quan về kiến trúc hệ thống",
            },
            {
              id: 2,
              src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
              caption: "Quy trình phát triển phần mềm",
            },
            {
              id: 3,
              src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
              caption: "Mô hình cơ sở dữ liệu quan hệ",
            },
            {
              id: 4,
              src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
              caption: "Giao diện người dùng mẫu cho ứng dụng web",
            },
          ],
        },

        // Related Videos component
        relatedVideos: {
          title: `Video liên quan về ${topicName}`,
          videos: [
            {
              id: 1,
              title: `Giải thích ${topicName} qua hình ảnh`,
              thumbnail:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
              duration: "10:05",
              channel: "Visual Learner",
              url: "https://youtube.com/watch?v=visual1",
              description:
                "Video sử dụng hình ảnh để giải thích các khái niệm phức tạp.",
            },
            {
              id: 2,
              title: `Minh họa quy trình làm việc trong ${topicName}`,
              thumbnail:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
              duration: "18:30",
              channel: "Tech Flow",
              url: "https://youtube.com/watch?v=visual2",
              description:
                "Xem cách các thành phần hoạt động cùng nhau qua video minh họa.",
            },
          ],
        },
      };
    } else {
      // Default behavior - existing format but remove Related Videos, replace with different component
      baseResponse.richContent = {
        // 1. Phần Mở đầu (Introduction Section)
        introduction:
          content.answer ||
          content.mainContent ||
          `${topicName} là một lĩnh vực quan trọng trong công nghệ thông tin, đòi hỏi sự kết hợp giữa kiến thức lý thuyết vững chắc và kỹ năng thực hành. Việc hiểu rõ về chủ đề này sẽ giúp bạn xây dựng nền tảng vững chắc cho sự nghiệp trong lĩnh vực công nghệ.`,

        // 2. Interactive Timeline Module
        interactiveTimeline: {
          title: `Lộ trình học ${topicName} tiêu biểu`,
          stages: [
            {
              id: 1,
              title: "Giai đoạn 1: Kiến thức nền tảng",
              description:
                "Nắm vững các khái niệm cơ bản và ngôn ngữ lập trình đầu tiên",
              image:
                "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
            },
            {
              id: 2,
              title: "Giai đoạn 2: Phát triển kỹ năng cốt lõi",
              description:
                "Học cấu trúc dữ liệu, thuật toán và các nguyên lý thiết kế",
              image:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
            },
            {
              id: 3,
              title: "Giai đoạn 3: Chuyên môn hóa",
              description:
                "Tập trung vào các lĩnh vực cụ thể như web, mobile, hoặc data science",
              image:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
            },
            {
              id: 4,
              title: "Giai đoạn 4: Dự án thực tế và kinh nghiệm",
              description:
                "Áp dụng kiến thức vào các dự án thực tế và xây dựng portfolio",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
            },
          ],
        },

        // 3. Learning Resources Module (replaces interactiveList, different from Related Videos)
        learningResources: {
          title: `Tài nguyên học tập ${topicName}`,
          resources: [
            {
              id: 1,
              type: "course",
              title: "Khóa học trực tuyến",
              description: "Các khóa học có cấu trúc từ cơ bản đến nâng cao",
              icon: "🎓",
              items: ["Coursera", "edX", "Udemy", "FreeCodeCamp"],
            },
            {
              id: 2,
              type: "book",
              title: "Sách chuyên môn",
              description: "Tài liệu tham khảo và sách giáo khoa",
              icon: "📚",
              items: [
                "Clean Code",
                "Design Patterns",
                "System Design",
                "Algorithms",
              ],
            },
            {
              id: 3,
              type: "practice",
              title: "Nền tảng thực hành",
              description: "Các trang web để luyện tập coding",
              icon: "💻",
              items: ["LeetCode", "HackerRank", "CodeWars", "GitHub"],
            },
            {
              id: 4,
              type: "community",
              title: "Cộng đồng học tập",
              description: "Tham gia cộng đồng để học hỏi và chia sẻ",
              icon: "👥",
              items: ["Stack Overflow", "Reddit", "Discord", "Viblo"],
            },
          ],
        },
      };
    }

    baseResponse.richContent.suggestedQuestions = content.suggestedQuestions || [
        `Làm thế nào để đơn giản hóa chủ đề ${topicName.toLowerCase()}?`,
        `Cho tôi biết thêm thông tin chi tiết về ${topicName.toLowerCase()}`,
        `Một số thách thức phổ biến trong ${topicName.toLowerCase()} là gì?`
    ];

    if (responseType === 'faq' && sourceData) {
        baseResponse.richContent.introduction = sourceData.detailedAnswer || sourceData.answer || baseResponse.richContent.introduction;
    }

    baseResponse.text = baseResponse.richContent.introduction;
    return baseResponse;
};

const generateLearningPathResponse = (question: string): Message => {
    return {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Đây là lộ trình học cho "${question}". Lộ trình này bao gồm các bước từ cơ bản đến nâng cao.`,
        isLearningPathResponse: true,
        richContent: {
            answer: "Bạn muốn mình trả lời về lộ trình học về mảng nào? Ví dụ: lộ trình học của môn Kỹ thuật phần mềm",
            suggestedQuestions: [
                'Lộ trình học Frontend Development',
                'Lộ trình học Backend Development',
            ]
        }
    };
};

const generateRichResponse = async (question: string): Promise<Message> => {
    if (question.toLowerCase().includes('lộ trình học')) {
        return generateLearningPathResponse(question);
    }

    let faqMatch = null;
    try {
        const searchResults = await faqApi.searchFAQs(question);
        if (searchResults.success && searchResults.data.length > 0) {
            faqMatch = searchResults.data[0]; // Simplification: take the first match
        }
    } catch (error) {
        console.error('Error searching FAQs:', error);
    }

    if (faqMatch) {
        return generateUnifiedResponse({
            question: question,
            answer: faqMatch.detailedAnswer,
        }, 'faq', faqMatch);
    }

    return generateUnifiedResponse({ question: question }, 'general');
};


const App: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'signup'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(undefined);

    const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'faculty') {
        navigate('/faculty');
      }
      // Student will stay on the current page after login
    }
  }, [isAuthenticated, user, navigate]);

  // Load conversations from API on initial render
  useEffect(() => {
    const loadConversations = async () => {
      const response = await conversationApi.getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    };
    loadConversations();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthAction = (view: 'login' | 'signup' = 'login', options: { createNew?: boolean, prompt?: string } = {}) => {
    if (isAuthenticated) {
      navigate('/main', { state: { createNew: true, prompt: options.prompt } });
    } else {
      setInitialAuthView(view);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const handleDeleteConversation = useCallback(async (id: string) => {
    const response = await conversationApi.deleteConversation(id);
    if (response.success) {
      setConversations(prev => {
        const updatedConversations = prev.filter(c => c.id !== id);
        if (activeConversationId === id) {
          if (updatedConversations.length > 0) {
            const deletedIndex = prev.findIndex(c => c.id === id);
            const newActiveIndex = Math.max(0, deletedIndex - 1);
            setActiveConversationId(updatedConversations[newActiveIndex].id);
          } else {
            setActiveConversationId(undefined);
          }
        }
        return updatedConversations;
      });
    }
  }, [activeConversationId]);

  const handleStartNewConversation = useCallback(async (options: { title?: string } = {}) => {
    const response = await conversationApi.createConversation({ title: options.title });
    if (response.success) {
      setConversations(prev => [response.data, ...prev]);
      setActiveConversationId(response.data.id);
      return response.data;
    }
    return null;
  }, []);



  const handleSendMessage = useCallback(async (text: string, conversationIdOverride?: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    let targetConversationId = conversationIdOverride || activeConversationId;

    // Nếu không có conversation nào đang active, tạo mới
    if (!targetConversationId) {
      console.log('No active conversation, creating new one...');
      const newConversation = await handleStartNewConversation();
      if (newConversation) {
        targetConversationId = newConversation.id;
      } else {
        console.error('Failed to create new conversation');
        return;
      }
    }

    console.log('handleSendMessage Debug:', {
      trimmedText,
      targetConversationId,
      activeConversationId,
      conversationIdOverride
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: trimmedText,
    };

    let finalUpdatedConvo: Conversation | undefined;

    // Immediately update UI with user message
    setConversations(prev => {
      console.log('Updating conversations with user message:', {
        prevLength: prev.length,
        targetConversationId,
        userMessage
      });

      const updated = prev.map(convo => {
        if (convo.id === targetConversationId) {
          const isFirstMessage = convo.messages.length === 0;
          const newTitle = isFirstMessage && (convo.title === 'New Conversation' || convo.title === 'Cuộc trò chuyện mới' || !convo.title)
            ? trimmedText.split(' ').slice(0, 5).join(' ') + (trimmedText.split(' ').length > 5 ? '...' : '')
            : convo.title;

          const updatedConvo = {
            ...convo,
            title: newTitle,
            messages: [...convo.messages, userMessage],
          };
          finalUpdatedConvo = updatedConvo; // Capture the fully updated conversation
          console.log('Updated conversation:', updatedConvo);
          return updatedConvo;
        }
        return convo;
      });

      console.log('New conversations state:', updated);
      return updated;
    });

    // Persist user message and title change
    if (finalUpdatedConvo && targetConversationId) {
      await conversationApi.updateConversation(targetConversationId, {
        title: finalUpdatedConvo.title,
        messages: finalUpdatedConvo.messages,
      });
    }

    // Generate AI response (this will take time)
    const aiResponse = await generateRichResponse(trimmedText);

    // Update UI with AI message after generation is complete
    let convoAfterAI: Conversation | undefined;
    setConversations(prev => {
      console.log('Updating conversations with AI message:', aiResponse);

      const updated = prev.map(convo => {
        if (convo.id === targetConversationId) {
          convoAfterAI = { ...convo, messages: [...convo.messages, aiResponse] };
          console.log('Updated conversation with AI:', convoAfterAI);
          return convoAfterAI;
        }
        return convo;
      });

      return updated;
    });

    // Persist AI message
    if (convoAfterAI && targetConversationId) {
      await conversationApi.updateConversation(targetConversationId, {
        messages: convoAfterAI.messages,
      });
    }
  }, [activeConversationId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage onLoginClick={() => handleAuthAction('login')} onSignUpClick={() => handleAuthAction('signup')} onDefaultActionClick={(prompt?: string) => handleAuthAction('login', { createNew: true, prompt })} isLoggedIn={isAuthenticated} onLogout={handleLogout} onProfileClick={handleOpenProfile} />} />
                <Route path="/main" element={<ProtectedRoute roles={['student', 'faculty', 'admin']}><MainPageWrapper conversations={conversations} activeConversationId={activeConversationId} onSelectConversation={handleSelectConversation} onDeleteConversation={handleDeleteConversation} onStartNewConversation={handleStartNewConversation} onSendMessage={handleSendMessage} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/faculty" element={<ProtectedRoute roles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialView={initialAuthView}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={handleLogout}
      />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default App;
