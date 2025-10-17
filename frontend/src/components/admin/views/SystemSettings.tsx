import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [systemName, setSystemName] = useState('Hannah AI Assistant');
  const [systemDescription, setSystemDescription] = useState('AI Learning Assistant for Software Engineering Education');
  const [version, setVersion] = useState('v1.0.0');
  const [securityMode, setSecurityMode] = useState(true);

  const tabs = [
    { id: 'general', label: 'Chung' },
    { id: 'appearance', label: 'Phiên bản' },
    { id: 'kiemthu', label: 'Cài trúc Kiểm thử' },
    { id: 'security', label: 'Cơ sở dữ liệu' }
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Cấu hình hệ thống</h1>
          <p className="text-gray-600 text-sm mt-1">Quản lý cài đặt và cấu hình hệ thống</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Lưu thay đổi
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-white text-black shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        {activeTab === 'general' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-black">Cài đặt chung</h2>
              <span className="text-sm text-gray-500">Cài đặt cơ bản của hệ thống</span>
            </div>

            <div className="space-y-6">
              {/* System Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Tên hệ thống</label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                />
              </div>

              {/* Version */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Phiên bản</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                  />
                </div>
              </div>

              {/* System Description */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Mô tả hệ thống</label>
                <textarea
                  value={systemDescription}
                  onChange={(e) => setSystemDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black resize-none"
                />
              </div>

              {/* Security Mode */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Chế độ bảo mật</label>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-700">Bật chế độ bảo mật khi cập nhật hệ thống</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={securityMode}
                      onChange={(e) => setSecurityMode(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      onClick={() => setSecurityMode(!securityMode)}
                      className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${
                        securityMode ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          securityMode ? 'translate-x-5' : 'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Tab */}
        {activeTab === 'security' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-black">Cấu hình cơ sở dữ liệu</h2>
              <span className="text-sm text-gray-500">Cài đặt kết nối và cấu hình cơ sở dữ liệu</span>
            </div>

            <div className="space-y-6">
              {/* Database Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Trạng thái kết nối</label>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-green-600 font-medium">Đã kết nối</span>
                    <span className="text-sm text-gray-500">PostgreSQL 14.2</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Kích thước pool</label>
                  <input
                    type="number"
                    defaultValue="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                  />
                </div>
              </div>

              {/* Backup Schedule */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Lịch sao lưu</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black">
                  <option>Hàng ngày</option>
                  <option>Hàng tuần</option>
                  <option>Hàng tháng</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'kiemthu' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-black">Cấu trúc Knowledge Base</h2>
              <span className="text-sm text-gray-500">Quản lý danh mục và cấu trúc tri thức</span>
            </div>

            <div className="space-y-6">
              {/* Add Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tạo danh mục</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tên danh mục"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Thêm
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Chủ đề</label>
                  <input
                    type="text"
                    placeholder="VD: Cấu trúc dữ liệu, Giải thuật..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Lưu ý: Bây giờ mô phỏng để quản lý cấu trúc tri thức.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Model Tab */}
        {activeTab === 'appearance' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-black">Dữ liệu huấn luyện & tham số mô hình</h2>
              <span className="text-sm text-gray-500">Cấu hình AI model và tham số huấn luyện</span>
            </div>

            <div className="space-y-6">
              {/* Model Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Chọn mô hình</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black">
                    <option>GPT-4</option>
                    <option>GPT-3.5-turbo</option>
                    <option>Claude</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Nhiệt (Temperature)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    defaultValue="0.7"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                  />
                </div>
              </div>

              {/* Token Limit */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Số token tối đa</label>
                <input
                  type="number"
                  defaultValue="2048"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                />
              </div>

              {/* System Prompt */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">System Prompt</label>
                <textarea
                  rows={4}
                  defaultValue="You are Hannah, an AI assistant specialized in Software Engineering education..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black resize-none"
                />
              </div>

              {/* Training Data Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Tải dữ liệu huấn luyện (CSV/JSON)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" className="hidden" id="training-data" accept=".csv,.json" />
                  <label htmlFor="training-data" className="cursor-pointer">
                    <div className="text-gray-500">
                      <p className="text-sm">Choose File No file chosen</p>
                      <p className="text-xs mt-1">Tối đa tệp huấn luyện 64 MB gồm một hoặc nhiều tệp (định dạng)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;
