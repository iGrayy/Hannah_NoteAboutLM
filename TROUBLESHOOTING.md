# 🔧 Hướng dẫn khắc phục lỗi API Key

## ❌ Lỗi hiện tại
```
models/gemini-pro is not found for API version v1
```

## 🔍 Các bước kiểm tra

### 1. Kiểm tra API Key
Đảm bảo file `.env` có nội dung chính xác:
```bash
GOOGLE_AI_API_KEY=AIzaSyDDiIXnpX-V4WYa5vwzOWIqP3jBTNU8nCo
PORT=3001
```

### 2. Kiểm tra quyền truy cập
- Truy cập: https://makersuite.google.com/app/apikey
- Đảm bảo API key vẫn hoạt động
- Kiểm tra quota và billing

### 3. Test API key trực tiếp
Sử dụng cURL command bạn đã cung cấp:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyDDiIXnpX-V4WYa5vwzOWIqP3jBTNU8nCo' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Hello, how are you?"
          }
        ]
      }
    ]
  }'
```

### 4. Cập nhật server để sử dụng Gemini 2.0 Flash
Nếu cURL hoạt động, hãy cập nhật server để sử dụng model đúng:

```javascript
// Trong server.js, thay đổi:
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
```

### 5. Kiểm tra version API
Có thể cần sử dụng v1beta thay vì v1:
```javascript
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY, {
  apiVersion: 'v1beta'
});
```

## 🚀 Giải pháp nhanh

1. **Test cURL trước**: Đảm bảo API key hoạt động với cURL
2. **Cập nhật model**: Sử dụng `gemini-2.0-flash` thay vì `gemini-pro
3. **Kiểm tra .env**: Đảm bảo API key được lưu đúng
4. **Restart server**: Sau khi thay đổi .env

## 📞 Nếu vẫn lỗi
- Kiểm tra billing trong Google Cloud Console
- Tạo API key mới
- Kiểm tra region restrictions
- Liên hệ Google AI Studio support
