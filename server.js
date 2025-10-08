const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// AI endpoint
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    // Use Gemini 2.0 Flash with enhanced configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`AI Request processed successfully. Prompt length: ${prompt.length}, Response length: ${text.length}`);
    res.json({ text });
  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({
      error: 'Failed to process AI request',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    model: 'gemini-2.0-flash',
    apiKeyConfigured: !!process.env.GOOGLE_AI_API_KEY
  });
});

// Test AI endpoint
app.post('/api/test-ai', async (req, res) => {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Xin chào! Hãy giới thiệu ngắn gọn về bản thân.");
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      model: 'gemini-2.0-flash',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test AI Error:', error);
    res.status(500).json({
      error: 'Failed to test AI',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AI endpoint: http://localhost:${PORT}/api/ai`);
});
