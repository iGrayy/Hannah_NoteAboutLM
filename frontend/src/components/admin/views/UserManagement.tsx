import React, { useState } from 'react';
import {
  Users,
  Search,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  UserCheck,
  Activity,
  GraduationCap,
  Settings,
  FileText,
  Filter
} from 'lucide-react';

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "faculty" | "student"
  status: "active" | "inactive" | "awaiting_verification"
  department: string
  lastLogin: string
  createdAt: string
  avatar: string
  permissions: string[]
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Nguyen Van A",
    email: "nguyen.a@university.edu",
    role: "faculty",
    status: "active",
    department: "Kỹ Thuật Phần Mềm",
    lastLogin: "2024-01-15 09:30",
    createdAt: "2023-09-01",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["review_responses", "manage_knowledge", "view_analytics"],
  },
  {
    id: "2",
    name: "Prof. Tran Thi B",
    email: "tran.b@university.edu",
    role: "admin",
    status: "active",
    department: "Quản trị CNTT",
    lastLogin: "2024-01-15 08:15",
    createdAt: "2023-08-15",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["full_access"],
  },
  {
    id: "3",
    name: "Le Van C",
    email: "le.c@student.university.edu",
    role: "student",
    status: "active",
    department: "Kỹ Thuật Phần Mềm",
    lastLogin: "2024-01-15 14:20",
    createdAt: "2023-09-15",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["ask_questions", "view_responses"],
  },
  {
    id: "4",
    name: "Pham Thi D",
    email: "pham.d@university.edu",
    role: "faculty",
    status: "awaiting_verification",
    department: "Kỹ Thuật Phần Mềm",
    lastLogin: "Chưa bao giờ",
    createdAt: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: [],
  },
]

