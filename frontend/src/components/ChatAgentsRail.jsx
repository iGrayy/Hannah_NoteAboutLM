import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const agents = [
    { id: 'explainer', label: 'Giải thích khái niệm', emoji: '🧑‍🏫' },
    { id: 'career', label: 'Tư vấn nghề nghiệp', emoji: '💼' },
    { id: 'reviewer', label: 'Đánh giá mã nguồn', emoji: '💻' },
    { id: 'recommender', label: 'Gợi ý tài nguyên', emoji: '📚' },
];

const ChatAgentsRail = ({ activeAgentId, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            {agents.map((agent, index) => (
                <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onChange(agent.id)}
                    className={`studio-card group cursor-pointer ${activeAgentId === agent.id ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
                    title={agent.label}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-lg">{agent.emoji}</div>
                            <div>
                                <h3 className="text-sm font-medium text-white">{agent.label}</h3>
                            </div>
                        </div>
                        {activeAgentId === agent.id && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ChatAgentsRail;


