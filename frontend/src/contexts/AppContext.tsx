import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { WebSocketProvider } from './WebSocketContext';
// Import other providers here as they are created
// e.g., import { AuthProvider } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

// This component will wrap all other providers
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <WebSocketProvider>
        {/* <AuthProvider> */}
        {/*   <AnotherProvider> */}
        {children}
        {/*   </AnotherProvider> */}
        {/* </AuthProvider> */}
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
