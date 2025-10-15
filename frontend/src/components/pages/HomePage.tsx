import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import {
  Zap,
  BrainCircuit,
  ShieldCheck,
  Map,
  Target,
  Users,
} from "lucide-react";
import FeatureSection from "./FeatureSection";
import BenefitCard from "./BenefitCard";
import { ProfileMenu } from "../common/ProfileMenu";
import CrystalNebulaBackground from "./CrystalNebulaBackground";

interface HomePageProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onDefaultActionClick: () => void;
  onNavigateToConversation?: (prompt: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onProfileClick: () => void;
}

// Top 3 exploration items for students
const explorationItems = [
  {
    id: 1,
    title: "Lộ trình học Frontend Development từ Zero đến Hero",
    description:
      "Hành trình 6 tháng từ người mới bắt đầu đến Frontend Developer chuyên nghiệp với HTML, CSS, JavaScript, React và các công cụ hiện đại.",
    icon: Map,
    color: "from-blue-500 to-cyan-500",
    prompt:
      "Tôi muốn học Frontend Development từ đầu. Hãy tạo cho tôi một lộ trình học tập chi tiết 6 tháng bao gồm HTML, CSS, JavaScript, React và các công cụ cần thiết. Bao gồm cả timeline, tài nguyên học tập và dự án thực hành.",
  },
  {
    id: 2,
    title: "10 Dự án thực tế để xây dựng Portfolio ấn tượng",
    description:
      "Danh sách các dự án từ cơ bản đến nâng cao giúp bạn xây dựng portfolio chuyên nghiệp và thu hút nhà tuyển dụng.",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    prompt:
      "Tôi cần xây dựng portfolio để tìm việc developer. Hãy đề xuất 10 dự án thực tế từ cơ bản đến nâng cao, bao gồm mô tả chi tiết, công nghệ sử dụng, và cách triển khai để tạo portfolio ấn tượng.",
  },
  {
    id: 3,
    title: "Chinh phục phỏng vấn Technical Interview",
    description:
      "Hướng dẫn chi tiết cách chuẩn bị và vượt qua các vòng phỏng vấn kỹ thuật tại các công ty công nghệ hàng đầu.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    prompt:
      "Tôi sắp có phỏng vấn technical interview cho vị trí developer. Hãy hướng dẫn tôi cách chuẩn bị toàn diện bao gồm: thuật toán & cấu trúc dữ liệu, system design, behavioral questions, live coding và các tips để thành công.",
  },
  {
    id: 4,
    title: "Học Machine Learning và AI từ cơ bản",
    description:
      "Khám phá thế giới AI với Python, TensorFlow, và PyTorch. Từ Linear Regression đến Deep Learning và Computer Vision.",
    icon: Map,
    color: "from-orange-500 to-red-500",
    prompt:
      "Tôi muốn học Machine Learning và AI từ đầu. Hãy tạo lộ trình học tập chi tiết bao gồm toán học cơ bản, Python, các thuật toán ML, Deep Learning và các dự án thực hành.",
  },
  {
    id: 5,
    title: "Xây dựng Personal Brand trên LinkedIn",
    description:
      "Chiến lược xây dựng thương hiệu cá nhân chuyên nghiệp: tối ưu profile, content strategy và networking hiệu quả.",
    icon: Target,
    color: "from-indigo-500 to-blue-500",
    prompt:
      "Tôi muốn xây dựng personal brand mạnh mẽ trên LinkedIn. Hãy hướng dẫn tôi cách tối ưu profile, chiến lược content, networking và tăng influence trong ngành.",
  },
  {
    id: 6,
    title: "Quản lý tài chính cá nhân thông minh",
    description:
      "Hướng dẫn toàn diện về lập ngân sách, tiết kiệm, đầu tư chứng khoán và xây dựng danh mục đầu tư hiệu quả.",
    icon: Users,
    color: "from-teal-500 to-green-500",
    prompt:
      "Tôi muốn học cách quản lý tài chính cá nhân hiệu quả. Hãy hướng dẫn tôi về lập ngân sách, tiết kiệm, đầu tư chứng khoán, quỹ ETF và xây dựng danh mục đầu tư phù hợp.",
  },
  {
    id: 7,
    title: "Thành thạo Git & GitHub cho Developer",
    description:
      "Hiểu rõ Git, branching, pull request và workflow thực tế để làm việc nhóm hiệu quả trong dự án phần mềm.",
    icon: Map,
    color: "from-pink-500 to-rose-500",
    prompt:
      "Tôi muốn học Git và GitHub một cách bài bản. Hãy tạo lộ trình bao gồm các lệnh cơ bản, branching strategy, pull request workflow và best practices khi làm việc nhóm.",
  },
  {
    id: 8,
    title: "Thiết kế UI/UX cơ bản cho Developer",
    description:
      "Nguyên tắc thiết kế UI/UX cơ bản, wireframe, prototyping và cách áp dụng vào dự án thực tế.",
    icon: Target,
    color: "from-yellow-500 to-orange-500",
    prompt:
      "Tôi là developer nhưng muốn học thêm UI/UX để tự thiết kế giao diện. Hãy hướng dẫn tôi các nguyên tắc cơ bản, tool cần dùng, và cách thực hành qua dự án.",
  },
  {
    id: 9,
    title: "DevOps cơ bản với Docker & CI/CD",
    description:
      "Làm quen với Docker, containerization, và thiết lập pipeline CI/CD để triển khai ứng dụng nhanh chóng và an toàn.",
    icon: Users,
    color: "from-sky-500 to-indigo-500",
    prompt:
      "Tôi muốn học DevOps cơ bản. Hãy tạo lộ trình học về Docker, containerization, CI/CD pipeline với GitHub Actions hoặc GitLab CI, và ví dụ triển khai thực tế.",
  },
];

