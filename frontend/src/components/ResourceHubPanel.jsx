import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Link as LinkIcon, PlayCircle, BookOpen } from 'lucide-react';

const mockResources = [
  { id: 1, title: 'Clean Architecture in React', type: 'Article', level: 'Intermediate', format: 'Text', source: 'Blog', url: '#' },
  { id: 2, title: 'System Design Primer', type: 'Systems', level: 'Advanced', format: 'Text', source: 'GitHub', url: '#' },
  { id: 3, title: 'Intro to REST APIs', type: 'Backend', level: 'Beginner', format: 'Video', source: 'YouTube', url: '#' },
  { id: 4, title: 'Testing React Apps', type: 'Frontend', level: 'Intermediate', format: 'Text', source: 'Docs', url: '#' },
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const formats = ['All', 'Text', 'Video'];

const ResourceHubPanel = ({ topic = 'Software Engineering' }) => {
  const [level, setLevel] = useState('All');
  const [format, setFormat] = useState('All');
  const [bookmarks, setBookmarks] = useState({});

  const filtered = mockResources.filter((r) =>
    (level === 'All' || r.level === level) &&
    (format === 'All' || r.format === format)
  );

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Learning Resource Hub</h3>
            <p className="text-xs text-gray-400">Context: {topic}</p>
          </div>
          <BookOpen className="w-4 h-4 text-blue-400" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <select className="notebook-input py-1 text-xs" value={level} onChange={(e) => setLevel(e.target.value)}>
            {levels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select className="notebook-input py-1 text-xs" value={format} onChange={(e) => setFormat(e.target.value)}>
            {formats.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((r) => (
          <div key={r.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm text-white font-medium">{r.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{r.type} • {r.level} • {r.format} • {r.source}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-300 hover:text-white" title="Open">
                  {r.format === 'Video' ? <PlayCircle className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                </button>
                <button onClick={() => toggleBookmark(r.id)} className="text-gray-300 hover:text-white" title="Bookmark">
                  {bookmarks[r.id] ? <BookmarkCheck className="w-4 h-4 text-yellow-300" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button className="mt-2 notebook-button px-3 py-1 text-xs">Save to My Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHubPanel;


