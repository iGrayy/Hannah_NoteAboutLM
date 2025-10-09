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
import ResourceHubPanel from './components/ResourceHubPanel';
import CareerPathExplorer from './components/CareerPathExplorer';
import MindmapPanel from './components/MindmapPanel';
import ProgressDashboard from './components/ProgressDashboard';
import AIArtifactPanel from './components/AIArtifactPanel';
import APIStatus from './components/APIStatus';
import SetupGuide from './components/SetupGuide';
import SubjectsPage from './components/SubjectsPage';
import HomePage from './components/HomePage';
import LearningPathPage from './components/LearningPathPage';

function App() {
  const [sources, setSources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeSourceId, setActiveSourceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('studio'); // studio | resources | career | mindmap | artifacts | progress
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'main' | 'subjects' | 'learning-path'

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

  const handleNavigateToMain = (searchQuery = '') => {
    setCurrentPage('main');
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  };

  const handleNavigateToSubjects = () => {
    setCurrentPage('subjects');
  };

  const handleNavigateToLearningPath = () => {
    setCurrentPage('learning-path');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {currentPage === 'home' ? (
        <HomePage onNavigateToMain={handleNavigateToMain} onNavigateToSubjects={handleNavigateToSubjects} onNavigateToLearningPath={handleNavigateToLearningPath} />
      ) : (
        <>
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
            {currentPage === 'subjects' ? (
              <SubjectsPage onBack={() => setCurrentPage('main')} onNavigateToMain={handleNavigateToMain} />
            ) : currentPage === 'learning-path' ? (
              <LearningPathPage onBack={() => setCurrentPage('main')} />
            ) : (
              <>
                {/* Left Panel - Sources */}
                <AnimatePresence>
                  {isSourcesOpen ? (
                    <motion.div
                      initial={{ x: -300 }}
                      animate={{ x: 0 }}
                      exit={{ x: -300 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                        onTogglePanel={() => setIsSourcesOpen(false)}
                        onNavigateToSubjects={() => setCurrentPage('subjects')}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ x: -80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -80, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-3 gap-4"
                    >
                      <button
                        onClick={() => setIsSourcesOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white"
                        title="Mở Nguồn"
                      >
                        <ChevronDown className="w-4 h-4 rotate-90" />
                      </button>
                      <button
                        onClick={() => addSource({ title: 'Nguồn mới', content: '', type: 'text' })}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Thêm nguồn"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                      <label
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center cursor-pointer"
                        title="Tải lên"
                      >
                        <Upload className="w-4 h-4 text-white" />
                        <input type="file" className="hidden" onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            addSource({ title: file.name, content: ev.target.result || '', type: file.type.includes('image') ? 'image' : 'file' });
                          };
                          reader.readAsText(file);
                        }} />
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Center Panel - Conversation */}
                <div className="flex-1 flex flex-col bg-gray-900">
                  <div className="flex-1 flex flex-col">
                    <ConversationPanel
                      source={activeSource}
                      conversations={conversations}
                      onUpdateConversations={setConversations}
                    />
                  </div>
                </div>

                {/* Right Panel - Studio */}
                <AnimatePresence>
                  {isStudioOpen ? (
                    <motion.div
                      initial={{ x: 400 }}
                      animate={{ x: 0 }}
                      exit={{ x: 400 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col"
                    >
                      {activeRightTab === 'studio' && (
                        <StudioPanel
                          source={activeSource}
                          onTogglePanel={() => setIsStudioOpen(false)}
                        />
                      )}
                      {activeRightTab === 'resources' && (
                        <ResourceHubPanel topic={activeSource?.title || 'Software Engineering'} />
                      )}
                      {activeRightTab === 'career' && (
                        <CareerPathExplorer />
                      )}
                      {activeRightTab === 'mindmap' && (
                        <MindmapPanel />
                      )}
                      {activeRightTab === 'artifacts' && (
                        <AIArtifactPanel />
                      )}
                      {activeRightTab === 'progress' && (
                        <ProgressDashboard />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 80, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-16 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-3 gap-4"
                    >
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white"
                        title="Mở Studio"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng quan âm thanh"
                      >
                        <Brain className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng quan video"
                      >
                        <Video className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bản đồ tư duy"
                      >
                        <Map className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Báo cáo"
                      >
                        <Report className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Thẻ ghi nhớ"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bài kiểm tra"
                      >
                        <HelpCircle className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Studio compact rail replaces floating toggle when collapsed */}
                {/* Sources compact rail replaces floating toggle when collapsed */}
              </>
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
        </>
      )}
    </div>
  );
}

export default App;