const allPermissions = [
  { id: "full_access", name: "Truy cập đầy đủ", description: "Truy cập toàn bộ hệ thống" },
  { id: "user_management", name: "Quản lý người dùng", description: "Tạo, chỉnh sửa, xóa người dùng" },
  { id: "security_settings", name: "Cài đặt bảo mật", description: "Quản lý chính sách bảo mật" },
  { id: "review_responses", name: "Xem xét phản hồi", description: "Xem và duyệt phản hồi của AI" },
  { id: "manage_knowledge", name: "Quản lý tri thức", description: "Chỉnh sửa cơ sở tri thức" },
  { id: "view_analytics", name: "Xem phân tích", description: "Truy cập bảng phân tích" },
  { id: "student_monitoring", name: "Giám sát sinh viên", description: "Theo dõi tiến độ sinh viên" },
  { id: "ask_questions", name: "Đặt câu hỏi", description: "Tương tác với trợ lý AI" },
  { id: "view_responses", name: "Xem phản hồi", description: "Xem phản hồi của AI" },
  { id: "access_materials", name: "Truy cập tài liệu", description: "Xem tài liệu học tập" },
]

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [roleSubTab, setRoleSubTab] = useState("student")

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span
            className="px-2 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: "#BBF7D0", color: "#166534" }}
          >
            Đang hoạt động
          </span>
        )
      case "inactive":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
            Ngừng hoạt động
          </span>
        )
      case "awaiting_verification":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Chờ xác minh
          </span>
        )
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Quản trị viên
          </span>
        )
      case "faculty":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Giảng viên
          </span>
        )
      case "student":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
            Sinh viên
          </span>
        )
      default:
        return null
    }
  }


  const toggleUserStatus = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      const newStatus = user.status === "active" ? "inactive" : "active"
      const action = newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"

      if (confirm(`Bạn có chắc chắn muốn ${action} tài khoản của ${user.name}?`)) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, status: newStatus as "active" | "inactive" | "awaiting_verification" } : u,
          ),
        )
        alert(`✅ Đã ${action} tài khoản của ${user.name}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">Quản lý người dùng</h1>
          <p className="text-gray-600 text-sm">Quản lý tài khoản, vai trò và quyền truy cập cho hệ thống Hannah</p>
        </div>
        <button className="bg-gray-900 hover:bg-gray-600 text-white-300 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-indigo-700">
          <UserPlus size={16} className="text-white-300" />
          Thêm người dùng
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng người dùng</p>
              <p className="text-black text-2xl font-bold">{users.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đang hoạt động</p>
              <p className="text-black text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Chờ xác minh</p>
              <p className="text-black text-2xl font-bold">{users.filter((u) => u.status === "awaiting_verification").length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Giảng viên</p>
              <p className="text-black text-2xl font-bold">{users.filter((u) => u.role === "faculty").length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "users"
              ? "text-black border border-gray-300 shadow-md"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("users")}
        >
          Người dùng
        </button>

        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "roles"
              ? "text-black border border-gray-300 shadow-md"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("roles")}
        >
          Vai trò & Quyền
        </button>

        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "audit"
              ? "text-black border border-gray-300 shadow-md"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("audit")}
        >
          Nhật ký hệ thống
        </button>
      </div>



      {/* Tab Content */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm người dùng theo tên, email hoặc ngành..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-black placeholder-black focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="faculty">Giảng viên</option>
                  <option value="student">Sinh viên</option>
                </select>
              </div>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                  <option value="awaiting_verification">Chờ xác minh</option>
                </select>
              </div>
            </div>
          </div>
          {/* Users Table */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-100">
              <h3 className="text-black font-medium">Người dùng ({filteredUsers.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Người dùng</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Vai trò</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Đăng nhập gần nhất</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-black">{user.name}</div>
                            <div className="text-sm text-black">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-black">{getRoleBadge(user.role)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-black">{getStatusBadge(user.status)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black">{user.lastLogin}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-1">
                          <button
                            className="p-1 text-black hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowUserDetail(true)
                            }}
                          >
                            <Eye size={14} />
                          </button>
                          <button className="p-1 text-black hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1 text-black hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}


      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Vai trò và phân quyền</h3>
          </div>

          {/* Role Sub Tabs */}
          <div className="flex gap-2">
            <button
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${roleSubTab === 'student'
                  ? "text-black border border-gray-300 shadow-md"
                  : 'bg-white/70 text-black border border-transparent hover:bg-white hover:shadow-md'
                }`}
              onClick={() => setRoleSubTab('student')}
            >
              Sinh viên
            </button>
            <button
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${roleSubTab === 'faculty'
                  ? "text-black border border-gray-300 shadow-md"
                  : 'bg-white/70 text-black border border-transparent hover:bg-white hover:shadow-md'
                }`}
              onClick={() => setRoleSubTab('faculty')}
            >
              Giảng viên
            </button>
            <button
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${roleSubTab === 'admin'
                  ? "text-black border border-gray-300 shadow-md"
                  : 'bg-white/70 text-black border border-transparent hover:bg-white hover:shadow-md'
                }`}
              onClick={() => setRoleSubTab('admin')}
            >
              Quản trị viên
            </button>
          </div>


          {/* Student Role Tab */}
          {roleSubTab === 'student' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-purple-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-900 font-semibold">Danh sách sinh viên</h4>
                  <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                    {users.filter(u => u.role === 'student').length} người dùng
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Sinh viên có quyền truy cập cơ bản để tương tác với hệ thống</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sinh viên..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người dùng</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Khoa</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lần đăng nhập cuối</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.filter(user => user.role === 'student').map((user) => (
                        <tr key={user.id} className="hover:bg-purple-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-150">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Faculty Role Tab */}
          {roleSubTab === 'faculty' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-900 font-semibold">Danh sách giảng viên</h4>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                    {users.filter(u => u.role === 'faculty').length} người dùng
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Đội ngũ giảng dạy có quyền quản lý nội dung và hỗ trợ sinh viên</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm giảng viên..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người dùng</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Khoa</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lần đăng nhập cuối</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.filter(user => user.role === 'faculty').map((user) => (
                        <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-150">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Admin Role Tab */}
          {roleSubTab === 'admin' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-red-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-900 font-semibold">Danh sách quản trị viên</h4>
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full border border-red-200">
                    {users.filter(u => u.role === 'admin').length} người dùng
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Quyền truy cập và quản lý toàn bộ hệ thống</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm quản trị viên..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người dùng</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lần đăng nhập cuối</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.filter(user => user.role === 'admin').map((user) => (
                        <tr key={user.id} className="hover:bg-red-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-150">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-black font-medium mb-4">Nhật ký hệ thống</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">Đăng nhập thành công</p>
                <p className="text-xs text-gray-600">Dr. Nguyen Van A đăng nhập từ 192.168.1.100</p>
              </div>
              <span className="text-xs text-gray-600">2 giờ trước</span>
            </div>
            <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">Cập nhật vai trò người dùng</p>
                <p className="text-xs text-gray-600">Le Van C đổi vai trò từ Sinh viên sang Giảng viên</p>
              </div>
              <span className="text-xs text-gray-600">5 giờ trước</span>
            </div>
            <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">Nỗ lực đăng nhập thất bại</p>
                <p className="text-xs text-gray-600">Nhiều lần thất bại cho admin@university.edu</p>
              </div>
              <span className="text-xs text-gray-600">1 ngày trước</span>
            </div>
          </div>
        </div>
      )}


      {/* User Detail Modal */}
      {showUserDetail && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Chi tiết người dùng</h3>
              <button
                onClick={() => setShowUserDetail(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{selectedUser.name}</h4>
                  <p className="text-gray-400">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Ngày tạo</label>
                <p className="text-sm text-gray-400">{selectedUser.createdAt}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Quyền</label>
                <div className="space-y-2">
                  {selectedUser.permissions.length > 0 ? (
                    selectedUser.permissions.map((permissionId) => {
                      const permission = allPermissions.find(p => p.id === permissionId)
                      return permission ? (
                        <div key={permissionId} className="text-sm text-white">
                          • {permission.name}
                        </div>
                      ) : null
                    })
                  ) : (
                    <div className="text-sm text-gray-400 italic">
                      Không có quyền nào được cấp
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                    <Edit size={16} />
                    Sửa
                  </button>
                  <button
                    onClick={() => toggleUserStatus(selectedUser.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedUser.status === 'active'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    {selectedUser.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
