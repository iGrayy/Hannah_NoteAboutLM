import React from 'react';
import { Settings, Database, Cpu, Key, Save } from 'lucide-react';

const SystemSettings: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <h1 className="text-3xl font-bold text-white">Cài đặt hệ thống</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Engine Settings */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Cpu size={24} /> Cấu hình AI Engine
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">API Key</label>
              <input type="password" placeholder="••••••••••••••••" className="w-full p-2 bg-gray-700 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Model</label>
              <select className="w-full p-2 bg-gray-700 rounded-md">
                <option>GPT-4</option>
                <option>GPT-3.5-turbo</option>
                <option>Gemini Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Rate Limit (requests/minute)</label>
              <input type="number" defaultValue="60" className="w-full p-2 bg-gray-700 rounded-md" />
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database size={24} /> Cấu hình Database
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">PostgreSQL Host</label>
              <input type="text" defaultValue="localhost:5432" className="w-full p-2 bg-gray-700 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">MongoDB Host</label>
              <input type="text" defaultValue="localhost:27017" className="w-full p-2 bg-gray-700 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Elasticsearch Host</label>
              <input type="text" defaultValue="localhost:9200" className="w-full p-2 bg-gray-700 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* System Monitoring */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings size={24} /> Giám sát hệ thống
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">99.8%</p>
            <p className="text-sm text-gray-400">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">1.2s</p>
            <p className="text-sm text-gray-400">Avg Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">2.1GB</p>
            <p className="text-sm text-gray-400">Memory Usage</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
          <Save size={20} />
          <span>Lưu cài đặt</span>
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
