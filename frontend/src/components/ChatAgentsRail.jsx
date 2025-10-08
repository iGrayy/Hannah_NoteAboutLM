import React from 'react';

const agents = [
    { id: 'explainer', label: 'Concept Explainer', emoji: '🧑‍🏫' },
    { id: 'career', label: 'Career Advisor', emoji: '💼' },
    { id: 'reviewer', label: 'Code Reviewer', emoji: '💻' },
    { id: 'recommender', label: 'Resource Recommender', emoji: '📚' },
];

const ChatAgentsRail = ({ activeAgentId, onChange }) => {
    return (
        <div className="space-y-1">
            {agents.map((a) => (
                <button
                    key={a.id}
                    onClick={() => onChange(a.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border border-gray-700 ${activeAgentId === a.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
                    title={a.label}
                >
                    <span className="mr-2">{a.emoji}</span>{a.label}
                </button>
            ))}
        </div>
    );
};

export default ChatAgentsRail;


