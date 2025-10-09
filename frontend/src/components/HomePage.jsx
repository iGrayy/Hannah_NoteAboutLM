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
            category: 'Khoa học Trái đất',
            categoryColor: 'text-red-500',
            categoryIcon: Mountain,
            title: 'Núi lửa hình thành như thế nào và điều gì khiến chúng phun trào?',
            description: 'Hành trình khám phá bên trong Trái đất để hiểu các quá trình dẫn đến hoạt động núi lửa, từ chuyển động của các mảng kiến tạo đến các vụ phun trào bùng nổ và tác động của chúng đến cảnh quan.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 2,
            category: 'Công nghệ',
            categoryColor: 'text-green-500',
            categoryIcon: Cpu,
            title: 'Internet of Things là gì và nó đang thay đổi cuộc sống của chúng ta như thế nào?',
            description: 'Khám phá mạng lưới thiết bị kết nối ngày càng phát triển, những lợi ích và rủi ro tiềm ẩn của chúng, cũng như tác động đến các ngành công nghiệp khác nhau và cuộc sống hàng ngày.',
            hasImage: false
        },
        {
            id: 3,
            category: 'Sinh học',
            categoryColor: 'text-green-500',
            categoryIcon: Leaf,
            title: 'Các loài chim khác nhau xây tổ như thế nào?',
            description: 'Khám phá sự đa dạng đáng kinh ngạc của tổ chim, từ các cấu trúc dệt phức tạp đến những chiếc cốc bùn đơn giản, và sự thích nghi độc đáo của các loài chim khác nhau.',
            image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 4,
            category: 'Kinh tế',
            categoryColor: 'text-blue-500',
            categoryIcon: TrendingUp,
            title: 'Nguyên nhân và hậu quả của suy thoái kinh tế là gì?',
            description: 'Đi sâu vào các chu kỳ kinh tế, lực lượng thị trường và các phản ứng chính sách định hình thế giới tài chính của chúng ta.',
            hasImage: false
        },
        {
            id: 5,
            category: 'Sinh học',
            categoryColor: 'text-green-500',
            categoryIcon: Leaf,
            title: 'Côn trùng đóng vai trò quan trọng như thế nào trong hệ sinh thái của chúng ta?',
            description: 'Khám phá thế giới hấp dẫn của côn trùng và những đóng góp quan trọng của chúng cho việc thụ phấn, phân hủy và cân bằng sinh thái.',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
            hasImage: true
        },
        {
            id: 6,
            category: 'Lịch sử',
            categoryColor: 'text-amber-600',
            categoryIcon: Scroll,
            title: 'Những sự kiện quan trọng nào đã định hình thời kỳ Phục hưng?',
            description: 'Khám phá những cuộc cách mạng văn hóa, nghệ thuật và khoa học đã biến đổi châu Âu và ảnh hưởng đến thế giới hiện đại.',
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
                        Bạn muốn tìm hiểu về điều gì?
                    </h1>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="flex items-center bg-gray-800 rounded-full px-6 py-4 border border-gray-700 hover:border-gray-600 transition-colors">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Hỏi Hannah Learn About"
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
                            Quyền riêng tư
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Điều khoản dịch vụ
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
