import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import {
  Zap,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";
import FeatureSection from "./FeatureSection";
import BenefitCard from "./BenefitCard";
import { ProfileMenu } from "../common/ProfileMenu";
import CrystalNebulaBackground from "./CrystalNebulaBackground";
import FAQCard from "../common/FAQCard";
import faqApi from "../../services/faqApi";

interface HomePageProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onDefaultActionClick: (prompt?: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onProfileClick: () => void;
}





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
              Đăng nhập
            </motion.button>
            <motion.button
              onClick={onSignUpClick} // This will also trigger the auth modal
              className="bg-white text-gray-900 font-semibold py-2 px-5 rounded-full flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng ký
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
        Mở khóa tiềm năng học tập của bạn
      </motion.h1>
      <motion.p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        Hannah là trợ lý nghiên cứu AI cá nhân của bạn, được thiết kế để giúp bạn
        phân tích tài liệu, tạo ý tưởng và nắm vững các chủ đề mới nhanh hơn
        bao giờ hết.
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
          <span className="relative z-10">Bắt đầu cuộc trò chuyện</span>
        </motion.button>
      </motion.div>
    </motion.div>
  </section>
);

export const HomePage: React.FC<HomePageProps> = ({
  onLoginClick,
  onSignUpClick,
  onDefaultActionClick,
  isLoggedIn,
  onLogout,
  onProfileClick,
}) => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const dragDistance = useRef(0);

  // Load FAQ data on component mount
  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const response = await faqApi.getFAQs();
        if (response.success) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.error('Error loading FAQs:', error);
      }
    };
    loadFaqs();
  }, []);

  const cardWidth = 400; // width 1 card + gap
  const totalWidth = cardWidth * faqs.length;

  // Clone items 2 lần
  const infiniteItems = [...faqs, ...faqs];

  // Handle FAQ click with drag detection
  const handleFAQClick = (faq: any) => {
    // Only trigger click if not dragging and drag distance is minimal
    if (!isDragging.current && dragDistance.current < 5) {
      if (isLoggedIn) {
        onDefaultActionClick(faq.question);
      } else {
        onLoginClick();
      }
    }
  };

  useAnimationFrame(() => {
    if (!isDragging.current && faqs.length > 0) {
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
        <HeroSection onActionClick={() => onDefaultActionClick()} />

        <div id="features" className="py-1">
          <FeatureSection
            title="Phân tích tài liệu thông minh"
            description="Tải lên tài liệu, PDF hoặc thậm chí liên kết đến các trang web. AI của Hannah sẽ đọc và hiểu nội dung, chuẩn bị cho việc phân tích sâu và trò chuyện."
            imageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            reverse={false}
            iconType="document"
          />
          <FeatureSection
            title="Học tập qua trò chuyện"
            description="Trò chuyện với tài liệu của bạn như thể bạn đang nói chuyện với một chuyên gia. Đặt câu hỏi phức tạp, nhận tóm tắt và tìm thông tin quan trọng trong vài giây. Việc học chưa bao giờ tương tác hơn thế."
            imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            reverse={true}
            iconType="conversation"
          />
          <FeatureSection
            title="Công cụ Studio sáng tạo"
            description="Vượt xa việc hỏi đáp đơn giản. Sử dụng Studio để tạo sơ đồ tư duy, tạo thẻ ghi nhớ, xây dựng bài kiểm tra và thậm chí soạn thảo báo cáo dựa trên tài liệu nguồn của bạn. Biến thông tin thành kiến thức."
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
          onDragStart={() => {
            isDragging.current = true;
            dragDistance.current = 0;
          }}
          onDrag={(_, info) => {
            dragDistance.current = Math.abs(info.offset.x);
          }}
          onDragEnd={() => {
            isDragging.current = false;
            // Reset drag distance after a short delay to allow click handler to check
            setTimeout(() => {
              dragDistance.current = 0;
            }, 100);
          }}
        >
          {infiniteItems.map((faq, index) => (
            <motion.div
              key={`${faq.id}-${index}`}
              className="flex-shrink-0 w-96"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <FAQCard
                faq={faq}
                index={index}
                onClick={handleFAQClick}
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
              Tại sao chọn Hannah?
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Di chuyển nhanh hơn, học sâu hơn và mở khóa những hiểu biết mới với
              trợ lý AI mạnh mẽ bên cạnh bạn.
            </p>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={Zap}
              title="Hiểu biết nhanh như chớp"
              description="Nhận câu trả lời từ tài liệu của bạn trong vài giây, không phải hàng giờ. AI của chúng tôi xử lý thông tin với tốc độ ánh sáng."
            />
            <BenefitCard
              icon={BrainCircuit}
              title="Hiểu biết sâu sắc"
              description="Vượt xa kiến thức bề mặt. Hannah giúp bạn kết nối các ý tưởng, khám phá các chủ đề ẩn và thực sự hiểu rõ chủ đề của mình."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Bảo mật & Riêng tư"
              description="Dữ liệu của bạn chỉ thuộc về bạn. Tất cả phân tích được thực hiện trong môi trường an toàn, đảm bảo quyền riêng tư và bảo mật của bạn."
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
              Sẵn sàng thay đổi cách học của bạn?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Tham gia cùng hàng nghìn học viên đã sử dụng Hannah để mở khóa
              tiềm năng và tăng tốc nghiên cứu của họ.
            </p>
            <motion.button
              onClick={() => onDefaultActionClick()}
              className="relative text-lg font-bold py-4 px-10 rounded-full
                         bg-gradient-to-r from-white via-gray-100 to-gray-300
                         text-gray-900 shadow-lg
                         hover:from-gray-700 hover:via-gray-800 hover:to-black
                         hover:text-white hover:shadow-gray-500/60
                         transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Bắt đầu hành trình của bạn ngay hôm nay</span>
            </motion.button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};
