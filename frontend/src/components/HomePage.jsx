import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, Upload, Mountain, Cpu, Leaf, TrendingUp, Scroll, Target, X } from 'lucide-react';
import LearningCard from './LearningCard';

const HomePage = ({ onNavigateToMain, onStartBlankConversation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingAttachment, setPendingAttachment] = useState(null);
    const fileInputRef = useRef(null);

    const handleSearch = () => {
        const query = searchQuery.trim() ? searchQuery : '';
        // Navigate to main app; include pendingAttachment if any
        onNavigateToMain(query, pendingAttachment);
        // Clear local attachment after navigating
        setPendingAttachment(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const attachment = { name: file.name, type: file.type || 'file', size: file.size };
            // Only store attachment; allow user to continue typing before sending
            setPendingAttachment(attachment);
        }
    };

    const learningCards = [
        {
            id: 1,
            category: 'Earth Science',
            categoryColor: 'text-red-500',
            categoryIcon: Mountain,
            title: 'How do volcanoes form, and what causes them to erupt?',
            description: 'Journey to the Earth\'s interior to understand the processes that lead to volcanic activity, from the movement of tectonic plates to explosive eruptions and their impact on the landscape.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 2,
            category: 'Technology',
            categoryColor: 'text-green-500',
            categoryIcon: Cpu,
            title: 'What is the Internet of Things, and how is it changing our lives?',
            description: 'Explore the growing network of connected devices, their potential benefits and risks, and their impact on various industries and daily life.',
            hasImage: false
        },
        {
            id: 3,
            category: 'Biology',
            categoryColor: 'text-green-500',
            categoryIcon: Leaf,
            title: 'How do different species of birds build their nests?',
            description: 'Explore the incredible diversity of bird nests, from intricate woven structures to simple mud cups, and the unique adaptations of different bird species.',
            image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 4,
            category: 'Economics',
            categoryColor: 'text-blue-500',
            categoryIcon: TrendingUp,
            title: 'What are the causes and consequences of economic recessions?',
            description: 'Dive deep into economic cycles, market forces, and policy responses that shape our financial world.',
            hasImage: false
        },
        {
            id: 5,
            category: 'Biology',
            categoryColor: 'text-green-500',
            categoryIcon: Leaf,
            title: 'How do insects play a vital role in our ecosystem?',
            description: 'Explore the fascinating world of insects and their crucial contributions to pollination, decomposition, and ecological balance.',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 6,
            category: 'History',
            categoryColor: 'text-amber-600',
            categoryIcon: Scroll,
            title: 'What were the key events that shaped the Renaissance?',
            description: 'Discover the cultural, artistic, and scientific revolutions that transformed Europe and influenced the modern world.',
            hasImage: false
        }
    ];


    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                            Hannah
                        </span>
                        <span className="text-xl text-gray-300">Learn About</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">U</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-light text-gray-200 mb-8">
                        What would you like to learn about?
                    </h1>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="flex items-center bg-gray-800 rounded-full px-6 py-4 border border-gray-700 hover:border-gray-600 transition-colors">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask Learn About"
                                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                            />
                            {pendingAttachment && (
                                <div className="ml-3 flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1 max-w-[50%]">
                                    <div className="w-5 h-5 rounded bg-red-500/80 text-white text-[10px] flex items-center justify-center">PDF</div>
                                    <span className="text-xs text-gray-200 truncate">{pendingAttachment.name}</span>
                                    <button onClick={() => setPendingAttachment(null)} className="p-1 text-gray-400 hover:text-white" title="Gỡ tệp">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="ml-2 p-2 text-gray-400 hover:text-white transition-colors"
                                title="Tải file lên"
                            >
                                <Upload className="w-5 h-5" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>
                        {/* Removed external attachment chip; inline chip remains inside the input row */}
                    </div>

                    {/* Quick start button */}
                    <div className="text-center">
                        <button
                            onClick={onStartBlankConversation}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Bắt đầu trò chuyện
                        </button>
                    </div>
                </div>
            </main>

            {/* Learning Cards Section */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {learningCards.map((card, index) => (
                            <LearningCard
                                key={card.id}
                                card={card}
                                index={index}
                                onClick={() => {
                                    // Handle card click - could navigate to specific topic
                                    console.log('Clicked on:', card.title);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-gray-400">Hannah</span>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
