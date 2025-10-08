import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  FileText,
  Send,
  Bot,
  Sparkles,
  CheckSquare,
  List,
  Save,
  Upload,
  Lock,
  Settings,
  Grid3X3,
  User,
  ChevronDown,
  Filter,
  Edit3,
  Brain,
  Video,
  Map,
  FileText as Report,
  Star,
  HelpCircle,
  Sparkles as SparkleIcon
} from 'lucide-react';
import SourcesPanel from './components/SourcesPanel';
import ConversationPanel from './components/ConversationPanel';
import StudioPanel from './components/StudioPanel';
import APIStatus from './components/APIStatus';
import SetupGuide from './components/SetupGuide';

function App() {
  const [sources, setSources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeSourceId, setActiveSourceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // Load sources from localStorage on mount
  useEffect(() => {
    const savedSources = localStorage.getItem('notebook-sources');
    if (savedSources) {
      const parsedSources = JSON.parse(savedSources);
      setSources(parsedSources);
      if (parsedSources.length > 0 && !activeSourceId) {
        setActiveSourceId(parsedSources[0].id);
      }
    }
  }, []);

  // Save sources to localStorage whenever sources change
  useEffect(() => {
    if (sources.length > 0) {
      localStorage.setItem('notebook-sources', JSON.stringify(sources));
    }
  }, [sources]);

  const addSource = (source) => {
    const newSource = {
      id: Date.now().toString(),
      title: source.title || 'Untitled Source',
      content: source.content || '',
      type: source.type || 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSources(prev => [newSource, ...prev]);
    setActiveSourceId(newSource.id);

    // Clear conversations when adding new source
    setConversations([]);
  };

  const updateSource = (id, updates) => {
    setSources(prev => prev.map(source =>
      source.id === id
        ? { ...source, ...updates, updatedAt: new Date().toISOString() }
        : source
    ));
  };

  const deleteSource = (id) => {
    setSources(prev => prev.filter(source => source.id !== id));
    if (activeSourceId === id) {
      const remainingSources = sources.filter(source => source.id !== id);
      setActiveSourceId(remainingSources.length > 0 ? remainingSources[0].id : null);
    }
  };

  const filteredSources = sources.filter(source =>
    source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSource = sources.find(source => source.id === activeSourceId);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Untitled notebook</h1>
          </div>

          <div className="flex items-center gap-4">
            <APIStatus />
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Chia sẻ</span>
            </button>
            <button
              onClick={() => setShowSetupGuide(true)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Cài đặt</span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <Grid3X3 className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Sources */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col"
        >
          <SourcesPanel
            sources={filteredSources}
            activeSourceId={activeSourceId}
            onSelectSource={setActiveSourceId}
            onDeleteSource={deleteSource}
            onAddSource={addSource}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </motion.div>

        {/* Center Panel - Conversation */}
        <div className="flex-1 flex flex-col bg-gray-900">
          <ConversationPanel
            source={activeSource}
            conversations={conversations}
            onUpdateConversations={setConversations}
          />
        </div>

        {/* Right Panel - Studio */}
        <AnimatePresence>
          {isStudioOpen && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <StudioPanel
                source={activeSource}
                onTogglePanel={() => setIsStudioOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Studio Toggle Button */}
        {!isStudioOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsStudioOpen(true)}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <Bot className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-2">
        <p className="text-xs text-gray-400">
          NotebookLM có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
        </p>
      </div>

      {/* Setup Guide Modal */}
      <SetupGuide
        isOpen={showSetupGuide}
        onClose={() => setShowSetupGuide(false)}
      />
    </div>
  );
}

export default App;
