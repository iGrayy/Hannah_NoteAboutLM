export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// 3 tài khoản test cố định với mật khẩu
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'student@test.com',
    role: 'student'
  },
  {
    id: '2',
    name: 'TS. Trần Thị B',
    email: 'faculty@test.com',
    role: 'faculty'
  },
  {
    id: '3',
    name: 'Admin System',
    email: 'admin@test.com',
    role: 'admin'
  }
];

// Thông tin đăng nhập cho từng tài khoản
export const mockCredentials = {
  'student@test.com': 'student123',
  'faculty@test.com': 'faculty123',
  'admin@test.com': 'admin123'
};
