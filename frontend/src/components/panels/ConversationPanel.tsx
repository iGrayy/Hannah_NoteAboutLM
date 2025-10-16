import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Paperclip,
    Bot,
    X,
    File
} from 'lucide-react';
import { InteractiveTimeline } from '../common/InteractiveTimeline';
import { LearningResources } from '../common/LearningResources';
import { TerminologyTable } from '../common/TerminologyTable';
import { RelatedVideos } from '../common/RelatedVideos';
import { ImageGallery } from '../common/ImageGallery';
import { BotMessageToolbar } from '../common/BotMessageToolbar';





interface ConversationPanelProps {
    source?: any;
    messages: any[];
    onUpdateConversations?: (conversations: any[]) => void;
    currentConversation?: any;
    onUpdateConversationTitle?: (id: string, title: string) => void;
    onAutoCreateNewChat?: (title: string) => Promise<any>;
    onSendMessage?: (text: string) => Promise<void>;
}

const ConversationPanel: React.FC<ConversationPanelProps> = ({
    messages,
    onSendMessage
}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [attachment, setAttachment] = useState<any | null>(null);


    // Debug log để kiểm tra dữ liệu
    console.log('ConversationPanel Debug:', {
        messagesLength: messages.length,
        messages: messages,
        messagesRef: messages === messages // Check if reference changes
    });

    // Force re-render when messages change
    useEffect(() => {
        console.log('ConversationPanel useEffect triggered - messages changed:', messages.length);
    }, [messages]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

      const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        if (onSendMessage) {
            const messageText = inputMessage.trim();
            setInputMessage(''); // Clear input immediately

            await onSendMessage(messageText);
        } else {
            console.error("onSendMessage prop is not defined");
        }
    };
    const handleLearningPathAction = async (action: 'simplify' | 'goDeeper' | 'getImages') => {
        const actionText = action === 'simplify' ? 'Đơn giản hóa' : action === 'goDeeper' ? 'Tìm hiểu sâu hơn' : 'Lấy hình ảnh';
        if (onSendMessage) {
            await onSendMessage(actionText);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAttachment = { name: file.name, type: file.type, size: file.size };
            setAttachment(newAttachment);

            // File uploaded, ready to send with message
        }
    };



    return (
        <div className="flex flex-col h-full bg-gray-900">
            {/* Scrollable Chat Content */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4" style={{ paddingBottom: '140px' }}>
                {messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-medium text-white mb-2">Chào mừng đến với Hannah</h3>
                            <p className="text-gray-400 mb-4">
                                Hãy cùng khám phá và bắt đầu đặt câu hỏi! Cuộc trò chuyện sẽ được tự động tạo khi bạn gửi tin nhắn.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message: any) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-center'}`}>
                            {message.sender === 'user' ? (
                                <div className="max-w-md p-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500/30 backdrop-blur-sm">
                                    <div className="text-sm whitespace-pre-wrap font-medium">{message.text}</div>
                                    <div className="text-xs text-blue-100 mt-2 opacity-80">
                                        {message.timestamp ? new Date(message.timestamp).toLocaleString('vi-VN') : ''}
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full max-w-5xl">
                                    <div className="space-y-6">
                                        {message.richContent ? (
                                            <div className="space-y-8">
                                                {message.responseType === 'faq' && message.faqData && (
                                                    <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                                                        <h4 className="text-blue-100 font-semibold text-lg">
                                                            {message.faqData.question}
                                                        </h4>
                                                    </div>
                                                )}
                                                <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-600/50 shadow-lg backdrop-blur-sm">
                                                    <p className="text-gray-200 leading-relaxed text-lg">
                                                        {message.richContent.introduction || message.text}
                                                    </p>
                                                </div>
                                                <div className="space-y-8">
                                                    {message.richContent.interactiveTimeline && (
                                                        <InteractiveTimeline
                                                            title={message.richContent.interactiveTimeline.title}
                                                            stages={message.richContent.interactiveTimeline.stages}
                                                        />
                                                    )}
                                                    {message.richContent.learningResources && (
                                                        <LearningResources
                                                            title={message.richContent.learningResources.title}
                                                            resources={message.richContent.learningResources.resources}
                                                        />
                                                    )}
                                                    {message.richContent.terminologyTable && (
                                                        <TerminologyTable
                                                            title={message.richContent.terminologyTable.title}
                                                            terms={message.richContent.terminologyTable.terms}
                                                            headers={message.richContent.terminologyTable.headers}
                                                        />
                                                    )}
                                                    {message.richContent.imageGallery && (
                                                        <ImageGallery
                                                            title={message.richContent.imageGallery.title}
                                                            images={message.richContent.imageGallery.images}
                                                        />
                                                    )}
                                                    {message.richContent.relatedVideos && (
                                                        <RelatedVideos
                                                            title={message.richContent.relatedVideos.title}
                                                            videos={message.richContent.relatedVideos.videos}
                                                        />
                                                    )}
                                                    {/* {message.richContent.exploration && (
                                                        <ExplorationPanel
                                                            title={message.richContent.exploration.title}
                                                            sources={message.richContent.exploration.sources}
                                                            onSendMessage={onSendMessage}
                                                        />
                                                    )} */}
                                                </div>
                                                <BotMessageToolbar onAction={handleLearningPathAction} />
                                            </div>
                                        ) : (
                                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-600/50 shadow-lg backdrop-blur-sm">
                                                <p className="text-gray-200 leading-relaxed">
                                                    {message.text}
                                                </p>
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400 mt-4">
                                            {message.timestamp ? new Date(message.timestamp).toLocaleString('vi-VN') : ''}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        ))}


                    </>
                )}
            </div>

            <div className="p-4 border-t border-gray-700">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
                    {attachment && (
                        <div className="mb-2">
                            <div className="inline-flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
                                <File className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-white">{attachment.name}</span>
                                <button onClick={() => setAttachment(null)} className="p-1 text-gray-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={messages.length === 0 ? "Nhập câu hỏi của bạn để bắt đầu cuộc trò chuyện mới..." : "Ask Hannah anything..."}
                            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            title="Upload File">
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() && !attachment}
                            className="p-2 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white"
                            title="Send Message">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ConversationPanel;
