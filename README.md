# Google Notebook

A modern, Google Docs-inspired note-taking application with AI integration, built with React + Vite and Node.js.

## Features

- **Clean Google-style UI**: Light theme with minimal design inspired by Google Docs
- **3-Column Layout**: 
  - Left: Notebook list with search and "New Note" button
  - Center: Rich text editor with auto-save
  - Right: AI Assistant chat panel
- **Smart Note Management**: 
  - Auto-save functionality
  - Search notes by title or content
  - Local storage persistence
- **AI Integration**: 
  - Summarize notes
  - Extract action items
  - Improve note content
  - Custom AI chat

## Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons

### Backend
- Node.js + Express
- Google Generative AI (Gemini Pro)
- CORS enabled for frontend communication

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google AI Studio API Key

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Configuration

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Edit `.env` and add your Google AI Studio API Key:
```
GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here
PORT=3001
```

### 3. Get Google AI Studio API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env` file

**💡 Quick Setup:**
- Run `npm run setup` to install all dependencies
- Add your API key to `.env` file
- Run `npm start` to launch both frontend and backend

### 4. Running the Application

#### Option 1: Run Both Frontend and Backend (Recommended)
```bash
npm start
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

## Project Structure

```
google-notebook/
├── package.json                 # Root package.json with scripts
├── server.js                    # Express backend server
├── env.example                  # Environment variables template
├── .env                         # Your environment variables (create this)
└── frontend/                    # React frontend
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── NotebookList.jsx
            ├── Editor.jsx
            └── AIPanel.jsx
```

## Usage

### Creating Notes
- Click "New Note" in the left sidebar
- Start typing in the editor
- Notes are automatically saved

### Searching Notes
- Use the search bar in the left sidebar
- Search by title or content

### AI Features
- **Summarize**: Get a 2-3 sentence summary of your note
- **Action Items**: Extract tasks and action items
- **Improve Note**: Get suggestions for better structure and clarity
- **Custom Chat**: Ask AI anything about your notes

### Keyboard Shortcuts
- `Tab`: Insert indentation in the editor
- `Enter`: Send message in AI chat

## API Endpoints

### POST /api/ai
Send a prompt to the AI and get a response.

**Request:**
```json
{
  "prompt": "Summarize this note: ..."
}
```

**Response:**
```json
{
  "text": "AI response here..."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development

### Available Scripts

**Root Level:**
- `npm install-all`: Install all dependencies
- `npm run dev`: Start frontend development server
- `npm run server`: Start backend server
- `npm start`: Start both frontend and backend concurrently

**Frontend:**
- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Customization

- **Styling**: Modify `frontend/src/index.css` and `frontend/tailwind.config.js`
- **AI Model**: Change the model in `server.js` (currently using "gemini-pro")
- **Auto-save Delay**: Adjust the timeout in `Editor.jsx` (currently 500ms)

## Security Notes

- ✅ API key is stored server-side only
- ✅ CORS is properly configured
- ✅ No sensitive data exposed in frontend
- ✅ Input validation on API endpoints

## Troubleshooting

### Common Issues

1. **AI not responding**: 
   - Check if backend server is running
   - Verify API key in `.env` file
   - Check browser console for errors

2. **Notes not saving**:
   - Check browser localStorage
   - Ensure JavaScript is enabled

3. **CORS errors**:
   - Make sure backend is running on port 3001
   - Check Vite proxy configuration

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your `.env` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.
