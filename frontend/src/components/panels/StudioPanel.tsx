import React, { useState } from 'react';
import { Brain, BookOpen, FileText, Lightbulb } from 'lucide-react';

// This is the original StudioPanel component using Tailwind CSS.

export const StudioPanel: React.FC = () => {
  const [tools] = useState([
    { id: '1', name: 'Sơ đồ tư duy', icon: Brain, description: 'Tạo sơ đồ tư duy trực quan' },
    { id: '2', name: 'Thẻ ghi nhớ', icon: BookOpen, description: 'Tạo thẻ ghi nhớ học tập' },
    { id: '3', name: 'Tóm tắt', icon: FileText, description: 'Tự động tạo tóm tắt' },
    { id: '4', name: 'Ý tưởng', icon: Lightbulb, description: 'Động não ý tưởng mới' },
  ]);

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Xưởng sáng tạo</h2>
      </div>

      {/* Tools List */}
      <div className="flex-grow overflow-y-auto p-4">
        {tools.map(tool => {
          const IconComponent = tool.icon;
          return (
            <div key={tool.id} className="mb-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <IconComponent size={24} className="text-purple-400" />
                <div>
                  <h3 className="font-medium text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
