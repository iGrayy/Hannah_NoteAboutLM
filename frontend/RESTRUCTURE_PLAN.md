# Frontend Restructure Plan - React TypeScript + Material-UI + WebSockets

## Cấu trúc thư mục mới

```
src/
├── components/           # Tất cả React components
│   ├── common/          # Shared components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Loading/
│   │   └── index.ts
│   ├── layout/          # Layout components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Layout/
│   │   └── index.ts
│   ├── chat/           # Chat related components
│   │   ├── ConversationPanel/
│   │   ├── MessageList/
│   │   ├── MessageInput/
│   │   ├── ChatAgents/
│   │   └── index.ts
│   ├── sources/        # Source management
│   │   ├── SourcesPanel/
│   │   ├── SourceCard/
│   │   ├── SourceEditor/
│   │   └── index.ts
│   ├── studio/         # Studio features
│   │   ├── StudioPanel/
│   │   ├── ResourceHub/
│   │   ├── CareerPath/
│   │   ├── Mindmap/
│   │   ├── Progress/
│   │   └── index.ts
│   └── ui/             # Material-UI customizations
├── hooks/              # Custom React hooks
│   ├── useWebSocket.ts
│   ├── useLocalStorage.ts
│   ├── useConversations.ts
│   ├── useSources.ts
│   └── index.ts
├── services/           # API và business logic
│   ├── websocket.ts
│   ├── api.ts
│   ├── storage.ts
│   └── index.ts
├── types/              # TypeScript type definitions
│   ├── index.ts
│   ├── conversation.ts
│   ├── source.ts
│   ├── websocket.ts
│   └── common.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   ├── helpers.ts
│   └── index.ts
├── contexts/           # React contexts
│   ├── WebSocketContext.tsx
│   ├── ThemeContext.tsx
│   ├── AppContext.tsx
│   └── index.ts
├── pages/              # Page components
│   ├── HomePage/
│   ├── MainPage/
│   └── index.ts
├── assets/             # Static assets
│   ├── images/
│   └── icons/
├── styles/             # Global styles
│   ├── theme.ts        # Material-UI theme
│   ├── globals.css
│   └── index.ts
├── App.tsx             # Main App component
├── main.tsx           # Entry point
└── vite-env.d.ts      # Vite types

```

## Phân chia Component chi tiết

### 1. Common Components
- **Button**: Customized Material-UI Button với variants
- **Input**: Enhanced TextField với validation
- **Modal**: Reusable modal wrapper
- **Loading**: Loading states và skeletons

### 2. Layout Components
- **Header**: Top navigation với user menu
- **Sidebar**: Collapsible sidebar với navigation
- **Layout**: Main layout wrapper

### 3. Chat Components
- **ConversationPanel**: Main chat interface
- **MessageList**: Scrollable message history
- **MessageInput**: Input với file upload và settings
- **ChatAgents**: AI agent selection rail

### 4. Sources Components
- **SourcesPanel**: Source management sidebar
- **SourceCard**: Individual source display
- **SourceEditor**: Source content editor

### 5. Studio Components
- **StudioPanel**: Main studio interface
- **ResourceHub**: Learning resources
- **CareerPath**: Career exploration
- **Mindmap**: Mind mapping tool
- **Progress**: Progress tracking

## Technology Stack

### Core
- **React 18** với TypeScript
- **Material-UI v5** cho UI components
- **Vite** cho build tool
- **WebSocket** cho real-time communication

### State Management
- **React Context** cho global state
- **Custom hooks** cho business logic
- **Local Storage** cho persistence

### Styling
- **Material-UI Theme System**
- **CSS-in-JS** với emotion
- **Responsive design** với breakpoints

### WebSocket Integration
- **Native WebSocket API**
- **Custom useWebSocket hook**
- **Reconnection logic**
- **Message queuing**

## Migration Strategy

1. **Phase 1**: Setup TypeScript và Material-UI
2. **Phase 2**: Tạo common components
3. **Phase 3**: Migrate layout components
4. **Phase 4**: Migrate chat functionality
5. **Phase 5**: Migrate sources management
6. **Phase 6**: Migrate studio features
7. **Phase 7**: Implement WebSocket integration
8. **Phase 8**: Testing và optimization

## Benefits

- **Type Safety**: TypeScript cho better development experience
- **Consistent UI**: Material-UI design system
- **Maintainable**: Clear component separation
- **Scalable**: Modular architecture
- **Real-time**: WebSocket integration
- **Responsive**: Mobile-friendly design
