import React, { useState } from 'react';
import { Plus, Search, FileText, Link } from 'lucide-react';

// This is the original SourcesPanel component using Tailwind CSS.

export const SourcesPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sources] = useState([
    { id: '1', type: 'file', name: 'Project_Proposal.pdf', description: 'A detailed proposal for the software engineering project' },
    { id: '2', type: 'url', name: 'Material-UI Docs', description: 'Official documentation for Material-UI components' },
    { id: '3', type: 'file', name: 'Requirements.docx', description: 'System requirements and specifications' },
  ]);

  const filteredSources = sources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Sources</h2>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sources List */}
      <div className="flex-grow overflow-y-auto px-4 pb-4">
        {filteredSources.map(source => (
          <div key={source.id} className="mb-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {source.type === 'file' ? (
                  <FileText size={20} className="text-blue-400" />
                ) : (
                  <Link size={20} className="text-green-400" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">{source.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{source.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
