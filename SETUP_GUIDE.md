# Hướng dẫn thiết lập Google Notebook với Gemini AI

## 🚀 Thiết lập nhanh

### 1. Cài đặt API Key

1. **Lấy API Key từ Google AI Studio:**
   - Truy cập: https://makersuite.google.com/app/apikey
   - Đăng nhập bằng tài khoản Google
   - Nhấp "Create API Key"
   - Sao chép API key

2. **Cấu hình trong file .env:**
   ```bash
   GOOGLE_AI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

3. **Khởi động lại server:**
   ```bash
   npm run server
   ```

### 2. Kiểm tra kết nối

- Mở ứng dụng tại: http://localhost:3000
- Kiểm tra trạng thái API trong header (màu xanh = OK)
- Nếu có lỗi, nhấp "Cài đặt" để xem hướng dẫn chi tiết

## 🎯 Tính năng đã hiện thực

### ✅ Quản lý nguồn (Sources)
- **Thêm nguồn mới**: Click "Thêm" → nhập tiêu đề và nội dung
- **Tải file lên**: Click "Tải lên" → chọn file (.txt, .pdf, .doc, .md)
- **Xem trước nguồn**: Click vào nguồn để xem nội dung
- **Xóa nguồn**: Click icon thùng rác

### ✅ Cuộc trò chuyện với AI
- **Chat thông minh**: Đặt câu hỏi về nguồn đã chọn
- **Hiển thị nội dung nguồn**: Xem trước nội dung trong cuộc trò chuyện
- **Tự động cuộn**: Tin nhắn mới tự động cuộn xuống
- **Loading animation**: Hiển thị trạng thái AI đang suy nghĩ

### ✅ Studio AI Tools
- **Tổng quan âm thanh**: Tạo script podcast từ nguồn
- **Tổng quan video**: Tạo kịch bản video
- **Bản đồ tư duy**: Tạo sơ đồ tư duy dạng text
- **Báo cáo**: Tạo báo cáo chuyên nghiệp
- **Thẻ ghi nhớ**: Tạo flashcards học tập
- **Bài kiểm tra**: Tạo câu hỏi trắc nghiệm

### ✅ Giao diện NotebookLM
- **Theme tối**: Giao diện dark mode giống NotebookLM
- **3 cột layout**: Sources, Conversation, Studio
- **Header với controls**: Logo, chia sẻ, cài đặt, profile
- **Footer disclaimer**: Cảnh báo về độ chính xác AI
- **Animation mượt**: Framer Motion cho trải nghiệm tốt

## 🔧 Cấu hình nâng cao

### Environment Variables
```bash
# .env file
GOOGLE_AI_API_KEY=your_gemini_api_key
PORT=3001
NODE_ENV=development
```

### API Endpoints
- `GET /api/health` - Kiểm tra trạng thái server
- `POST /api/ai` - Gửi prompt đến Gemini AI

### Local Storage
- Nguồn được lưu trong `notebook-sources`
- Tự động lưu khi thêm/sửa nguồn
- Dữ liệu persistent giữa các phiên

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **"API không phản hồi"**
   - Kiểm tra server backend có chạy không: `npm run server`
   - Kiểm tra API key trong .env
   - Restart server sau khi thay đổi .env

2. **"Không thể kết nối đến API"**
   - Kiểm tra CORS settings
   - Đảm bảo port 3001 không bị chiếm
   - Kiểm tra firewall/antivirus

3. **"AI không trả lời"**
   - Kiểm tra API key có đúng không
   - Kiểm tra quota trong Google AI Studio
   - Xem console để debug

### Debug Commands:
```bash
# Kiểm tra server
curl http://localhost:3001/api/health

# Kiểm tra frontend
curl http://localhost:3000

# Xem logs
npm run server
```

## 📱 Sử dụng ứng dụng

### Workflow cơ bản:
1. **Thêm nguồn** → Click "Thêm" hoặc "Tải lên"
2. **Chọn nguồn** → Click vào nguồn trong danh sách
3. **Chat với AI** → Đặt câu hỏi về nguồn
4. **Sử dụng Studio** → Tạo nội dung AI từ nguồn

### Tips sử dụng:
- **Nguồn chất lượng cao** → AI trả lời tốt hơn
- **Câu hỏi cụ thể** → Kết quả chính xác hơn
- **Sử dụng Studio tools** → Tạo nội dung đa dạng
- **Kiểm tra API status** → Đảm bảo kết nối ổn định

## 🎉 Hoàn thành!

Bạn đã có một ứng dụng NotebookLM hoàn chỉnh với:
- ✅ Giao diện đẹp giống NotebookLM
- ✅ AI integration với Gemini
- ✅ Quản lý nguồn thông minh
- ✅ Studio tools đa dạng
- ✅ Chat AI thông minh

Hãy thử thêm nguồn và khám phá các tính năng AI! 🚀