// Exploration Card Component
const ExplorationCard: React.FC<{
  item: (typeof explorationItems)[0];
  index: number;
  isLoggedIn: boolean;
  onNavigateToConversation?: (prompt: string) => void;
  onLoginClick?: () => void;
}> = ({ item, index, isLoggedIn, onNavigateToConversation, onLoginClick }) => {
  const IconComponent = item.icon;

  const handleClick = () => {
    if (isLoggedIn) {
      if (onNavigateToConversation) {
        onNavigateToConversation(item.prompt);
      }
    } else {
      if (onLoginClick) {
        onLoginClick();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color}`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          {item.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <span className="text-xs text-blue-400 font-medium">
            Click để bắt đầu học →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar: React.FC<{
  onLoginClick: () => void;
  onSignUpClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onProfileClick: () => void;
}> = ({
  onLoginClick,
  onSignUpClick,
  isLoggedIn,
  onLogout,
  onProfileClick,
}) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 120 }}
    className="absolute top-0 left-0 right-0 p-4 bg-transparent z-30"
  >
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-4xl font-bold">
        <span
          className="font-extrabold"
          style={{
            background:
              "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 25%, #f9a8d4 50%, #fda4af 75%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow:
              "0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(165, 180, 252, 0.4)",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))",
            letterSpacing: "0.05em",
            transform: "perspective(500px) rotateX(15deg)",
            transformStyle: "preserve-3d",
          }}
        >
          Hannah
        </span>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <ProfileMenu onLogout={onLogout} onProfileClick={onProfileClick} />
        ) : (
          <>
            <motion.button
              onClick={onLoginClick} // This will trigger the auth modal
              className="font-semibold py-2 px-5 rounded-full text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={onSignUpClick} // This will also trigger the auth modal
              className="bg-white text-gray-900 font-semibold py-2 px-5 rounded-full flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </>
        )}
      </div>
    </div>
  </motion.nav>
);

const HeroSection: React.FC<{ onActionClick: () => void }> = ({
  onActionClick,
}) => (
  <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden bg-transparent z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
        whileHover={{
          scale: 1.02,
          textShadow: "0 0 20px rgba(255,255,255,0.5)",
        }}
      >
        Unlock Your Learning Potential
      </motion.h1>
      <motion.p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        Hannah is your personal AI research assistant, designed to help you
        analyze documents, generate ideas, and master new topics faster than
        ever before.
      </motion.p>
      <motion.div>
        <motion.button
          onClick={onActionClick}
          className="relative text-lg font-bold py-4 px-10 rounded-full
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                     text-white shadow-lg
                     hover:from-white hover:via-sky-100 hover:to-blue-200
                     hover:text-gray-900 hover:shadow-cyan-300/60
                     transition-all duration-300"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            transformStyle: "preserve-3d",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(59, 130, 246, 0.5)",
          }}
        >
          <span className="relative z-10">Start a Conversation</span>
        </motion.button>
      </motion.div>
    </motion.div>
  </section>
);

export const HomePage: React.FC<HomePageProps> = ({
  onLoginClick,
  onSignUpClick,
  onDefaultActionClick,
  onNavigateToConversation,
  isLoggedIn,
  onLogout,
  onProfileClick,
}) => {
const x = useMotionValue(0);
  const isDragging = useRef(false);

  const cardWidth = 400; // width 1 card + gap
  const totalWidth = cardWidth * explorationItems.length;

  // Clone items 2 lần
  const infiniteItems = [...explorationItems, ...explorationItems];

  useAnimationFrame(() => {
    if (!isDragging.current) {
      const currentX = x.get();
      const newX = currentX - 1; // tốc độ scroll

      // Khi vượt quá nửa (set đầu), reset về 0
      if (Math.abs(newX) >= totalWidth) {
        x.set(0);
      } else {
        x.set(newX);
      }
    }
  });
  return (
    <div className="bg-transparent text-white">
      <CrystalNebulaBackground />
      <Navbar
        onLoginClick={onLoginClick}
        onSignUpClick={onSignUpClick}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
      />

      <main className="relative z-10">
        <HeroSection onActionClick={onDefaultActionClick} />

        <div id="features" className="py-1">
          <FeatureSection
            title="Intelligent Document Analysis"
            description="Upload your documents, PDFs, or even link to web pages. Hannah's AI will read and understand the content, preparing it for deep analysis and conversation."
            imageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            reverse={false}
            iconType="document"
          />
          <FeatureSection
            title="Conversational Learning"
            description="Chat with your documents as if you were talking to an expert. Ask complex questions, get summaries, and find key information in seconds. Learning has never been more interactive."
            imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            reverse={true}
            iconType="conversation"
          />
          <FeatureSection
            title="Creative Studio Tools"
            description="Go beyond simple Q&A. Use the Studio to generate mind maps, create flashcards, build quizzes, and even draft reports based on your source materials. Transform information into knowledge."
            imageUrl="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            reverse={false}
            iconType="creative"
          />
        </div>

        {/* Exploration Section */}
        <section className="py-16 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Title */}
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Khám phá
              </h2>
              <p className="text-3xl md:text-4xl font-bold mb-4">
                Khám phá những chủ đề thú vị và bắt đầu cuộc trò chuyện của bạn
              </p>
            </div>

            {/* Infinite horizontal scroll */}
            <div className="w-full overflow-hidden">
<motion.div
          className="flex gap-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -totalWidth, right: 0 }} // cho kéo trong phạm vi 1 vòng
          dragElastic={0.05}
          onDragStart={() => { isDragging.current = true }}
          onDragEnd={() => { isDragging.current = false }}
        >
          {infiniteItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-96"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <ExplorationCard
                item={item}
                index={index}
                isLoggedIn={isLoggedIn}
                onNavigateToConversation={onNavigateToConversation}
                onLoginClick={onLoginClick}
              />
            </motion.div>
          ))}
        </motion.div>
            </div>
          </motion.div>
        </section>

        <section
          id="benefits"
          className="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Hannah?
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Move faster, learn deeper, and unlock new insights with a powerful
              AI assistant by your side.
            </p>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={Zap}
              title="Blazing Fast Insights"
              description="Get answers from your documents in seconds, not hours. Our AI processes information at lightning speed."
            />
            <BenefitCard
              icon={BrainCircuit}
              title="Deeper Understanding"
              description="Go beyond surface-level knowledge. Hannah helps you connect ideas, uncover hidden themes, and truly understand your subject matter."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Secure & Private"
              description="Your data is yours alone. All analysis is performed in a secure environment, ensuring your privacy and confidentiality."
            />
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Animate every time it comes into view
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of learners who are already using Hannah to unlock
              their potential and accelerate their research.
            </p>
            <motion.button
              onClick={onDefaultActionClick}
              className="relative text-lg font-bold py-4 px-10 rounded-full
                         bg-gradient-to-r from-white via-gray-100 to-gray-300
                         text-gray-900 shadow-lg
                         hover:from-gray-700 hover:via-gray-800 hover:to-black
                         hover:text-white hover:shadow-gray-500/60
                         transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Your Journey Today</span>
            </motion.button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};
