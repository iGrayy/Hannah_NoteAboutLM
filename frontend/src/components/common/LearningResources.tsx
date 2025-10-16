import React from 'react';
import { BookOpen } from 'lucide-react';

interface Resource {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

interface LearningResourcesProps {
  title: string;
  resources: Resource[];
}

export const LearningResources: React.FC<LearningResourcesProps> = ({ title, resources }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-3 text-yellow-400" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-white flex items-center mb-2">
              <span className="mr-2">{resource.icon}</span>
              {resource.title}
            </h4>
            <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
            <div className="flex flex-wrap gap-2">
              {resource.items.map((item, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
