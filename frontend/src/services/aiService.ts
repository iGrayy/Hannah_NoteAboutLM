import { searchFAQs } from './faqApi';

// Helper function to generate learning path response
const generateLearningPathResponse = async (question: string) => {
  return {
    id: Date.now() + 1,
    type: "assistant",
    content: `Đây là lộ trình học cho: "${question}"`,
    timestamp: new Date().toISOString(),
    richContent: {
      introduction: `Tôi sẽ tạo lộ trình học phù hợp cho bạn về "${question}".`,
      interactiveTimeline: {
        title: "Lộ trình học tập",
        stages: [
          {
            title: "Bước 1: Nền tảng",
            description: "Học các khái niệm cơ bản",
            duration: "2-3 tuần",
            resources: ["Tài liệu cơ bản", "Video hướng dẫn"]
          },
          {
            title: "Bước 2: Thực hành",
            description: "Áp dụng kiến thức vào dự án thực tế",
            duration: "3-4 tuần",
            resources: ["Bài tập thực hành", "Dự án mẫu"]
          }
        ]
      }
    }
  };
};

// Helper function to generate unified response
const generateUnifiedResponse = async (data: any, type: string, faqMatch?: any) => {
  return {
    id: Date.now() + 1,
    type: "assistant",
    content: data.answer,
    timestamp: new Date().toISOString(),
    responseType: type,
    faqData: faqMatch,
    richContent: {
      introduction: data.mainContent,
      exploration: {
        title: "Khám phá thêm",
        sources: [
          {
            title: "Tìm hiểu sâu hơn",
            description: data.whyItMatters,
            source: "Hannah AI",
            url: "#",
            vietnamese_title: "Tại sao điều này quan trọng"
          }
        ]
      },
      learningResources: {
        title: "Câu hỏi gợi ý",
        resources: data.suggestedQuestions.map((q: string) => ({
          title: q,
          description: "Nhấp để khám phá thêm",
          type: "question",
          url: "#"
        }))
      }
    }
  };
};

// Main function to generate rich responses
export const generateRichResponse = async (question: string, source?: any) => {
  // Check for Learning Path trigger
  if (question.toLowerCase().includes("lộ trình học")) {
    return generateLearningPathResponse(question);
  }

  // Check if this is an FAQ question by searching our FAQ database
  let faqMatch = null;
  try {
    const searchResults = await searchFAQs(question);
    if (searchResults.success && searchResults.data.length > 0) {
      // Find the best match (exact or very close match)
      faqMatch =
        searchResults.data.find(
          (faq: any) =>
            faq.question.toLowerCase() === question.toLowerCase() ||
            question.toLowerCase().includes(faq.question.toLowerCase()) ||
            faq.question.toLowerCase().includes(question.toLowerCase())
        ) || searchResults.data[0];
    }
  } catch (error) {
    console.error("Error searching FAQs:", error);
  }

  if (faqMatch) {
    // Generate unified response for FAQ questions
    return generateUnifiedResponse(
      {
        question: question,
        answer: faqMatch.detailedAnswer || faqMatch.shortAnswer,
        mainContent: `Đây là câu trả lời toàn diện về ${faqMatch.category?.toLowerCase() || "chủ đề này"}. ${faqMatch.detailedAnswer || faqMatch.shortAnswer}`,
        whyItMatters: `Hiểu rõ về ${faqMatch.category?.toLowerCase() || "chủ đề này"} là rất quan trọng cho hành trình lập trình của bạn vì nó tạo nền tảng để xây dựng các ứng dụng mạnh mẽ, có thể mở rộng và thúc đẩy sự nghiệp phát triển phần mềm của bạn.`,
        suggestedQuestions: faqMatch.relatedQuestions || [
          "Bạn có thể cung cấp ví dụ cụ thể hơn không?",
          "Các phương pháp tốt nhất cho điều này là gì?",
          "Thường mất bao lâu để học điều này?",
          "Bạn có đề xuất tài nguyên nào để học thêm không?",
        ],
      },
      "faq",
      faqMatch
    );
  }

  // Default unified response for all other questions
  return generateUnifiedResponse(
    {
      question: question,
      answer: source
        ? `Dựa trên nội dung từ "${source.title}", đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".`
        : `Đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".`,
      mainContent: `Trong chủ đề này, chúng ta có thể thấy rằng có nhiều khía cạnh quan trọng cần được phân tích. Đây là một chủ đề phức tạp với nhiều yếu tố tương tác với nhau.`,
      whyItMatters: `Điều này quan trọng vì nó ảnh hưởng trực tiếp đến cách chúng ta hiểu và áp dụng kiến thức trong thực tế. Hiểu rõ khái niệm này giúp chúng ta đưa ra quyết định tốt hơn.`,
      suggestedQuestions: [
        "Có thể giải thích thêm về phần nào đó không?",
        "Có ví dụ cụ thể nào khác không?",
        "Làm thế nào để áp dụng điều này trong thực tế?",
        "Có tài liệu tham khảo nào khác không?",
      ],
    },
    "general"
  );
};
