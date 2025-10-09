import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Link as LinkIcon, PlayCircle, BookOpen } from 'lucide-react';

const mockResources = [
  { id: 1, title: 'Kiến trúc sạch trong React', type: 'Bài viết', level: 'Trung cấp', format: 'Văn bản', source: 'Blog', url: '#' },
  { id: 2, title: 'Cơ bản về thiết kế hệ thống', type: 'Hệ thống', level: 'Nâng cao', format: 'Văn bản', source: 'GitHub', url: '#' },
  { id: 3, title: 'Giới thiệu REST APIs', type: 'Backend', level: 'Cơ bản', format: 'Video', source: 'YouTube', url: '#' },
  { id: 4, title: 'Kiểm thử ứng dụng React', type: 'Frontend', level: 'Trung cấp', format: 'Văn bản', source: 'Tài liệu', url: '#' },
];

const levels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];
const formats = ['Tất cả', 'Văn bản', 'Video'];

const ResourceHubPanel = ({ topic = 'Software Engineering' }) => {
  const [level, setLevel] = useState('All');
  const [format, setFormat] = useState('All');
  const [bookmarks, setBookmarks] = useState({});

  const filtered = mockResources.filter((r) =>
    (level === 'Tất cả' || r.level === level) &&
    (format === 'Tất cả' || r.format === format)
  );

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Trung tâm tài nguyên học tập</h3>
            <p className="text-xs text-gray-400">Bối cảnh: {topic}</p>
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
                <button className="text-gray-300 hover:text-white" title="Mở">
                  {r.format === 'Video' ? <PlayCircle className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                </button>
                <button onClick={() => toggleBookmark(r.id)} className="text-gray-300 hover:text-white" title="Đánh dấu">
                  {bookmarks[r.id] ? <BookmarkCheck className="w-4 h-4 text-yellow-300" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button className="mt-2 notebook-button px-3 py-1 text-xs">Lưu vào học tập của tôi</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHubPanel;


