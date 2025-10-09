import React, { useState } from 'react';
import { Code2, Layers, FileText, Sparkles } from 'lucide-react';

const tabs = [
    { id: 'code', label: 'Xem trước mã', icon: Code2 },
    { id: 'uml', label: 'Biểu đồ UML', icon: Layers },
    { id: 'quiz', label: 'Bài kiểm tra', icon: FileText },
];

const AIArtifactPanel = () => {
    const [active, setActive] = useState('code');

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Sản phẩm AI</h3>
                </div>
                <div className="flex gap-1">
                    {tabs.map((t) => (
                        <button key={t.id} onClick={() => setActive(t.id)} className={`px-2 py-1 rounded text-xs ${active === t.id ? 'bg-blue-600 text-white' : 'text-gray-300 bg-gray-800 border border-gray-700'}`}>
                            <t.icon className="inline w-3 h-3 mr-1" />{t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-auto p-3">
                {active === 'code' && (
                    <pre className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-xs text-gray-100 whitespace-pre-wrap">{
                        `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1; else right = mid - 1;
  }
  return -1;
}`}
                    </pre>
                )}

                {active === 'uml' && (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300">[Vị trí biểu đồ UML]</div>
                        <svg viewBox="0 0 300 150" className="w-full h-40 mt-2">
                            <rect x="20" y="20" width="80" height="40" fill="#1F2937" stroke="#374151" />
                            <rect x="200" y="20" width="80" height="40" fill="#1F2937" stroke="#374151" />
                            <rect x="110" y="90" width="80" height="40" fill="#1F2937" stroke="#374151" />
                            <line x1="60" y1="60" x2="150" y2="90" stroke="#4B5563" />
                            <line x1="240" y1="60" x2="150" y2="90" stroke="#4B5563" />
                        </svg>
                    </div>
                )}

                {active === 'quiz' && (
                    <div className="space-y-2">
                        {[1, 2, 3].map((q) => (
                            <div key={q} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                                <div className="text-sm text-white mb-2">Câu hỏi {q}: Big-O của tìm kiếm nhị phân là gì?</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'].map((a) => (
                                        <button key={a} className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-left">{a}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIArtifactPanel;


