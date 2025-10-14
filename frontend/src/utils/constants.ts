// Application constants
export const APP_NAME = 'Hannah Learn About';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';

// Storage Keys
export const STORAGE_KEYS = {
  SOURCES: 'sources',
  CONVERSATIONS: 'conversations',
  USER_PREFERENCES: 'user-preferences',
  APP_SETTINGS: 'app-settings',
  THEME: 'theme',
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'text/plain',
    'text/markdown',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ],
  ALLOWED_EXTENSIONS: ['.txt', '.md', '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_ATTACHMENTS: 5,
  TYPING_INDICATOR_DELAY: 1000,
  MESSAGE_RETRY_ATTEMPTS: 3,
} as const;

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 320,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 40,
  ANIMATION_DURATION: 300,
} as const;

// Breakpoints (matching Material-UI)
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Colors (for non-theme usage)
export const COLORS = {
  PRIMARY: '#2196f3',
  SECONDARY: '#9c27b0',
  SUCCESS: '#4caf50',
  ERROR: '#f44336',
  WARNING: '#ffc107',
  INFO: '#03a9f4',
  GREY: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
} as const;

// Message Types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  CODE: 'code',
  ARTIFACT: 'artifact',
} as const;

// Source Types
export const SOURCE_TYPES = {
  TEXT: 'text',
  FILE: 'file',
  IMAGE: 'image',
  URL: 'url',
  PDF: 'pdf',
} as const;

// Chat Styles
export const CHAT_STYLES = {
  DEFAULT: 'default',
  CREATIVE: 'creative',
  PRECISE: 'precise',
  BALANCED: 'balanced',
} as const;

// Answer Lengths
export const ANSWER_LENGTHS = {
  SHORT: 'short',
  DEFAULT: 'default',
  LONG: 'long',
  DETAILED: 'detailed',
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  TYPING: 'typing',
  ERROR: 'error',
  STATUS: 'status',
} as const;

// Routes (for future routing implementation)
export const ROUTES = {
  HOME: '/',
  MAIN: '/main',
  SETTINGS: '/settings',
  HELP: '/help',
} as const;
