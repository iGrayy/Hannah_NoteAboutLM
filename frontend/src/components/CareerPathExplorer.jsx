import React from 'react';
import { Map, ChevronRight } from 'lucide-react';

const branches = [
  { id: 'frontend', label: 'Frontend', color: 'text-pink-300' },
  { id: 'backend', label: 'Backend', color: 'text-blue-300' },
  { id: 'mobile', label: 'Mobile', color: 'text-green-300' },
  { id: 'devops', label: 'DevOps', color: 'text-yellow-300' },
  { id: 'aiml', label: 'AI / ML', color: 'text-purple-300' },
  { id: 'fullstack', label: 'Fullstack', color: 'text-orange-300' },
];

const Node = ({ title, subtitle }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs">
    <div className="text-white font-medium">{title}</div>
    {subtitle && <div className="text-gray-400">{subtitle}</div>}
  </div>
);

const CareerPathExplorer = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Career Path Explorer</h3>
          <p className="text-xs text-gray-400">Choose a specialization roadmap</p>
        </div>
        <Map className="w-4 h-4 text-blue-400" />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {branches.map((b) => (
          <div key={b.id} className="bg-gray-900/40 rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${b.color.replace('text', 'bg')}`}></div>
              <h4 className={`text-white text-sm font-medium`}>{b.label}</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center">
              <Node title="Foundations" subtitle="CS basics, Git, Linux" />
              <ChevronRight className="w-4 h-4 text-gray-500 justify-self-center" />
              <Node title="Core Skills" subtitle="Frameworks & tooling" />
              <ChevronRight className="w-4 h-4 text-gray-500 justify-self-center" />
              <Node title="Projects" subtitle="Build 2-3 apps" />
              <ChevronRight className="w-4 h-4 text-gray-500 justify-self-center" />
              <Node title="Advanced" subtitle="Scale & patterns" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPathExplorer;


